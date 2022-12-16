const sideAll = document.getElementById("sideAll");
const sideIntro = document.getElementById("sideIntro");
const sideNotice = document.getElementById("sideNotice");
const side = document.getElementById("side");
const sideManage = document.getElementById("sideManage");

const side1 = document.getElementById("side1");
const side2 = document.getElementById("side2");
const side3 = document.getElementById("side3");
const side4 = document.getElementById("side4");
const side5 = document.getElementById("side5");
const side6 = document.getElementById("side6");

const sideMenu1 = document.getElementById("sideMenu1");
const sideMenu2 = document.getElementById("sideMenu2");
const sideMenu3 = document.getElementById("sideMenu3");
const sideMenu4 = document.getElementById("sideMenu4");


document.addEventListener("DOMContentLoaded", ()=>{
    sideIntro.style.display = "none";
    sideNotice.style.display = "none";
    side.style.display = "none";
    sideManage.style.display = "none";


    sideMenu1.style.display = "none";
    sideMenu2.style.display = "none";
    sideMenu3.style.display = "none";
    sideMenu4.style.display = "none";
})


sideIntro.addEventListener("change", ()=>{

    if(sideIntro.checked == true){
        sideMenu1.style.display = "block"
    } else{
        sideMenu1.style.display = "none";
    }

})

sideNotice.addEventListener("change", ()=>{
    if(sideNotice.checked == true){
        sideMenu2.style.display = "block";
    } else{
        sideMenu2.style.display = "none";
    }
})

side.addEventListener("change", ()=>{
    if(side.checked == true){
        sideMenu3.style.display = "block";
    } else{
        sideMenu3.style.display = "none";
    }
})

sideManage.addEventListener("change", ()=>{
    if(sideManage.checked == true){
        sideMenu4.style.display = "block";
    } else{
        sideMenu4.style.display = "none";
    }
})