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
    // const url = getEmbedUrl(node.data);
    // if (!url) {
    //   return delta;
    // }
    const embedDelta = new Delta()
      .delete(node.data.length)
      .insert('\n\n')
      .insert({ video: node.data }, {
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


const allEmbeds = [buildYoutubeUrl, buildVimeoUrl];
/**
 * JavaScript function to match (and return) the video Id
 * of any valid Youtube Url, given as input string.
 * @author: Stephan Schmitz <eyecatchup@gmail.com>
 * @url: https://stackoverflow.com/a/10315969/624466
 */
function buildYoutubeUrl(url) {
  // tslint:disable-next-line:max-line-length
  const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(youtubeRegex)) ? `https://youtube.com/embed/${RegExp.$1}` : false;
}

function buildVimeoUrl(url) {
  const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
  return (url.match(vimeoRegex)) ? `https://player.vimeo.com/video/${RegExp.$1}` : false;
}

function getEmbedUrl(url) {
  let embed = '';
  allEmbeds.find((provider) => {
    embed = provider.call(null, url);
    return embed ? true : false;
  });
  return embed;
}
