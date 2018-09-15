import iterm from './updateSettings';

export default {
  syncSettings: () => {
    iterm.createDirs().then(() => {
      iterm.getJSONSettingsFromFile();
    });
  },

  applySettings: () => {
    iterm.downloadAndInstallIterm2();
    iterm.createJSONsymlink();
  },
};
