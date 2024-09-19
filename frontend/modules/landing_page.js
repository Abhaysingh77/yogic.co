import config from "../conf/index.js";

const url = `${config.backendEndpoint}/categories`;

async function init() {
    const data = await fetchCategoryDetail(url);
    console.log(data.length)
    createYogaCategoryCard(data);
    console.log(window.location)
}


async function fetchCategoryDetail(url) {
    const apiResponse = await fetch(url);
    const apiData = await apiResponse.json();
    console.log(apiData);
    return apiData;
}

function createYogaCategoryCard(data) {
    const categoryContainer = document.getElementById("yoga-card");
    categoryContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        console.log("inside loop")
        categoryContainer.innerHTML += `<div class="col-lg-3 col-md-4 mt-4 ">
            <div class="card text-center category-card" style="">
            <a href="./pages/yoga_page/?name=${data[i].category_name}" class="text-decoration-none text-primary-emphasis m-2" id="${data[i].id}">
            <img src="${data[i].image_url}" class="img-fluid cardImg rounded"  alt="..." />
            <div class="card-body">
                <h5 class="card-title">${data[i].category_name}</h5>
                
            </div>
        </div>
        </a>
    </div>
            
    </div>`
    }
    console.log("inside create card func")
}
export { init, fetchCategoryDetail, createYogaCategoryCard }
