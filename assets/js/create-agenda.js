/**
 * File Name : create-agenda.js
 * Outline   : Create agenda and make link.
 * -------------------------------------------------
 * (c) 2018 Hayato Doi. (CC0 Licensed)
 * https://github.com/HayatoDoi/HayatoDoi.github.io
 */

{
  let agendaBody = document.getElementById('agenda-body');
  let content = document.getElementById('content');

  let h2s = content.getElementsByTagName('h2');
  for(let i = 0; h2s[i]; i++){
    let h2 = h2s[i];
    let h2Text = h2.innerHTML;
    agendaBody.insertAdjacentHTML('beforeend', `<li><a href = "#${h2Text}">${h2Text}</li>`);
    h2.insertAdjacentHTML('beforeend', `<a href="#${h2.id}" class="content-link" title="${h2Text}"></a></h2>`);

    let ul = null;
    let nextElement = h2.nextElementSibling;
    while(true){
      if(nextElement == null) break;
      if(nextElement.tagName === 'H2') break;
      if(nextElement.tagName === 'H3'){
        let nextElementText = nextElement.innerHTML;
        if(ul == null){
          ul = document.createElement('ul');
        }
        ul.insertAdjacentHTML('beforeend', `<li>${nextElementText}</li>`);
      }
      nextElement = nextElement.nextElementSibling;
    }
    if(ul != null){
      agendaBody.appendChild(ul);
    }
  }
}
