const memberManageBtn = document.getElementsByClassName("memberManageBtn")[0];
const adminMember = document.getElementById("adminMember");
const memberManage = document.getElementById("memberManage");

document.addEventListener("DOMContentLoaded", ()=>{

    memberManage.style.display = "none";
})

memberManageBtn.addEventListener("click", ()=>{
    adminMember.style.display = "none";
    memberManage.style.display = "flex";
})

const sideMenu = document.getElementById("sideMenu");
const sideList = document.getElementById("sideList");
const sideLabel = document.getElementById("sideLabel");

sideMenu.addEventListener("change", ()=>{
    if(sideMenu.checked == true){
        sideList.style.display = "flex";
    } else{
        sideList.style.display = "none";
    }
})



