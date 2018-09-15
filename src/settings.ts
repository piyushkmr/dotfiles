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
  miscFilesToSync: [ // Miscellaneous files that you need to sync e.g. bashrc, bash_profile, custom settings etc
    // These need to be absolute paths
    // You can use os.homedir() to refer to user directory ~
    path.join(os.homedir(), '.bashrc'), // .bashrc
    path.join(os.homedir(), '.bash_profile'), // .bash_profile
    path.join(os.homedir(), '.vimrc'), // .vimrc
  ],
  installHomeBrew: true, // Whether to install homebrew on new machine
  installBrewPackages: [ // Works only if installHomeBrew is true
    'jq',
  ],
};
