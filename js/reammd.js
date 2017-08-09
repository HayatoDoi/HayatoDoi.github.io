/**
 * File Name : js/reammd.js
 * Outline   : Write articles.
 * -------------------------------------------------
 * (c) 2017, Hayato Doi. (MIT Licensed)
 * https://github.com/HayatoDoi/HayatoDoi.github.io
 */

axios.get(`markdown/${getUrlVars().name}`)
.then(response => {
  // console.log(marked(response.data));
  new Vue({
    el: '#article',
    data: {
      article_body : marked(response.data)
    }
  })
})
.catch(e => {
  new Vue({
    el: '#article',
    data: {
      article_body : '<h1>404 Not found</h1>'
    }
  })
})

/**
 * This function consulted url below.
 * http://qiita.com/Evolutor_web/items/c9b940f752883676b35d
 */

function getUrlVars(){
  var vars = {};
  var param = location.search.substring(1).split('&');
  for(var i = 0; i < param.length; i++) {
    var keySearch = param[i].search(/=/);
    var key = '';
    if(keySearch != -1) key = param[i].slice(0, keySearch);
    var val = param[i].slice(param[i].indexOf('=', 0) + 1);
    if(key != '') vars[key] = decodeURI(val);
  } 
  return vars; 
}