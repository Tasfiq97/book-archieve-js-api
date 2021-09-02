// all variabales 

const searchButton=document.querySelector("#search-btn");
const searchInput=document.querySelector("#input-field");
const searchCount= document.querySelector("#search-count");
const showBooks=document.querySelector("#books-show");
const inputEmpty= document.querySelector("#empty-input");
const spinner= document.querySelector("#spinner");
spinner.style.display="none"

// search result function 

const searchResult= async ()=>{
    searchInputText=searchInput.value;
    spinner.style.display="block"
  //  if  input field blank 

    if(searchInputText===""){
inputEmpty.innerHTML=`type something`
showBooks.textContent="";
searchCount.innerHTML="";
spinner.style.display="none"
    }
    else{
      // clear input field
      inputEmpty.innerHTML="";
       searchInput.value="";
  
    // fecth data from api 

    const url=`https://openlibrary.org/search.json?q=${searchInputText}`
    
    const res= await fetch(url);
    const data= await res.json();

    searchShow(data);
    }

   
   
}
 const searchShow=(results)=>{

  //  if result not found 
   if(results.numFound===0){
     inputEmpty.innerHTML=`no result found`;
     spinner.style.display="none"
     showBooks.textContent="";
searchCount.innerHTML="";
   }

   else{
    //  show result line 
    searchCount.innerHTML=` ${results.docs.length} results are showing out of ${results.numFound}`;
     showBooks.textContent="";
const booksArray= results.docs;

// loop of books 

  booksArray.forEach(books=>{
    spinner.style.display="none"
       
      const div=document.createElement("div");
      // img not found related 

      if(books.cover_i){
      }

      div.classList.add("col");

      const imgUrl=`https://covers.openlibrary.org/b/id/`
      if(books.cover_i){
        div.innerHTML=`
      <div class="card">
                <img src="${imgUrl}${books.cover_i}-M.jpg" class="card-img-top img-fluid " alt="No image Found">
                <div class="card-body">
                  <h3 class="card-title">${books.title}</h3>
                  <p class="card-text mt-3 ">Author Name: <span class='fw-bold'> ${books.author_name?books.author_name:"Unknown"}</span></p>
                  <p class="card-text ">book publisher:<span class='fw-bold'> ${books.publisher?books.publisher:"Unknown"}</span></p>
                  <p class="card-text ">First Publish Year: <span class='fw-bold'>  ${books.first_publish_year?books.first_publish_year:"unknown"}</span></p>
                  <p class="card-text ">First Publish Date: <span class='fw-bold'> ${books.publish_date?books.publish_date:"unknown"}</span></p>
                </div>
              </div>
      `

      showBooks.appendChild(div);
      }
      else{
        div.innerHTML=`
      <div class="card">
                <img src="images/no-image.jpg" class="card-img-top img-fluid " alt="No image Found">
                <div class="card-body">
                  <h3 class="card-title">${books.title}</h3>
                  <p class="card-text mt-3">Author Name: <span class='fw-bold'> ${books.author_name?books.author_name:"Unknown"} </span></p>
                  <p class="card-text">book publisher:<span class='fw-bold'>${books.publisher?books.publisher:"Unknown"}</span></p>
                  <p class="card-text ">First Publish Year: <span class='fw-bold'> ${books.first_publish_year}</span></p>
                  <p class="card-text ">First Publish Date: <span class='fw-bold'> ${books.publish_date?books.publish_date:"unknown"}</span></p>
                </div>
              </div>
      `

      showBooks.appendChild(div);
        
      }
      

     


  })
   }
 }


//  event lisetener for search button

searchButton.addEventListener("click",searchResult);