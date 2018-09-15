import iterm from './updateSettings';

export default {
  syncSettings: () => {
    return iterm.createDirs().then(() => {
      return iterm.getJSONSettingsFromFile();
    });
  },

  applySettings: () => {
    iterm.downloadAndInstallIterm2();
    iterm.createJSONsymlink();
  },
};
