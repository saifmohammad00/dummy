const list=document.querySelectorAll('li');
for(let a of list){
  const btn=document.createElement('button');
  btn.textContent="Edit";
  btn.setAttribute('class','edit-btn');
  a.appendChild(btn);
}
// Implement the code as in video but with one extra 'Edit' button in
const form=document.querySelector('form');
const fruits=document.querySelector('.fruits');
form.addEventListener('submit',function(event){
  event.preventDefault();
  const newfruit=document.getElementById('fruit-to-add');
  const x=document.createElement('li');
  x.setAttribute('class','fruit');
  x.innerHTML=newfruit.value+'<button class="delete-btn">x</button>'+'<button class="edit-btn">Edit</button>';
  fruits.appendChild(x);
});
fruits.addEventListener('click',function(event){
  if(event.target.classList.contains('delete-btn')){
    const fruitdelete=event.target.parentElement;
    fruits.removeChild(fruitdelete);
  }
})