document.querySelector('form').addEventListener("submit",function(e){
    e.preventDefault();
    const [x,y]=["name","des"].map(i=>e.target[i].value);
    if(x==="" || y===""){
        document.querySelector('.error-message').style.display="block";
        return;
    }
    else{
        document.querySelector('.error-message').style.display="none";
    }
    axios.post("https://crudcrud.com/api/7ff2d42375054d5789119abc7b2eab1d/folder",{
         "para":x+"-"+y,
         "flag":true

    })
    .then((res)=>{
        const data=`<li uid="${res.data._id}" data-x="${res.data.para}">
                ${res.data.para}
                <button class="done">Done</button>
                <button class="delete">Delete</button>
                </li>`
        document.querySelector('.todo').innerHTML+=data;
    })
    .catch((err)=>{console.log(err)})
    e.target.reset();
})
document.querySelector('.list').addEventListener("click",function(s){
    if(s.target.classList.contains('delete')){
        axios.delete(`https://crudcrud.com/api/7ff2d42375054d5789119abc7b2eab1d/folder/${s.target.parentElement.getAttribute('uid')}`)
        .then((res)=>{
            s.target.parentElement.remove();
        })
        .catch((err)=>{console.log(err)})
    }
    else if(s.target.classList.contains('done')){
        axios.put(`https://crudcrud.com/api/7ff2d42375054d5789119abc7b2eab1d/folder/${s.target.parentElement.getAttribute('uid')}`,{
            "para":s.target.parentElement.dataset.x,
            "flag":false
        })
        .then((res)=>{
            const data=`<li uid="${s.target.parentElement.getAttribute('uid')}" data-x="${s.target.parentElement.dataset.x}">
                        ${s.target.parentElement.dataset.x}
                        <button class="delete">Delete</button>
                        </li>`
            document.querySelector('.complete').innerHTML += data;
            s.target.parentElement.remove();
        })
        .catch((err)=>{
           console.log(err);
        })
    }
})
window.addEventListener("DOMContentLoaded",function(event){
    axios.get("https://crudcrud.com/api/7ff2d42375054d5789119abc7b2eab1d/folder")
    .then((res)=>{
        res.data.forEach((item) => {
            if (item.flag) {
                const data = `<li uid="${item._id}" data-x="${item.para}">
                                ${item.para}
                                <button class="done">Done</button>
                                <button class="delete">Delete</button>
                                </li>`;
                document.querySelector('.todo').innerHTML += data;
            } else {
                const data = `<li uid="${item._id}" data-x="${item.pata}">
                                ${item.para}
                                <button class="delete">Delete</button>
                                </li>`;
                document.querySelector('.complete').innerHTML += data;
            }
        });
    })
    .catch((err)=>{console.log(err)})
})