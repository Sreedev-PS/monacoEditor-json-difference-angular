# MonacoEditor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

## Demo

The project deployed in firebase.

Deployed URL : [Monoco Editor for json difference](https://monaco-editor-jsondiff-angular.web.app/)

## code

```ts
import('monaco-editor').then((monaco) => {
        // Dispose of existing editor and models
        if (this.diffEditor) {
          this.diffEditor.dispose();
        }
        if (this.originalModel) {
          this.originalModel.dispose();
        }
        if (this.modifiedModel) {
          this.modifiedModel.dispose();
        }
  
        // Define and apply a custom theme
        monaco.editor.defineTheme('customTheme', {
          base: 'vs-dark', // Dark theme base
          inherit: true,
          rules: [],
          colors: {
            'diffEditor.diagonalFill': '#cccccc', // Diagonal pattern for unchanged sections
          },
        });
        monaco.editor.setTheme('customTheme');
  
        // Create models for the diff editor
        this.originalModel = monaco.editor.createModel(this.originalContent, 'json');
        this.modifiedModel = monaco.editor.createModel(this.modifiedContent, 'json');
  
        // Create or reinitialize the Monaco Diff Editor
        this.diffEditor = monaco.editor.createDiffEditor(
          document.getElementById('monaco-diff-editor')!,
          { theme: 'customTheme',
            automaticLayout:true
           }
        );
        this.diffEditor.setModel({
          original: this.originalModel,
          modified: this.modifiedModel,
        });
      });
