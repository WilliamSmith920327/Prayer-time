!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).prayertiming={})}(this,(function(t){"use strict";function n(t){return t*Math.PI/180}function a(t){return 180*t/Math.PI}function e(t){return Math.sin(n(t))}function i(t){return Math.cos(n(t))}function r(t,n){let a=t;return a-=n*Math.floor(t/n),a<0?a+n:a}function s(t){return r(t,360)}function o(t){return r(t,24)}function h(t){const n=new Date(t[0],t[1]-1,t[2],12,0,0,0),a=n.toGMTString();return(n-new Date(a.substring(0,a.lastIndexOf(" ")-1)))/36e5}function u(t){const n=t[0],a=h([n,0,1]),e=h([n,6,1]);return Math.min(a,e)}function m(t){return Number(String(t).split(/[^0-9.+-]/)[0])}function c(t){const n=t-2451545+8e-4,r=s(357.529+.98560028*n),h=s(280.459+.98564736*n),u=s(h+1.915*e(r)+.02*e(2*r)),m=23.439-36e-8*n;var c,f;const g=h/15-o((c=i(m)*e(u),f=i(u),a(Math.atan2(c,f))/15));var l;return{declination:(l=e(m)*e(u),a(Math.asin(l))),equation:g}}function f(t,n){return o(12-c(n+t).equation)}function g({angle:t,time:n,direction:r,jDate:s,lat:o}){const h=c(s+n).declination,u=f(n,s),m=1/15*(g=(-e(t)-e(h)*e(o))/(i(h)*i(o)),a(Math.acos(g)));var g;return u+("ccw"===r?-m:m)}function l(t){return.833+.0347*Math.sqrt(t)}function d({factor:t,time:e,jDate:i,lat:r,direction:s}){const o=c(i+e).declination;var h,u;return g({angle:(h=t+(u=Math.abs(r-o),Math.tan(n(u))),-a(Math.atan(1/h))),time:e,direction:s,jDate:i,lat:r})}function j(t){return{Standard:1,Hanafi:2}[t]||m(t)}function b(t){return-1!==String(t).indexOf("min")}function M(t,n){return o(n-t)}function p({time:t,base:n,angle:a,night:e,direction:i,settings:r}){let s=t;const o=function({angle:t,night:n,settings:a}){const e=a.highLats;let i=.5;return"AngleBased"===e&&(i=1/60*t),"OneSeventh"===e&&(i=1/7),i*n}({angle:a,night:e,settings:r}),h="ccw"===i?M(t,n):M(n,t);return(Number.isNaN(t)||h>o)&&(s=n+("ccw"===i?-o:o)),s}function D({times:t,settings:n,timeZone:a,long:e}){const i={...n};let r={...t};return Object.keys(r).forEach((t=>{r[t]+=a-e/15})),"None"!==i.highLats&&(r=function({times:t,settings:n}){const a={...n},e={...t},i=M(t.sunset,t.sunrise);return e.imsak=p({settings:n,time:t.imsak,base:t.sunrise,angle:m(a.imsak),night:i,direction:"ccw"}),e.fajr=p({settings:n,time:t.fajr,base:t.sunrise,angle:m(a.fajr),night:i,direction:"ccw"}),e.isha=p({settings:n,time:t.isha,base:t.sunset,angle:m(a.isha),night:i}),e.maghrib=p({settings:n,time:t.maghrib,base:t.sunset,angle:m(a.maghrib),night:i}),e}({times:r,settings:n})),b(i.imsak)&&(r.imsak=r.fajr-m(i.imsak)/60),b(i.maghrib)&&(r.maghrib=r.sunset+m(i.maghrib)/60),b(i.isha)&&(r.isha=r.maghrib+m(i.isha)/60),r.dhuhr+=m(i.dhuhr)/60,r}function y(t){return t<10?`0${t}`:t}function k({date:t,method:n,times:a,timeFormat:e}){const i={},r={...a};return Object.keys(r).forEach((t=>{const n=function(t,n,a){const e=a||["am","pm"];let i=t;if(Number.isNaN(t))return"--:--";if("Float"===n)return t;i=o(i+.5/60);const r=Math.floor(i),s=Math.floor(60*(i-r)),h="12h"===n?e[r<12?0:1]:"";return`${"24h"===n?y(r):(r+12-1)%12+1}:${y(s)}${h?` ${h}`:""}`}(r[t],e);i[t]=n})),i}function w({times:t,jDate:n,lat:a,elv:e,settings:i}){const r=function(t){const n={...t};return Object.keys(n).forEach((t=>{n[t]/=24})),n}(t);return{imsak:g({jDate:n,lat:a,angle:m(i.imsak),time:r.imsak,direction:"ccw"}),fajr:g({jDate:n,lat:a,angle:m(i.fajr),time:r.fajr,direction:"ccw"}),sunrise:g({jDate:n,lat:a,angle:l(e),time:r.sunrise,direction:"ccw"}),dhuhr:f(r.dhuhr,n),asr:d({jDate:n,lat:a,factor:j("Standard"),time:r.asr}),asrHanafi:d({jDate:n,lat:a,factor:j("Hanafi"),time:r.asr}),sunset:g({jDate:n,lat:a,angle:l(e),time:r.sunset}),maghrib:g({jDate:n,lat:a,angle:m(i.maghrib),time:r.maghrib}),isha:g({jDate:n,lat:a,angle:m(i.isha),time:r.isha})}}const v={MWL:{name:"Muslim World League",params:{fajr:18,isha:17}},ISNA:{name:"Islamic Society of North America (ISNA)",params:{fajr:15,isha:15}},MF:{name:"Muslims of France (MF)",params:{fajr:12,isha:12}},Egypt:{name:"Egyptian General Authority of Survey",params:{fajr:19.5,isha:17.5}},Makkah:{name:"Umm Al-Qura University, Makkah",params:{fajr:18.5,isha:"90 min"}},Karachi:{name:"University of Islamic Sciences, Karachi",params:{fajr:18,isha:18}},Tehran:{name:"Institute of Geophysics, University of Tehran",params:{fajr:17.7,isha:14,maghrib:4.5,midnight:"Jafari"}},Jafari:{name:"Shia Ithna-Ashari, Leva Institute, Qum",params:{fajr:16,isha:14,maghrib:4,midnight:"Jafari"}},JAKIM:{name:"Jabatan Kemajuan Islam Malaysia",params:{fajr:20,isha:18}}},N={imsak:5,fajr:5,sunrise:6,dhuhr:12,asr:13,asrHanafi:14,sunset:18,maghrib:18,isha:18},I={imsak:"10 min",dhuhr:"0 min",maghrib:"0 min",midnight:"Standard",highLats:"NightMiddle"},S={imsak:0,fajr:0,sunrise:0,dhuhr:0,asr:0,asrHanafi:0,sunset:0,maghrib:0,isha:0,midnight:0};function F({long:t,lat:n,timezone:a,dst:e,elv:i=0,date:r=new Date,timeFormat:s="24h",method:o="MWL",config:m={}}){if(!function(t){return t&&"[object Date]"===Object.prototype.toString.call(t)&&!isNaN(t)}(r))throw new Error("Invalid date");const c=[r.getFullYear(),r.getMonth()+1,r.getDate()],f=e||function(t){return Number(h(t)!==u(t))}(c),g={...I,...v[o].params,...m},l=function(t,n,a){let e=t,i=n;n<=2&&(e-=1,i+=12);const r=Math.floor(e/100),s=2-r+Math.floor(r/4);return Math.floor(365.25*(e+4716))+Math.floor(30.6001*(i+1))+a+s-1524.5}(c[0],c[1],c[2])-t/360;let d=a||u(c),j={...N};return d=Number(d)+(Number(f)?1:0),j=w({times:j,jDate:l,lat:n,elv:i,settings:g}),j=D({times:j,timeZone:d,long:t,settings:g}),j.midnight="Jafari"===g.midnight?j.sunset+M(j.sunset,j.fajr)/2:j.sunset+M(j.sunset,j.sunrise)/2,j=function(t,n){const a={...t};return Object.keys(a).forEach((t=>{a[t]+=n[t]/60})),a}(j,S),j=k({times:j,timeFormat:s}),{date:r,method:o,...j}}t.getByDay=F,t.getByMonth=function({long:t,lat:n,timezone:a,dst:e,elv:i=0,month:r=(new Date).getMonth(),year:s=(new Date).getFullYear(),timeFormat:o="24h",method:h="MWL",config:u={}}){if(r<0||r>11)throw new Error("Invalid month");const m=function(t,n){for(var a=new Date(Date.UTC(n,t,1)),e=[];a.getUTCMonth()===t;)e.push(new Date(a)),a.setUTCDate(a.getUTCDate()+1);return e}(r,s),c=[];for(let r=0,s=m.length;r<s;r++)c.push(F({long:t,lat:n,timezone:a,dst:e,elv:i,date:m[r],timeFormat:o,method:h,config:u}));return c}}));