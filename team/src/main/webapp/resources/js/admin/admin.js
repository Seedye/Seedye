const adminR = document.getElementById("adminR");
const storeManageMain = document.getElementById("storeManage")
const memberManageBtn = document.getElementsByClassName("memberManageBtn")[0];
const adminMember = document.getElementById("adminMember");
const memberManage = document.getElementById("memberManage");

var infoArea = document.getElementById("InfoArea");
document.addEventListener("DOMContentLoaded", ()=>{
    storeManageMain.style.display = "flex";
    adminR.style.display = "none";
    selectStoreList();
})





// function sample4_execDaumPostcode() {
//     new daum.Postcode({
//         oncomplete: function(data) {
//             // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

//             // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
//             // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
//             var roadAddr = data.roadAddress; // 도로명 주소 변수
//             var extraRoadAddr = ''; // 참고 항목 변수
            
//             // 법정동명이 있을 경우 추가한다. (법정리는 제외)
//             // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
//             if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
//                 extraRoadAddr += data.bname;
//             }
//             // 건물명이 있고, 공동주택일 경우 추가한다.
//             if(data.buildingName !== '' && data.apartment === 'Y'){
//                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
//             }
//             // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
//             if(extraRoadAddr !== ''){
//                 extraRoadAddr = ' (' + extraRoadAddr + ')';
//             }
            
//             // 우편번호와 주소 정보를 해당 필드에 넣는다.
//             document.getElementById("sample4_roadAddress").value = roadAddr;
//             document.getElementById("sample4_jibunAddress").value = data.jibunAddress;

//         },
//         onclose: function(state) {
//             //state는 우편번호 찾기 화면이 어떻게 닫혔는지에 대한 상태 변수 이며, 
//             //상세 설명은 아래 목록에서 확인
//             if(state === 'FORCE_CLOSE'){
//                 //사용자가 브라우저 닫기 버튼을 통해 팝업창을 닫았을 경우, 
//                 //실행될 코드를 작성하는 부분
          
