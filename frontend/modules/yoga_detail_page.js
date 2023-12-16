import config from "../conf/index.js";
const url=`${config.backendEndpoint}/categories/pose/detail?name=`

async function init(){
    const search=new URLSearchParams(window.location.search)
    const data=await fetchYogaPoseDetail(url,search.get('name'));
    addYogaDetailToDom(data);
}

async function fetchYogaPoseDetail(url,name){
    const apiRes = await fetch(url+name);
    const data= await apiRes.json();
    console.log(data)
    return data;
}


function addYogaDetailToDom(data){
    document.getElementById('pose-name').textContent=`${data.sanskrit_name}`
    document.getElementById('sanskrit-name').textContent=`${data.sanskrit_name}`
    document.getElementById('translation-name').textContent=`${data.translation_name}`
    document.getElementById('pose-description').textContent=`${data.pose_description}`
    document.getElementById('pose-benefit').textContent=`${data.pose_benefits}`
    document.getElementById('iframe').setAttribute('src',`${data.video_url}`)
}



export {init, fetchYogaPoseDetail, addYogaDetailToDom};