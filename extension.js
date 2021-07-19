const vscode = require('vscode');

/*
 * Ruta del archivo de configuracion del workflow de GitHub Actions
 */
const GITHUB_ACTIONS_CONFIG_FILE = '.github/workflows/main.yml';

/**
 * Contenido del archivo de configuracion del workflow.
 */
 const GITHUB_ACTIONS_CONFIG_CONTENTS_TEMPLATE = (version) => {
	return `
name: Node.js Tests
on: [push]
jobs:
	build:
	runs-on: ubuntu-latest
	steps:
	- uses: actions/checkout@v2
	- uses: actions/setup-node@v2
	        with:
	        node-version: ${version}
	- run: npm ci
	- run: npm run build --if-present
	- run: npm test
`};

/**
 * Crea el archivo de configuracion para GitHub Actions en la carpeta del proyecto
 */
 function crearGithubActionsWorkflow(version) {
	const workspaceRoot = vscode.workspace.workspaceFolders[0].uri;
	const gitHubActionsConfigFile = vscode.Uri.joinPath(workspaceRoot, GITHUB_ACTIONS_CONFIG_FILE);
	const content = new TextEncoder().encode(GITHUB_ACTIONS_CONFIG_CONTENTS_TEMPLATE(version));
	vscode.workspace.fs.writeFile(gitHubActionsConfigFile, content);
}

async function preguntarVersionDeNodeJs() {
	const version = await vscode.window.showInputBox({
		title: 'Version de NodeJS',
		placeHolder: 'Ej. 12',
		prompt: 'La version de NodeJS a utilizar para correr los tests',
    }) ?? '';
	return version;
}

function activate(context) {
	let disposable = vscode.commands.registerCommand('github-actions-enabler.habilitarGithubActions', async () => {
		const version = await preguntarVersionDeNodeJs();
		if (version) {
			crearGithubActionsWorkflow(version);
			vscode.window.showInformationMessage("Se creo el workflow de Github Actions");
		}
	});
	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
