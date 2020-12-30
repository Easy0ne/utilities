function httpBase(o,l) {
if(window.XMLHttpRequest) x=new XMLHttpRequest()
else x=new ActiveXObject("Microsoft.XMLHTTP");
x.onreadystatechange=function(){if(x.readyState==4)
{if(x.status==200) o(x.responseText);
else if(l) l(x.status,x.responseText);}
};return x;}
function httpGet(u,o,l){
x=httpBase(o,l);x.open("GET",u,true);x.send();}
function httpPost(u,d,o,l){
x=httpBase(o,l);x.open("POST",u,true);
x.setRequestHeader("origin","https://www.hashspace.cn");
x.setRequestHeader("referer","ttps://www.hashspace.cn/markdown/");
x.setRequestHeader("sec-fetch-site","same-origin");
x.setRequestHeader("Content-type","application/x-www-form-urlencoded");
x.send(d);}
function httpForm(name,o,l){
d=[];for(n=0;n<document.forms.length;n++){f=document.forms[n];
if(f.name==name){url=f.action;for(i=0;i<f.length;i++){
e=f[i];if(e.name){if(e.type=='select-multiple'){
for(j=0;j<e.options.length;j++)if(e.options[j].selected){
d.push(e.name+"="+encodeURIComponent(e.options[j].value));
}}else if((e.type!='radio'&&e.type!='checkbox')||e.checked==true) {
d.push(e.name+"="+encodeURIComponent(e.value));
}}}httpPost(url,d.join("&"),o,l);}}}