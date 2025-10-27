const vscode = require('vscode');

function activate(context) {
  let commentCmd =
      vscode.commands.registerCommand('helper.commentCode', function() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          const selection = editor.selection;
          const text = editor.document.getText(selection);

          if (text) {
            const commented =
                text.split('\n').map(line => '// ' + line).join('\n');

            editor.edit(editBuilder => {
              editBuilder.replace(selection, commented);
            });

            vscode.window.showInformationMessage('Код закомментирован!');
          } else {
            vscode.window.showWarningMessage('Выдели код сначала!');
          }
        }
      });


  let timeCmd = vscode.commands.registerCommand('helper.timestamp', function() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const position = editor.selection.active;
      const now = new Date();
      const timestamp = `// Создано: ${now.toLocaleString('ru-RU')}\n`;

      editor.edit(editBuilder => {
        editBuilder.insert(position, timestamp);
      });

      vscode.window.showInformationMessage('Время добавлено!');
    }
  });


  let countCmd =
      vscode.commands.registerCommand('helper.countLines', function() {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          const selection = editor.selection;
          const text = editor.document.getText(selection);
          const lines = text ? text.split('\n').length : 0;

          vscode.window.showInformationMessage(`Выделено строк: ${lines}`);
        } else {
          vscode.window.showWarningMessage('Выдели текст для подсчета!');
        }
      });

  context.subscriptions.push(commentCmd, timeCmd, countCmd);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};