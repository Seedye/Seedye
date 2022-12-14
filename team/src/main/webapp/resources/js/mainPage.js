/* 카카오 지도 api */
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var geocoder = new kakao.maps.services.Geocoder();

// 지도를 표시하는 div 크기를 변경하는 함수입니다
function resizeMap() {
    var mapContainer = document.getElementById('map');
    mapContainer.style.width = '350px';
    mapContainer.style.height = '350px'; 
}

let prevMarker;
let prevInfowindow;

function relayout(name, addr) {    
    
    // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
    // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다 
    // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
    map.relayout();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch('"' + addr + '"', function(result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
            // map = new kakao.maps.Map(mapContainer, mapOption);


            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                //map: map,
                position: coords
            });


            if(prevMarker != undefined){
                prevMarker.setMap(null);
                prevInfowindow.open(null);
            }
            
            marker.setMap(map);
            
            prevMarker = marker;

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">' + name + '</div>'
            });
            infowindow.open(map, marker);
            prevInfowindow = infowindow;

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        } 
    });
}

const searchBtn = document.querySelector(".searchBtn");

let selectStoreNo;

/* 검색 버튼 눌렀을때 카태고리 나오게 하는 부분 */
searchBtn.addEventListener("click", () => {

    // 검색 버튼 클릭 시 카테고리와 결과 창 초기화
    for(let temp of document.querySelectorAll(".category-box > input")){

        temp.checked = false;

        temp.parentElement.style.boxShadow = 'none';

        document.querySelector(".searchList").innerHTML = "<h2>검색 결과</h2>";
        const searchListNone = document.createElement("div");
        searchListNone.classList.add("searchList-none");
        searchListNone.innerText = "카테고리를 선택 해주세요.";

        document.querySelector(".searchList").append(searchListNone);
    }

    bookmarkListUpdate();

    if (searchBtn.previousElementSibling.value.trim().length == 0){
        alert("검색어를 입력해주세요");
        searchBtn.previousElementSibling.focus();

        return;
    }

    const foodTypecategory = document.querySelector(".foodTypecategory");
    
    foodTypecategory.style.display = "flex";
    
    window.scrollTo({
        top: 400,
        left: 0,
        behavior : 'smooth'
    });
    
    /* 카테고리 선택했을때 나오는 부분 */
    const categoryBox = document.getElementsByClassName("category-box");

    for (let categoryBoxItems of categoryBox){

        categoryBoxItems.lastElementChild.addEventListener("click", () => {

            const resultBox = document.querySelector(".result-box");
    
            if (categoryBoxItems.lastElementChild.checked){
                categoryBoxItems.style.boxShadow = '2px 2px 2px 2px #ddd inset';
            } else {
                categoryBoxItems.style.boxShadow = 'none';
            }

            resultBox.style.display = "flex";
            
            window.scrollTo({
                top: 550,
                left: 0,
                behavior : 'smooth'
            });

            /* 검색어와 카테고리 선택 시 결과 창 조회하기 */
            const searchValue = document.querySelector(".searchTxt");
            const categoryValue = document.querySelectorAll(".category-box input:checked");
            const categoryArr = [];

            for(let items of categoryValue){
                categoryArr.push(items.value);
            }

            if(categoryArr.length != 0){

                $.ajax({
                    url : "/storeList",
                    traditional: true,
                    data : {"searchValue" : searchValue.value, "categoryArr" : categoryArr},
                    type : "GET",
                    success : (storeList) => {
    
                        const searchList = document.querySelector(".searchList");
                        searchList.innerHTML = "<h2>검색 결과</h2>";
    
                        if(storeList.length == 0) {
                            const searchListNone = document.createElement("div");
                            searchListNone.classList.add("searchList-none");
                            searchListNone.innerText = "검색 결과가 없습니다.";
    
                            searchList.append(searchListNone);
                        } else {
                            const searchListStyle = document.createElement("ul");
                            searchListStyle.classList.add("searchList-style");
    
                            searchList.append(searchListStyle);
    
                            for(let storeItems of storeList){
    
                                const searchLi = document.createElement("li");
    
                                const storeInfo = document.createElement("div");
                                storeInfo.classList.add("storeInfo");
    
                                const storeName = document.createElement("span");
                                storeName.innerText = storeItems.storeName;
    
                                const storeAddress = document.createElement("span");
    
                                if (storeItems.landnumberAddress == null){
    
                                    storeAddress.innerText = storeItems.roadnameAddress;
                                    
                                } else if (storeItems.roadnameAddress == null) {
                                    
                                    storeAddress.innerText = storeItems.landnumberAddress;
                                    
                                } else {
    
                                    storeAddress.innerText = storeItems.roadnameAddress;
                                    
                                }
    
                                const storeTel = document.createElement("span");
    
                                if(storeItems.storeTel == null){
    
                                    storeTel.innerText = "해당 가게의 전화번호가 없습니다.";
    
                                    storeTel.style.color = "red";
    
                                } else {
    
                                    storeTel.innerText = storeItems.storeTel;
    
                                }
    
                                const storeInfoLink = document.createElement("div");
                                storeInfoLink.classList.add("storeInfoLink");
                                storeInfoLink.innerHTML = "<button id=" + storeItems.storeNo + ">상세보기</button>";
    
                                searchListStyle.append(searchLi);
                                
                                searchLi.append(storeInfo, storeInfoLink);
    
                                storeInfo.append(storeName, storeAddress, storeTel);

                                // 상세보기 버튼 눌렀을 때
                                storeInfoLink.lastElementChild.addEventListener("click", (e)=>{

                                    selectStoreNo = e.target.id;
    
                                    modalWindow.style.display = "flex";

                                    document.body.style.overflow = "hidden";
    
                                    /* 모달 팝업창 내부 비동기 불러오기 */
                                    $.ajax({
                                        url : "/modalContent",
                                        data : {"storeNo": storeInfoLink.lastElementChild.id},
                                        type : "GET",
                                        datatype : "JSON",
                                        success : (modalResult) => {
    
                                            const modalContent = document.querySelector(".modal-content-left");
                                            modalContent.innerHTML = "";
    
                                            const title = document.createElement("span");
                                            title.classList.add("title");
                                            title.innerText = modalResult[0].storeName;
                                            
                                            const roadAddr = document.createElement("span");

                                            /* 지번 주소 없을 때 화면에 출력 메세지 설정 */
                                            if(modalResult[0].landnumberAddress != null) {

                                                roadAddr.innerHTML = "<span class='content'><span class='content-title'>지번주소 : </span>" + modalResult[0].landnumberAddress + "</span>";

                                            } else {
                                                
                                                roadAddr.innerHTML = "<span class='content'><span class='content-title'>지번주소 : </span>등록되어있지 않은 정보입니다.</span>";
                                            }
    
                                            const landAddr = document.createElement("span");

                                            /* 지번 주소 없을 때 화면에 출력 메세지 설정 */
                                            if(modalResult[0].roadnameAddress != null) {

                                                landAddr.innerHTML = "<span class='content'><span class='content-title'>도로명 : </span>" + modalResult[0].roadnameAddress + "</span>";
                                                
                                            } else {

                                                landAddr.innerHTML = "<span class='content'><span class='content-title'>도로명 : </span>등록되어있지 않은 정보입니다.</span>";

                                            }
    
                                            const storeTel = document.createElement("span");

                                            /* 전화번호 없을 때 화면에 출력 메세지 설정 */
                                            if(modalResult[0].storeTel != null) {
                                                
                                                storeTel.innerHTML = "<span class='content'><span class='content-title'>전화번호 : </span>" + modalResult[0].storeTel + "</span>";

                                            } else {
                                                
                                                storeTel.innerHTML = "<span class='content'><span class='content-title'>전화번호 : </span>등록되어있지 않은 정보입니다.</span>";
                                            }
    
                                            const modalSlider = document.createElement("div");
                                            modalSlider.classList.add("modal-slider");
                                            modalSlider.innerHTML = "<input type='radio' name='slide' id='slide1' checked>"

                                            for (let i = 1; i < modalResult[0].storeImgList.length; i++){
                                                modalSlider.innerHTML += "<input type='radio' name='slide' id='slide'" + i + ">"
    
                                            }
                                            const modalImgs = document.createElement("ul");
                                            modalImgs.setAttribute("id", "imgHolder");
                                            modalImgs.classList.add("modal-imgs");
    
                                            if (modalResult[0].storeImgList.length == 0){
                                                const storeImg = document.createElement("li");
                                                storeImg.innerHTML = "<img src=../resources/images/modal/noneImg.png>"; 
    
                                                modalImgs.append(storeImg);
                                            } else{
                                                
                                                // 이미지가 있을 경우 예상 코드 
                                                for (let modalImgList of modalResult[0].storeImgList){

                                                    const storeImg = document.createElement("li");
                                                    storeImg.innerHTML += "<img src=" + modalImgList.storeImagePath + modalImgList.storeImageRename + ">"; 
    
                                                    modalImgs.append(storeImg);
                                                }
                                            }
    
                                            /* 이미지 개수 마다 다르게  */
                                            const modalSliderDot = document.createElement("div");
                                            modalSliderDot.classList.add("modal-slider-dot");
                                            modalSliderDot.innerHTML = "<label for='slide1'>&nbsp;</label>"
    
                                            for (let i = 1; i < modalResult[0].storeImgList.length; i++){
                                                modalSliderDot.innerHTML += "<label for='slide'" + i + ">&nbsp;</label>"
                                            }
    
                                            modalSlider.append(modalImgs, modalSliderDot);
    
                                            const modalMenu = document.createElement("span");
                                            modalMenu.classList.add("content-pre");
    
                                            if( modalResult[0].storeInfo == null) {
    
                                                modalMenu.innerHTML = "&lt; 메뉴 설명 &gt;<br><br>"
                                                + "기존 데이터는 공공데이터포털에서 받아온 자료이므로,<br>"
                                                + "메뉴 설명이 따로 없습니다."
    
                                            } else {
                                                modalMenu.innerHTML = "&lt; 메뉴 설명 &gt;<br><br>"
                                                + modalResult[0].storeInfo;
                                            }
    
                                            modalContent.append(title, roadAddr, landAddr, storeTel, modalSlider, modalMenu);
    
                                            const storeName = modalResult[0].storeName;
                                            let storeAddr;
    
                                            if (modalResult[0].landnumberAddress == null){
    
                                                let str = modalResult[0].roadnameAddress;
                                                let strResult = str.split('  ');

                                                storeAddr  = strResult[0];

                                            } else if (modalResult[0].roadnameAddress == null) {
                                                
                                                storeAddr = modalResult[0].landnumberAddress;
                                                
                                            } else {

                                                let str = modalResult[0].roadnameAddress;
                                                let strResult = str.split('  ');

                                                storeAddr  = strResult[0];
                                                
                                            }
    
                                            relayout(storeName, storeAddr);
    
                                            
                                            if(insertArr.indexOf(Number(selectStoreNo)) != -1){
                                                document.querySelector(".bookmark-btn").classList.add("regi-bookmark");
                                                document.querySelector(".bookmark-btn").innerText = "즐겨찾기 삭제";
                                            }else{
                                                document.querySelector(".bookmark-btn").classList.remove("regi-bookmark");
                                                document.querySelector(".bookmark-btn").innerText = "즐겨찾기 등록";
                                            }

                                        },
                                        error : () => {
                                            console.log("모달 팝업 결과 불러오기 실패");
                                        }
                                    });
                                });

                                // 모달 팝업창 닫기 버튼
                                const modalCloseBtn = document.getElementsByClassName("modal-title");
                                
                                for (let subItems of modalCloseBtn){
                                    subItems.lastElementChild.addEventListener("click", () => {
                                        modalWindow.style.display = "none";
                                        document.body.style.overflowY = "auto";
                                        
                                    });
                                }
                            }
                        }
                    },
                    error : () => {
                        console.log("검색 결과 불러오기 실패");
                    }
                });
            } else {
                document.querySelector(".searchList").innerHTML = "<h2>검색 결과</h2>";

                const searchListNone = document.createElement("div");
                searchListNone.classList.add("searchList-none");
                searchListNone.innerText = "카테고리를 선택 해주세요.";

                document.querySelector(".searchList").append(searchListNone);
            }
        });
    }
});

