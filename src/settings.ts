import * as os from 'os';
import * as path from 'path';

export default {
  dir: '/settings',
  iterm: {
    location: os.homedir() + '/Library/Application Support/iTerm2/DynamicProfiles/',
    file: '00-DefaultiTerm.json',
    settingsDir: 'iterm',
    downloadLink: 'https://iterm2.com/downloads/stable/latest',
    installPath: path.join('/Applications', 'iterm__2.app'), // Install into /Applications for Mac
  },
  vscode: {
    settingsDirLocation: os.homedir() + '/Library/Application Support/Code/User',
    settingsDir: 'vscode',
    // downloadLink
    installPath: path.join('/Applications', 'Visual Studio Code__.app'), // Install into /Applications for Mac
  },
};
