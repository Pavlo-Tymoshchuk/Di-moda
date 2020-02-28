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
        item.innerHTML = currentSlideIndex;
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
            
            allNumber.innerHTML = sliderItems.length;
            
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
        item.innerHTML = currentSlideIndex;
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

            allNumber.innerHTML = sliderItems.length;
            
            arrowNext.addEventListener('click', function() {
                let itemShow = slider.querySelector('.js-slider-item-infinity.show');
                
                itemShow.nextElementSibling.classList.add('show');
                itemShow.classList.remove('show');
                
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
                
                sliderList.prepend(lastElem);
                
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
                htmlOverflow.classList.add('overflow')
            });
        }
    }
    
    document.addEventListener('click', function(e){
        let elem = e.target;
        
        if(elem.closest('.js-close')){
            let popupActive = document.querySelector('.popup.active');
            if(popupActive) {
                popupActive.classList.remove('active');
                overlay.classList.remove('active');
                htmlOverflow.classList.remove('overflow');
            }
        }
    });

    overlay.addEventListener('click', function(){
        let popupActive = document.querySelector('.popup.active');
        popupActive.classList.remove('active');
        overlay.classList.remove('active');
        htmlOverflow.classList.remove('overflow');
    });
    
    
    let moreInfo = document.querySelectorAll('.js-more-info');
    
    for(var i = 0; moreInfo.length > i; i++) {
        moreInfo[i].addEventListener('click', function(){
            let item = this.closest(".js-item");
            let reviewContent = item.querySelector('.content p').innerHTML;
            let reviewName = item.querySelector('.reviews__footer .name').innerHTML;
            let reviewSub = item.querySelector('.reviews__footer .date').innerHTML;
            let reviewImg = item.querySelector('.reviews__footer .img').getAttribute('style');
            
            let popupReview = document.querySelector('.popup-reviews');
            
            popupReview.querySelector('.content p').innerHTML = '' + reviewContent + '';
            popupReview.querySelector('.reviews__footer .name').innerHTML = '' + reviewName + '';
            popupReview.querySelector('.reviews__footer .date').innerHTML = '' + reviewSub + '';
            popupReview.querySelector('.reviews__footer .img').setAttribute('style', '' + reviewImg + '');
        });
    }
    
    // /Popup
    
    // Drop list
    
    var dropList = document.querySelectorAll('.filter__wrapper');

    document.addEventListener('click', function(e){
        let element = e.target;
        
        if(element.closest('.filter-mobile')){
            let isActive = element.closest('.filter__wrapper').classList.contains('active')? true: false;
            
            dropList.forEach(item => {item.classList.remove('active')});
            
            if(isActive)
                element.closest('.filter__wrapper').classList.remove('active');
            else
                element.closest('.filter__wrapper').classList.add('active');
        }
        
        if(element.closest('.filter__item')){
            let value = element.closest('.filter__item').innerHTML;
            let droplist = element.closest('.filter__wrapper');
            let dropItems = droplist.querySelectorAll('.filter__item');
            
            dropItems.forEach(item => {item.classList.remove('active')});
            element.closest('.filter__item').classList.add('active');
            
            // past value
            droplist.querySelector('.filter-mobile p').innerHTML = value;
            
            // close dropdown
            droplist.classList.remove('active');
        }
    });
    
    document.querySelector('body').addEventListener('click', function(event){
        if(!event.target.closest('.filter__wrapper')) {
            document.querySelectorAll('.filter__wrapper').forEach(function(item){
                item.classList.remove('active');
            }); 
        }
    });
    
    // Drop list
    
});