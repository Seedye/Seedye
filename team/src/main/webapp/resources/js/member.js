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