const insertArr = [];

const bookmarkListUpdate = function(){

    // 즐겨찾기 목록 ajax 불러오기
    const bookmarkPart = document.querySelector(".bookmark ul");

    if(memberNo != ""){

        $.ajax({
            url : "/selectBookmarkList",
            data : {"loginMemberNo" : memberNo},
            success : (memberBookmarkList) => {
        
                bookmarkPart.innerHTML = "";
    
                if (memberBookmarkList == ""){
                    const bookmarkLi1 = document.createElement("li");
                    bookmarkLi1.innerHTML = "<span>즐겨찾기를</span>";
                    const bookmarkLi2 = document.createElement("li");
                    bookmarkLi2.innerHTML = "<span>추가해주세요.</span>";
    
                    bookmarkPart.append(bookmarkLi1,bookmarkLi2);
                }
                for(let items of memberBookmarkList){
                    const bookmarkLi = document.createElement("li");
                    bookmarkLi.innerHTML = "<span>" + items.storeName + "</span>";
        
                    bookmarkPart.append(bookmarkLi);
        
                    insertArr.push(items.storeNo)
                }
            },
            error : () => {
                alert("즐겨찾기 목록 불러오기 오류");
            }
        });
    }
}

bookmarkListUpdate();

document.querySelector(".bookmark-btn").addEventListener("click", () => {

    bookmarkListUpdate();

    // 즐겨찾기 목록에 없음 -> 등록
    if(insertArr.indexOf(Number(selectStoreNo)) == -1){
        $.ajax({
            url : "/modalContent/insert",
            data : {"loginMemberNo" : memberNo, "bookmarkStoreNo" : selectStoreNo},
            success : (result) => {
                
                if(result > 0){
                    alert("즐겨찾기가 등록 되었습니다.");

                    document.querySelector(".bookmark-btn").innerText = "즐겨찾기 삭제";
                    document.querySelector(".bookmark-btn").classList.add("regi-bookmark");

                    bookmarkListUpdate();
                }
            },
            error : () => {
                alert("즐겨찾기 등록 중 오류 발생");
            }
        });

    }else{ // 있음 -> 삭제
        $.ajax({
                url : "/modalContent/delete",
                data : {"loginMemberNo" : memberNo, "bookmarkStoreNo" : selectStoreNo},
                success : (result) => {
        
                if(result > 0){

                        alert("즐겨찾기가 삭제 되었습니다.");
                        document.querySelector(".bookmark-btn").innerText = "즐겨찾기 등록";
                        document.querySelector(".bookmark-btn").classList.remove("regi-bookmark");

                        bookmarkListUpdate();
                    }
    
                },
                error : () => {
                alert("즐겨찾기 삭제 중 오류 발생");
            }
        });
    }
});

/* 모달 팝업창 여는 버튼 */
const modalBtn = document.getElementsByClassName("storeInfoLink");

/* 모달 팝업창 */
const modalWindow = document.querySelector(".storeInfoModal-window");


for (let mainItems of modalBtn){
    
    mainItems.lastElementChild.addEventListener("click", ()=>{

        modalWindow.style.display = "flex";
        relayout();
    });
    
    /* 모달 팝업창 닫는 버튼 */
    const modalCloseBtn = document.getElementsByClassName("modal-title");
    
    for (let subItems of modalCloseBtn){
        subItems.lastElementChild.addEventListener("click", () => {
            
            modalWindow.style.display = "none";
            
        });
    }
}

/* 검색창 엔터누를때 작동하기 */
document.querySelector(".searchTxt").addEventListener("keyup", e => {
    if(e.key == "Enter"){
        document.querySelector(".searchBtn").click();
    }
})

/* 신규 가맹점 등록 현황 swiper */
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay:{
        delay: 3000,
        disableOnInteraction : false,
    },
});