/**
 * File Name : ui.js
 * Outline   : for ui
 * -------------------------------------------------
 * (c) 2018 Hayato Doi. (CC0 Licensed)
 * https://github.com/HayatoDoi/HayatoDoi.github.io
 *
 * This program was modified by Hayato Doi.
 * pure css framework v1.0.0
 * Copyright 2013 Yahoo! Inc.
 * https://github.com/pure-css/pure/blob/master/LICENSE.md
 */
{
    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink'),
        content  = document.getElementById('main');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    function toggleAll(e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    }

    menuLink.onclick = function (e) {
        toggleAll(e);
    };

    content.onclick = function(e) {
        if (menu.className.indexOf('active') !== -1) {
            toggleAll(e);
        }
    };
}
