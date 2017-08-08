// new Vue({
//   el: '#js-component01',
//   data: {
//     text:axios.get("http://nononono.net/arch")
//   }
// });

new Vue({
  el: '#js-component01',
  data: {
    text: []
  },
  mounted() {
    axios.get("/markdown/mark")
    .then(response => {this.text = response.data.results;console.log(this.text);})
  }
});