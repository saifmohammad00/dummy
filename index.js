const form=document.querySelector('form');
let temp;
let count=0;
form.addEventListener("submit",function(event){
    event.preventDefault();
    const [x,y,z]=["a","b","c"].map(i=>event.target[i].value);
    if(x=="" || y=="" || z==""){
      document.querySelector('p').style.display="block";
      return;
    }
    else{
      document.querySelector('p').style.display="none";
    }
    if(event.target.querySelector("button").textContent==="Add Expense"){
      const data=`<li data-x="${x}" data-y="${y}" data-z="${z}" data-count="${count}">
                  ${x}-${y}-${z}
                  <button class="delete">delete</button>
                  <button class="edit">edit</button>
                  </li>`
      document.querySelector('ul').innerHTML+=data;
      localStorage.setItem(count,JSON.stringify(data));
      count++;
    }
    else if(event.target.querySelector("button").textContent==="Save edit"){
        temp.dataset.x=x;
        temp.dataset.y=y;
        temp.dataset.z=z;
        temp.innerHTML=`${x}-${y}-${z}
                       <button class="delete">delete</button>
                       <button class="edit">edit</button>`
         form.querySelector("button").textContent="Add Expense";
         localStorage.setItem(temp.dataset.count,JSON.stringify(temp.outerHTML));          
    }
    event.target.reset();
})
document.querySelector('ul').addEventListener("click",(e)=>{
  if(e.target.classList.contains('delete')){
    e.target.parentElement.remove();
    localStorage.removeItem(e.target.parentElement.dataset.count);
  }
  else{
    temp=e.target.parentElement;
    document.querySelector('#a').value=e.target.parentElement.dataset.x;
    document.querySelector('#b').value=e.target.parentElement.dataset.y;
    document.querySelector('#c').value=e.target.parentElement.dataset.z;
    form.querySelector("button").textContent="Save edit";
  }
})
document.addEventListener("DOMContentLoaded",(e)=>{
  for(let i=0;i<localStorage.length;i++){
       const x=localStorage.key(i);
       document.querySelector('ul').innerHTML+=JSON.parse(localStorage.getItem(x));
  }
})