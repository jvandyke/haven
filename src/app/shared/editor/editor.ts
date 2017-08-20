import * as Quill from 'quill';
import Delta from 'quill-delta';
import { bindings } from './modules/keyboard';
import { convertUrlToLink } from './modules/clipboard';

export class Editor {
  editor;
  defaultModules: { [index: string]: Object } = {
    toolbar: [
      ['bold', 'italic', 'underline'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    ],
    keyboard: { bindings }
  };
  defaultOptions = {
    modules: this.defaultModules,
    readOnly: false,
    theme: 'snow',
    bounds: document.body
  };
  constructor(editorElem: HTMLElement, options = {}) {
    const opts = Object.assign(this.defaultOptions, options);
    this.editor = new Quill(editorElem, opts);
    this.editor.clipboard.addMatcher(convertUrlToLink.nodeType, convertUrlToLink.matcher);
  }
}
