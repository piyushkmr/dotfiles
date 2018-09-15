import * as fs from 'fs-extra';
import * as path from 'path';
import SETTINGS from '../settings';
import log from '../utils/log';
import * as https from 'https';
import * as download from 'download';
import * as ProgressBar from 'cli-progress';
import * as childProcess from 'child_process';
import move from '../utils/move';

const JSLINK = 'https://code.visualstudio.com/dist/index.js';
function fileErrorHandler(err) {
  if (err) {
    throw err;
  }
}

export default {
  downloadVSCode: () => {
    return new Promise((resolve, reject) => {
      const vscodeDownloadPath = path.join(process.env.DOTFILES_BASE, 'assets');
      const downloadSettings = {
        filename: 'vscode_stable.zip',
        extract: true,
      };
      log.info('Downloading vscode...'); // Download file to system
      getDownloadLinkFromURL().then((link: string) => {
        log.info('Downloading from: ' + link);
        const barOptions = {
          format: '[{bar}] {percentage}% | ETA: {eta}s',
        };
        const vscodeBar = new ProgressBar.Bar(barOptions, ProgressBar.Presets.shades_classic);
        vscodeBar.start(100, 0);
        download(link, vscodeDownloadPath, downloadSettings)
          .on('response', (response) => {
            vscodeBar.setTotal(response.headers['content-length']);
          })
          .on('downloadProgress', (progress) => {
            vscodeBar.update(progress.transferred);
          })
          .then(() => {
            vscodeBar.stop();
            log.success('Downloaded vscode.');
            const src = path.join(process.env.DOTFILES_BASE, 'assets', 'Visual Studio Code.app');
            const dest = SETTINGS.vscode.installPath;
            move(src, dest, () => {
              log.success('Moved to Applications Folder.');
              resolve(true);
            });
          });
      });
    });
  },

  updateVSCodeAlias: () => {
    return fs.appendFile(SETTINGS.bashrcLocation, `\nalias ${SETTINGS.vscode.aliasName}="${getBinFileLocation()}"\n`);
  },

  installExtensions: () => {
    fs.readFile(SETTINGS.vscode.extensionsLocalDir).then((data) => {
      const extensions = data.toString().split('\n');
      const barOptions = {
        format: '[{bar}] {percentage}% | ETA: {eta}s | {output}',
      };
      const vscodeBar = new ProgressBar.Bar(barOptions, ProgressBar.Presets.shades_classic);
      vscodeBar.start(extensions.length, 0);
      _installExtensions(0);

      function _installExtensions(number: number) {
        const name = extensions[number];
        childProcess.exec(`${getBinFileLocation().replace(/ /g, '\\ ')} --install-extension ${name}`, (err, stdout, stderr) => {
          vscodeBar.update(number, { output: stdout.slice(0, stdout.length - 2) });
          if (number < extensions.length - 1) {
            _installExtensions(number + 1);
          } else {
            vscodeBar.stop();
          }
        });
      }
    });
  },

  copySettingsFolders: () => {
    const src = path.join(process.env.DOTFILES_BASE, SETTINGS.dir, SETTINGS.vscode.settingsDir, 'userSettings');
    const dest = path.join(SETTINGS.vscode.settingsDirLocation);
    fs.copy(src, dest, fileErrorHandler);
  },
};
function getDownloadLinkFromURL() {
  return new Promise((resolve, reject) => {
    https.get(JSLINK, (response) => {
      let body;
      response.on('data', (d) => body += d);
      response.on('end', () => resolve(extractLinkFromJs(body)));
      response.on('error', (e) => reject(e));
    });
  });
}

function extractLinkFromJs(js): string {
  const osxLinkRegex = new RegExp('version:"preview".*osx:"(https://.*?)"');
  return js.match(osxLinkRegex)[1]; // Download Link
}

function getBinFileLocation() {
  return path.join(SETTINGS.vscode.installPath, 'Contents/Resources/app/bin/code');
}
