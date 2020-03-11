document.addEventListener('DOMContentLoaded', function(){
    
    // Button effect
    
    function isIE() {
        ua = navigator.userAgent;
        /* MSIE used to detect old browsers and Trident used to newer ones*/
        var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1 || ua.indexOf("Edge") > -1;
        
        return is_ie; 
    }
    
    if(!isIE()) {
        let buttons = document.querySelectorAll('.js-button-decor');

        for(var i = 0; buttons.length > i; i++) {
            let span = document.createElement("span");
            span.classList.add('decor');
            buttons[i].appendChild(span);
            
            buttons[i].addEventListener('mouseover', function(e){
                let box = this.getBoundingClientRect();
                let left = e.clientX - box.left;
                let decorElem = this.querySelector('.decor');
                
                this.classList.add("active");
                
                decorElem.style.left = '' + left + 'px';
            });
            
            buttons[i].addEventListener("mouseleave", function(){
                this.classList.remove("active");
            });
        }
    }
    
    // //Button effect
    
    // Main input
    
    let allInput = document.querySelectorAll('.main-input');
    
    allInput.forEach(function(item){
        item.addEventListener("keyup", function(){
            let itemLenght = item.value.length;
            if(itemLenght) {
                item.classList.add('active');
            }else {
                item.classList.remove('active');
            }
        });
    });
    
    // /Main input
    
    // Main slider 
    
    
    let arrows = document.querySelectorAll('.js-arrows');

    function setCurrentSlideIndex(item) {
        let slider = item.closest('.slider');
        let currentSlideIndex = slider.querySelector('.js-item.show').getAttribute('data-index');
        if(currentSlideIndex < 10) {
            item.innerHTML = `0${currentSlideIndex}`;
        }else {
            item.innerHTML = currentSlideIndex;
        }
        
    }

    document.querySelectorAll('.js-arrows .page .current').forEach(function(item){
        setCurrentSlideIndex(item);
    });

    function initialSlider() {
        for(var i = 0;arrows.length > i; i++) {
            let slider = arrows[i].closest(".slider");
            let sliderItems = slider.querySelectorAll('.js-item');
            let arrowNext = arrows[i].querySelector('.next');
            let arrowPrev = arrows[i].querySelector('.prev');
            let allNumber = slider.querySelector('.js-arrows .page .all');
            
            if(sliderItems.length < 10) {
                allNumber.innerHTML = `0${sliderItems.length}`;
            }else {
                allNumber.innerHTML = sliderItems.length;
            }
            
            arrowNext.addEventListener('click', function() {
                let itemShow = slider.querySelector('.js-item.show');
                
                if(slider.querySelector('.js-item.show').nextElementSibling == null) {
                    return;
                }
                
                arrowPrev.classList.remove('disabled');
                
                itemShow.nextElementSibling.classList.add('show');
                itemShow.classList.remove('show');
                
                document.querySelectorAll('.js-arrows .page .current').forEach(function(item){
                    setCurrentSlideIndex(item);
                });
                
                if(slider.querySelector('.js-item.show').nextElementSibling == null) {
                    arrowNext.classList.add('disabled');
                }
            });
            
            arrowPrev.addEventListener('click', function() {
                let itemShow = slider.querySelector('.js-item.show');
                
                if(slider.querySelector('.js-item.show').previousElementSibling == null) {
                    return;
                }
                
                arrowNext.classList.remove('disabled');
                
                itemShow.previousElementSibling.classList.add('show');
                itemShow.classList.remove('show');
                
                document.querySelectorAll('.js-arrows .page .current').forEach(function(item){
                    setCurrentSlideIndex(item);
                });
                
                if(slider.querySelector('.js-item.show').previousElementSibling == null) {
                    arrowPrev.classList.add('disabled');
                }
            });
            
            var startPointX;
            var startPointY;
            slider.addEventListener("touchstart", function(event) {
                startPointX = event.changedTouches[0].screenX;
                startPointY = event.changedTouches[0].screenY;
            }, false);
            slider.addEventListener("touchend", function(event){
                var endPointX = event.changedTouches[0].screenX;
                var endPointY = event.changedTouches[0].screenY;
                
                if(startPointX - endPointX > 40) {
                    arrowNext.click();
                } else if(endPointX - startPointX > 40) {
                    arrowPrev.click();
                }
            }, false);
        }
    }
    initialSlider();
    
    // /Main slider
    
    
    // Infinity slider
    
    let arrowsInfinity = document.querySelectorAll('.js-arrow-infinity');

    function setCurrentSlideIndexInfinity(item) {
        let slider = item.closest('.slider-infinity');
        let currentSlideIndex = slider.querySelector('.js-slider-item-infinity.show').getAttribute('data-index');
        if(currentSlideIndex < 10) {
            item.innerHTML = `0${currentSlideIndex}`;
        }else {
            item.innerHTML = currentSlideIndex;
        }
    }

    document.querySelectorAll('.js-arrow-infinity .page .current').forEach(function(item){
        setCurrentSlideIndexInfinity(item);
    });

    function initialInfinitySlider() {
        for(var i = 0;arrowsInfinity.length > i; i++) {
            let slider = arrowsInfinity[i].closest(".slider-infinity");
            let sliderItems = slider.querySelectorAll('.js-slider-item-infinity');
            let arrowNext = arrowsInfinity[i].querySelector('.next');
            let arrowPrev = arrowsInfinity[i].querySelector('.prev');
            let sliderList = slider.querySelector('.js-infinity-slider-list');
            let allNumber = slider.querySelector('.js-arrow-infinity .page .all');

            if(sliderItems.length < 10) {
                allNumber.innerHTML = `0${sliderItems.length}`;
            }else {
                allNumber.innerHTML = sliderItems.length;
            }
            
            
            arrowNext.addEventListener('click', function() {
                let itemShow = slider.querySelector('.js-slider-item-infinity.show');
                let saleMobileShow = document.querySelector('.sale-block-mobile__item.show');
                let saleMobileItem = document.querySelectorAll('.sale-block-mobile__item');
                
                itemShow.nextElementSibling.classList.add('show');
                itemShow.classList.remove('show');
                
                if(saleMobileShow) {
                    if(saleMobileShow.nextElementSibling == null) {
                        saleMobileItem[saleMobileItem.length - 1].classList.remove('show');
                        saleMobileItem[0].classList.add('show');
                    }else {
                        saleMobileShow.nextElementSibling.classList.add('show');
                        saleMobileShow.classList.remove('show');
                    }
                    
                }
                
                setTimeout(function(){
                    let newElem = itemShow;
                    itemShow.remove();
                    sliderList.append(newElem);
                },750);
                
                document.querySelectorAll('.js-arrow-infinity .page .current').forEach(function(item){
                    setCurrentSlideIndexInfinity(item);
                });
            });
            
            arrowPrev.addEventListener('click', function() {
                let itemShow = slider.querySelector('.js-slider-item-infinity.show');
                let lastElem = sliderList.lastElementChild;
                let saleMobileShow = document.querySelector('.sale-block-mobile__item.show');
                let saleMobileItem = document.querySelectorAll('.sale-block-mobile__item');
                
                sliderList.prepend(lastElem);
                
                if(saleMobileShow) {
                    if(saleMobileShow.previousElementSibling == null) {
                        saleMobileItem[saleMobileItem.length - 1].classList.add('show');
                        saleMobileItem[0].classList.remove('show');
                    }else {
                        saleMobileShow.previousElementSibling.classList.add('show');
                        saleMobileShow.classList.remove('show');
                    }
                }
                
                setTimeout(function(){
                    itemShow.previousElementSibling.classList.add('show');
                    itemShow.classList.remove('show');
                    document.querySelectorAll('.js-arrow-infinity .page .current').forEach(function(item){
                        setCurrentSlideIndexInfinity(item);
                    });
                },20);
            });
            
            var startPointX;
            var startPointY;
            slider.addEventListener("touchstart", function(event) {
                startPointX = event.changedTouches[0].screenX;
                startPointY = event.changedTouches[0].screenY;
            }, false);
            slider.addEventListener("touchend", function(event){
                var endPointX = event.changedTouches[0].screenX;
                var endPointY = event.changedTouches[0].screenY;
                
                if(startPointX - endPointX > 40) {
                    arrowNext.click();
                } else if(endPointX - startPointX > 40) {
                    arrowPrev.click();
                }
            }, false);
        }
    }
    initialInfinitySlider();
    
    //  //Infinity slider
    
    // More info
        
      function showMoreInfo() {
            
        let info = document.querySelectorAll('.js-item .content p');
        let content = document.querySelectorAll('.js-item .content');
        let moreButton = document.querySelectorAll('.js-item .more_info');
        
        if(info) {
            for(var i = 0; info.length > i; i++) {
                if(info[i].offsetHeight > content[i].offsetHeight) {
                    moreButton[i].classList.add('show');
                }else {
                    moreButton[i].classList.remove('show');
                }
            }
        }
    }
        
    showMoreInfo();
    
    window.addEventListener('resize', function(){
        showMoreInfo();
    });
    
    // /More info
    
     // Popup
        
    let mainButton = document.querySelectorAll('.js-button');
    let overlay = document.querySelector('.overlay');
    let htmlOverflow = document.querySelector('html');
    
    for(var i = 0; mainButton.length > i; i++) {
        if(mainButton[i] !== null) {
            
            mainButton[i].addEventListener('click', function(){
                let getData = this.getAttribute('data-target');
                let popup = document.querySelector('.popup[data-target = ' + getData + ']');
                popup.classList.add('active');
                overlay.classList.add('active');
                htmlOverflow.classList.add('overflow');
            });
        }
    }
    
    document.addEventListener('click', function(e){
        let elem = e.target;
        
        if(elem.closest('.js-close')){
            let popupActive = document.querySelector('.popup.active');
            burgerMenu.classList.remove('active');
            htmlOverflow.classList.remove('overflow');
            
            if(popupActive) {
                popupActive.classList.remove('active');
                overlay.classList.remove('active');
                htmlOverflow.classList.remove('overflow');
            }
        }
    });
    
    if(overlay) {
        overlay.addEventListener('click', function(){
            let popupActive = document.querySelector('.popup.active');
            popupActive.classList.remove('active');
            overlay.classList.remove('active');
            htmlOverflow.classList.remove('overflow');
        });
    }
    
    
    
    let moreInfo = document.querySelectorAll('.js-more-info');
    
    for(var i = 0; moreInfo.length > i; i++) {
        moreInfo[i].addEventListener('click', function(){
            let item = this.closest(".js-item");
            let reviewContent = item.querySelector('.content p').innerHTML;
            let reviewName = item.querySelector('.reviews__footer .name').innerHTML;
            let reviewSub = item.querySelector('.reviews__footer .date').innerHTML;
            let reviewImg = item.querySelector('.reviews__footer .img').getAttribute('style');
            let reviewsAllimg = item.querySelectorAll('.reviews-photo__item');
            
            let popupReview = document.querySelector('.popup-reviews');
            
            let popupReviewImgList = popupReview.querySelector('.reviews-photo__list');
            
            if(reviewsAllimg.length != 0) {
                popupReview.classList.remove('hide-img');
                
                reviewsAllimg.forEach(function(item){
                    let imgSrc = item.getAttribute('style');
                    let newImg = document.createElement("div");
                    newImg.classList.add("reviews-photo__item");
                    newImg.setAttribute('style', '' + imgSrc + '');
                    
                    popupReviewImgList.append(newImg);
                });
            } else {
                popupReview.classList.add('hide-img');
            }
            
            
            popupReview.querySelector('.content p').innerHTML = '' + reviewContent + '';
            popupReview.querySelector('.reviews__footer .name').innerHTML = '' + reviewName + '';
            popupReview.querySelector('.reviews__footer .date').innerHTML = '' + reviewSub + '';
            popupReview.querySelector('.reviews__footer .img').setAttribute('style', '' + reviewImg + '');
        });
    }
    
    let closeReviews = document.querySelector(".popup-reviews .close__popup");
    
    if(closeReviews) {
        closeReviews.addEventListener("click", function(){
            let allImg = document.querySelectorAll(".popup-reviews .reviews-photo__item");
            
            allImg.forEach(function(item){
                item.remove();
            });
        });
    }
    
    
    
    let popupInnerButton = document.querySelectorAll('button.popup-link');
    
    popupInnerButton.forEach(function(item){
        item.addEventListener("click", function(){
            let wrapperPopup = item.closest(".popup");
            wrapperPopup.classList.remove('active');
        });
    });
    
    // /Popup
    
    // Drop list
    
    
    var dropList = document.querySelectorAll('.catalog-select__item');
    
    document.addEventListener('click', function(e){
        let element = e.target;
        
        if(element.closest('.catalog__button-select')){
            let isActive = element.closest('.catalog-select__item').classList.contains('active')? true: false;
            
            dropList.forEach(item => {item.classList.remove('active')});
            
            if(isActive)
                element.closest('.catalog-select__item').classList.remove('active');
            else
                element.closest('.catalog-select__item').classList.add('active');
        }
    });
    
    document.querySelector('body').addEventListener('click', function(event){
        if(!event.target.closest('.catalog-select__item')) {
            document.querySelectorAll('.catalog-select__item').forEach(function(item){
                item.classList.remove('active');
            }); 
        }
    });
    
    // Drop list
    
    // Scroll to top
    
    let wrapperToTop = document.querySelector('.button-to-top');
    let buttonToTop = document.querySelector('.to-top');
    
    document.addEventListener('scroll', function(){
        if(window.pageYOffset > 1000) {
            wrapperToTop.classList.add('show');
        }else {
            wrapperToTop.classList.remove('show');
        }
    });
    
    buttonToTop.addEventListener('click', function(){
       window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    
    // /Scroll to top
    
    // Scroll to block 
    
    function scrollToBlock() {
        let toBlockButton = document.querySelector(".js-to-block");
        let blockPosition = document.querySelector('.together-cheaper').offsetTop;
        let number = 80;
        
        toBlockButton.addEventListener('click', function(){
        window.scrollTo({
                top: blockPosition - number,
                behavior: "smooth"
            });
        });
    }
    
    scrollToBlock();
    
    function scrollBlock() {
        let block = document.querySelector('.product-list');
        if(block) {
            block.scrollLeft = 500;
        }
       
    }
    
    window.addEventListener('resize', function(){
        scrollBlock();
    });
    
    scrollBlock();
    
    
    // /Scroll to block
    
    // Burger
    
    let burgerButton = document.querySelector('.burger-menu')
    let headerDrop = document.querySelectorAll(".drop-item");
    var burgerMenu = document.querySelector(".header-nav");
    
    burgerButton.addEventListener('click', function(){
        burgerMenu.classList.add('active');
        htmlOverflow.classList.add('overflow');
    });
    
    headerDrop.forEach(function(item){
        item.addEventListener('click', function(){
            if(item.classList.contains('active')) {
                item.classList.remove('active');
            }else {
                headerDrop.forEach(function(item){
                    item.classList.remove('active');
                });
                item.classList.add('active');
            }
        });
    });
    
    let buttonSearch = document.querySelector(".live-search");
    let searchList = document.querySelector('.header-live-search');
    
    buttonSearch.addEventListener('click', function(){
        searchList.classList.toggle('active');
        htmlOverflow.classList.toggle('overflow');
    });
    
    document.addEventListener('click', function(e){
        let item = e.target;
        
        if(!item.closest('.live-search') && !item.closest('.header-live-search') && !item.closest(".js-button") && !item.closest(".burger-menu") && !item.closest('.popup')) {
            searchList.classList.remove('active');
            htmlOverflow.classList.remove('overflow');
        }
    });
    // /Burger
    
    // Filter 
    
    let footerBlock = document.querySelector('.footer');
    let filter = document.querySelector('.open-filter');
    
    document.addEventListener('scroll', function(e){
        if(filter) {
            let footerPosition = footerBlock.getBoundingClientRect();
            let filterPosition = filter.getBoundingClientRect();
            
            if(filterPosition.top > footerPosition.top) {
                filter.classList.add('hide');
            }else {
                filter.classList.remove('hide');
            }
        }
    });
    
    let buttonFilter = document.querySelector('.open-filter');
    let closeFilter = document.querySelector('.close-filter');
    
    if(buttonFilter) {
        buttonFilter.addEventListener('click', function(){
            document.querySelector(".catalog-sort__wrapper .wrapper").classList.add("show");
        });
    }
    
    if(closeFilter) {
        closeFilter.addEventListener('click', function(){
            document.querySelector(".catalog-sort__wrapper .wrapper").classList.remove("show");
        });
    }
    
    // //Filter
    
    // Show product img
    
    let allImg = document.querySelectorAll('.product-img__item');
    let generalImg = document.querySelector('.product-general-img');
    let imgList = document.querySelector('.product-img__list');
    let buttonPrev = document.querySelector('.product-img__button.prev');
    let buttonNext = document.querySelector('.product-img__button.next');
    
    function changeImg(item) {
        let style = item.getAttribute('style');
        generalImg.setAttribute('style', style);
    }
    
    if(allImg) {
        allImg.forEach(function(item){
            item.addEventListener('click', function(){
                allImg.forEach(function(item){
                    item.classList.remove("active");
                });
                item.classList.add('active');
                let getIndex = item.getAttribute('data-index');
                let showImg = document.querySelector('.product-img__item.active');
                
                console.log(showImg.pageYOffset);
                
                buttonNext.classList.remove('disabled');
                buttonPrev.classList.remove('disabled');
                
                if(getIndex == 1) {
                    buttonPrev.classList.add('disabled');
                }
                
                if(getIndex == allImg.length) {
                    buttonNext.classList.add('disabled');
                }
                
                if(getIndex % 5 == 0) {
                    let height = showImg.offsetHeight * 5;
                    imgList.scrollTop += height;
                }
                
                
                changeImg(item);
                
                // generalImg.classList.add("hide");
                // setTimeout(function(){
                //     generalImg.classList.remove("hide");
                // },200);
            });
        });
        
        buttonPrev.addEventListener('click', function(){
            let showImg = document.querySelector('.product-img__item.active');
            
            
            if(!showImg.previousElementSibling) {
                return;
            }
            
            showImg.previousElementSibling.classList.add("active");
            showImg.classList.remove("active");
            
            changeImg(showImg.previousElementSibling);
            
            buttonNext.classList.remove("disabled");
            
            let indexImg = document.querySelector('.product-img__item.active').getAttribute('data-index');
            
            if(indexImg % (5) == 0) {
                let height = showImg.offsetHeight * 5;
                imgList.scrollTop -= height;
            }
            
            if(showImg.previousElementSibling.previousElementSibling == null) {
                buttonPrev.classList.add('disabled');
            }
        });
        
        buttonNext.addEventListener("click", function(){
            let showImg = document.querySelector('.product-img__item.active');
            let indexImg = document.querySelector('.product-img__item.active').getAttribute('data-index');
            
            if(indexImg % 5 == 0) {
                let height = showImg.offsetHeight * 5;
                imgList.scrollTop += height;
            }
            
            if(!showImg.nextElementSibling) {
                return;
            }
            
            showImg.nextElementSibling.classList.add("active");
            showImg.classList.remove("active");
            
            changeImg(showImg.nextElementSibling);
            
            buttonPrev.classList.remove("disabled");
            
            if(showImg.nextElementSibling.nextElementSibling == null) {
                buttonNext.classList.add('disabled');
            }
            
        });
    }
});