require('dotenv').config();

const apiKey = process.env.API_KEY;
// Now you can use the apiKey variable in your code.


// get favourites heros id from local storage and store in an array
var arr=JSON.parse(localStorage.getItem("favourites"));

// console.log(arr)
// function for show heros full details in a new page
function showDetails(idnumber) {
    localStorage.setItem("id", idnumber);
    window.location = "superhero-hunter-app1.html";
}


// function for remove hero from favourites, update localstorage and reload page
function removeHero(id) {
    var index=arr.indexOf(id);
    // console.log(index);
    arr.splice(index,1);
    // console.log(arr);
    localStorage.setItem("favourites",JSON.stringify(arr));
    alert("your hero remove successfully");
    location.reload();
}


//function for show all favourites heros in html page 
let html="";
function fetchData(){
    for (let i = 0; i < arr.length; i++) {
        fetch(`https://www.superheroapi.com/api.php/${apiKey}/${arr[i]}`)
            .then((response) => response.json())
            .then((data) => {
            html+=     `
                <div class="card" style="width: 10rem; display:flex">
                  <img onclick="showDetails(${arr[i]})" class="card-img-top" src="${data.image.url}">
                  <div class="card-body">
                      <h5 class="card-title"  onclick="showDetails(${arr[i]})">${data.name}</h5>
                      <span><i class="fa-solid fa-xmark icon" onclick="removeHero(${arr[i]})"></i></span>
                  </div>
                </div>
                    `;      
            });
    };
};
fetchData();

//set timeout function for show all heros in fv-main id
setTimeout(() => {
    document.getElementById("fv-main").innerHTML=html;
}, 1000);
