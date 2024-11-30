import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './monaco-editor.component.html',
  styleUrl: './monaco-editor.component.scss'
})
export class MonacoEditorComponent {
  isSample = true
  originalContent: string = `{
    "name": "John",
    "age": 30,
    "place":'paravoor'
  }`;
   modifiedContent: string = `{
    "name": "John Doe",
    "age": 31,    
    "place":'paravoor'
  }`;
  inputfile1:any=''
  inputfile2:any=''
  private diffEditor: any; // To track the Monaco Diff Editor instance
  private originalModel: any; // To track the original model
  private modifiedModel: any; // To track the modified model
    ngAfterViewInit() {
      // Dynamically load the Monaco Editor after the view is initialized
      this.getDifference()
    }

    getDifference(){
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
    }
  

    onFileUpload(event: any, fileKey: 'file1' | 'file2'): void {
      const input = event.target as HTMLInputElement;
      fileKey === 'file1' ? this.inputfile1 = event?.target?.files[0].name  : this.inputfile2 = event?.target?.files[0].name
      if (input.files?.length) {
        const reader = new FileReader();
        reader.onload = () => {
          const content = reader.result as string;
          if (fileKey === 'file1') {
            this.originalContent = content;
          } else {
            this.modifiedContent = content;
          }
        };
        reader.readAsText(input.files[0]);
      }
    }


    showResult(){      
      if(!(this.inputfile1 ==''||this.inputfile2 == '')){
        this.isSample = false
      }
      this.getDifference()
    }
  }