import Swiper from "swiper";
import Navigation from "../../node_modules/swiper/modules/navigation.mjs";
import A11y from "../../node_modules/swiper/modules/a11y.mjs";
import Pagination from "../../node_modules/swiper/modules/pagination.mjs";

const swiper_init = () => {
	const swiperCarousel = document.querySelectorAll(".carousel");
	if (swiperCarousel.length > 0) {
		swiperCarousel.forEach((carousel, i) => {
			if (carousel.classList.contains("carousel--zoomer")) return;
			let slides = carousel.querySelectorAll(".swiper-slide");
			if (slides.length > 1) {
				let classname = `carousel-${i}-button`;
				let prevButton =
					carousel.querySelector(".button--prev") ??
					carousel.parentElement.querySelector(".button--prev");
				let nextButton =
					carousel.querySelector(".button--next") ??
					carousel.parentElement.querySelector(".button--next");

				if (prevButton) {
					prevButton.classList.add(classname);
				}
				if (nextButton) {
					nextButton.classList.add(classname);
				}
				let options = {
					loop: true,
					modules: [Navigation, A11y],
					navigation: {
						nextEl: `.button--next.${classname}`,
						prevEl: `.button--prev.${classname}`,
					},
					simulateTouch: true,
					centeredSlides: true,
					slidesPerView: 1,
					spaceBetween: 0,
					keyboard: true,
					on: {
						init: function () {
							const event = new Event("swiper-ready");
							window.dispatchEvent(event);
						},
					},
					a11y: {
						containerMessage: "This is a slider", // Message to describe the container
						containerRoleDescriptionMessage: "Slider Container", // Message to provide detailed explanation of the container's role
						nextSlideMessage: "Button for the next slide", // Message for the Next button
						prevSlideMessage: "Button for the previous slide", // Message for the Back button
						paginationBulletMessage: "Button to jump to slide {{index}}", // Message for each pagination button (only available when clickable option is true).
						slideLabelMessage: "Slide {{index}} of {{slidesLength}}", // Message for each slide (indicating which slide out of how many)
						slideRole: "group", // Message to describe the role of the slide
						itemRoleDescriptionMessage: "Slide group", // Message to describe the role of the slide in detail
					},
				};

				if (carousel.classList.contains("carousel--highlights")) {
					options.loop = false;
					options.slidesPerView = "auto";
					options.spaceBetween = 32;
				}

				if (carousel.classList.contains("carousel--shop")) {
					options.slidesPerView = "auto";
					options.spaceBetween = 64;
					options.centeredSlides = true;
					options.breakpoints = {
						700: {
							centeredSlides: false,
						},
					};
				}

				if (carousel.classList.contains("carousel--collection")) {
					options.loop = false;
					options.slidesPerView = 2;
					options.spaceBetween = 16;
					options.centeredSlides = false;
					options.breakpoints = {
						700: {
							slidesPerView: 3,
						},
						1000: {
							slidesPerView: 5,
						},
						1200: {
							slidesPerView: 6,
						},
					};
				}
				if (carousel.classList.contains("carousel--event_types")) {
					options.loop = false;
					options.slidesPerView = 1;
					options.spaceBetween = 32;
					options.centeredSlides = false;
					options.breakpoints = {
						700: {
							slidesPerView: 2,
						},
						1000: {
							slidesPerView: 3,
						},
						1200: {
							slidesPerView: 4,
						},
					};
				}
				if (carousel.classList.contains("info-carousel-carousel")) {
					options.slidesPerView = 1;
					options.spaceBetween = 32;
					options.centeredSlides =
						carousel.querySelectorAll(".swiper-slide").length > 4;
					if (slides.length <= 4) return;
					options.breakpoints = {
						700: {
							slidesPerView: 2,
							//slidesPerColumn: 1,
							spaceBetween: 32,
						},
						1200: {
							slidesPerView: 4,
							slidesPerColumn: 1,
							spaceBetween: 32,
						},
					};
				}

				if (carousel.classList.contains("carousel--timeline")) {
					options.slidesPerView = 1;
					options.spaceBetween = 48;
					options.centeredSlides = "true";
					options.initialSlide = 1;
					options.loop = true;
					options.breakpoints = {
						1000: {
							slidesPerView: 2,
							centeredSLides: true,
						},
						1200: {
							slidesPerView: 3,
							centeredSLides: true,
						},
					};
					options.a11y.containerMessage =
						"This is a timeline of Shoemakers events";

					const carousel = document.querySelector(
						".carousel.carousel--timeline"
					);

					if (carousel) {
						const swiperSlides = carousel.querySelectorAll(".swiper-slide");
						swiperSlides.forEach((slide) => {
							const videoModal = slide.querySelector(".video_modal");

							if (videoModal) {
								carousel.appendChild(videoModal);
							} else {
							}
						});
					} else {
					}
				}

				if (carousel.classList.contains("carousel--highlights")) {
					options.slidesPerView = "auto";
					options.spaceBetween = 32;
					options.centeredSlides = false;
					if (slides.length < 5) {
						options.loop = false;
					}
					carousel.querySelectorAll(".container").forEach((img) => {
						width = img.getBoundingClientRect().width;
						if (img.nextElementSibling) {
							img.nextElementSibling.style.maxWidth = `${width}px`;
						}
					});
					console.log(carousel);
					let titleHeight =
						carousel.previousElementSibling?.getBoundingClientRect().height;
					if (titleHeight || titleHeight === 0) {
						if (titleHeight < 32) {
							titleHeight = 32;
						}
						let titleMargin = window.getComputedStyle(
							carousel.previousElementSibling
						).marginBottom;
						let buttons = carousel.querySelectorAll(
							".button--prev,.button--next"
						);
						buttons.forEach(
							(button) =>
								(button.style.top = `${-parseInt(titleMargin) - titleHeight}px`)
						);
					}
				}
				if (carousel.classList.contains("quote-carousel-carousel")) {
					if (slides.length < 2) {
						options.loop = false;
					}
					options.modules = [Navigation, A11y, Pagination];
					options.pagination = {
						el: ".swiper-pagination",
						type: "bullets",
						clickable: true,
					};
					options.spaceBetween = 40;
				}
				carousel.carouselInstance = new Swiper(carousel, options);
			}
		});
	}
};

export default swiper_init;
