import config from "../conf/index.js";
const pose_url = `${config.backendEndpoint}/categories/poses?name=`
const category_url = `${config.backendEndpoint}/categories/detail?id=`

async function init() {
    console.log("inside init")
    let row = document.getElementById('yoga-category-card');
    const search = new URLSearchParams(window.location.search)
    const poseData = await fetchPoseDetail(pose_url, search.get('name'));
    const categoryData = await fetchCategoryDetail(category_url,poseData[0].category_id);
    createYogaCategoryCard(poseData,categoryData);
}

async function fetchPoseDetail(url, name) {
    const apiResponse = await fetch(url + name);
    const apiData = await apiResponse.json();
    console.log(apiData);
    return apiData;
}
async function fetchCategoryDetail(url, name) {
    const apiResponse = await fetch(url + name);
    const apiData = await apiResponse.json();
    console.log(apiData);
    return apiData;
}

function createYogaCategoryCard(poseData,categoryData) {
    const posesName = poseData.map(ele => ele.sanskrit_name_adapted);

    document.getElementsByClassName('content')[0].innerHTML = `
    <h1>${categoryData.category_name} Poses</h1>
    <h5>Explore the range of ${categoryData.category_name} poses</h5>
    <p class=".text-success-emphasis">
                ${categoryData.category_description}
                </p>`
    const row = document.getElementById("yoga-category-card");
    for (let i = 0; i < poseData.length; i++) {
        row.innerHTML += `<div class="col-lg-3 col-md-4 mt-4 ">
    <div class="card text-center category-card" style="">
    <a href="./yoga_detail_page/?name=${poseData[i].english_name}" class="text-decoration-none text-primary-emphasis" >
    <img src="${poseData[i].image_url}" class="img-fluid"  alt="..." id="${poseData[i].english_name}" />
    <div class="card-body">
        <h6 class="card-title">Sanskrit Name: ${poseData[i].sanskrit_name}</h6>
        <h6 class="card-title">English Name: ${poseData[i].english_name}</h6>
    </div>
</div>
</a>
</div> 
</div>`
    }
}

export { init, fetchPoseDetail, createYogaCategoryCard }