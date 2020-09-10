// ==UserScript==
// @name         Bot for YANDEX
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

let keywords = ['Гобой','Музыкальные диктанты','Нотно-музыкальная библиотека','Сузафон', 'Балабан', 'Фагот','Как звучит флейта', 'что такое сузафон']
let keyword = keywords[getRandom(0, keywords.length)];
let button_t = document.getElementsByClassName('button_theme_websearch')[0];

if (button_t != undefined){
    document.getElementsByName("text")[0].value=keyword;
    document.getElementsByClassName('button_theme_websearch')[0].click();
}else{
    let links = document.links;

    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")!=-1){
           console.log("ссылка найдена"+links[i]);
           links[i].click();
            break;
        }
    }
}

function getRandom(min,max){
     return Math.floor(Math.random()*(max-min)+min);
}
