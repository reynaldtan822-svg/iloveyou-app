//const API_KEY = "AIzaSyCRNstiZBF60oTLoy6XCNEc2LqiVcO7oww";

//const API_KEY="AIzaSyCRNstiZBF60oTLoy6XCNEc2LqiVcO7oww"

// ==============================
// MusicHub PH v1.0
// Core Script
// Part 2.1
// ==============================

// ===== YouTube API KEY =====
const API_KEY = "AIzaSyCRNstiZBF60oTLoy6XCNEc2LqiVcO7oww";

// ===== HTML Elements =====
const searchInput = document.getElementById("search");
const musicList = document.getElementById("musicList");
const toast = document.getElementById("toast");

// ===== Current Search Result =====
let currentResults = [];

// ===== Toast Message =====
function showToast(message){

    toast.innerHTML = message;

    toast.style.opacity = "1";

    setTimeout(function(){

        toast.style.opacity = "0";

    },2000);

}

// ==============================
// Search when Enter is pressed
// ==============================

searchInput.addEventListener("keypress",function(event){

    if(event.key==="Enter"){

        const keyword=searchInput.value.trim();

        if(keyword===""){

            showToast("Please enter a music title.");

            return;

        }

        searchYouTube(keyword);

    }

});

// ==============================
// Search YouTube
// ==============================

async function searchYouTube(keyword){

    musicList.innerHTML="<p>Searching...</p>";

    try{

        const url=

"https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q="+

encodeURIComponent(keyword)+

"&key="+API_KEY;

        const response=await fetch(url);

        const data=await response.json();

        if(data.error){

            showToast(data.error.message);

            musicList.innerHTML="";

            return;

        }

        currentResults=data.items;

        showResults();

    }

    catch(error){

        console.log(error);

        showToast("Connection Failed");

        musicList.innerHTML="";

    }

}

// ==============================
// Show Search Result
// (Temporary)
// ==============================

function showResults(){

    musicList.innerHTML="";

    if(currentResults.length===0){

        musicList.innerHTML="<p>No music found.</p>";

        return;

    }

    for(let i=0;i<currentResults.length);i++{

        const item=currentResults[i];

        musicList.innerHTML+=

        '<div class="card">'+

        '<img src="'+item.snippet.thumbnails.medium.url+'">'+

        '<div class="info">'+

        '<h3>'+item.snippet.title+'</h3>'+

        '<p>'+item.snippet.channelTitle+'</p>'+

        '<button onclick="openPlayerByIndex('+i+')">▶ Play</button>'+

        '</div>'+

        '</div>';

    }

}

// ==============================
// Open Player
// ==============================

function openPlayerByIndex(index){

    if(index<0 || index>=currentResults.length){

        showToast("Invalid music.");

        return;

    }

    localStorage.setItem(

        "currentVideo",

        JSON.stringify(currentResults[index])

    );

    localStorage.setItem(

        "queue",

        JSON.stringify(currentResults)

    );

    location.href="player.html";

}
