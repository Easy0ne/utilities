function Id(id){return document.getElementById(id);}
function ByNameValue(name,value){
for(n=0;n<document.forms.length;n++){f=document.forms[n];
for(i=0;i<f.length;i++) {if(f[i].name==name&&f[i].value==value) 
return f[i];}}}
function ByNameOption(name,option){
for(n=0;n<document.forms.length;n++){f=document.forms[n];
for(i=0;i<f.length;i++) {if(f[i].name==name) {
for(j=0;j<f[i].options.length;j++)	{
if(f[i].options[j].text==option)
return f[i].options[j];}}}}}