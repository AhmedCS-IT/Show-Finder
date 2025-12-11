use="strict";

document.addEventListener("DOMContentLoaded", function(){
  $("#userSearch").on("input", () =>{
    let showName = $("#userSearch").val();
    
    if(showName.length >= 3){
      $("#user-input-box p").hide();
      main(showName);
    }
    else{
      const theDiv = document.getElementById("search-results");
      theDiv.innerHTML = '';
      $("#user-input-box p").show();    
    }
  });


 async function main(showName){
  try{
    const showResult = await FetchShowInfo(showName);
    //const showImg = await FetchShowImg(showId);
    //const showAvgRating = await FetchShowAvgRating(showId);
    //console.log("ShowId: "+showId);
    //console.log("ShowImg: "+showImg);
    //console.log("ShowRating: "+showAvgRating);
 
    const theDiv = document.getElementById("search-results");
    theDiv.innerHTML = '';
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    const nbOfResults = 3;
    const showNameIndex =1;
    const showImg =2;
    const showRating =3;
    const unorderedList = document.createElement('ul');
    
    resultsContainer.appendChild(unorderedList);
    for(let i = 0; i < nbOfResults; i++)
      {
        const orderedListItem = document.createElement('li');
        orderedListItem.innerHTML = 
        `<h2>${showResult[i][showNameIndex]}</h2>
        <img src="${showResult[i][showImg]}">
        <p>Average rating: ${showResult[i][showRating]}</p>
        <a href="./Details.html" id="showDetails" data-showName="${showResult[i][showNameIndex]}">Select Show</a>
        `;
        unorderedList.appendChild(orderedListItem);
      }
    theDiv.appendChild(resultsContainer);
    document.querySelectorAll('#showDetails').forEach((link) => {
      link.addEventListener('click', (e) => {
        const SelectedShowName = e.target.getAttribute('data-showName');
        localStorage.setItem('showName', SelectedShowName);
      });
    });
  }
  catch(error){
    console.error(error);
  }
 }

 async function FetchShowInfo(showName) {
  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${showName}`);
    if (!response.ok) {
      throw new Error("Error: Show name not found.");
    }
    
    const json = await response.json();
    console.log(json);
    
    const nbOfResults = 3;
    let threeShowInfo = [];

    for (let i = 0; i < nbOfResults; i++) {
      const showId = json[i].show.id;
      const showName = json[i].show.name;
      const showImg = json[i].show.image.medium;
      const showRating = json[i].show.rating.average;

      console.log("This is the show Id: " + showId);
      console.log("This is the show name: " + showName);
      console.log("This is the show image url: " + showImg);
      console.log("This is the show's average rating: " + showRating);

      const showResult = [showId, showName, showImg, showRating];
      threeShowInfo.push(showResult);
    }

    return threeShowInfo;
  } catch (error) {
    console.error(error);
  }
}

  //  async function FetchShowAvgRating(showName){
  //   fetch(`https://api.tvmaze.com/search/shows?q=${showName}`)
  //   .then((response) => {
  //    if(!response.ok){
  //      throw new Error("Error: Show rating not found.");
  //   }
  //    return response.json();
  //   })
  //    .then((json) => {
  //      const avgRating = json[0].rating.average;
  //   // console.log("This is the average rating: " + avgRating)
  //      return avgRating;
  //    })
  //    .catch(error => console.error(error));
  //   }

  //   async function FetchShowImg(showId){
  //        fetch(`https://api.tvmaze.com/search/shows/${showId}/images`)
  //        .then((response)=>{
  //          if(!response.ok){
  //               throw new Error("Error: Show image not found.");
  //           }
  //           return response.json();
  //        })
  //        .then((json) => {
  //          const pictureUrl =json[0].image.medium;
  //         console.log("This is the picture Url: " + pictureUrl);
  //          return pictureUrl;
  //        })
  //           .catch(error => console.error(error));
  //    }

    // function IncorrectLengthMessage(){
    //   const theDiv = document.getElementById("user-input-box");
    //   const errmessage = document.createElement("p");
    //   errmessage.textContent ="Please input at least 3 characters to trigger a search !";
    //   theDiv.appendChild(errmessage);
    // }
}); 



async function classLab(username){
  try{
  const reponse = await fetch(`https://api.github.com/users/${username}`);
  if(!reponse.ok){
    return null;
  }
  const data = await reponse.json();
  return data.name;
}
catch(error){
  console.error(error);
}
}

let test = async(url) =>{
return new Promise((resole)=>{
if(url === null){
  resole(null);
}
else{
  throw new Error("Error: Show name not found.");
}
});
}

5