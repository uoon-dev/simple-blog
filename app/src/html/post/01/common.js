window.onload = () => {  
  const markFile = require('./how-to-optimize-font-in-vue.md')
  const mdbody = document.querySelector('.markdown-body');
  mdbody.innerHTML = markFile;
  hljs.initHighlighting();
}