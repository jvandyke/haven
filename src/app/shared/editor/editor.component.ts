import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator
} from '@angular/forms';

import { Editor } from './editor';
import { UploadService } from './shared/upload.service';
import { handlePaste, handleDrop } from './modules/drop';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
  }],
})
export class EditorComponent implements AfterViewInit, ControlValueAccessor, OnChanges {

  quillEditor: any;
  editorElem: HTMLElement;
  content: any;
  @Output() onEditorCreated: EventEmitter<any> = new EventEmitter();
  @Output() onContentChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor(
    private uploadService: UploadService,
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit() {
    this.editorElem = this.elementRef.nativeElement.querySelector('.editor');
    this.quillEditor = new Editor(this.editorElem).editor;
    this.quillEditor.root.addEventListener('drop', handleDrop.bind(this.quillEditor.getModule('imageDrop'), this.uploadService), false);
    this.quillEditor.root.addEventListener('paste', handlePaste.bind(this.quillEditor.getModule('imageDrop'), this.uploadService), false);

    if (this.content) {
      const contents = this.quillEditor.clipboard.convert(this.content);
      this.quillEditor.setContents(contents);
      this.quillEditor.history.clear();
    }

    this.onEditorCreated.emit(this.quillEditor);

    // mark model as touched if editor lost focus
    this.quillEditor.on('selection-change', (range: any, oldRange: any, source: string) => {
      this.onSelectionChanged.emit({
        editor: this.quillEditor,
        range: range,
        oldRange: oldRange,
        source: source
      });

      if (!range) {
        this.onModelTouched();
      }
    });

    // update model if text changes
    this.quillEditor.on('text-change', (delta: any, oldDelta: any, source: string) => {
      let html: (string | null) = this.editorElem.children[0].innerHTML;
      const text = this.quillEditor.getText();

      if (html === '<p><br></p>') {
        html = null;
      }

      this.onModelChange(html);

      this.onContentChanged.emit({
        editor: this.quillEditor,
        html: html,
        text: text,
        delta: delta,
        oldDelta: oldDelta,
        source: source
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['readOnly'] && this.quillEditor) {
      this.quillEditor.enable(!changes['readOnly'].currentValue);
    }
  }

  writeValue(currentValue: any) {
    this.content = currentValue;
    if (this.quillEditor) {
      if (currentValue) {
        this.quillEditor.setContents(this.quillEditor.clipboard.convert(this.content));
        return;
      }
      this.quillEditor.setText('');
    }
  }

  registerOnChange(fn: Function): void   {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }



}
