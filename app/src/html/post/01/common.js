window.onload = () => {
  // const html = require('./how-to-optimize-font-in-vue.md');
  
  const markFile = require('./how-to-optimize-font-in-vue.md')
  const mdbody = document.querySelector('.markdown-body');
  mdbody.innerHTML = markFile;
}