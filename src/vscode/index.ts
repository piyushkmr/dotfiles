import sync from './syncSettings';
import apply from './applySettings';

export default {
  syncSettings: () => {
    sync.createDirs().then(() => {
      sync.syncSettingsFolder();
      sync.syncExtensionsList();
    });
  },

  applySettings: () => {
    apply.downloadVSCode().then(() => {
      apply.updateVSCodeAlias();
      apply.installExtensions();
    });
  },
};
