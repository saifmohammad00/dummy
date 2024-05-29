const mainheading=document.querySelector('#main-heading');
mainheading.style.textAlign='right';
const fruits=document.querySelector('.fruits');
fruits.style.background='grey';
fruits.style.padding='30px';
fruits.style.borderRadius='5px';
const allfruits=document.querySelectorAll('.fruit');
for(let s of allfruits){
  s.style.margin='5px';
  s.style.padding='5px';
  s.style.listStyleType='none';
  s.style.backgroundColor='white';
  s.style.borderRadius='5px'
}
// Write answer to the questions asked below:
const basketheading=document.querySelector('#basket-heading');
basketheading.style.color='brown';
const evenfruit=document.querySelectorAll('.fruit:nth-child(even)');
for(let s of evenfruit){
  s.style.backgroundColor='brown';
  s.style.color='white';
}