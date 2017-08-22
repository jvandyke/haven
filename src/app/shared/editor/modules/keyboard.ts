export const bindings = {
  tab: {
    key: 9,
    offset: 0,
    handler: (range, context) => {
      this.quill.format('indent', '+1', 'user');
    }
  },
  spaceToLink: {
    collapsed: true,
    key: ' ',
    prefix: /https?:\/\/[^\s]+/,
    handler: (() => {
      let prevOffset = 0;
      return function (range, context) {
        let url;
        const regex = /https?:\/\/[^\s]+/g;
        const text = this.quill.getText(prevOffset, range.index);
        const match = text.match(regex);
        if (match === null) {
          prevOffset = range.index;
          return true;
        }
        if (match.length > 1) {
          url = match[match.length - 1];
        } else {
          url = match[0];
        }
        const ops = [];
        ops.push({ retain: range.index - url.length });
        ops.push({ delete: url.length });
        ops.push({ insert: url, attributes: { link: url } });
        this.quill.updateContents({ ops });
        prevOffset = range.index;
        return true;
      }
    })()
  }
};
