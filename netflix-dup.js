const url1 = 'https://api.themoviedb.org/3/trending/all/day?api_key=f0936e9939172634cce71cceab7515e5';
const url2 = 'https://api.themoviedb.org/3/genre/27/movies?sort_by=popularity.desc&page=1&api_key=f0936e9939172634cce71cceab7515e5';
const url3 = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&api_key=f0936e9939172634cce71cceab7515e5';
const posterSize = 'w300';
const verticalPosterSize = 'w342';
const posterClass = 'poster';
const verticalPosterClass = 'vertical-poster';
const overlay = document.getElementsByClassName('overlay');

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
    var posters = document.getElementsByClassName(id);
    for (let i = 0; i < posters.length; i++) {
        posters[i].addEventListener("click", function () {
            if(document.getElementsByClassName("popup")[0]){
                console.log(document.getElementsByClassName('popup')[0]); 
                document.getElementsByClassName("popup")[0].remove();
            }
            openPopup(i, id, data);
        });
    }
}

function openPopup(idx, type, data) {
    if (idx >= data.results.length) {
        idx = idx - data.results.length;
    }
    if (type === "trending") {
        console.log(type, data.results[idx].title);
    } else if (type === "action") {
        console.log(type, data.results[idx].title);
    } else {
        console.log(type, data.results[idx].title);
    }
    let popupHtml = 
    `<div class="popup" style="background-image: url(https://image.tmdb.org/t/p/original${data.results[idx].backdrop_path});">
        <p class="close1">x</p>
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
    overlay[0].classList.add('overlay-active');
    document.getElementById(type).insertAdjacentHTML('beforeend', popupHtml);
    // document.getElementsByClassName('popup')[0].classList.add('popup-active');
    document.getElementsByClassName('close1')[0].addEventListener('click', function() {
        // Removes an element from the document
        overlay[0].classList.remove('overlay-active');
        document.getElementsByClassName("popup")[0].remove();
    });
}



// overlay.addEventListener('click', function () {
//     const pop = document.querySelectorAll('.popup.active')
//     pop.forEach(modal => {
//         pop.classList.remove('popup-active');
//         overlay.classList.remove('overlay-active');
//     })
// });

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