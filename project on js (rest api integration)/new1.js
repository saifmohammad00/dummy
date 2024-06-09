document.querySelector('form').addEventListener("submit",function(e){
    e.preventDefault();
    if(e.target.name.value==="" || e.target.des.value===""){
        document.querySelector('.error-message').style.display="block";
        return;
    }
    else{
        document.querySelector('.error-message').style.display="none";
    }
    axios.post("https://crudcrud.com/api/fa01d525468047d8b4131ca043c5c6fe/folder",{
         "para":e.target.name.value+"-"+e.target.des.value,
         "flag":true

    })
    .then((res)=>{
        const data=`<li uid="${res.data._id}">
                <p>${res.data.para}</p>
                <button class="done">done</button>
                <button class="delete">Delete</button>
                </li>`
        document.querySelector('.todo').innerHTML+=data;
    })
    .catch((err)=>{console.log(err)})
    e.target.name.value="";
    e.target.des.value="";
})
document.querySelector('.todo').addEventListener("click",function(s){
    if(s.target.classList.contains('delete')){
        axios.delete(`https://crudcrud.com/api/fa01d525468047d8b4131ca043c5c6fe/folder/${s.target.parentElement.getAttribute('uid')}`)
        .then((res)=>{
            s.target.parentElement.remove();
        })
        .then((err)=>{console.log(err)})
    }
    else if(s.target.classList.contains('done')){
        axios.put(`https://crudcrud.com/api/fa01d525468047d8b4131ca043c5c6fe/folder/${s.target.parentElement.getAttribute('uid')}`,{
            "para":s.target.parentElement.querySelector('p').textContent,
            "flag":false
        })
        .then((res)=>{
            const data = `<li uid="${s.target.parentElement.getAttribute('uid')}">
                    <p>${s.target.parentElement.querySelector('p').textContent}</p>
                    <button class="delete">Delete</button>
                    </li>`;
            document.querySelector('.complete').innerHTML += data;
            s.target.parentElement.remove();
        })
        .catch((err)=>{
           console.log(err);
        })
    }
})
window.addEventListener("DOMContentLoaded",function(event){
    axios.get("https://crudcrud.com/api/fa01d525468047d8b4131ca043c5c6fe/folder")
    .then((res)=>{
        res.data.forEach((item) => {
            if (item.flag) {
                const data = `<li uid="${item._id}">
                    <p>${item.para}</p>
                    <button class="done">done</button>
                    <button class="delete">Delete</button>
                    </li>`;
                document.querySelector('.todo').innerHTML += data;
            } else {
                const data = `<li uid="${item._id}">
                    <p>${item.para}</p>
                    <button class="delete">Delete</button>
                    </li>`;
                document.querySelector('.complete').innerHTML += data;
            }
        });
    })
    .catch((err)=>{console.log(err)})
})
document.querySelector('.complete').addEventListener("click",function(g){
    axios.delete(`https://crudcrud.com/api/fa01d525468047d8b4131ca043c5c6fe/folder/${g.target.parentElement.getAttribute('uid')}`)
    .then((res)=>{
        g.target.parentElement.remove();
    })
    .catch((err)=>{console.log(err)})
})