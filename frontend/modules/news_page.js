import magzine from "../resources/data/magzine.js"

let innerCarousel = document.querySelectorAll('.carousel-inner');
let heading = document.querySelectorAll('.acc-heading');
const url = "https://api.rss2json.com/v1/api.json?rss_url=";

async function init() {
    for (let i = 0; i < magzine.length; i++) {
        const res = await fetch(url + magzine[i]);
        const apiData = await res.json();
        addCarouselToDom(apiData, i);
    }
}

async function addCarouselToDom(data, idx) {
    console.log(data);

    heading[idx].textContent = data.feed.title;
    data.items.forEach((ele, i) => {
        if (i == 0) {
            innerCarousel[idx].innerHTML += `<div class="carousel-item active">
        <a href="${ele.link}" class="text-decoration-none text-success" target="_blank">
            <img src="${ele.enclosure.link}" class="d-block w-100" alt="">
            <h2>${ele.title}</h2> 
            <p class="text-muted">${ele.description}</p>
            <p class="fw-medium">${ele.pubDate}</p>
        </a>
      </div>`
        } else {
            innerCarousel[idx].innerHTML += `<div class="carousel-item">
        <a href="${ele.link}" class="text-decoration-none text-success" target="_blank">
            <img src="${ele.enclosure.link}" class="d-block w-100 " alt="">
            <h2>${ele.title}</h2> 
            <p class="text-muted">${ele.description}</p>
            <p class="fw-medium">${ele.pubDate}</p>
            
        </a>
      </div>`
        }
    })
    console.log(innerCarousel[idx])
}

export default init;