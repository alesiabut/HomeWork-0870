// ==UserScript==
// @name         Bot for YA
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":['Гобой','Музыкальные диктанты','Нотно-музыкальная библиотека','Сузафон', 'Балабан', 'Фагот','Как звучит флейта', 'что такое сузафон','Труба','Флейта'],
    "crushdrummers.ru":['Барабанное шоу','Заказать барабанное шоу','Шоу барабанщиков в Москве']
};
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];

let yaInput = document.getElementsByName("text")[0];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let button_t = document.getElementsByClassName('button_theme_websearch')[0];
let i =0;
let yaNext = document.getElementsByClassName('pager__item_kind_next')[0];
let links = document.links;


if(button_t != undefined){
   document.cookie = "site="+site;
}else if(location.hostname=="yandex.ru"){
   site = getCookie("site");
}else{
   site= location.hostname;
}

if (button_t != undefined){
    document.cookie = "site="+site;
    let timerId = setInterval(()=>{
        yaInput.value += keyword[i];
        i++;
        if (i==keyword.length){
            clearInterval(timerId);
            button_t.click();
        }
    },1000);
}else if(location.hostname == site){
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if(getRandom(0,101)>=70){   // вероятность перехода обратно на Яндекс
          location.href = 'https://yandex.ru/';
        }

        else if(links[index].href.indexOf(site) != -1)
        links[index].click();
    },getRandom(3000,7000));
}else{
    let nextPage = true;   // Переход на след.стр. Яндекса
    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf(site)!=-1){    //Поиск подстроки: если не нашлось совпадение строки, то возвращается -1;
           let link = links[i];
           nextPage = false;
           links[i].target == '_blank' && links[i].removeAttribute('target');
           setTimeout(()=>{link.click();},getRandom(1000,4000));
           break;
        }
    }
    if (document.querySelector('.pager__item_current_yes').innerText=='7'){
        nextPage = false;
        location.href = 'https://yandex.ru/';
       }

    if(nextPage){
      setTimeout(()=>{yaNext.click();},getRandom(4000,8000));
      yaNext.click();
    }
}

function getRandom(min,max){
     return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
