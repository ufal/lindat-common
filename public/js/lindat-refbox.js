!function(A,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("jQuery")):"function"==typeof define&&define.amd?define(["jQuery"],e):"object"==typeof exports?exports.LindatRefBox=e(require("jQuery")):A.LindatRefBox=e(A.jQuery)}(this,function(A){return function(A){function e(i){if(t[i])return t[i].exports;var n=t[i]={exports:{},id:i,loaded:!1};return A[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var t={};return e.m=A,e.c=t,e.p="https://lindat.mff.cuni.cz/common/",e(0)}([function(A,e,t){var i=t(1),n=t(9);window.LindatRefBox=n,i.fn.lindatRefBox=function(A){var e=i.extend({},{rest:"https://lindat.mff.cuni.cz/repository/rest"},A),t="lindat-refbox";return this.each(function(){var A=i(this),o=A.data(t);o&&o.destroy(),A.data(t,new n(this,e))}),this},i(document).ready(function(){window.LindatRefBoxConfig||(window.LindatRefBoxConfig={}),i(".refbox").lindatRefBox(window.LindatRefBoxConfig)})},function(e,t){e.exports=A},function(A,e,t){e=A.exports=t(3)(),e.push([A.id,"@font-face{font-family:refbox-icons;src:url("+t(8)+")}@font-face{font-family:refbox-icons;src:url("+t(7)+');font-weight:400;font-style:normal}@-webkit-keyframes lindat-scale{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);opacity:.7}80%{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes lindat-scale{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}45%{-webkit-transform:scale(.1);transform:scale(.1);opacity:.7}80%{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.lindat-loader>div:nth-child(0){-webkit-animation:lindat-scale .75s -.36s infinite cubic-bezier(.2,.68,.18,1.08);animation:lindat-scale .75s -.36s infinite cubic-bezier(.2,.68,.18,1.08)}.lindat-loader>div:nth-child(1){-webkit-animation:lindat-scale .75s -.24s infinite cubic-bezier(.2,.68,.18,1.08);animation:lindat-scale .75s -.24s infinite cubic-bezier(.2,.68,.18,1.08)}.lindat-loader>div:nth-child(2){-webkit-animation:lindat-scale .75s -.12s infinite cubic-bezier(.2,.68,.18,1.08);animation:lindat-scale .75s -.12s infinite cubic-bezier(.2,.68,.18,1.08)}.lindat-loader>div:nth-child(3){-webkit-animation:lindat-scale .75s 0s infinite cubic-bezier(.2,.68,.18,1.08);animation:lindat-scale .75s 0s infinite cubic-bezier(.2,.68,.18,1.08)}.lindat-loader>div{background-color:#c09853;width:15px;height:15px;border-radius:100%;margin:2px;-webkit-animation-fill-mode:both;animation-fill-mode:both;display:inline-block}html.lindat-modal-open{overflow:hidden}.lindat-overlay{position:fixed;top:0;left:0;height:100%;width:100%;z-index:10000;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;background:rgba(0,0,0,.5);font-family:Droid Sans,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;box-sizing:border-box;font-size:13px;text-shadow:hsla(0,0%,100%,.5) 0 1px 0;overflow-y:auto}@media (min-width:768px){.lindat-overlay{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}}.lindat-overlay *,.lindat-overlay :after,.lindat-overlay :before{box-sizing:inherit}.lindat-modal{padding:20px;margin:20px;background:#fff;border-radius:5px;z-index:10001}@media (min-width:768px){.lindat-modal{min-width:750px}}@media (min-width:992px){.lindat-modal{min-width:970px}}.lindat-modal .lindat-modal-body>textarea{font-family:monospace;width:100%;height:300px;background-color:#eee;color:#555;border:1px solid #ccc;border-radius:4px;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);padding:6px 12px;word-wrap:normal;overflow-x:scroll;resize:none;outline:0;word-break:break-all;white-space:pre-wrap}.lindat-modal .lindat-modal-footer{text-align:right;text-transform:uppercase}.lindat-modal-header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.lindat-modal-header kbd{background-color:#999;padding:.2em .6em .3em;font-weight:700;line-height:1;border-radius:.25em;color:#fff}.lindat-modal-header p{padding:0;margin:10px 0 0;font-size:13px}.lindat-modal-header h3{-webkit-box-flex:1;-webkit-flex:1 1 auto;-ms-flex:1 1 auto;flex:1 1 auto;margin:0 0 10px;padding:0}.lindat-modal-close-button{cursor:pointer;border-radius:2px;height:15px;width:15px;font-size:16px;line-height:15px;background:#ccc;text-align:center;margin:0 0 0 10px}.lindat-refbox{font-family:Droid Sans,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;box-sizing:border-box;font-size:13px;text-shadow:hsla(0,0%,100%,.5) 0 1px 0}.lindat-refbox *,.lindat-refbox :after,.lindat-refbox :before{box-sizing:inherit}.lindat-refbox h3{margin:0;padding:0;font-size:14px;font-weight:700}.lindat-refbox-top{background-color:#fcf8e3;border:1px solid #fbeed5;color:#c09853;padding:10px 10px 5px;border-radius:6px 6px 0 0}.lindat-refbox-formats{padding:0 5px;-webkit-box-flex:1;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto;text-align:right}.lindat-refbox-formats a{padding:.2em .6em .3em;margin:0 2px;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25em;background-color:#999;text-transform:uppercase;font-size:11px;text-decoration:none;text-shadow:none}.lindat-refbox-formats a:focus,.lindat-refbox-formats a:hover{background-color:grey;color:#fff;text-decoration:none}.lindat-refbox-header{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.lindat-refbox-body,.lindat-refbox-header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.lindat-refbox-body{padding:10px}.lindat-refbox-text{color:#999;font-weight:700;-webkit-box-flex:1;-webkit-flex:1 1 0;-ms-flex:1 1 0;flex:1 1 0}.lindat-refbox-text a{color:#428bca;outline:0;text-decoration:none}.lindat-refbox-text a:focus,.lindat-refbox-text a:hover{color:#2a6496;text-decoration:underline}.lindat-refbox-copy-wrapper{-webkit-box-flex:0;-webkit-flex:0 1 auto;-ms-flex:0 1 auto;flex:0 1 auto}.lindat-refbox-copy{background:#c09853;display:block;white-space:nowrap;border:none;border-radius:500rem;width:1.3em;height:1.3em;line-height:1em;font-size:2.5em;cursor:pointer;color:#fff}.lindat-refbox-copy:focus{outline:0}.lindat-refbox-copy:hover{background-color:#a47e3c}.lindat-refbox-footer{background-color:#d8edf6;border:1px solid #bbe8ef;color:#38a;padding:5px 10px 10px;border-radius:0 0 6px 6px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}@media (min-width:768px){.lindat-refbox-footer{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}}.lindat-refbox-integration{-webkit-box-flex:1;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto;margin-bottom:10px}@media (min-width:768px){.lindat-refbox-integration{margin-bottom:0}}.lindat-refbox-services{margin:0 0 0 3em}.lindat-refbox-shares a{text-decoration:none;font-size:3em}.lindat-refbox-shares a:focus,.lindat-refbox-shares a:hover{text-decoration:none}.lindat-share-facebook{color:#395a93;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end}.lindat-share-facebook:hover{color:#2b436e}.lindat-share-twitter{color:#00aee8;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end}.lindat-share-twitter:hover{color:#0088b5}.lindat-share-google-plus{color:#d64136;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end}.lindat-share-google-plus:hover{color:#b42f25}.lindat-icon{font-family:refbox-icons;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:.8;letter-spacing:-3px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.lindat-header-icon{font-size:3em;margin-right:.1em}.lindat-icon-twitter:before{content:"\\F081"}.lindat-icon-facebook:before{content:"\\F082"}.lindat-icon-google-plus:before{content:"\\F0D4"}.lindat-icon-quote:before{content:"\\F10D"}.lindat-icon-puzzle:before{content:"\\F12E"}.lindat-icon-share:before{content:"\\F1E0"}.lindat-icon-copy:before{content:"\\F0C5"}button.lindat-button::-moz-focus-inner{border:0;padding:0}.lindat-button{font:inherit;font-size:14px;line-height:1;font-weight:700;color:#fff;display:inline-block;cursor:pointer;padding:6px 12px;margin:0 2px;text-align:center;white-space:nowrap;vertical-align:middle;border-radius:4px;background-color:#428bca;background-image:none;-moz-appearance:button;text-indent:0;text-decoration:none;text-shadow:none;text-transform:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid #357ebd}.lindat-button:focus{outline:0;color:#fff;text-decoration:none}.lindat-button:hover{background-color:#2a6496;color:#fff;text-decoration:none}.lindat-dropdown-caret{width:0;height:0;border-top:4px dashed;border-right:4px solid transparent;border-left:4px solid transparent}.lindat-dropdown,.lindat-dropdown-caret{display:inline-block;vertical-align:middle}.lindat-dropdown{position:relative;margin-right:4px}.lindat-dropdown:last-child{margin-right:0}.lindat-dropdown>.lindat-button{position:relative;float:left;margin:0}.lindat-dropdown>.lindat-button+.lindat-dropdown-toggle{padding-left:8px;padding-right:8px}.lindat-dropdown>.lindat-button+.lindat-button{margin-left:-1px}.lindat-dropdown>.lindat-dropdown-toggle:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0}.lindat-dropdown>.lindat-button:first-child:not(:last-child):not(.lindat-dropdown-toggle){border-bottom-right-radius:0;border-top-right-radius:0}.lindat-dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;font-size:14px;background-color:#fff;border:1px solid rgba(0,0,0,.15);border-radius:4px;box-shadow:0 6px 12px rgba(0,0,0,.175);background-clip:padding-box}.lindat-dropdown-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:400;line-height:1.42857143;color:#333;white-space:nowrap;text-decoration:none}.lindat-dropdown-menu>li>a:hover{text-decoration:none;color:#262626;background-color:#f5f5f5}.lindat-loading .lindat-refbox-copy,.lindat-loading .lindat-refbox-footer,.lindat-loading .lindat-refbox-formats{display:none}',""])},function(A,e){A.exports=function(){var A=[];return A.toString=function(){for(var A=[],e=0;e<this.length;e++){var t=this[e];t[2]?A.push("@media "+t[2]+"{"+t[1]+"}"):A.push(t[1])}return A.join("")},A.i=function(e,t){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},n=0;n<this.length;n++){var o=this[n][0];"number"==typeof o&&(i[o]=!0)}for(n=0;n<e.length;n++){var a=e[n];"number"==typeof a[0]&&i[a[0]]||(t&&!a[2]?a[2]=t:t&&(a[2]="("+a[2]+") and ("+t+")"),A.push(a))}},A}},function(A,e){A.exports='<div class="lindat-refbox lindat-loading"><div class=lindat-refbox-top><div class=lindat-refbox-header><div class="lindat-icon lindat-header-icon lindat-icon-quote"></div><h3>Please use the following text to cite this item or export to a predefined format:</h3><div class=lindat-refbox-formats refbox-formats></div></div><div class=lindat-refbox-body><div class=lindat-refbox-text refbox-text><div class=lindat-loader><div></div><div></div><div></div></div></div><div class=lindat-refbox-copy-wrapper><button class="lindat-icon lindat-icon-copy lindat-refbox-copy" refbox-copy-button></button></div></div></div><div class=lindat-refbox-footer><div class=lindat-refbox-integration refbox-integrations><div class=lindat-refbox-header><div class="lindat-icon lindat-header-icon lindat-icon-puzzle"></div><h3>This resource is also integrated in following services:</h3></div><div class=lindat-refbox-services refbox-services></div></div><div class=lindat-refbox-header><div class="lindat-icon lindat-header-icon lindat-icon-share"></div><h3>Share:</h3><div class=lindat-refbox-shares refbox-shares></div></div></div></div>'},function(A,e,t){function i(A,e){for(var t=0;t<A.length;t++){var i=A[t],n=s[i.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](i.parts[o]);for(;o<i.parts.length;o++)n.parts.push(r(i.parts[o],e))}else{for(var a=[],o=0;o<i.parts.length;o++)a.push(r(i.parts[o],e));s[i.id]={id:i.id,refs:1,parts:a}}}}function n(A){for(var e=[],t={},i=0;i<A.length;i++){var n=A[i],o=n[0],a=n[1],r=n[2],d=n[3],l={css:a,media:r,sourceMap:d};t[o]?t[o].parts.push(l):e.push(t[o]={id:o,parts:[l]})}return e}function o(){var A=document.createElement("style"),e=w();return A.type="text/css",e.appendChild(A),A}function a(){var A=document.createElement("link"),e=w();return A.rel="stylesheet",e.appendChild(A),A}function r(A,e){var t,i,n;if(e.singleton){var r=x++;t=p||(p=o()),i=d.bind(null,t,r,!1),n=d.bind(null,t,r,!0)}else A.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=a(),i=c.bind(null,t),n=function(){t.parentNode.removeChild(t),t.href&&URL.revokeObjectURL(t.href)}):(t=o(),i=l.bind(null,t),n=function(){t.parentNode.removeChild(t)});return i(A),function(e){if(e){if(e.css===A.css&&e.media===A.media&&e.sourceMap===A.sourceMap)return;i(A=e)}else n()}}function d(A,e,t,i){var n=t?"":i.css;if(A.styleSheet)A.styleSheet.cssText=g(e,n);else{var o=document.createTextNode(n),a=A.childNodes;a[e]&&A.removeChild(a[e]),a.length?A.insertBefore(o,a[e]):A.appendChild(o)}}function l(A,e){var t=e.css,i=e.media;e.sourceMap;if(i&&A.setAttribute("media",i),A.styleSheet)A.styleSheet.cssText=t;else{for(;A.firstChild;)A.removeChild(A.firstChild);A.appendChild(document.createTextNode(t))}}function c(A,e){var t=e.css,i=(e.media,e.sourceMap);i&&(t+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var n=new Blob([t],{type:"text/css"}),o=A.href;A.href=URL.createObjectURL(n),o&&URL.revokeObjectURL(o)}var s={},B=function(A){var e;return function(){return"undefined"==typeof e&&(e=A.apply(this,arguments)),e}},f=B(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),w=B(function(){return document.head||document.getElementsByTagName("head")[0]}),p=null,x=0;A.exports=function(A,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=f());var t=n(A);return i(t,e),function(A){for(var o=[],a=0;a<t.length;a++){var r=t[a],d=s[r.id];d.refs--,o.push(d)}if(A){var l=n(A);i(l,e)}for(var a=0;a<o.length;a++){var d=o[a];if(0===d.refs){for(var c=0;c<d.parts.length;c++)d.parts[c]();delete s[d.id]}}}};var g=function(){var A=[];return function(e,t){return A[e]=t,A.filter(Boolean).join("\n")}}()},function(A,e,t){var i=t(2);"string"==typeof i&&(i=[[A.id,i,""]]);t(5)(i,{});i.locals&&(A.exports=i.locals)},function(A,e){A.exports="data:application/octet-stream;base64,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"},function(A,e){A.exports="data:application/vnd.ms-fontobject;base64,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"},function(A,e,t){function i(A,e){return A.replace(/\{([^\}]+)\}/g,function(A,t){return t in e?encodeURIComponent(e[t]):A})}function n(A){function e(){t&&(t=!1,A.hide(),a(document).off("click.refbox"))}var t=!1;return a("<button></button>").addClass("lindat-button lindat-dropdown-toggle").attr("type","button").append(a("<span></span>").addClass("lindat-dropdown-caret")).click(function(){t?e():(setTimeout(function(){a(document).on("click.refbox",e)}),A.show(),t=!0)})}function o(A,e){var i=this;if(e||(e={}),!(i instanceof o))return new o(A,e);["handle","title"].forEach(function(t){if(!e[t]){var n=A.getAttribute(t);if(A.removeAttribute(t),!n)throw new Error("RefBox: Option '"+t+"' not specified.");i[t]=n}});var n=i.body=a(t(4));i.formatsContainer=n.find("[refbox-formats]"),i.sharesContainer=n.find("[refbox-shares]"),i.integrationContainer=n.find("[refbox-integrations]"),Object.keys(e).forEach(function(A){i[A]=e[A]}),i.uri="http://hdl.handle.net/"+i.handle,i.requestQueue=[],i.text=n.find("[refbox-text]"),i.copyButton=n.find("[refbox-copy-button]"),i.container=a(A).empty().append(n),i.init()}t(6);var a=t(1),r=[{name:"facebook",popup:{url:"http://www.facebook.com/sharer/sharer.php?u={uri}",width:600,height:500}},{name:"twitter",popup:{url:"http://twitter.com/intent/tweet?url={uri}&text={title}",width:600,height:450}},{name:"google-plus",popup:{url:"https://plus.google.com/share?url={uri}",width:700,height:500}}];o.prototype.init=function(){function A(){t.empty().html("<a href='"+e.uri+"'>"+e.uri+"</a>")}var e=this,t=e.text,o=e.copyButton;e.fetchInitial().done(function(A){A.title&&(e.title=A.title);var d=A.exportFormats.exportFormat;d&&d.length>0&&d.forEach(function(A){var t=a("<a></a>").attr("href",A.url).on("click",function(t){t.preventDefault(),e.request(A).done(function(t){e.modal(e.title,t,A.name)})}).text(A.name);e.formatsContainer.append(t)}),A.displayText&&(t.empty().append(A.displayText),o.on("click",function(A){A.preventDefault(),e.modal(e.title,t.text())}),e.body.removeClass("lindat-loading"));var l=A.featuredServices.featuredService;if(l&&l.length>0){var c=e.integrationContainer.find("[refbox-services]");l.forEach(function(A){var e=A.links,t=a("<a></a>").addClass("lindat-button").attr("target","_blank").attr("title",A.description).attr("href",A.url).text(A.name);if(e&&e.entry.length>0){var i=a("<ul></ul>").addClass("lindat-dropdown-menu"),o=a("<div></div>").addClass("lindat-dropdown").append(t).append(n(i)).append(i);e.entry.forEach(function(A){i.append(a("<li></li>").append(a("<a></a>").attr("target","_blank").attr("href",A.value).text(A.key)))}),c.append(o)}else c.append(t)})}else e.integrationContainer.remove();r.forEach(function(A){var t=A.popup,n=i(t.url,e),o=a("<a></a>").attr("class","lindat-icon lindat-icon-"+A.name+" lindat-share-"+A.name).attr("href",n).on("click",function(A){A.preventDefault(),window.open(n,e.title,"height:"+t.height+",width:"+t.width)});e.sharesContainer.append(o)})}).fail(A)},o.prototype.ajax=function(){var A=this,e=a.ajax.apply(a,arguments);return A.requestQueue.push(e),e.always(function(){var t=A.requestQueue.indexOf(e);-1!==t&&A.requestQueue.splice(t,1)})},o.prototype.request=function(A){var e=a.Deferred();return this.ajax(A.url,{dataType:A.dataType,cache:!0}).done(function(t){if("xml"===A.dataType){var i=a(t),n=i.find("error");if(n.length)e.reject();else{var o=i.find(A.name);e.resolve(o.length?o.html():i)}}else e.resolve(t.value)}).fail(e.reject),e},o.prototype.fetchInitial=function(){var A=this.rest+"/handle/"+this.handle+"/refbox";return this.ajax(A,{dataType:"json",cache:!0})},o.prototype.modal=function(A,e,t){function i(A){return A!==!0&&l?void(l=!1):(s.modalInstance=null,f.removeClass(B),o.remove(),a(document).off(".lindat"),void a(window).off(".lindat"))}function n(){c.focus().select()}var o,r,d,l,c,s=this,B="lindat-modal-open",f=a("html");f.hasClass(B)||(f.addClass(B),o=a('<div class="lindat-overlay"></div>').on("click",i).appendTo(document.body),r=a('<div class="lindat-modal" role="dialog"></div>').on("click",function(){l=!0}).appendTo(o),d=a('<div class="lindat-modal-close-button">&#xD7;</div>').on("click",i),a('<div class="lindat-modal-header"></div>').append(a("<h3></h3>").text(A).append(a("<p>Press <kbd>ctrl + c</kbd> to copy</p>"))).append(d).appendTo(r),c=a('<textarea readonly="readonly"></textarea>').on("mouseover",n).text(e),a('<div class="lindat-modal-body"></div>').append(c).appendTo(r),t&&a('<div class="lindat-modal-footer"></div>').text(t).appendTo(r),n(),s.modalInstance={element:r,overlay:o,destroy:i},a(document).on("keydown.lindat",function(A){27===A.keyCode&&i()}),a(window).on("hashchange.lindat",i))},o.prototype.destroy=function(){var A,e=this;for(e.modalInstance&&e.modalInstance.destroy(!0);A=e.requestQueue.pop();)A.abort()},A.exports=o}])});
//# sourceMappingURL=lindat-refbox.js.map