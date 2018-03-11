/**
 * File Name : select-pure-menu-item.js
 * Outline   : Select pure-menu-item
 * -------------------------------------------------
 * (c) 2018 Hayato Doi. (CC0 Licensed)
 * https://github.com/HayatoDoi/HayatoDoi.github.io
 */
{
  //remove url params & hash
  const url = window.location.href.replace(/(\?|\#).*$/,'');
  // get menu items
  const menu = document.getElementById('menu');
  const menu_items = menu.getElementsByClassName('pure-menu-item');
  for(let i = 0; i < menu_items.length; i++){
    let item = menu_items[i];
    let atag = item.getElementsByTagName('a')[0];
    let a_href = atag.href;
    if(url === a_href){
      item.classList.add('menu-item-divided');
      item.classList.add('pure-menu-selected');
    }
  }
}
