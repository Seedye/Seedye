const adminR = document.getElementById("adminR");
const storeManageMain = document.getElementById("storeManage")
const memberManageBtn = document.getElementsByClassName("memberManageBtn")[0];
const adminMember = document.getElementById("adminMember");
const memberManage = document.getElementById("memberManage");

const paginationMenu = document.getElementsByClassName("pagination")[0];

const search = document.getElementById("search");
const keyword = document.getElementById("keyword");

const roadAddress = document.getElementById("sample4_roadAddress");

var infoArea = document.getElementById("InfoArea");
document.addEventListener("DOMContentLoaded", ()=>{
    storeManageMain.style.display = "flex";
    adminR.style.display = "none";
    
})
let cp = 1;
selectStoreList(cp);

// cp 얻어오기
const pageBtnClick = ()=>{
    $(".pageBtn").click(function(){
        
        var id_check = $(this).attr("id");
        
        cp = id_check;
        
        console.log(cp);

        
        selectStoreList(cp); 
        

    })
}


const searchBtn = document.getElementById("searchBtn");

// 전화번호
$(document).on("keyup", ".phoneNumber", function() { 
    $(this).val( $(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") );
});



function selectStoreList(cp){


    console.log(cp);

    if(keyword.value == ''){

        $.ajax({
        url:"/admin/selectStoreList",
        dataType: "JSON",
        data:{"cp": cp},
        success : (map) =>{
            
            const storeList = map.storeList;
            const pagination = map.pagination;
                
            
            const totalCount = pagination.listCount;

            var pageSize = pagination.pageSize;
            var totalPages = 0;
            var curPage = cp;
            
            const tbody = document.getElementById("tbody")
            tbody.innerHTML = "";
    
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
            
                
                // 페이지네이션
                if (totalCount != 0) {
                    totalPages = Math.ceil(totalCount / pageSize);
                
                    paginationMenu.innerHTML = "";

                    paginationMenu.innerHTML = pageLink(curPage, totalPages);
                }    





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
                          const k = document.getElementById("k");
                          const j = document.getElementById("j");

                          if(store.storeType == '한식'){ a.setAttribute("selected", true);}
                          if(store.storeType == '중식'){ b.setAttribute("selected", true);}
                          if(store.storeType == '일식'){ c.setAttribute("selected", true);}
                          if(store.storeType == '양식'){ d.setAttribute("selected", true);}
                          if(store.storeType == '패스트푸드'){ e.setAttribute("selected", true);}
                          if(store.storeType == '일반대중음식'){ f.setAttribute("selected", true);}
                          if(store.storeType == '편의점'){ g.setAttribute("selected", true);}
                          if(store.storeType == '제과점'){ h.setAttribute("selected", true);}
                          if(store.storeType == '정육점'){ k.setAttribute("selected", true);}
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

    } else {
        $.ajax({
            url:"/admin/selectStoreList",
            dataType: "JSON",
            data:{"cp": cp, "search" : search.value, "keyword":keyword.value},
            success : (map) =>{
                
                const storeList = map.storeList;
                const pagination = map.pagination;
                    
                
                const totalCount = pagination.listCount;
    
                var pageSize = pagination.pageSize;
                var totalPages = 0;
                var curPage = cp;
                
                const tbody = document.getElementById("tbody")
                tbody.innerHTML = "";
        
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
                
                    
                    // 페이지네이션
                    if (totalCount != 0) {
                        totalPages = Math.ceil(totalCount / pageSize);
                    
                        paginationMenu.innerHTML = "";
    
                        paginationMenu.innerHTML = pageLink(curPage, totalPages);
                    }    
    
    
    
    
    
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
                              const k = document.getElementById("k");
                              const j = document.getElementById("j");
    
                              if(store.storeType == '한식'){ a.setAttribute("selected", true);}
                              if(store.storeType == '중식'){ b.setAttribute("selected", true);}
                              if(store.storeType == '일식'){ c.setAttribute("selected", true);}
                              if(store.storeType == '양식'){ d.setAttribute("selected", true);}
                              if(store.storeType == '패스트푸드'){ e.setAttribute("selected", true);}
                              if(store.storeType == '일반대중음식'){ f.setAttribute("selected", true);}
                              if(store.storeType == '편의점'){ g.setAttribute("selected", true);}
                              if(store.storeType == '제과점'){ h.setAttribute("selected", true);}
                              if(store.storeType == '정육점'){ k.setAttribute("selected", true);}
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
    
    }

}

function searchBtnClick(){
    
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
            
    if(selectBox.value != null){
        selectStoreList(cp);      
    } else{
        selectBoxSelect(cp);
    }
    }



// const storeManage = document.getElementsByClassName("store-manage");

// storeManage.addEventListener("click", ()=>{

//     adminR.style.display = "flex";    
//     storeManageMain.style.display = "none";

// })

// selectBox 업종 선택
const selectBox = document.getElementById("selectBox");




let pageBtn = document.getElementsByClassName("pageBtn");

function selectBoxSelect(cp){
    

    $.ajax({
            url:"/admin/selectType",
            data: {"storeType" : selectBox.value, "cp":cp},
            dataType:"JSON",
            success : (typeMap) =>{
                
                tempType= selectBox.value;

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
                        let htmlStr = pageLink(curPage, totalPages, selectBoxSelect);
                        // common.js - pageLink
                    
                        paginationMenu.innerHTML = "";

                        paginationMenu.innerHTML = pageLink(curPage, totalPages);
                    }    

                }    

                console.log(cp);
            
            $(".pageBtn").click(function(){
        
                    var id_check = $(this).attr("id");
                    
                    cp = id_check;   
                selectBoxSelect(cp, tempType); 
            })
                
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



// 페이지 숫자
function pageLink(curPage, totalPages) {
	var pageUrl = "";
	
	var pageLimit = 10;
	var startPage = parseInt((curPage - 1) / pageLimit) * pageLimit + 1;
	var endPage = startPage + pageLimit - 1;
	
    
    
	if (totalPages < endPage) {
	    endPage = totalPages;
	}
	
	var nextPage = endPage + 1;
	
    // console.log(curPage,"curPage,",startPage,"startPage,",endPage,"endPage,",nextPage,"nextPage", totalPages, "totalPages")
	
	//맨 첫 페이지
	if (curPage > 1 && pageLimit < curPage) {
	    pageUrl += "<button class='page first''pageBtn' href='javascript:void(0);'"+  "(1);'><i class='fas fa-angle-double-left'></button>";
	}

	//이전 페이지
	if (curPage > pageLimit) {
	    pageUrl += "<button class='page prev''pageBtn' href='javascript:void(0);'"  + "(" + (startPage == 1 ? 1 : startPage - 1) + ");'><i class='fas fa-angle-left'></button>";
	}

	//~pageLimit 맞게 페이지 수 보여줌
	for (var i = startPage; i <= endPage; i++) {
	    //현재페이지면 진하게 표시
	    if (i == curPage) {
	        pageUrl += "<button class='pageBtn' href='javascript:void(0);' onclick='pageBtnClick();'>" + i + "</button>"
	    } else {
	        pageUrl += "<button class='pageBtn' href='javascript:void(0);' onclick='pageBtnClick();' + id="+i+">" + i + " </button>";
	    }
	}
	//다음 페이지
	if (nextPage <= totalPages) {
	    pageUrl += "<button class='page next' 'pageBtn' href='javascript:void(0);' onclick='return nextPage()'" + "(" + (nextPage < totalPages ? nextPage : totalPages) + ");'><i class='fas fa-angle-right'></button>";
	}
	//맨 마지막 페이지
	if (curPage < totalPages && nextPage < totalPages) {
	    pageUrl += "<button class='page last''pageBtn' href='javascript:void(0);'"  + "(" + totalPages + "); onclick='return pageLast()'><i class='fas fa-angle-double-right'></button>";
	}
	// console.log(pageUrl);
    
	return pageUrl;
    
  
}

