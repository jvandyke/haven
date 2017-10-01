import Quill from 'quill';
import { Upload } from '../shared/upload';
import { UploadService } from '../shared/upload.service';

export type FilesHandler = (files: FileList, callback: (dataUrl: string) => void) => void;

/**
  * Handler for paste event to read pasted files from evt.clipboardData
  * @param {ClipboardEvent} evt
  */
export function handlePaste(uploadService: UploadService, evt: ClipboardEvent) {
  evt.preventDefault();

  if (evt.clipboardData && evt.clipboardData.files && evt.clipboardData.files.length) {
    if (this.filesHandler !== null) {
      this.filesHandler(evt.clipboardData.files, this.insert.bind(this), uploadService);
    } else {
      this.readFiles(evt.clipboardData.files, this.insert.bind(this), uploadService);
    }
  }
}

/**
  * Handler for drop event to read dropped files from evt.dataTransfer
  * @param {DragEvent} evt
  */
export function handleDrop(uploadService: UploadService, evt: DragEvent): void {
  evt.preventDefault();

  if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
    if (document.caretRangeFromPoint) {
      const selection = document.getSelection();
      const range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
      if (selection && range) {
        selection.setBaseAndExtent(
          range.startContainer,
          range.startOffset,
          range.startContainer,
          range.startOffset,
        );
      }
    }
    if (this.filesHandler !== null) {
      this.filesHandler(evt.dataTransfer.files, this.insert.bind(this), uploadService);
    } else {
      this.readFiles(evt.dataTransfer.files, this.insert.bind(this), uploadService);
    }
  }
}

/**
 * Custom module for quilljs to allow user to drag images from their file system into the editor
 * and paste images from clipboard (Works on Chrome, Firefox, Edge, not on Safari)
 * @see https://quilljs.com/blog/building-a-custom-module/
 */
// TODO Use clipboard's addMatcher API for handlePaste

export default class ImageDrop {
  protected quill: Quill;
  protected filesHandler: FilesHandler | null = null;

  /**
  * Instantiate the module given a quill instance and any options
  * @param {Quill} quill
  * @param {Object} options
  */
  constructor(quill: Quill, options: { filesHandler?: FilesHandler } = {}) {
    // save the quill reference
    this.quill = quill;
    // save the options
    this.filesHandler = options.filesHandler || null;
  }

  /**
    * Insert the image into the document at the current cursor position
    * @param {String} dataUrl  The base64-encoded image URI
    */
  insert(dataUrl: string): void {
    const range = this.quill.getSelection();
    if (range) {
      let index;
      if (!range.length) {
        index = this.quill.getLength();
      } else {
        index = range.length;
      }
      this.quill.insertText(index, '\n', 'user');
      this.quill.insertEmbed(index + 1, 'image', dataUrl, 'user');
      this.quill.insertText(index + 2, '\n', 'user');
      this.quill.setSelection(index + 3, 'silent');
    }
  }

  /**
  * Default Filehandler, included in the constructor, but expected to be overridden
  * @param {FileList} files  One or more File objects
  * @param {Function} callback  A function to send each data URI to
  */
  protected readFiles(files: FileList,
    callback: (dataUrl: string) => any, uploadService: UploadService) {
    // check each file for an image
    [].forEach.call(files, (file: File) => {
      // Check if this file is a document type
      if (file.type.match(/\.(document|sheet|presentation)$/i)) {
        const currentUpload = new Upload(file);
        uploadService.pushUpload(currentUpload);
        this.quill.insertEmbed(0, 'fileHolder', 'user');
        return;
      }
      if (!file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)) {
        // file is not an image
        // Note that some file formats such as psd start with image/* but are not readable
        return;
      }
      // set up file reader
      const reader = new FileReader();
      reader.onload = (evt: Event) => {
        callback((evt.target as FileReader).result);
      };
      // read the clipboard item or file
      const blob = file instanceof DataTransferItem ? file.getAsFile() : file;
      if (blob instanceof Blob) {
        reader.readAsDataURL(blob);
      }
    });
  }
}
