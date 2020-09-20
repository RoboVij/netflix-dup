var poster = document.querySelectorAll(".poster");
var img = document.querySelectorAll("img");

// fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&api_key=f0936e9939172634cce71cceab7515e5')
//     .then(resp => resp.json())
//     .then(img => originalData(img))
//     .catch(function (error) {
//         console.log(JSON.stringify(error));
//     });

// function originalData(data) {
//     const element = document.getElementById('originals');
//     for (let i = 0; i < data.results.length - 10; i++) {
//         const item = data.results[i];
//         const url = (`https://image.tmdb.org/t/p/w342${item.poster_path}`);
//         // let myImage = new Image();
//         // myImage.src = url;
//         let html = `<div class="vertical-poster"><img src="${url}" alt=""></div>`;
//         element.insertAdjacentHTML('beforeend', html);
//     }
// }

const url1 = 'https://api.themoviedb.org/3/trending/all/day?api_key=f0936e9939172634cce71cceab7515e5';
const url2 = 'https://api.themoviedb.org/3/genre/27/movies?sort_by=popularity.desc&page=1&api_key=f0936e9939172634cce71cceab7515e5';
const url3 = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&api_key=f0936e9939172634cce71cceab7515e5';
const posterSize = 'w300';
const verticalPosterSize = 'w342';
const posterClass = 'poster';
const verticalPosterClass = 'vertical-poster';

apis(url3, 'originals', verticalPosterSize, verticalPosterClass);
apis(url1, 'trending', posterSize, posterClass);
apis(url2, 'action', posterSize, posterClass);

function apis(url, id, size, className) {
    fetch(url)
        .then(resp => resp.json())
        .then(img => loadData(img, id, size, className))
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });
}

function loadData(data, id, size, className) {
    const element = document.getElementById(id);
    for (let i = 0; i < data.results.length; i++) {
        const item = data.results[i];
        if (className === "poster") {
            var url = (`https://image.tmdb.org/t/p/${size}${item.backdrop_path}`);
        } else {
            var url = (`https://image.tmdb.org/t/p/${size}${item.poster_path}`);
        }
        let html = `<div class="${className} ${id}"><img src="${url}" alt=""></div>`;
        element.insertAdjacentHTML('beforeend', html);
    }
    // storeData(id, data);
    var posters = document.getElementsByClassName(id);
    for (let i = 0; i < posters.length; i++) {
        posters[i].addEventListener("click", function () {
            // console.log(id, i);
            openPopup(i, id, data);
        });
    }
}

function openPopup(idx, type, data) {
    // let data = [];
    if (idx >= data.results.length) {
        idx = idx - data.results.length;
    }
    if (type === "trending") {
        // data = trendingData;
        console.log(type, data.results[idx].title);
    } else if (type === "action") {
        console.log(type, data.results[idx].title);
        // data = actionData;
    } else {
        console.log(type, data.results[idx].title);
    }
    let popupHtml = `<div class="popup" style="background-image: url(https://image.tmdb.org/t/p/original${data.results[idx].backdrop_path});">
    <div class="movDetails">
      <p id="title">${data.results[idx].title}</p>
      <p id="info"><span>Popularity: ${data.results[idx].popularity}</span> Release date: ${data.results[idx].release_date} Runtime: 105m</p>
      <p id="about">${data.results[idx].overview}</p>
      <div>
        <button><i class="fas fa-play"></i> Play</button>
        <button><i class="fas fa-plus"></i> My List</button>
      </div>
    </div>
  </div>`;
    document.getElementById('popup').insertAdjacentHTML('beforeend', popupHtml);
    // let itemData = data[idx];
    // let parent = document.getElementById("poster-content");
}

// function openPopup() {
//     let popupHtml = `<div class="popup">
//     <div class="movDetails">
//       <p id="title">Extraction</p>
//       <p id="info"><span>Rating: 71%</span> Release date: 2020-04-24 Runtime: 105m</p>
//       <p id="about">Tyler Rake, a fearless black market mercenary, embarks on the most deadly extraction of his career
//         when he's
//         enlisted to rescue the kidnapped son of an imprisoned international crime lord.</p>
//       <div>
//         <button><i class="fas fa-play"></i> Play</button>
//         <button><i class="fas fa-plus"></i> My List</button>
//       </div>
//     </div>
//   </div>`;
//     document.getElementById('popup').insertAdjacentHTML('beforeend', popupHtml);
// }

// img.forEach(element => {
//     element.addEventListener("click", function(){
//         alert("Working");
//     });
// });

// for (let i = 0; i < poster.length; i++) {
//     poster[i].addEventListener("mouseover", function(){
//         console.log("hover ON");

//     });
//     poster[i].addEventListener("mouseout", function(){
//         console.log("hover OFF");
//     });
// poster[i].addEventListener("click", function () {
//     console.log("CLicked");
// });
// }

// function loadData(data, id, size, className) {
//     const element = document.getElementById(id);
//     for (let i = 0; i < data.results.length - 10; i++) {
//         const item = data.results[i];
//         if (className === "poster") {
//             var url = (`https://image.tmdb.org/t/p/${size}${item.backdrop_path}`);
//         } else {
//             var url = (`https://image.tmdb.org/t/p/${size}${item.poster_path}`);
//         }
//         let html = `<div class="${className}" id="${id}_${i}"><img src="${url}" alt=""></div>`;
//         element.insertAdjacentHTML('beforeend', html);
//     }
//     var posters = document.getElementsByClassName(className);
//     for (let i = 0; i < posters.length; i++) {
//         posters[i].addEventListener("click", function () {
//             // openPopup();
//             openPopup(i, id, data);
//         });
//     }
// }

// function openPopup(idx, type, data) {
//     // let data = [];
//     // if (idx >= data.results.length - 10) {
//     //     idx = idx - data.results.length - 10;
//     // }

//     if (type === "trending") {
//         // data = trendingData;
//         console.log("trending", data.results[idx].title);
//     } else if (type === "action") {
//         console.log("action", data.results[idx].title);
//         // data = actionData;
//     } else {
//         console.log("originals", data.results[idx].title);
//     }
//     // let itemData = data[idx];
//     // let parent = document.getElementById("poster-content");
// }