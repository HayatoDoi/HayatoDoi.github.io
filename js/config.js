/**
 * File Name : js/config.js
 * Outline   : Administrator's configuration file
 * -------------------------------------------------
 * (c) 2017, Hayato Doi. (MIT Licensed)
 * https://github.com/HayatoDoi/HayatoDoi.github.io
 */

 // Your github account name.
let githubName = 'HayatoDoi';

// Your copyright
let copyright = '© 2015-2017 Hayato Doi';

// Your license url
let licenseUrl = 'https://github.com/HayatoDoi/HayatoDoi.github.io/blob/master/LICENSE';

/**
 * Choose whether to use github API or not.
 * true : use
 * false : not use
 * 
 * If you use githubAPI you just update the article by pushing to master
 * However, there is a possibility that the limitation on the number of times of API can be caught (It is very difficult under the NAT environment.)
 * 
 * If you do not use it, you need to update the local database.
 * However, it takes time and effort to update when updating an article.
 * 
 * I can not choose it, so choose by yourself.
 */

let isUseGithubApi = false;