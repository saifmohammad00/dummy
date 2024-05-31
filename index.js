const form=document.querySelector('form');
form.addEventListener("submit",function(event){
    event.preventDefault();
    const x=event.target.a.value;
    const y=event.target.b.value;
    const z=event.target.c.value;
    const list=document.createElement('li');
    list.textContent=`${x}-${y}-${z}`;
    const btn1=document.createElement('button');
    btn1.textContent="delete";
    const btn2=document.createElement('button');
    btn2.textContent="edit";
    list.appendChild(btn1);
    list.appendChild(btn2);
    document.querySelector('ul').appendChild(list);
    btn1.addEventListener("click",function(event){
      btn1.parentElement.remove();
    })
    btn2.addEventListener("click",function(event){
      btn2.parentElement.remove();
    })
})