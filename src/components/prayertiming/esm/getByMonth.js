import{a as t,g as e}from"./getByDay-49eac5b4.js";function o({long:o,lat:n,timezone:a,dst:r,elv:l=0,month:m=(new Date).getMonth(),year:i=(new Date).getFullYear(),timeFormat:g="24h",method:h="MWL",config:d={}}){if(m<0||m>11)throw new Error("Invalid month");const f=t(m,i),s=[];for(let t=0,m=f.length;t<m;t++)s.push(e({long:o,lat:n,timezone:a,dst:r,elv:l,date:f[t],timeFormat:g,method:h,config:d}));return s}export default o;