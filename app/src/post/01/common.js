window.onload = () => {  
  const markFile = require('./how-to-optimize-font-in-vue.md')
  const mdbody = document.querySelector('.markdown-body');
  mdbody.innerHTML = markFile;

  document.querySelectorAll('img').forEach(img => {
    img.src = `../../img${img.src.split('img')[1].replace(/%22/ig, '')}`;
  })
  hljs.initHighlighting();
}