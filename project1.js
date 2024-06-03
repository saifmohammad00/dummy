let editedPost=null;
let x=0;
document.querySelector('form').addEventListener("submit",function(s){
        s.preventDefault();
        const url=s.target.url.value;
        const title=s.target.title.value;
        const des=s.target.des.value;
        if(url==="" || title==="" || des===""){
          document.querySelector('.error-message').style.display = "block"; // Display the error message
          return;
        }
        else {
          document.querySelector('.error-message').style.display = "none"; // Hide the error message if all fields are filled
        }
        if(document.querySelector('.submitbtn').textContent==="Post Blog"){
          axios.post("https://crudcrud.com/api/ba8b7d1e777d485cb1eb6b407532d741/myfolder1",{
            "url":url,
            "title":title,
            "des":des
          })
          .then((res)=>{
            const pst=`<div uid="${res.data._id}">
            <h1>${title}</h1>
            <img src="${url}">
              <p>${des}</p>
              <button class="edit">edit</button>
              <button class="delete">delete</button>
              </div>`
            document.querySelector('.container').innerHTML+=pst;
            x++;
            document.querySelector('h2').textContent=`Total Blogs=${x}`;
          })
          .catch((err)=>{
              console.log(err);
          })
        }
        else{
          if(editedPost){
            editedPost.querySelector('img').setAttribute('src', url);
            editedPost.querySelector('h1').textContent = title;
            editedPost.querySelector('p').textContent = des;
            document.querySelector('.submitbtn').textContent="Post Blog";
            axios.put(`https://crudcrud.com/api/ba8b7d1e777d485cb1eb6b407532d741/myfolder1/${editedPost.getAttribute('uid')}`,{
              "url":url,
              "title":title,
              "des":des
            })
            .then((res)=>{console.log(res)})
            .catch((err)=>{console.log(err)})
          }
        }
        document.querySelector('#url').value="";
        document.querySelector('#title').value="";
        document.querySelector('#des').value="";
})
document.querySelector('.container').addEventListener("click", function(e) {
  if (e.target.classList.contains('edit')) {
      editedPost = e.target.parentElement;
      document.querySelector('#url').value = e.target.parentElement.querySelector('img').getAttribute('src');
      document.querySelector('#title').value = e.target.parentElement.querySelector('h1').textContent;
      document.querySelector('#des').value = e.target.parentElement.querySelector('p').textContent;
      document.querySelector('.submitbtn').textContent="save edit";
  }
})
document.querySelector('.container').addEventListener("click",function(d){
  if(d.target.classList.contains('delete')){
    axios.delete(`https://crudcrud.com/api/ba8b7d1e777d485cb1eb6b407532d741/myfolder1/${d.target.parentElement.getAttribute('uid')}`)
    .then((res)=>{
      d.target.parentElement.remove();
      x--;
      document.querySelector('h2').textContent=`Total Blogs=${x}`;
    })
    .catch((err)=>{console.log(err)})
  }
})
window.addEventListener("DOMContentLoaded",function(e){
  axios.get("https://crudcrud.com/api/ba8b7d1e777d485cb1eb6b407532d741/myfolder1")
  .then(response => {
    // Handle successful GET request
    const data = response.data;
    // Iterate through the response data and append each blog post to the container
    data.forEach(entry => {
        const postHTML = `<div uid="${entry._id}">
                            <h1>${entry.title}</h1>
                            <img src="${entry.url}">
                            <p>${entry.des}</p>
                            <button class="edit">edit</button>
                            <button class="delete">delete</button>
                          </div>`;
        document.querySelector('.container').innerHTML += postHTML;
    });
    x = data.length;
    document.querySelector('h2').textContent = `Total Blogs=${x}`;
})
.catch(error => {
    // Handle error
    console.error("Error fetching blog posts:", error);
});
})