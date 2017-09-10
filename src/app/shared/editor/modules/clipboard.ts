import Delta from 'quill-delta';

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

export const embedVideos = {
  nodeType: Node.TEXT_NODE,
  matcher: (node, delta) => {
    const url = buildYoutubeUrl(node.data);
    if (!url) {
      return delta;
    }
    const embedDelta = new Delta()
      .delete(node.data.length)
      .insert('\n\n')
      .insert({ video: url }, {
        border: 0,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'absolute'
      })
      .insert('\n\n');
    return delta.compose(embedDelta);
  }
}

/**
 * JavaScript function to match (and return) the video Id
 * of any valid Youtube Url, given as input string.
 * @author: Stephan Schmitz <eyecatchup@gmail.com>
 * @url: https://stackoverflow.com/a/10315969/624466
 */
function buildYoutubeUrl(url) {
  const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? `https://youtube.com/embed/${RegExp.$1}` : false;
}
