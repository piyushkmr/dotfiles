import iterm from './updateSettings';

export default {
  syncSettings: () => {
    iterm.getJSONSettingsFromFile();
  },

  applySettings: () => {
    iterm.downloadAndInstallIterm2();
    iterm.createJSONsymlink();
  },
};
