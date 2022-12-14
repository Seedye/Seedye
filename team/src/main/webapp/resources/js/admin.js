const adminMember = document.getElementById("adminMember");
const adminR = document.getElementById("adminR");
const adminMainMenu = document.getElementById("adminBoard");
const storeManage = document.getElementById("storeManage");

document.addEventListener("DOMContentLoaded", ()=>{
    storeManage.style.display="flex";
    adminMember.style.display = "none";
    adminMainMenu.style.display = "none";
    adminR.style.display="none";

})

const adminS = document.getElementById("admin-S");
const adminB = document.getElementById("admin-B");
const adminM = document.getElementById("admin-M");

adminS.addEventListener("click", ()=>{
    storeManage.style.display = "flex";
    adminMember.style.display = "none";
    adminMainMenu.style.display = "none";
    adminR.style.display = "none";
})

adminB.addEventListener("click", ()=>{
    adminMainMenu.style.display = "flex";
    storeManage.style.display = "none";
    adminMember.style.display = "none";
    adminR.style.display = "none";            
})

adminM.addEventListener("click", ()=>{
    adminMember.style.display = "flex";
    adminMainMenu.style.display = "none";
    storeManage.style.display = "none";
    adminR.style.display = "none";            
})
