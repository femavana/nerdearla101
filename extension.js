const vscode = require('vscode');

/**
 * Contenido del archivo de configuracion del workflow.
 */
// const GITHUB_ACTIONS_CONFIG_CONTENTS_TEMPLATE = `
// name: mainFlow
// on: [push]
// jobs:
//   build:
//     runs-on: ubuntu-latest
//     strategy:
//       matrix:
//         node-version: ['12.x']
//     steps:
//     - uses: actions/checkout@v2
//     - name: Use Node.js \${{ matrix.node-version }}
//       uses: actions/setup-node@v2
//       with:
//         node-version: \${{ matrix.node-version }}
//     - run: npm ci
//     - run: npm run build --if-present
//     - run: npm test
// `;

function activate(context) {
	let disposable = vscode.commands.registerCommand('github-actions-enabler.enableGitHubActions', async () => {		
    // TODO: (task1) agregar funcion que cree el archivo .github/workflows/main.yml con la configuracion
    //   detallada más arriba.
    //
    //   vscode.window.showInformationMessage("Se creo el workflow de Github Actions");
	});
	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
