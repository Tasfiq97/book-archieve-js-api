
const searchButton=document.querySelector("#search-btn");
const searchInput=document.querySelector("#input-field");
const searchCount= document.querySelector("#search-count");
const showBooks=document.querySelector("#books-show");
// search result function 

const searchResult= async ()=>{
    searchInputText=searchInput.value;

    // clear input field 
    searchInput.value="";
    
    // fecth data from api 

    const url=`http://openlibrary.org/search.json?q=${searchInputText}`
    
    const res= await fetch(url);
    const data= await res.json();
    searchShow(data);
   
}
 const searchShow=(results)=>{
     searchCount.innerHTML=`about ${results.docs.length} books are showing from ${results.numFound} results`;
   
const booksArray= results.docs;
  booksArray.forEach(books=>{
      console.log(books);
// function for img  

      const div=document.createElement("div");
      div.classList.add("col");
      const imgUrl=`https://covers.openlibrary.org/b/id/`
      div.innerHTML=`
      <div class="card">
                <img src="${imgUrl}${books.cover_i}.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${books.title}</h5>
                  <h5 class="card-title">${books.cover_i?books.cover_i:"none"}</h5>
                  <p class="card-text">Author Name: ${books.author_alternative_name}</p>
                  <p class="card-text">First Publish Year: ${books.first_publish_year}</p>
                </div>
              </div>
      `
      showBooks.appendChild(div);

     


  })
 }


//  event lisetener for search button
searchButton.addEventListener("click",searchResult);