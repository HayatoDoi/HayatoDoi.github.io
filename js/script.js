
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
          let repsMarkdownList = response.data.tree;
          resolve(repsMarkdownList);
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
        axios.get(`markdown/${repsMarkdownList[i].path}`)
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
    if(markdownTextList[i].path.match(/^\d{4}-\d{2}-\d{2}_.*\.md$/)){
      console.log(markdownTextList[i].path);
      articles.push({
        title : markdownTextList[i].path.replace(/^\d{4}-\d{2}-\d{2}_/, '').replace(/\.md/, ''),
        path : markdownTextList[i].path,
        txt : marked(markdownTextList[i].markdown).replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substring(0, 300),
        date : markdownTextList[i].path.match(/^\d{4}-\d{2}-\d{2}/)[0]
      });
    }
  }
  new Vue({
    el: '#articles',
    data: {
      articles : articles,
      githubName : githubName
    }
  })

})




