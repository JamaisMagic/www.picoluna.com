const path = require('path');
const nunjucks = require('nunjucks');


const instance = nunjucks.configure(path.resolve(__dirname, '..', 'f2e', 'sub'), {
  autoescape: true,
  noCache: process.env.NODE_ENV !== 'production',
  tags: {
    blockStart: '{%',
    blockEnd: '%}',
    variableStart: '{$',
    variableEnd: '$}',
    commentStart: '{#',
    commentEnd: '#}'
  }
});

function rendererNunjucks() {
  return (ctx, next) => {
    ctx.render = async (view, data) => {
      let result = instance.render(view, data);
      ctx.response.type = 'text/html; charset=utf-8';
      // ctx.response.status = 200;
      ctx.response.body = result;
    };
  }
}

module.exports = rendererNunjucks;
