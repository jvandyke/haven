export const bindings = {
  tab: {
    key: 9,
    offset: 0,
    handler: function (range, context) {
      this.quill.format('indent', '+1', 'user');
    }
  }
};
