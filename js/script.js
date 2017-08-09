/**
 * File Name : js/script.js
 * Outline   : Write Article heading.
 * -------------------------------------------------
 * (c) 2017, Hayato Doi. (MIT Licensed)
 * https://github.com/HayatoDoi/HayatoDoi.github.io
 */

/**
 * This became a very dirty code :)
 * I do not want to modify this anymore, so fix it yourself if you find a bug.
 */

getMarkdown()
.then(markdownList => {
  // console.log(markdownTextList);
  let articles = [];
  for(let i = 0; i < markdownList.length;i++){
    if(markdownList[i].path.match(/^\d{4}-\d{2}-\d{2}_.*\.md$/)){
      console.log(markdownList[i].path);
      articles.push({
        title : markdownList[i].path.replace(/^\d{4}-\d{2}-\d{2}_/, '').replace(/\.md/, ''),
        path : markdownList[i].path,
        txt : marked(markdownList[i].text || 'Ajax error :)').replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substring(0, 300),
        date : markdownList[i].path.match(/^\d{4}-\d{2}-\d{2}/)[0]
      });
    }
  }
  console.log(articles);
  new Vue({
    el: '#articles',
    data: {
      articles : articles,
      githubName : githubName
    }
  })
})


 /**
  * Outline : Get article list using GitHub API or local database.
  * Args    : @param None
  * Return  : Array (String)
  *         : ex, ['markdown name 1', 'markdown name 2', .....] 
  */
function getRepsMarkdownList(){
  return new Promise((resolve, reject)=>{
    // Use Github API
    if(isUseGithubApi){
      axios.get(`https://api.github.com/repos/${githubName}/${githubName}.github.io/branches/master`)
      .then(response => {
        let repsTreeUrl = response.data.commit.commit.tree.url;
        axios.get(repsTreeUrl)
        .then(response => {
          let repsTreeList = response.data.tree;
          let repsMarkdownUrl = '';
          for(let i = 0; i < repsTreeList.length; i++){
            if(repsTreeList[i].path === 'markdown'){
              repsMarkdownUrl = repsTreeList[i].url;
              break;
            }
          }
          axios.get(repsMarkdownUrl)
          .then(response => {
            let repsMarkdownObj = response.data.tree;
            let repsMarkdownList = [];
            for(let i = 0; i < repsMarkdownObj.length;i++){
              repsMarkdownList.push(repsMarkdownObj[i].path);
            }
            repsMarkdownList.sort().reverse();
            console.log(repsMarkdownList);
            resolve(repsMarkdownList);
          })
        })
      })
    }
    // Use local database
    else{
      axios.get('articles-list')
      .then(response => {
        let ldbMarkdownList_tmp = response.data.split("\n");
        let ldbMarkdownList = [];
        // Delete unnecessary character string
        for(let i = 0; i < ldbMarkdownList_tmp.length; i++){
          ldbMarkdownList_tmp[i] = ldbMarkdownList_tmp[i];
          if( !( ldbMarkdownList_tmp[i] === '')){
            ldbMarkdownList.push(ldbMarkdownList_tmp[i]);
          }
        }
        ldbMarkdownList.sort().reverse();
        console.log(ldbMarkdownList);
        resolve(ldbMarkdownList);
      })
    }
	});
}

 /**
  * Outline : Get article list using getRepsMarkdownList(function).
  * Args    : @param None
  * Return  : Array (Object)
  *         : ex, [{'markdown name 1', 'markdown text 1'}, {'markdown name 2', 'markdown text 2'}, .....] 
  */
function getMarkdown(){
  return new Promise((resolve, reject)=>{
    getRepsMarkdownList()
    .then(repsMarkdownList => {
      let process = [];
      let r = [];
      for(let i = 0; i < repsMarkdownList.length;i++){
        process[i] = new Promise((resolve, reject)=>{
          axios.get(`markdown/${repsMarkdownList[i]}`)
          .then(response => {
            // console.log(response.data);
            //(Why is not ===) Perhaps the strings will come back
            if(response.status == 200){
              r.push({path : repsMarkdownList[i], text : response.data});
              resolve();
            }
            else{
              r.push({path : '', text : ''});
              reject();
            }
          })
          .catch((e)=>{
            console.error(e);
            r.push({path : '', text : ''});
            reject();
          })
        });
      }
      Promise.all(process).then(()=>{
        console.log(r);
        resolve(r);
      });
    })
  })
}