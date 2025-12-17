import Swiper from "swiper";
import Navigation from "../../node_modules/swiper/modules/navigation.mjs";

const lightbox = () => {
    /*Lazy load Original Src Images*/
    const lazyImages = document.querySelectorAll('.lazy_load_original');
    if(lazyImages.length>0){
        lazyImages.forEach(img  => {
            let originalSrc = img.dataset.src;
            img.src = originalSrc;
        });
    }

    /*lightbox carousel*/
   
    const zoom_carousel=document.querySelectorAll('.carousel--zoomer');
    console.log(zoom_carousel);
    if(zoom_carousel.length>0){
        zoom_carousel.forEach(carousel=>{
            carousel.carouselInstance = false;
            carousel.slideIndex = carousel.querySelector('.slide_index');
            let siblingCarousel=carousel.previousElementSibling;
            siblingCarousel.zoomCarousel = carousel;
            const zoomers = siblingCarousel.querySelectorAll('.carousel .image_zoomer');
            const closeZoom = carousel.querySelector('.close_zoomer');
            if(zoomers.length){
                zoomers.forEach(zoomer=>zoomer.addEventListener('click',zoomCarousel));
            }
            closeZoom.addEventListener('click',()=>{
                carousel.classList.add('hide');
                setTimeout(()=>{
                    carousel.classList.remove('open');
                    carousel.classList.remove('hide');
                },600);
            })
        });
    }
    window.addEventListener('swiper-ready',(e)=>{
        e.carousel.classList.add('open');
        e.carousel.classList.remove('hide');
        setSlideNumber(e.carousel,e.slideNumber);
        if(e.slide){
            e.swiperInstance.slideTo(e.slide,0,false);
        }
    });
    function zoomCarousel(e){
        let carousel = e.target.closest('.carousel--highlights');
        let zoomCarousel;
        if(carousel){
            zoomCarousel = carousel.zoomCarousel;
        }
        else{
            zoomCarousel=e.target.zoomCarousel;
        }
        zoomCarousel.classList.add('hide');
        const slide = parseInt(e.currentTarget.dataset.index) ;
        const slideNumber = e.currentTarget.parentNode.getAttribute('aria-label');
        if(!zoomCarousel.carouselInstance){
            let options = {
                loop: false,
                navigation: {
                nextEl: ".button--next",
                prevEl: ".button--prev",
                },
                simulateTouch: true,
                centeredSlides: true,
                slidesPerView: 1,
                spaceBetween: 0,
                speed:800,
                modules: [Navigation],
                navigation: {
						nextEl: `.button--next.zoomer-button`,
						prevEl: `.button--prev.zoomer-button`,
					},
                on: {
                    init: function () {
                            const event = new Event("swiper-ready");
                            if(slide){
                                event.slide = slide;
                            }
                            event.slideNumber = slideNumber?slideNumber:`1 / ${this.slides.length}`;
                            event.carousel = this.el;
                            event.swiperInstance = this;
                            window.dispatchEvent(event);
                            /* for (let index = 0; index < this.slides.length; index++) {
                                let slide = this.slides[index];
                                
                                let img = slide.querySelector('img')
                                let aspect;
                                if(slide.classList.contains('swiper-slide-duplicate') && index==0){
                                    aspect = this.slides[this.slides.length - 2].querySelector('img').getBoundingClientRect();
                                }
                                else if (slide.classList.contains('swiper-slide-duplicate') && index==this.slides.length - 1){
                                    aspect = this.slides[1].querySelector('img').getBoundingClientRect();
                                }
                                else{
                                    aspect = img.getBoundingClientRect();
                                }
                                let parentStyle = getComputedStyle(img.parentNode.parentNode);
                                img.parentNode.parentNode.style.width = `${aspect.width +  parseInt(parentStyle.paddingLeft)}px`;
                            } */
                    },
                    slideChange: function(){
                        let index = this.activeIndex;
                        let activeSlide = this.slides[index]
                        let indexStr = activeSlide.getAttribute('aria-label');
                        setSlideNumber(zoomCarousel,indexStr);
                    }
                },
            };
            zoomCarousel.carouselInstance = new Swiper(zoomCarousel, options);
        }
        else{
            zoomCarousel.classList.add('open');
            zoomCarousel.classList.remove('hide');
            if(slide||slide===0){
                zoomCarousel.carouselInstance.slideTo(0,0,false);
                zoomCarousel.carouselInstance.slideTo(slide,0,false);
                setSlideNumber(zoomCarousel,slideNumber);
            }
        }
    }

    function setSlideNumber(zoomCarousel,string){
        if(string){
            zoomCarousel.slideIndex.classList.add('hide');
            setTimeout(()=>{
                zoomCarousel.slideIndex.innerText = string;
            },400);
            setTimeout(()=>{
                zoomCarousel.slideIndex.classList.remove('hide');
            },400);
        }
    }

    const zoomImageTrigger = document.querySelectorAll('.lightbox .image_zoomer');
    const zoomImage = document.querySelectorAll('.lightbox .object_image_zoomer');
    const closeImageZoom =document.querySelectorAll('.close_zoomer');
    if(zoomImage.length){
        zoomImageTrigger.forEach((trigger,index)=>{
            trigger.addEventListener('click',(e)=>{
                zoomImage[index].classList.add('open');
                document.documentElement.classList.add('scrolly_lock');
            })
            let src = trigger.dataset.image;
            if(src){
                let img = new Image();
                img.addEventListener('load',(e)=>{
                    trigger.firstElementChild.remove();
                    let imageClone = e.target.cloneNode()
                    trigger.append(e.target);
                    zoomImage[index].append(imageClone);
                    trigger.classList.remove('blurry');
                    zoomImage[index].lastElementChild.addEventListener('click',(e)=>{
                        zoomImage[index].classList.toggle('fullscreen');
                    })
                });
                img.src = src;
            }
        });
       
    }
    if(closeImageZoom.length){
        closeImageZoom.forEach((closer,index)=>{
            closer.addEventListener('click',()=>{
            zoomImage[index]?.classList.add('hide');
            setTimeout(()=>{
                zoomImage[index].classList.remove('open');
                zoomImage[index].classList.remove('hide');
                document.documentElement.classList.remove('scrolly_lock');
            },600);
        })
    });
    }
}

export default lightbox;
