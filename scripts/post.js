import {posts} from '../data/posts.js';


function getUrlPostId(id){
  const urlParam = new URLSearchParams(window.location.search);
  return urlParam.get(id)
}

const postId = getUrlPostId('postId');
const post = posts.find(post => post.id === postId);

let singlePostHTML =  '';
if(post){
 singlePostHTML += `
 <div class="post-content-container">
   <div class="post-info">
    <h1>${post.title}</h1>
      <p>${post.content}</p>
    <img src="${post.image}" alt="" />
    <iframe width="600px" height="500px" src="${post.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
</div>
 `;
 document.querySelector('.posts').innerHTML = singlePostHTML ; 
}