import iterm from './iterm';
import log from './utils/log';
import * as path from 'path';
import vscode from './vscode';
import * as childProcess from 'child_process';

function sync() {
  Promise.all([
    iterm.syncSettings(),
    vscode.syncSettings(),
  ]).then(() => updateToGithub());
}

function applySettings() {
  iterm.applySettings();
  vscode.applySettings();
}

function updateToGithub() {
  log.info('Updating to github...');
  const message = `Settings updated on ${Date().substring(4, 21)}`; // in Format 'Sep 15 2018 11:46'
  childProcess.exec(`git add .`, () => {
    childProcess.exec(`git commit -m "${message}"`, () => {
      childProcess.exec(`git push origin HEAD`, () => {
        log.success('Settings synced to GitHub.');
      });
    });
  });
}

function init() {
  process.env.DOTFILES_BASE = path.join(__dirname, '..');
  const func = process.argv[2];
  switch (func) {
    case 'sync' : sync(); break;
    case 'apply' : applySettings(); break;
  }
}
init();
