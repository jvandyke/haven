import * as Quill from 'quill';
import Delta from 'quill-delta';
import { bindings } from './modules/keyboard';
import { convertUrlToLink, embedVideos } from './modules/clipboard';
import { DividerBlot } from './modules/divider';
import ImageDrop from 'quill-image-drop-module';
import CustomVideoBlot from './modules/video-blot';


export class Editor {
  editor;
  defaultModules: { [index: string]: Object } = {
    toolbar: [
      ['bold', 'italic', 'underline'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    ],
    keyboard: { bindings },
    imageDrop: true
  };
  defaultOptions = {
    modules: this.defaultModules,
    readOnly: false,
    theme: 'bubble',
    bounds: document.body
  };
  constructor(editorElem: HTMLElement, options = {}) {
    const opts = Object.assign(this.defaultOptions, options);
    Quill.register(DividerBlot);
    Quill.register(CustomVideoBlot);
    Quill.register('modules/imageDrop', ImageDrop);
    this.editor = new Quill(editorElem, opts);
    // this.editor.clipboard.addMatcher(convertUrlToLink.nodeType, convertUrlToLink.matcher);
    this.editor.clipboard.addMatcher(embedVideos.nodeType, embedVideos.matcher);
  }
}
