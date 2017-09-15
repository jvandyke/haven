import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');
const Link = Quill.import('formats/link');
const IFRAME_ATTRIBUTES = [
  'height',
  'width',
  'border',
  'top',
  'left',
  'position'
];
const WRAPPER_ATTRIBUTES = {
  'left': 0,
  'width': '100%',
  'height': 0,
  'position': 'relative',
  'padding-bottom': '56.2493%'
};

export default class CustomVideoBlot extends BlockEmbed {
  static blotName = 'video';
  static tagName = 'iframe';

  static create(url) {
    const node = super.create();
    const vidWrapper = <HTMLDivElement>document.createElement('div');
    // Set attributes on the iframe
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);
    node.setAttribute('src', this.sanitize(url));
    // Set styles to the video wrapper
    Object.assign(vidWrapper.style, WRAPPER_ATTRIBUTES);
    // Append iframe as a child of the wrapper
    vidWrapper.appendChild(node);

    return vidWrapper;
  }

  static sanitize(url) {
    return Link.sanitize(url);
  }

  format(name, value) {
    const iframe = this.domNode.querySelector('iframe');
    // Handle unregistered embed formats
    if (IFRAME_ATTRIBUTES.indexOf(name) > -1) {
      if (value !== '') {
        iframe.style[name] = value;
      } else {
        iframe.style[name] = null;
      }
    } else {
      super.format(name, value);
    }
  }
}
