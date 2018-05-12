/**
 * File Name : content-add-css-class.js
 * Outline   : Adapt css design to content.
 * -------------------------------------------------
 * (c) 2018 Hayato Doi. (CC0 Licensed)
 * https://github.com/HayatoDoi/HayatoDoi.github.io
 */
{
  const design = {
    h2: {
      exclusion: [],
      addc: ['content-subhead'],
    },
    img: {
      exclusion: ['emoji'],
      addc: ['pure-img-responsive'],
    },
    table: {
      exclusion: [],
      addc: ['pure-table'],
    },
  }
  // ---
  let content = document.getElementById('content');
  for(tag in design){
    let hts = content.getElementsByTagName(tag);
    for(let i = 0; hts[i]; i++){
      let ht = hts[i];
      let isExistence = false;
      for(let j = 0; design[tag].exclusion[j]; j++){
        if(ht.className.indexOf(design[tag].exclusion[j]) >= 0){
          isExistence = true;
          break;
        }
      }
      if(isExistence === false){
        for(let j = 0; design[tag].addc[j]; j++){
          ht.classList.add(design[tag].addc[j]);
        }
      }
    }
  }
}
