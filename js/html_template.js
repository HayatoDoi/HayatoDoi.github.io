//nav
writeComponent('parts/nav.html', '#nav', 'nav-component',
  { githubName : githubName }
);

//footer
writeComponent('parts/footer.html', '#footer', 'footer-component',
  { copyright : copyright, licenseUrl : licenseUrl}
);

function writeComponent(url, id_class, componentName, data){
  axios.get(url)
  .then(response => {
    Vue.component(componentName, {
      template: response.data,
      data: function () {
        return data;
      }
    })
    new Vue({
      el: id_class
    })
  })
}