const memberManageBtn = document.querySelectorAll(".memberManageBtn");
const adminMember = document.getElementById("adminMember");
const memberManage = document.getElementById("memberManage");

document.addEventListener("DOMContentLoaded", ()=>{

    memberManage.style.display = "none";
    selectMemberList();
})

memberManageBtn.forEach(memberManageBtn =>{
    memberManageBtn.addEventListener("click", ()=>{
        adminMember.style.display = "none";
        memberManage.style.display = "flex";
    })
})

const memberTbody = document.getElementById("memberTbody");

function selectMemberList(){

    $.ajax({
        url:"/admin/selectMemberList",
        dataType:"JSON",
        success:(memberList)=>{
        
            for(let member of memberList){

                const tr = document.createElement("tr");

                // 종류
                const td1 = document.createElement("td");
                if(member.authority == 1){
                    td1.innerText = "회원"
                } else if(member.authority == 2){
                    td1.innerText = "관리자"
                } else{
                    td1.innertext = "식당 업주"
                }

                // 아이디
                const td2 = document.createElement("td");
                td2.innerText = member.memberId

                // 전화번호
                const td3 = document.createElement("td");
                td3.innerText = member.memberTel

                // 가입일 
                const td4 = document.createElement("td");
                td4.innerText = member.enrollDate

                // 회원 탈퇴 여부
                const td5 = document.createElement("td");
                if(member.memberDeleteFlag == 'Y'){
                    td5.innerText = "탈퇴 회원"
                } else{
                td5.innerText = "회원"
                }
                
                // 회원 관리
                const td6 = document.createElement("td");
                td6.innerHTML = "<button>관리</button>"
                
            
                tr.append(td1, td2, td3, td4, td5, td6);

                memberTbody.append(tr);

            }           
        },
        error:()=>{
            console.log("실패");
        }

    })
}