(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{V7:()=>j,a$:()=>x,dm:()=>C,bF:()=>L,rF:()=>E,RX:()=>k});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-14/",headers:{authorization:"1bdefa6c-18f0-44a1-946b-12adfd109851","Content-Type":"application/json"}};function n(e,t,n,o,r,c,a,i,u,s){var l=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),p=l.querySelector(".card__delete-button"),d=l.querySelector(".card__like-button"),_=l.querySelector(".card__image"),f=l.querySelector(".card__like_lenght");return l.querySelector(".card__image").src=t,l.querySelector(".card__title").textContent=e,l.querySelector(".card__image").alt=n,f.textContent=Array.from(o).length,i?p.remove():p.addEventListener("click",r),u&&d.classList.toggle("card__like-button_is-active"),d.addEventListener("click",(function(){c(s,d,f)})),_.addEventListener("click",a),l}function o(e){e.target.closest(".card").remove()}var r=function(e,n,o){var r;n.classList.contains("card__like-button_is-active")?(n.classList.toggle("card__like-button_is-active"),function(e){fetch("".concat(t.baseUrl,"cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return e.pk?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))}(e),o.textContent=+o.textContent-1):(n.classList.toggle("card__like-button_is-active"),r=e,fetch("".concat(t.baseUrl,"cards/likes/").concat(r),{method:"PUT",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),o.textContent=+o.textContent+1)};function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function i(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&a(e.currentTarget)}function u(e){"Escape"===e.key&&a(document.querySelector(".popup_is-opened"))}var s=document.querySelector(".profile__title"),l=document.querySelector(".profile__description"),p=document.querySelector(".popup__form_edit"),d=document.querySelector(".popup__form_new"),_=document.querySelector(".popup__form_profil");function f(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove("popup__button_inactive"):t.classList.add("popup__button_inactive")}function m(e){Array.from(document.querySelectorAll(".popup__input-error")).forEach((function(t){t.textContent="",t.classList.remove("popup__input-error_active"),e.querySelector(".popup__input").classList.contains("popup__input_type_error")&&e.querySelector(".popup__input").classList.remove("popup__input_type_error")}))}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var y=document.querySelector(".content"),h=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),S=document.querySelectorAll(".popup"),g=document.querySelector(".profile__image"),q=document.querySelector(".profile__image"),L=document.querySelector(".popup_type_edit"),k=document.querySelector(".popup_profil_edit"),E=document.querySelector(".popup_type_new-card"),C=y.querySelector(".places__list");function x(e){var t=document.querySelector(".popup_type_image"),n=t.querySelector(".popup__image"),o=t.querySelector(".popup__caption");c(t),n.src=e.target.src,o.textContent=e.target.alt,n.textContent=e.target.alt}function j(e,t){var n=e.querySelector(".popup__button");console.log("1"),t?(n.textContent="Сохранение...",console.log("2")):(n.textContent="Сохранить",console.log("3"))}h.addEventListener("click",(function(){p.elements.name.value=s.textContent,p.elements.description.value=l.textContent,m(p),c(L)})),b.addEventListener("click",(function(){m(d),c(E)})),q.addEventListener("click",(function(){m(_),c(k)})),S.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("click",i)})),p.addEventListener("submit",(function(e){e.preventDefault(),j(L,!0),s.textContent=p.elements.name.value,l.textContent=p.elements.description.value,function(e,n){fetch("".concat(t.baseUrl,"users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:e.textContent,about:n.textContent})}).catch((function(e){console.log(e)}))}(s,l),j(L,!1),a(L),p.querySelector(".popup__button").classList.add("popup__button_inactive")})),d.addEventListener("submit",(function(e){var c,i;e.preventDefault(),j(E,!0),C.prepend(n(d.elements.place_name.value,d.elements.link.value,d.elements.place_name.value,"",o,r,x)),c=d.elements.place_name.value,i=d.elements.link.value,fetch("".concat(t.baseUrl,"cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:c,link:i})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),d.reset(),j(E,!1),a(E),d.querySelector(".popup__button").classList.add("popup__button_inactive")})),_.addEventListener("submit",(function(e){var n;e.preventDefault(),j(k,!0),n=_.elements.avatar.value,fetch("".concat(t.baseUrl,"users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),j(k,!1),a(k),_.querySelector(".popup__button").classList.add("popup__button_inactive")})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(".popup__input")),n=e.querySelector(".popup__button");f(t,n),t.forEach((function(o){o.addEventListener("input",(function(){!function(e,t){t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.classList.remove("popup__input-error_active"),n.textContent=""}(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),o.classList.add("popup__input-error_active"),t.validity.patternMismatch?o.textContent="Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы":o.textContent=n}(e,t,t.validationMessage)}(e,o),f(t,n)}))}))}(e)})),Promise.all([fetch("".concat(t.baseUrl,"users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})),fetch("".concat(t.baseUrl,"cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))]).then((function(e){var o,c,a=(c=2,function(e){if(Array.isArray(e))return e}(o=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){s=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return i}}(o,c)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(o,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];s.textContent=i.name,l.textContent=i.about,g.setAttribute("style","background-image: url('".concat(i.avatar,"')")),u.forEach((function(e){var o=i._id!==e.owner._id,c=i._id===function(e,t){var n;return e.some((function(e){if(e._id===t)return n=t;n=e._id})),n}(e.likes,i._id),a=n(e.name,e.link,e.alt,e.likes,(function(){var n;(n=e._id,fetch("".concat(t.baseUrl,"cards/").concat(n),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(){a.remove()}))}),r,x,o,c,e._id);C.append(a)}))})).catch((function(e){console.log("Error fetching user and cards data: ",e)}))})();