const adminR = document.getElementById("adminR");
const storeManageMain = document.getElementById("storeManage")
const memberManageBtn = document.getElementsByClassName("memberManageBtn")[0];
const adminMember = document.getElementById("adminMember");
const memberManage = document.getElementById("memberManage");

document.addEventListener("DOMContentLoaded", ()=>{

    adminR.style.display = "none";
})


const storeManage = document.getElementsByClassName("store-manage")[0];

storeManage.addEventListener("click", ()=>{

    adminR.style.display = "flex";
    storeManageMain.style.display = "none";

})


