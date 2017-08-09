
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
            r.push({path : repsMarkdownList[i], text : response.data});
            resolve();
          })
        });
      }
      Promise.all(process).then(()=>{
        // console.log(r);
        resolve(r);
      });
    })
  })
}

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
        txt : marked(markdownList[i].text).replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substring(0, 300),
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




