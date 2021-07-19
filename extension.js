const vscode = require('vscode');

/**
 * Contenido del archivo de configuracion del workflow.
 */
// const GITHUB_ACTIONS_CONFIG_CONTENTS_TEMPLATE = `
// name: Node.js Tests
// on: [push]
// jobs:
//   build:
//     runs-on: ubuntu-latest
//     steps:
//     - uses: actions/checkout@v2
//     - uses: actions/setup-node@v2
//       with:
//         node-version: '12'
//     - run: npm ci
//     - run: npm run build --if-present
//     - run: npm test
// `;

function activate(context) {
	let disposable = vscode.commands.registerCommand('github-actions-enabler.habilitarGithubActions', async () => {
    	vscode.window.showInformationMessage("Se creo el workflow de Github Actions");
	});
	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
