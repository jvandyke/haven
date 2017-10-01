import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

export default class FileHolderBlot extends BlockEmbed {
  static blotName = 'fileHolder';
  static tagName = 'div';

  static create(url) {
    const node = <HTMLDivElement>super.create();
    node.classList.add('helloman');
    return node;
  }
}
