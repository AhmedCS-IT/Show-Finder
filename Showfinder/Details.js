use="strict";
document.addEventListener("DOMContentLoaded", function(){
    const showName = localStorage.getItem("showName");
    //console.log(showName);
    main(showName);

});


//image.original
//showName
//summary
//genres.[index]
//show.language
async function main(showName) {
    try {
        const response = await FetchShowDetails(showName);
        const showId = response[0];

        const theDiv = document.getElementById("display-land");
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'details-land';
        resultsContainer.innerHTML =`
        <h1>Title: ${response[1]}</h1>
        <img src="${response[2]}" style="width: 400px; height: 500px;">
        <h2>Summary:</h2>
        <p>${response[3]}</p>
        <h3>Genres:</h3>
        <p>${response[4]}</p>
        <h3>Language:</h3>
        <p>${response[5]}</p>`;
        theDiv.appendChild(resultsContainer);

        const showEpisodes = await FetchShowEpisodes(showId);
        const unorderedList = document.createElement('ul');
        resultsContainer.appendChild(unorderedList);

        const episodeSeasonIndex = 0;
        const episodeNameIndex = 1;
        const episodeNumberIndex = 2;
        const episodeUrlIndex = 3;
        //const episodeImgIndex = 3;
    for(let i = 0; i < showEpisodes.length; i++)
      {
        const orderedListItem = document.createElement('li');
        orderedListItem.className = 'episode';
        orderedListItem.innerHTML = 
        `<h4>Episode Number: ${showEpisodes[i][episodeNameIndex]} - Season: ${showEpisodes[i][episodeSeasonIndex]}</h4>
        <p>Episode Name: ${showEpisodes[i][episodeNumberIndex]}</p>
        <a href="${showEpisodes[i][episodeUrlIndex]}" id="showDetails" data-showName="${showEpisodes[i][episodeUrlIndex]}">Select Episode</a>
        `;
        unorderedList.appendChild(orderedListItem);
      }
    }catch (error) {
        console.error(error);
    }
}
// <img src="${showEpisodes[i][episodeImgIndex]}">
async function FetchShowDetails(shName) {
    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${shName}`);
        if (!response.ok) {
            throw new Error("Error: Show name not found.");
        }
        const json = await response.json();
        const showId = json[0].show.id;
       // console.log(showId);
        const showName = shName;
        //console.log(showName);
        const showImg = json[0].show.image.original;
        //console.log(showImg);
        const showSummary = json[0].show.summary;
       // console.log(showSummary);
        let genres = [];
        for (let i = 0; i < json[0].show.genres.length; i++) {
             genres = json[0].show.genres[i];
        }
        const showGenres = genres;
        //console.log(showGenres);
        const showLanguage = json[0].show.language;
        //console.log(showLanguage);
        let showDetails = [showId, showName, showImg, showSummary, showGenres, showLanguage];
        //console.log(showDetails);
        return showDetails;
    }catch (error) {
        console.error(error);
    }
}

async function FetchShowEpisodes(showId) {
    try {
        const response = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
        if (!response.ok) {
            throw new Error("Error: Show episodes not found.");
        }
        const json = await response.json();
        let nbOfSeasons = json[json.length - 1].season;
        let episodes = [];
        for(let s = 1; s <= nbOfSeasons; s++) {
        for (let i = 0; i < json.length; i++) {
            if (json[i].season === s) {
            let seasonNumber = json[i].season;
            let episodeName = json[i].name;
            let episodeNumber = json[i].number;
            let episodeUrl = json[i].url;
            //let episodeImg = json[i].image.medium;
            let episodeDetails = [seasonNumber,episodeNumber,episodeName, episodeUrl];
            episodes.push(episodeDetails);
            }
        }
    }
        //console.log(episodes);
        return episodes;
    }catch (error) {
        console.error(error);
    }
}