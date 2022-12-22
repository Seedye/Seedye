/* 카카오 지도 api */
var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스

var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
	level: 7 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

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

function relayout() {    
    
    // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
    // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다 
    // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
    map.relayout();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch('서울 성동구 성수일로12길 36  1층 (성수동2가)', function(result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {

            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div style="width:150px;text-align:center;padding:6px 0;">탕촌</div>'
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        } 
    });
}

/* 슬라이드 사용시 */
/* 
var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}
 */

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

const searchBtn = document.querySelector(".searchBtn");

/* 검색 버튼 눌렀을때 카태고리 나오게 하는 부분 */
searchBtn.addEventListener("click", () => {

    const foodTypecategory = document.querySelector(".foodTypecategory");
    
    foodTypecategory.style.display = "flex";
    
    window.scrollTo({
        top: 100,
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

            /* 통계 ajax 비동기 처리 부분 */
            $.ajax({
                url : "/result",
                type : "GET",
                success : (resultList) => {
                    /* resultBox 생성 시 statisticsUl 변수에 담기 */
                    const statisticsUl = document.querySelector(".statistics-ul");
                    // resultBox의 내용 삭제
                    statisticsUl.innerHTML = "";

                    for (let ListItems of resultList){
                        const statisticsLi = document.createElement("li");
                        statisticsLi.innerHTML = "<span>"+ ListItems.storeType + "</span><span>" + ListItems.storeCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "</span>";

                        statisticsUl.append(statisticsLi);
                    }
                },
                error : () => {
                    console.log("통계 불러오기 실패");
                }
            });


            /* 검색어와 카테고리 선택 시 결과 창 조회하기 */
            const searchValue = document.querySelector(".searchTxt");
            const categoryValue = document.querySelectorAll(".category-box input:checked");
            const categoryArr = [];

            for(let items of categoryValue){
                categoryArr.push(items.value);
            }

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
                            storeAddress.innerText = storeItems.landnumberAddress;

                            const storeTel = document.createElement("span");
                            storeTel.innerText = storeItems.storeTel;

                            const storeInfoLink = document.createElement("div");
                            storeInfoLink.classList.add("storeInfoLink");
                            storeInfoLink.innerHTML = "<button>상세보기</button>";

                            searchLi.append(storeInfo, storeInfoLink);

                            storeInfo.append(storeName, storeAddress, storeTel);
                        }
                    }
                },
                error : () => {
                    console.log("검색 결과 불러오기 실패");
                }
            });
            
        });
        
    }
});
