import sync from './syncSettings';
import apply from './applySettings';

export default {
  syncSettings: () => {
    return sync.createDirs().then(() => {
      return Promise.all([
        sync.syncSettingsFolder(),
        sync.syncExtensionsList(),
      ]);
    });
  },

  applySettings: () => {
    apply.downloadVSCode().then(() => {
      apply.updateVSCodeAlias();
      apply.installExtensions();
    });
  },
};
