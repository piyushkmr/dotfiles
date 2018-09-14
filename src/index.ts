import iterm from './iterm';
import log from './utils/log';
import * as path from 'path';

function sync() {
  iterm.syncSettings();
}

function update() {
  iterm.applySettings();
}

function init() {
  process.env.DOTFILES_BASE = path.join(__dirname, '..');
  const func = process.argv[2];
  switch (func) {
    case 'sync' : sync(); break;
    case 'update' : update(); break;
  }
}
init();
