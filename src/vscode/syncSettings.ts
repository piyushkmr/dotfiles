import * as fs from 'fs-extra';
import * as path from 'path';
import SETTINGS from '../settings';
import log from '../utils/log';

function fileErrorHandler(err) {
  if (err) {
    throw err;
  }
}

export default {
  createDirs: () => {
    return fs.mkdirp(path.join(process.env.DOTFILES_BASE, SETTINGS.dir, SETTINGS.vscode.settingsDir, 'userSettings'));
  },

  syncSettingsFolder: () => {
    const src = path.join(SETTINGS.vscode.settingsDirLocation);
    const dest = path.join(process.env.DOTFILES_BASE, SETTINGS.dir, SETTINGS.vscode.settingsDir, 'userSettings');
    fs.copy(src, dest, fileErrorHandler);
  },

  syncExtensionsList: () => {
    fs.readdir(SETTINGS.vscode.extensionsDir, (err, extensions: string[]) => {
      const extns = extensions.map((extn) => {
        return extn.replace(/-\d+.\d+.*/g, '');
      }).join('\n');
      fs.writeFile(SETTINGS.vscode.extensionsLocalDir, extns);
    });
  },
};
