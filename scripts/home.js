import { posts } from '../data/posts.js';
import {searchpostsId} from '../data/search.js';


function generatePostsHTML(){

  let postsHTML = ''; 

  posts.forEach((post) => {
    // Truncate content to 40 characters
    const truncatedContent = post.content.length > 40 ? post.content.substring(0, 200) + '...' : post.content;

    postsHTML += `
      <div class="post">
        <img src="${post.image}" alt="${post.title}">
        <h2>${post.title}</h2>
        <p>${truncatedContent}</p>
        <button class="read-more" data-post-id="${post.id}">Read More</button>
      </div>
    `;

    document.querySelector('.posts').innerHTML = postsHTML ;     
    document.querySelectorAll('.read-more').forEach((button) => {
      button.addEventListener('click', () => {
        const postId = button.dataset.postId; 
        window.location.href = `post.html?postId=${postId}`
      })
    })
  })
}

generatePostsHTML();


function searchPosts(){
  const btn = document.getElementById('search-btn');
  btn.addEventListener('click', () => {
    const keyword = document.getElementById('input-search').value.toLowerCase(); 
    const matchingPosts  = posts.filter(post => 
      post.title.toLowerCase().includes(keyword) || 
      post.content.toLowerCase().includes(keyword)
    )

    //puttin macthing post id to searchpostsid
   searchpostsId.length = 0 ; 
    matchingPosts.map(matchingPost => 
      searchpostsId.push({
        postId : matchingPost.id
      })
    ) 
     console.log('search id : ' , searchpostsId);

     const postsMatching = posts.filter(post => searchpostsId.some(searchpostid => post.id === searchpostid.postId)) ; 

     if(postsMatching.length > 0){
      let searchedMatchingHTML = ' ';
      postsMatching.forEach(searchedMatching => {
        searchedMatchingHTML += `
        <div class="post">
          <img src="${searchedMatching.image}" alt="${searchedMatching.title}">
          <h2>${searchedMatching.title}</h2>
          <p>${searchedMatching.content}</p>
          <button class="read-more" data-post-id="${searchedMatching.id}">Read More</button>
        </div>
      `;
      document.querySelector('.posts').innerHTML = searchedMatchingHTML ; 
    
      document.querySelectorAll('.read-more').forEach((button) => {
        button.addEventListener('click', () => {
          const postId = button.dataset.postId; 
          window.location.href = `post.html?postId=${postId}`
        })
      })
      })
     }

  })
}

searchPosts()