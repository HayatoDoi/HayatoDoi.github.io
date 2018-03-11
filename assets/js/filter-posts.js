/**
 * File Name : filter-posts.js
 * Outline   : Filter posts
 * -------------------------------------------------
 * (c) 2018 Hayato Doi. (CC0 Licensed)
 * https://github.com/HayatoDoi/HayatoDoi.github.io
 */

{
  function filterPosts(tag){
    let posts = document.getElementsByClassName('post');
    for(let i = 0; posts[i]; i++){
      let post = posts[i];
      let categories = post.getElementsByClassName('post-category');
      let isInCategory = false;
      for(let j = 0; categories[j]; j++){
        let category = categories[j].innerHTML;
        if(tag == category){
          isInCategory = true;
          break;
        }
      }
      if(isInCategory == false){
        post.remove();
        i--;
      }
    }
  }
  function getParams(){
    let arg = new Object;
    const pair=location.search.substring(1).split('&');
    for(let i = 0; pair[i]; i++){
      let kv = pair[i].split('=');
      arg[kv[0]]=decodeURI(kv[1]);
    }
    return arg;
  }

  const tag = getParams()['tag'];
  if(tag != undefined){
    filterPosts(tag);
  }
}
