export const convertUrlToLink = {
  nodeType: Node.TEXT_NODE,
  matcher: (node, delta) => {
    const regex = /https?:\/\/[^\s]+/g;
    if (typeof (node.data) !== 'string') {
      return;
    }
    const matches = node.data.match(regex);

    if (matches && matches.length > 0) {
      const ops = [];
      let str = node.data;
      matches.forEach((match) => {
        const split = str.split(match);
        const beforeLink = split.shift();
        ops.push({ insert: beforeLink });
        ops.push({ insert: match, attributes: { link: match } });
        str = split.join(match);
      });
      ops.push({ insert: str });
      delta.ops = ops;
    }
    return delta;
  }
}
