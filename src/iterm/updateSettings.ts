import SETTINGS from '../settings';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as https from 'https';
import * as download from 'download';
import * as extract from 'extract-zip';
import log from '../utils/log';
import move from '../utils/move';

function fileErrorHandler(err) {
  if (err) {
    throw err;
  }
}

export default {
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
    download(SETTINGS.iterm.downloadLink, itermDownloadPath, downloadSettings).then(() => {
      log.success('Downloaded iterm.');
      const src = path.join(process.env.DOTFILES_BASE, 'assets', 'iTerm.app');
      const dest = SETTINGS.iterm.installPath;
      log.info('Unzipping iterm...'); // Unzip file
      extract(itermDownloadPath, {dir: path.join(process.env.DOTFILES_BASE, 'assets')}, () => {
        log.success('Unzipped.');
        log.info('Copying to Applications Folder...');
        move(src, dest, () => {
          log.success('Moved to Applications Folder.');
        });
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
