import SETTINGS from '../settings';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as download from 'download';
import * as ProgressBar from 'cli-progress';
import log from '../utils/log';
import move from '../utils/move';

function fileErrorHandler(err) {
  if (err) {
    throw err;
  }
}

export default {
  createDirs: () => {
    return fs.mkdirp(path.join(process.env.DOTFILES_BASE, SETTINGS.dir, SETTINGS.iterm.settingsDir));
  },

  getJSONSettingsFromFile: () => {
    const src = path.join(SETTINGS.iterm.location, SETTINGS.iterm.file);
    const dest = path.join(process.env.DOTFILES_BASE, SETTINGS.dir, SETTINGS.iterm.settingsDir, SETTINGS.iterm.file);
    fs.copyFile(src, dest, fileErrorHandler);
  },

  downloadAndInstallIterm2: () => {
    const itermDownloadPath = path.join(process.env.DOTFILES_BASE, 'assets');
    const downloadSettings = {
      filename: 'iterm2_stable.zip',
      extract: true,
    };
    log.info('Downloading iterm...'); // Download file to system
    const barOptions = {
      format: '[{bar}] {percentage}% | ETA: {eta}s',
    };
    const vscodeBar = new ProgressBar.Bar(barOptions, ProgressBar.Presets.shades_classic);
    vscodeBar.start(100, 0);
    download(SETTINGS.iterm.downloadLink, itermDownloadPath, downloadSettings)
      .on('response', (response) => {
        vscodeBar.setTotal(response.headers['content-length']);
      })
      .on('downloadProgress', (progress) => {
        vscodeBar.update(progress.transferred);
      })
      .then(() => {
        vscodeBar.stop();
        log.success('Downloaded iterm.');
        const src = path.join(process.env.DOTFILES_BASE, 'assets', 'iTerm.app');
        const dest = SETTINGS.iterm.installPath;
        move(src, dest, () => {
          log.success('Moved to Applications Folder.');
        });
      });
  },

  createJSONsymlink: () => {
    const dest = path.join(SETTINGS.iterm.location, SETTINGS.iterm.file);
    const src = path.join(process.env.DOTFILES_BASE, SETTINGS.dir, SETTINGS.iterm.settingsDir, SETTINGS.iterm.file);
    fs.stat(dest, (err, stats) => {
      if (!err) {// File exists and delete it
        fs.unlink(dest, () => fs.copyFile(src, dest, fileErrorHandler));
      } else {
        fs.copyFile(src, dest, fileErrorHandler);
      }
    });
  },
};