//             } else if(state === 'COMPLETE_CLOSE'){
//             //사용자가 검색결과를 선택하여 팝업창이 닫혔을 경우, 
//             //실행될 코드를 작성하는 부분
//             //oncomplete 콜백 함수가 실행 완료된 후에 실행
//                   }
//                 }
                
        
//             }).open();
//         }

        const roadAddress = document.getElementById("sample4_roadAddress");
      
        
        
        
        // 전화번호
        $(document).on("keyup", ".phoneNumber", function() { 
            $(this).val( $(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") );
        });


let cp = 1;

function selectStoreList(){

    $.ajax({
        url:"/admin/selectStoreList",
        dataType: "JSON",
        success : (map) =>{
            
            const storeList = map.storeList;
            const pagination = map.pagination;
            
            console.log(pagination);
            
            for(let store of storeList){
                
                const tr = document.createElement("tr");
                tr.classList.add("storeList");
                
                // 번호
                const td1 = document.createElement("td");
                td1.innerText = store.storeNo;
                
                // 이름
                const td2 = document.createElement("td");
                td2.innerText = store.storeName;
                
                // 업종
                const td3 = document.createElement("td");
                td3.innerText = store.storeType;
                
                // 주소
                const td4 = document.createElement("td");
                td4.innerText = store.roadnameAddress;
                
                // 전화번호
                const td5 = document.createElement("td");
                if(store.storeTel == null){
                    store.storeTel = "정보 없음"
                    td5.style.color = "red";
                
                }
                
                    td5.innerText = store.storeTel;
                
                // 처리여부
                const td6 = document.createElement("td");
                
                if(store.checkFl == 'B'){
                    td6.innerText = '기본'
                } else if(store.checkFl == 'N'){
                    td6.innerText = '미확인'
                } else if(store.checkFl = 'C'){
                    td6.innerText = '협의중'
                } else {
                    td6.innerText = "등록 완료"
                }

                // 관리하기
                const td7 = document.createElement("td");
                td7.innerHTML = "<button class='store-manage'>관리하기</button>"
                
                tr.append(td1, td2, td3, td4, td5, td6, td7);

                tbody.append(tr);
            
                
            }
            
            for(i=pagination.startPage; i<=pagination.startPage; i++){
                const li = document.createElement("li");
                const a = document.createElement("a");
                const span = document.createElement("span");
                li.appendChild(a);
                a.appendChild(span);
                span.innerText = i;

            }


            // 관리하기 버튼 클릭
            const storeManage = document.getElementsByClassName("store-manage");
            
            for(i=0; i<storeManage.length; i++){
                

                storeManage[i].addEventListener("click", (e)=>{
                
                // 선택한 관리 버튼
                let dv = e.currentTarget;
                
                // 선택한 관리버튼의 식당번호
                tempNo = dv.parentNode.parentNode.children[0].innerText;
                                  
                storeManageMain.style.display = "none";
                adminR.style.display = "flex";
        

                    $.ajax({
                        url:"/admin/storeManage",
                        data: {"storeNo" : tempNo},
                        success:(store)=>{
                         
                            console.log(store);
                            const preview = document.getElementsByClassName("preview");
                            
                            const storeNameArea = document.getElementById("storeNameArea");
  
                            const select = document.getElementById("select");
                            const phoneNumberArea = document.getElementById("phoneNumberArea");
                            
                            
                            console.log(store.roadnameAddress);
                            console.log(store.imageList);
                           
                            

                            if(store.imageList.length != 0){

                                if(store.licensePath != null){
                                image0i.setAttribute("src", store.licensePath);
                                }

                                if(store.imageList[0].allPath != null){
                                    image1i.setAttribute("src", store.imageList[0].allPath);
                                }

                                if(store.imageList[1].allPath != null){
                                    image2i.setAttribute("src", store.imageList[1].allPath);
                                }

                            } else{
                                image0i.setAttribute("src", "/resources/images/modal/noneImg.png");
                                image1i.setAttribute("src", "/resources/images/modal/noneImg.png");
                                image2i.setAttribute("src", "/resources/images/modal/noneImg.png");
                            }
                          storeNameArea.setAttribute('value', store.storeName);

                            roadAddress.setAttribute('value', store.roadnameAddress);
                            document.getElementById("sample4_jibunAddress").setAttribute('value', store.landnumberAddress);

                          phoneNumberArea.setAttribute('value', store.storeTel);


                          const a = document.getElementById("a");
                          const b = document.getElementById("b");
                          const c = document.getElementById("c");
                          const d = document.getElementById("d");
                          const e = document.getElementById("e");
                          const f = document.getElementById("f");
                          const g = document.getElementById("g");
                          const h = document.getElementById("h");
                          const i = document.getElementById("i");
                          const j = document.getElementById("j");

                          if(store.storeType == '한식'){ a.setAttribute("selected", true);}
                          if(store.storeType == '중식'){ b.setAttribute("selected", true);}
                          if(store.storeType == '일식'){ c.setAttribute("selected", true);}
                          if(store.storeType == '양식'){ d.setAttribute("selected", true);}
                          if(store.storeType == '패스트푸드'){ e.setAttribute("selected", true);}
                          if(store.storeType == '일반대중음식'){ f.setAttribute("selected", true);}
                          if(store.storeType == '편의점'){ g.setAttribute("selected", true);}
                          if(store.storeType == '제과점'){ h.setAttribute("selected", true);}
                          if(store.storeType == '정육점'){ i.setAttribute("selected", true);}
                          if(store.storeType == '착한식당'){ j.setAttribute("selected", true);}

                          console.log(store.storeInfo);
                          console.log(store.landnumberAddress);
                          
                         
                        if(store.storeInfo != null){

                            infoArea.innerText = store.storeInfo;
                        }

                        // 식당 등록 (협의중 -> 등록완료)
                        const registerStore = document.getElementById("registerStore");
                        registerStore.addEventListener("click", ()=>{
                            
                            $.ajax({
                                url:"/admin/registerStore",
                                data:{"storeNo" : tempNo},
                                success: (result)=>{
                                    console.log("성공");
                                
                                    if(result > 0){
                                        alert("성공");
                                        adminR.style.display = "none";
                                        storeManageMain.style.display = "flex";
                                    }
                                },
                                error:()=>{
                                    console.log("실패");
                                }    

                          
                            
                            })  
                        });
                    },
                        error:()=>{
                            console.log("실패");
                        }
                    })
            
            
                });
            }
        },
        error : ()=>{
            console.log("실패")
        }
    })
};



// const storeManage = document.getElementsByClassName("store-manage");

// storeManage.addEventListener("click", ()=>{

//     adminR.style.display = "flex";
//     storeManageMain.style.display = "none";

// })

// selectBox 업종 선택
const selectBox = document.getElementById("selectBox");



selectBox.addEventListener("change", ()=>{

    let cp = 1;

    const pageBtn = document.getElementsByClassName("pageBtn");
    for(i=0; i<pageBtn.length; i++){

        pageBtn[i].addEventListener("click", ()=>{

           console.log(pageBtn[i].innerHTML);
           
            cp = pageBtn[i].innerHTML;

            selectBoxSelect(cp);

        })
    } 
        selectBoxSelect(cp);
    
});
    

function selectBoxSelect(cp){
        $.ajax({
            url:"/admin/selectType",
            data: {"storeType" : selectBox.value, "cp":cp},
            dataType:"JSON",
            success : (typeMap) =>{
                

                const pagination = typeMap.pagination;
                
                var pageSize = pagination.pageSize;
                var totalPages = 0;
                var curPage = cp;
                
                const tbody = document.getElementById("tbody")
                
                const storeTypeList = typeMap.storeTypeList;
                
                tbody.innerHTML = "";
                for(let store of storeTypeList){
                    
                    const tr = document.createElement("tr");
                    tr.classList.add("storeList");
                    
                    // 번호
                    const td1 = document.createElement("td");
                    td1.innerText = store.storeNo;
                    
                    // 이름
                    const td2 = document.createElement("td");
                    td2.innerText = store.storeName;
                    
                    // 업종
                    const td3 = document.createElement("td");
                    td3.innerText = store.storeType;
                    
                    // 주소
                    const td4 = document.createElement("td");
                    td4.innerText = store.roadnameAddress;
                    
                    // 전화번호
                    const td5 = document.createElement("td");
                    td5.innerText = store.storeTel;
                    
                    // 처리여부
                    const td6 = document.createElement("td");
                    
                    if(store.checkFl == 'B'){
                        td6.innerText = '기본'
                    } else if(store.checkFl == 'N'){
                        td6.innerText = '미확인'
                    } else if(store.checkFl = 'C'){
                        td6.innerText = '협의중'
                    } else {
                        td6.innerText = "등록 완료"
                    }

                    // 관리하기
                    const td7 = document.createElement("td");
                    td7.innerHTML = "<button class='store-manage'>관리하기</button>"
                    
                    tr.append(td1, td2, td3, td4, td5, td6, td7);

                    tbody.append(tr);

                    const totalCount = pagination.listCount;


                    if (totalCount != 0) {
                        totalPages = Math.ceil(totalCount / pageSize);
                        // pageLink(현재페이지, 전체페이지, 호출할 함수이름)
                        var htmlStr = pageLink(curPage, totalPages, selectBoxSelect);
                        // common.js - pageLink
                    
                        const paginationMenu = document.getElementsByClassName("pagination")[0];

                        paginationMenu.innerHTML = "";

                        paginationMenu.innerHTML = pageLink(curPage, totalPages, selectBoxSelect);
                    }

                }
                
            },
            error : ()=>{
                console.log("실패")
            }
        })
    }


// 신청 조회
const enroll = document.getElementById("enroll");
enroll.addEventListener("click", ()=>{
    $.ajax({
        url:"/admin/enroll",
        data:{"checkFl" : 'N'},
        success : (storeList)=>{
            console.log(storeList);

            const tbody = document.getElementById("tbody");

            tbody.innerHTML = "";

            for(let store of storeList){

            
                const tr = document.createElement("tr");
                tr.classList.add("storeList")
            
                const td1 = document.createElement("td");
                td1.innerText = store.storeNo

                const td2 = document.createElement("td");
                td2.innerText = store.storeName;

                const td3 = document.createElement("td");
                td3.innerText = store.storeType;

                const td4 = document.createElement("td");
                td4.innerText = store.roadnameAddress;

                const td5 = document.createElement("td");
                td5.innerText = store.storeTel;

                const td6 = document.createElement("td");
                td6.innerText = store.checkFl;

                const td7 = document.createElement("td");
                td7.innerHTML = "<button class='store-manage'>관리하기</button>";

            }
        }, 
        error:()=>{
            console.log("실패");
        }

    })

});


function pageLink(curPage, totalPages, selectBoxSelect) {
	var pageUrl = "";
	
	var pageLimit = 10;
	var startPage = parseInt((curPage - 1) / pageLimit) * pageLimit + 1;
	var endPage = startPage + pageLimit - 1;
	
    
    
	if (totalPages < endPage) {
	    endPage = totalPages;
	}
	
	var nextPage = endPage + 1;
	
    console.log(curPage,"curPage,",startPage,"startPage,",endPage,"endPage,",nextPage,"nextPage", totalPages, "totalPages")
	
	//맨 첫 페이지
	if (curPage > 1 && pageLimit < curPage) {
	    pageUrl += "<a class='page first' 'pageBtn' href='javascript:"  + "(1);'><i class='fas fa-angle-double-left'></a>";
	}
	//이전 페이지
	if (curPage > pageLimit) {
	    pageUrl += " <a class='page prev''pageBtn' href='javascript:"  + "(" + (startPage == 1 ? 1 : startPage - 1) + ");'><i class='fas fa-angle-left'></a>";
	}
	//~pageLimit 맞게 페이지 수 보여줌
	for (var i = startPage; i <= endPage; i++) {
	    //현재페이지면 진하게 표시
	    if (i == curPage) {
	        pageUrl += " <a href='#' 'pageBtn'><strong>" + i + "</strong></a>"
	    } else {
	        pageUrl += " <a class= 'pageBtn' href='javascript:" + "(" + i + ");'> " + i + " </a>";
	    }
	}
	//다음 페이지
	if (nextPage <= totalPages) {
	    pageUrl += "<a class='page next' 'pageBtn' href='javascript:" + "(" + (nextPage < totalPages ? nextPage : totalPages) + ");'><i class='fas fa-angle-right'></a>";
	}
	//맨 마지막 페이지
	if (curPage < totalPages && nextPage < totalPages) {
	    pageUrl += "<a class='page last' 'pageBtn' href='javascript:"  + "(" + totalPages + ");'><i class='fas fa-angle-double-right'></a>";
	}
	// console.log(pageUrl);
	
	return pageUrl;
}


