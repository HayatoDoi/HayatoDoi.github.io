
function getRepsMarkdownList(){
  return new Promise((resolve, reject)=>{
    axios.get(`https://api.github.com/repos/${githubName}/${githubName}.github.io/branches/master`)
    .then(response => {
      let repsTreeUrl = response.data.commit.commit.tree.url;
      axios.get(repsTreeUrl)
      .then(response => {
        let repsTreeList = response.data.tree;
        let repsMarkdownUrl = "";
        for(let i = 0; i < repsTreeList.length; i++){
          if(repsTreeList[i].path === "markdown"){
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
          // console.log(repsMarkdownList.sort().reverse());
          resolve(repsMarkdownList.sort().reverse());
        })
      })
    })
	});
}

function getMarkdownTextList(){
  return new Promise((resolve, reject)=>{
    getRepsMarkdownList()
    .then(repsMarkdownList => {
      for(let i = 0; i < repsMarkdownList.length;i++){
        axios.get(`markdown/${repsMarkdownList[i]}`)
        .then(response => {
          // console.log(response.data);
          repsMarkdownList[i].markdown = response.data;
          if(i === repsMarkdownList.length - 1){
            resolve(repsMarkdownList);
          }
        })
      }
    })
  })
}

getMarkdownTextList()
.then(markdownTextList => {
  // console.log(markdownTextList);

  let articles = [];
  for(let i = 0; i < markdownTextList.length;i++){
    if(markdownTextList[i].match(/^\d{4}-\d{2}-\d{2}_.*\.md$/)){
      console.log(markdownTextList[i]);
      articles.push({
        title : markdownTextList[i].replace(/^\d{4}-\d{2}-\d{2}_/, '').replace(/\.md/, ''),
        path : markdownTextList[i],
        txt : marked(markdownTextList[i].markdown).replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substring(0, 300),
        date : markdownTextList[i].match(/^\d{4}-\d{2}-\d{2}/)[0]
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




