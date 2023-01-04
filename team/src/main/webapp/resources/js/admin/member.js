const memberManageBtn = document.getElementsByClassName("memberManageBtn");
const adminMember = document.getElementById("adminMember");
const memberManage = document.getElementById("memberManage");

const memberNo = document.getElementById("memberNo");

document.addEventListener("DOMContentLoaded", ()=>{

    selectMemberList();
})



const memberTbody = document.getElementById("memberTbody");
const memberId = document.getElementById("memberId");
const memberTel = document.getElementById("memberTel");
const memberAddress = document.getElementById("memberAddress");
const enrollDate = document.getElementById("enrollDate");
const authority = document.getElementById("authority");
const licenseView = document.getElementById("licenseView");


let tempNo = [];

function selectMemberList(){

    $.ajax({
        url:"/admin/selectMemberList",
        dataType:"JSON",
        success:(map)=>{

            
        
            const memberList = map.memberList;

            console.log(map);

            for(let member of memberList){
                
                const tr = document.createElement("tr");

                const td1 = document.createElement("td");
                td1.innerText = member.memberNo

                // 종류
                const td2 = document.createElement("td");
                if(member.authority == 1){
                    td2.innerText = "회원"
                    td2.style.fontWeight = "bold"
                } else if(member.authority == 2){
                    td2.innerText = "관리자"
                    td2.style.fontWeight = "bold"
                    td2.style.color = "red"
                } else {
                    td2.innerText = "식당 업주"
                    td2.style.fontWeight = "bold"
                    td2.style.color = "blue"
                }

                // 아이디
                const td3 = document.createElement("td");
                td3.innerText = member.memberId
                
                // 전화번호
                const td4 = document.createElement("td");
                td4.innerText = member.memberTel
                
                // 가입일 
                const td5 = document.createElement("td");
                td5.innerText = member.enrollDate

                // 회원 탈퇴 여부
                const td6 = document.createElement("td");
                if(member.memberDeleteFlag == 'Y'){
                    td6.innerText = "탈퇴 회원"
                    td6.style.color="red";
                    td6.style.fontWeight = "bold";
                } else{
                    td6.innerText = "회원"
                }
                
                // 회원 관리
                const td7 = document.createElement("td");
                td7.innerHTML = "<button class='memberManageBtn'>관리</button>"
                
                
            
                tr.append(td1, td2, td3, td4, td5, td6, td7);

                memberTbody.append(tr);

                   


              

                // 회원 관리 버튼 클릭
                for(i=0; i<memberManageBtn.length; i++){
                    memberManageBtn[i].addEventListener("click", (e)=>{
                    
                        // 선택한 관리 버튼
                        let dv = e.currentTarget;

                        // 선택한 관리버튼의 회원번호
                        tempNo = dv.parentNode.parentNode.children[0].innerText;

                        memberNo.innerText = "tempNo";


                        // adminMember.style.display = "none";
                        // memberManage.style.display = "flex";
                        

                        // 회원 관리 페이지 
                        $.ajax({
                            url:"/admin/selectMember",
                            data :{"memberNo" : tempNo},
                            dataType: "JSON",
                            success: (member)=>{
                                memberNo.innerText = member.memberNo;
                                memberId.innerText = member.memberId; 
                                memberTel.innerText = member.memberTel;

                                // 회원 주소 도로명 주소만 표시
                                let str = member.memberAddress;
                                let addr = str.split(",,", 3);
                                
                                memberAddress.innerText = addr[1];


                                enrollDate.innerText = member.enrollDate;
                                
                                if(member.authority == 1){
                                    authority.innerText = "일반 회원"
                                }
                                if(member.authority == 2){
                                    authority.innerText = "관리자"
                                }
                                if(member.authority == 3){
                                    authority.innerText = "식당 업주"
                                }

                                if(member.licensePath != null){
                                    licenseView.setAttribute("src", member.licensePath);
                                }
                                

                                adminMember.style.display = "none";
                                memberManage.style.display = "flex";
                            },
                            error:()=>{
                                console.log("실패");
                            }
                        })
                    });
                }

            }               
        },    
        error:()=>{
            console.log("실패");
        }    
        
    });    
}    

const mBtn = document.getElementById("m-Btn");

mBtn.addEventListener("click" ,  () => {
    

    $.ajax({
        url : "/admin/updateInfo", 
        data : {"memberNo":tempNo},
        success:(result) => {
            if(result > 0) {
                alert("변경되었습니다.")
            }else {
                alert("회원 권한 변경 실패입니다.")
            }
        }
    })

})

const mBtnD = document.getElementById("m-BtnD");

mBtnD.addEventListener("click" ,  () => {
    
    $.ajax({
        url : "/admin/deleteMember", 
        data : {"memberNo":tempNo},
        success:(result) => {
            if(result > 0) {
                alert("탈퇴처리 되었습니다..")
            }else {
                alert("회원 권한 변경 실패입니다.")
            }
        },

        error:() => {
            console.log("실패");
        }
    })

})

$.ajax({
    url : "/feed/" + memberNickname + "/selectBookmarkList",
    type : "GET",
    data : {"memberNo" : memberNo, "cp" : cp},
    dataType : "json",
    success : (map) => {

        if(map==null) {
            console.log("결과 없음");
        }else{

            const memberList = map.memberList;
            const pagination = map.pagination;
        
            if (cp <= pagination.maxPage) {
                
                cp++;
                console.log("cp :" + cp);
            }

                const tableHead = document.getElementById("tableHead");
                /* tableHead.setAttribute("id", "tablehead"); */
                const memberNo = document.getElementsByClassName("memberNo");
    
                tableHead.append(memberNo);
    
            for(let tableHead of memberList){

                const boardContainer = document.createElement("a");
                boardContainer.href = "/feedDetail/"+ bookmark.boardNo;

                imgContainer.append(boardContainer);

                const feedImg = document.createElement("img");
                feedImg.classList.add("feed-img");
                feedImg.setAttribute("src", bookmark.imgPath);

                const hoverIconContainer = document.createElement("div")
                hoverIconContainer.classList.add("hover-icon-container");

                boardContainer.append(feedImg, hoverIconContainer);

                const faHeart = document.createElement("i");
                faHeart.classList.add("fa-regular", "fa-heart");

                const faComment = document.createElement("i");
                faComment.classList.add("fa-regular", "fa-comment");

                hoverIconContainer.append(faHeart, faComment);

                const boardLikeSpan = document.createElement("span");
                const boardCommentSpan = document.createElement("span");

                boardLikeSpan.innerText = bookmark.likeCount;
                boardCommentSpan.innerText = bookmark.commentCount;

                faHeart.append(boardLikeSpan);
                faComment.append(boardCommentSpan);
            }
        }
},
error : () => {
    console.log("게시글 오류 발생");
}

}); 