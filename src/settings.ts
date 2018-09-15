import * as os from 'os';
import * as path from 'path';

const SETTINGS_DIR = '/settings';
export default {
  dir: SETTINGS_DIR,
  iterm: {
    location: path.join(os.homedir(), '/Library/Application Support/iTerm2/DynamicProfiles/'), // Location of iterm Profiles dir
    file: '00-DefaultiTerm.json', // Name of dynamic profile dir
    settingsDir: 'iterm',
    downloadLink: 'https://iterm2.com/downloads/stable/latest', // From where to download iterm
    installPath: path.join('/Applications', 'iTerm_2.app'), // Install into /Applications for Mac
  },
  vscode: {
    settingsDirLocation: path.join(os.homedir(), '/Library/Application Support/Code/User'), // Location of vscode settings dir
    settingsDir: 'vscode',
    // Extensions dir, from: https://code.visualstudio.com/docs/editor/extension-gallery#_common-questions
    extensionsDir: path.join(os.homedir(), '.vscode/extensions'),
    extensionsLocalDir: path.join(__dirname, '..', SETTINGS_DIR, 'vscode', 'extensions'),
    // downloadLink: '',
    installPath: path.join('/Applications', 'Visual Studio Code__.app'), // Install into /Applications for Mac
    aliasName: 'vscode', // Alias to use for launching VSCode from terminal
  },
  bashrcLocation: path.join(os.homedir(), '.bashrc'),
};
