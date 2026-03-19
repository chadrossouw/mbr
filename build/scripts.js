(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hamburgerToggleMobile = exports.hamburgerToggle = void 0;
/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
// class NavMenu {
// 	constructor(menu, button) {
// 		this.menu = menu;
// 		this.button = button;
// 		this.firstFocusable = button;
// 		this.lastFocusable = this.getLastFocusable();
// 		this.button.addEventListener("click", this.toggleMenu.bind(this));
// 		this.menuIsOpen = false;
// 		this.transitionEndIsAdded = false;
// 		this.prefersReduced =
// 			window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
// 			window.matchMedia("(prefers-reduced-motion: reduce)").matches == true;
// 	}

// 	toggleMenu(e) {
// 		e.preventDefault();
// 		alert('Works');
// 		if (this.menuIsOpen) {
// 			this.closeMenu();
// 		} else {
// 			this.openMenu();
// 		}
// 	}

// 	openMenu() {

// 		this.menuIsOpen = true;
// 		this.menu.style.visibility = "visible";
// 		this.menu.classList.add("toggled");
// 		this.button.classList.add("is-active");
// 		this.button.setAttribute("aria-expanded", "true");
// 		this.firstFocusable.focus();
// 		document.documentElement.classList.add("scroll-lock");
// 		this.menu.addEventListener("focusout", this.focusHandler.bind(this));
// 		this.menu.addEventListener("keydown", this.escHandler.bind(this));
// 	}

// 	closeMenu() {
// 		this.menuIsOpen = false;
// 		this.menu.classList.remove("toggled");
// 		this.button.classList.remove("is-active");
// 		this.button.setAttribute("aria-expanded", "false");
// 		this.button.focus();
// 		document.documentElement.classList.remove("scroll-lock");
// 		this.menu.removeEventListener("focusout", this.focusHandler.bind(this));
// 		this.menu.removeEventListener("keydown", this.escHandler.bind(this));
// 		const closeEvent = new CustomEvent("menu_closed", {
// 			detail: { menu: this.menu },
// 		});
// 		window.dispatchEvent(closeEvent);
// 		if (this.prefersReduced) {
// 			alert("this");
// 			this.hideVisibilityOnEnd();
// 			return;
// 		}
// 		if (!this.transitionEndIsAdded) {
// 			this.menu.addEventListener(
// 				"transitionend",
// 				this.hideVisibilityOnEnd(this)
// 			);
// 		}
// 	}

// 	hideVisibilityOnEnd() {
// 		if (this.menuIsOpen) return;
// 		this.menu.style.visibility = "hidden";
// 		this.menu.removeEventListener(
// 			"transitionend",
// 			this.hideVisibilityOnEnd.bind(this)
// 		);
// 	}

// 	closeMenuClean() {
// 		this.menu.classList.remove("toggled");
// 		this.button.classList.remove("is-active");
// 		this.button.setAttribute("aria-expanded", "false");
// 		document.documentElement.classList.remove("scroll-lock");
// 		if (this.prefersReduced) {
// 			this.hideVisibilityOnEnd();
// 			return;
// 		}
// 	}

// 	getLastFocusable() {
// 		let focusable = [];
// 		let allDescendants = this.menu.querySelectorAll("*");
// 		allDescendants.forEach((child) => {
// 			if (this.isFocusable(child)) {
// 				focusable.push(child);
// 			}
// 		});
// 		return focusable[focusable.length - 1];
// 	}

// 	isFocusable(element) {
// 		if (element.tabIndex < 0) {
// 			return false;
// 		}

// 		if (element.disabled) {
// 			return false;
// 		}
// 		if (!element.offsetParent) {
// 			return false;
// 		}
// 		switch (element.nodeName) {
// 			case "A":
// 				return !!element.href && element.rel != "ignore";
// 			case "INPUT":
// 				return element.type != "hidden";
// 			case "BUTTON":
// 			case "SELECT":
// 			case "TEXTAREA":
// 				return true;
// 			default:
// 				return false;
// 		}
// 	}

// 	focusHandler(e) {
// 		if (
// 			e.target == this.lastFocusable &&
// 			!this.menu.contains(e.relatedTarget)
// 		) {
// 			e.preventDefault();
// 			this.firstFocusable.focus();
// 		}
// 	}

// 	escHandler(e) {
// 		if (e.key == "Escape") {
// 			this.closeMenu();
// 		}
// 	}
// }

var hamburgerToggle = exports.hamburgerToggle = function hamburgerToggle() {
  var button = document.querySelector("header#masthead .header .hamburger_container button#hamburger");
  var nav = document.querySelector("header#masthead:not(:has(~ .home-page)) #site-navigation");
  if (!button || !nav) return;

  // Toggle nav on button click
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    nav.classList.toggle("show");

    // Optional: add border to test
    //button.style.border = nav.classList.contains("show") ? "2px solid red" : "";
  });

  // Close nav when clicking outside
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !button.contains(e.target)) {
      nav.classList.remove("show");
      //button.style.border = ""; // remove test border
    }
  });
};
var hamburgerToggleMobile = exports.hamburgerToggleMobile = function hamburgerToggleMobile() {
  var button = document.querySelector("header#masthead.bg_light_gray.mobile_only .header .hamburger_container button#hamburger_mobile");
  var nav = document.querySelector("header#masthead.bg_light_gray.mobile_only:not(:has(~ .home-page)) #mobile_nav");
  if (!button || !nav) return;
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    if (nav.style.visibility === "visible") {
      nav.style.visibility = "hidden";
    } else {
      nav.style.visibility = "visible";
    }
  });
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !button.contains(e.target)) {
      nav.style.visibility = "hidden";
    }
  });
};

// // Ensure it runs after DOM loaded
// document.addEventListener("DOMContentLoaded", hamburgerToggle);

// const dynamicVH = () => {
// 	setDocHeight();
// 	window.addEventListener("resize", setDocHeight);
// 	window.addEventListener("orientationchange", setDocHeight);

// 	function setDocHeight() {
// 		console.log("set doc height");
// 		document.documentElement.style.setProperty(
// 			"--vh",
// 			`${window.innerHeight / 100}px`
// 		);
// 	}
// };

// const navigation = () => {
// 	alert('yey');
// 	let isHovering = false;
// 	let isClicked = false;
// 	const siteNavigation = document.getElementById("mobile_nav");
// 	const buttonHamburger = document.getElementById("hamburger_mobile");
// 	let navMenu = new NavMenu(siteNavigation, buttonHamburger);

// 	let navHeaderJumpLinks = document.querySelectorAll(
// 		".header-jump-link,#masthead .bsl a, #site-registration a"
// 	);
// 	if (navHeaderJumpLinks.length) {
// 		navHeaderJumpLinks.forEach((link) => {
// 			link.addEventListener("click", navMenu.closeMenuClean.bind(navMenu));
// 		});
// 	}

// 	const mobileSubNav = document.querySelector("#nav_select");
// 	if (mobileSubNav) {
// 		mobileSubNav.addEventListener("change", (e) => {
// 			if (e.target.value) {
// 				window.location.href = e.target.value;
// 			}
// 		});
// 	}
// 	let subNavTriggers = document.querySelectorAll(".menu-item-has-children");
// 	let prefersReduced =
// 		window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
// 		window.matchMedia("(prefers-reduced-motion: reduce)").matches == true;
// 	if (subNavTriggers.length) {
// 		subNavTriggers.forEach((trigger, i) => {
// 			const triggerLink = trigger.querySelector("a");
// 			triggerLink.setAttribute("role", "button");
// 			triggerLink.setAttribute("aria-expanded", "false");
// 			triggerLink.setAttribute("aria-controls", "sub-menu-" + i);
// 			const backLink = trigger.querySelector(".menu-item-back-link");
// 			const subNav = trigger.querySelector(".sub-menu");
// 			subNav.id = "sub-menu-" + i;
// 			subNav.style.display = "none";
// 			const subNavLinks = subNav.querySelectorAll("a, input");
// 			if (subNavLinks.length) {
// 				subNav.first = subNavLinks[0];
// 				subNav.last = subNavLinks[subNavLinks.length - 1];
// 			}
// 			triggerLink.addEventListener("click", menuClickHandler);
// 			triggerLink.addEventListener("mouseenter", menuHoverHandler);
// 			if (backLink) {
// 				backLink.addEventListener("click", (e) => {
// 					e.preventDefault();
// 					closeAll(trigger);
// 				});
// 			}
// 		});
// 	}
// 	function menuClickHandler(e) {
// 		e.preventDefault();
// 		if (isHovering) return;
// 		// closeAll();
// 		const trigger = e.currentTarget.parentElement;
// 		if (trigger.classList.contains("add_mega_menu")) {
// 			positionMegamenu(trigger);
// 		}
// 		const triggerLink = trigger.querySelector("a");
// 		const subNav = trigger.querySelector(".sub-menu");
// 		const parent = trigger.parentElement;
// 		if (trigger.classList.contains("open")) {
// 			isClicked = false;
// 			subNav.classList.remove("open");
// 			parent.classList.remove("sub_open");
// 			trigger.classList.remove("open");
// 			triggerLink.setAttribute("aria-expanded", "false");
// 			if (prefersReduced) {
// 				subNav.style.display = "none";
// 			} else {
// 				subNav.addEventListener("transitionend", setDisplayNone);
// 			}
// 		} else {
// 			isClicked = true;
// 			subNav.style.display = "block";
// 			setTimeout(() => {
// 				subNav.classList.add("open");
// 				//This is because Safari seems to register the programmatic focus as focus-visible
// 				if (!e.pointerType) {
// 					subNav.addEventListener("transitionend", setFocus);
// 				}
// 				triggerLink.setAttribute("aria-expanded", "true");
// 			}, 100);

// 			parent.classList.add("sub_open");
// 			trigger.classList.add("open");
// 			subNav.addEventListener("keydown", closeOnTabOutOrEsc);
// 			document.addEventListener("scroll", closeOnScroll);
// 		}
// 	}

// 	function menuHoverHandler(e) {
// 		e.preventDefault();
// 		if (window.innerWidth < 1200) return;
// 		if (isClicked) return;
// 		if (isHovering) return;
// 		isHovering = true;
// 		closeAll();
// 		const trigger = e.currentTarget.parentElement;
// 		if (trigger.classList.contains("add_mega_menu")) {
// 			positionMegamenu(trigger);
// 		}
// 		const triggerLink = trigger.querySelector("a");
// 		const subNav = trigger.querySelector(".sub-menu");
// 		const parent = trigger.parentElement;
// 		subNav.style.display = "block";
// 		subNav.classList.add("open");
// 		triggerLink.setAttribute("aria-expanded", "true");
// 		parent.classList.add("sub_open");
// 		trigger.classList.add("open");
// 		document.addEventListener("scroll", closeOnScroll);
// 		trigger.addEventListener("mouseleave", () => {
// 			isHovering = false;
// 			closeAll();
// 		});
// 	}
// 	function setDisplayNone(e) {
// 		e.target.style.display = "none";
// 		e.target.removeEventListener("transitionend", setDisplayNone);
// 	}

// 	function setFocus(e) {
// 		e.target.querySelector("a,input").focus();
// 		e.target.removeEventListener("transitionend", setFocus);
// 	}

// 	function closeOnTabOutOrEsc(e) {
// 		if (e.key == "Escape") {
// 			e.target.removeEventListener("keydown", closeOnTabOutOrEsc);
// 			if (e.srcElement.tagName == "INPUT") {
// 				e.target.parentElement.parentElement.parentElement.parentElement
// 					.querySelector("a")
// 					.focus();
// 				closeAll(
// 					e.target.parentElement.parentElement.parentElement.parentElement
// 				);
// 			} else {
// 				e.target.parentElement.parentElement.parentElement
// 					.querySelector("a")
// 					.focus();
// 				closeAll(e.target.parentElement.parentElement.parentElement);
// 			}
// 		} else if (e.key == "Tab") {
// 			let parent = e.srcElement.closest(".sub-menu");
// 			//let grandparent = parent.closest(".menu-item-has-children");
// 			let first = parent.first;
// 			let last = parent.last;
// 			if (e.shiftKey) {
// 				if (e.srcElement == first) {
// 					closeAll(parent);
// 					parent.removeEventListener("keydown", closeOnTabOutOrEsc);
// 				}
// 			} else {
// 				if (e.srcElement == last) {
// 					closeAll(parent);
// 					parent.removeEventListener("keydown", closeOnTabOutOrEsc);
// 				}
// 			}
// 		}
// 	}
// 	function closeOnScroll(e) {
// 		closeAll();
// 		document.removeEventListener("scroll", closeOnScroll);
// 	}

// 	function closeAll(currentSubNav = null) {

// 		isClicked = false;
// 		isHovering = false;
// 		subNavTriggers.forEach((trigger) => {
// 			trigger.classList.remove("open");
// 			const triggerLink = trigger.querySelector("a");
// 			trigger.parentElement.classList.remove("sub_open");
// 			const subNav = trigger.querySelector(".sub-menu");
// 			subNav.classList.remove("open");
// 			triggerLink.setAttribute("aria-expanded", "false");
// 			if (subNav == currentSubNav) {
// 				if (prefersReduced) {
// 					subNav.style.display = "none";
// 				} else {
// 					subNav.addEventListener("transitionend", setDisplayNone);
// 				}
// 			} else {
// 				subNav.style.display = "none";
// 			}
// 		});
// 	}

// 	function positionMegamenu(trigger) {
// 		const subNav = trigger.querySelector(".sub-menu");
// 		const triggerRect = trigger.getBoundingClientRect();
// 		const triggerLeft = triggerRect.left;
// 		const windowWidth = window.innerWidth;
// 		const offset = triggerLeft - windowWidth / 2;
// 		subNav.style.left = `-${offset}px`;
// 	}
// };

// const navScrollWatcher = () => {
// 	let headerwrap = document.querySelector(".site-header.desktop_only");
// 	var style = window.getComputedStyle(headerwrap);
// 	if (style.display === 'none') {
// 		headerwrap = document.querySelector(".site-header.mobile_only");
// 	} else {

// 	}

// 	const searchContainer = document.querySelector(".nav-search-form");
// 	let lastScrollTop = 0;

// 	document.addEventListener("scroll", headerslide);

// 	function headerslide() {
// 		if (searchContainer && searchContainer.classList.contains("open_search")) {
// 			searchContainer.classList.remove("open_search");
// 		}
// 		let st = window.pageYOffset || document.documentElement.scrollTop;
// 		if (st >= 200 && st <= 400) {
// 			headerwrap.classList.add("addFixed");
// 			headerwrap.classList.remove("slideInDown", "slideOut");
// 			document.documentElement.classList.remove("menu-visible");
// 		} else if (st > 400 && st <= 600) {
// 			headerwrap.classList.add("slideOut");
// 			if (st < lastScrollTop) {
// 				headerwrap.classList.remove("slideInDown");
// 				document.documentElement.classList.remove("menu-visible");
// 			}
// 		} else if (st > 600 && st < lastScrollTop) {
// 			headerwrap.classList.add("slideOut", "slideInDown");
// 			document.documentElement.classList.add("menu-visible");
// 		} else if (st > 600 && st > lastScrollTop) {
// 			headerwrap.classList.remove("slideInDown");
// 			document.documentElement.classList.remove("menu-visible");
// 		} else {
// 			headerwrap.classList.remove("slideInDown", "slideOut", "addFixed");
// 			document.documentElement.classList.remove("menu-visible");
// 		}
// 		lastScrollTop = st;
// 	}
// };

// const megaMenu = () => {
// 	const megaMenuContainer = document.querySelector(
// 		"#primary-menu li.add_mega_menu ul"
// 	);
// 	if (!megaMenuContainer) return;
// 	const megaMenuMobileCOntainer = document.querySelector(
// 		"#mobile-menu li.add_mega_menu ul"
// 	);
// 	const megaMenuContent = document.querySelector("#megamenu");
// 	const megaClone = megaMenuContent.cloneNode(true);
// 	megaMenuContainer.appendChild(megaMenuContent);
// 	megaMenuMobileCOntainer.appendChild(megaClone);
// 	megaMenuContent.style.display = "grid";
// 	megaClone.style.display = "grid";
// };

// function navNotice() {
// 	let notice = document.querySelector("#notice");
// 	if (!notice) return;
// 	let noticeButton = notice.querySelector("#close_notice");
// 	noticeButton.addEventListener("click", (e) => {
// 		e.preventDefault();
// 		notice.classList.add("hide");
// 		let cookieName = `notice_closed_${notice.dataset.notice}`;
// 		let date = new Date();
// 		date.setDate(date.getDate() + 30)
// 		let expires = date.toUTCString();
// 		document.cookie = `${cookieName}=1; expires=${expires}; path=/;`;
// 		noticeButton.setAttribute('aria-expanded', 'false');

// 	});
// }
// export { hamburgerToggle, dynamicVH, navigation, navScrollWatcher, megaMenu, navNotice };

},{}],2:[function(require,module,exports){
"use strict";

var _navigation = require("./js/navigation.js");
// import {
// 	filters,
// 	discoverFilter,
// 	showMore,
// 	jumpFilters,
// 	shopByCategory,
// } from "./js/filters.js";

//import {switches,altBlock,languageSwitcher} from "./js/accessibility.js";
//import playerWithCover from "./js/player.js";
// import {
// 	formHandler,
// 	formSwitcher,
// } from "./js/forms.js";
// import swiper_init from "./js/swiper-init.js";
// import lightbox from "./js/lightbox.js";
// import accordion from "./js/accordion.js";
// import modalHandlers from "./js/modal.js";
//import sharOnMobile from "./js/social.js";
//import tabHandlers from "./js/tabs.js";
// import { os_showroom_map } from "./js/map.js";
// import cardLinks from "./js/cards.js";
//import timetableHandler from "./js/timetable.js";

//import basket from "./js/basket.js";
//import crossSell from "./js/crosssells.js";

// dynamicVH();
// megaMenu();
// navigation();
// navScrollWatcher();
// navNotice();
(0, _navigation.hamburgerToggle)();
(0, _navigation.hamburgerToggleMobile)();

// os_showroom_map();
// cardLinks();
//languageSwitcher();
//switches();
//altBlock();

// filters();
// jumpFilters();
// shopByCategory();
// discoverFilter();
// showMore();
// playerWithCover();
// formHandler();
// formSwitcher();
// swiper_init();
// lightbox();
// accordion();
// modalHandlers();

//timetableHandler();
//sharOnMobile();

},{"./js/navigation.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbmF2aWdhdGlvbi5qcyIsInNyYy9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLGVBQWUsR0FBQSxPQUFBLENBQUEsZUFBQSxHQUFHLFNBQWxCLGVBQWUsQ0FBQSxFQUFTO0VBRTdCLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsK0RBQStELENBQUM7RUFDdEcsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywwREFBMEQsQ0FBQztFQUU5RixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFOztFQUVyQjtFQUNBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLEVBQUs7SUFDdkMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25CLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7SUFFNUI7SUFDQTtFQUNELENBQUMsQ0FBQzs7RUFFRjtFQUNBLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLEVBQUs7SUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUU7TUFDMUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO01BQzVCO0lBQ0Q7RUFDRCxDQUFDLENBQUM7QUFDSCxDQUFDO0FBRUQsSUFBTSxxQkFBcUIsR0FBQSxPQUFBLENBQUEscUJBQUEsR0FBRyxTQUF4QixxQkFBcUIsQ0FBQSxFQUFTO0VBRW5DLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0dBQWdHLENBQUM7RUFDdkksSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywrRUFBK0UsQ0FBQztFQUVuSCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFO0VBRXJCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLEVBQUs7SUFDdkMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRW5CLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO01BQ3ZDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVE7SUFDaEMsQ0FBQyxNQUFNO01BQ04sR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUztJQUNqQztFQUNELENBQUMsQ0FBQztFQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLEVBQUs7SUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUU7TUFDMUQsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUTtJQUNoQztFQUNELENBQUMsQ0FBQztBQUVILENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7OztBQ3RlQSxJQUFBLFdBQUEsR0FBQSxPQUFBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUEsMkJBQWUsRUFBQyxDQUFDO0FBQ2pCLElBQUEsaUNBQXFCLEVBQUMsQ0FBQzs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxyXG4gKiBGaWxlIG5hdmlnYXRpb24uanMuXHJcbiAqXHJcbiAqIEhhbmRsZXMgdG9nZ2xpbmcgdGhlIG5hdmlnYXRpb24gbWVudSBmb3Igc21hbGwgc2NyZWVucyBhbmQgZW5hYmxlcyBUQUIga2V5XHJcbiAqIG5hdmlnYXRpb24gc3VwcG9ydCBmb3IgZHJvcGRvd24gbWVudXMuXHJcbiAqL1xyXG4vLyBjbGFzcyBOYXZNZW51IHtcclxuLy8gXHRjb25zdHJ1Y3RvcihtZW51LCBidXR0b24pIHtcclxuLy8gXHRcdHRoaXMubWVudSA9IG1lbnU7XHJcbi8vIFx0XHR0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcclxuLy8gXHRcdHRoaXMuZmlyc3RGb2N1c2FibGUgPSBidXR0b247XHJcbi8vIFx0XHR0aGlzLmxhc3RGb2N1c2FibGUgPSB0aGlzLmdldExhc3RGb2N1c2FibGUoKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZU1lbnUuYmluZCh0aGlzKSk7XHJcbi8vIFx0XHR0aGlzLm1lbnVJc09wZW4gPSBmYWxzZTtcclxuLy8gXHRcdHRoaXMudHJhbnNpdGlvbkVuZElzQWRkZWQgPSBmYWxzZTtcclxuLy8gXHRcdHRoaXMucHJlZmVyc1JlZHVjZWQgPVxyXG4vLyBcdFx0XHR3aW5kb3cubWF0Y2hNZWRpYShgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlgKSA9PT0gdHJ1ZSB8fFxyXG4vLyBcdFx0XHR3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpLm1hdGNoZXMgPT0gdHJ1ZTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdHRvZ2dsZU1lbnUoZSkge1xyXG4vLyBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyBcdFx0YWxlcnQoJ1dvcmtzJyk7XHJcbi8vIFx0XHRpZiAodGhpcy5tZW51SXNPcGVuKSB7XHJcbi8vIFx0XHRcdHRoaXMuY2xvc2VNZW51KCk7XHJcbi8vIFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHR0aGlzLm9wZW5NZW51KCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRvcGVuTWVudSgpIHtcclxuXHJcbi8vIFx0XHR0aGlzLm1lbnVJc09wZW4gPSB0cnVlO1xyXG4vLyBcdFx0dGhpcy5tZW51LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuLy8gXHRcdHRoaXMubWVudS5jbGFzc0xpc3QuYWRkKFwidG9nZ2xlZFwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJpcy1hY3RpdmVcIik7XHJcbi8vIFx0XHR0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuLy8gXHRcdHRoaXMuZmlyc3RGb2N1c2FibGUuZm9jdXMoKTtcclxuLy8gXHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsLWxvY2tcIik7XHJcbi8vIFx0XHR0aGlzLm1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHRoaXMuZm9jdXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4vLyBcdFx0dGhpcy5tZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuZXNjSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdGNsb3NlTWVudSgpIHtcclxuLy8gXHRcdHRoaXMubWVudUlzT3BlbiA9IGZhbHNlO1xyXG4vLyBcdFx0dGhpcy5tZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGVkXCIpO1xyXG4vLyBcdFx0dGhpcy5idXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmZvY3VzKCk7XHJcbi8vIFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNjcm9sbC1sb2NrXCIpO1xyXG4vLyBcdFx0dGhpcy5tZW51LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCB0aGlzLmZvY3VzSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuLy8gXHRcdHRoaXMubWVudS5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmVzY0hhbmRsZXIuYmluZCh0aGlzKSk7XHJcbi8vIFx0XHRjb25zdCBjbG9zZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwibWVudV9jbG9zZWRcIiwge1xyXG4vLyBcdFx0XHRkZXRhaWw6IHsgbWVudTogdGhpcy5tZW51IH0sXHJcbi8vIFx0XHR9KTtcclxuLy8gXHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KGNsb3NlRXZlbnQpO1xyXG4vLyBcdFx0aWYgKHRoaXMucHJlZmVyc1JlZHVjZWQpIHtcclxuLy8gXHRcdFx0YWxlcnQoXCJ0aGlzXCIpO1xyXG4vLyBcdFx0XHR0aGlzLmhpZGVWaXNpYmlsaXR5T25FbmQoKTtcclxuLy8gXHRcdFx0cmV0dXJuO1xyXG4vLyBcdFx0fVxyXG4vLyBcdFx0aWYgKCF0aGlzLnRyYW5zaXRpb25FbmRJc0FkZGVkKSB7XHJcbi8vIFx0XHRcdHRoaXMubWVudS5hZGRFdmVudExpc3RlbmVyKFxyXG4vLyBcdFx0XHRcdFwidHJhbnNpdGlvbmVuZFwiLFxyXG4vLyBcdFx0XHRcdHRoaXMuaGlkZVZpc2liaWxpdHlPbkVuZCh0aGlzKVxyXG4vLyBcdFx0XHQpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdH1cclxuXHJcbi8vIFx0aGlkZVZpc2liaWxpdHlPbkVuZCgpIHtcclxuLy8gXHRcdGlmICh0aGlzLm1lbnVJc09wZW4pIHJldHVybjtcclxuLy8gXHRcdHRoaXMubWVudS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuLy8gXHRcdHRoaXMubWVudS5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4vLyBcdFx0XHRcInRyYW5zaXRpb25lbmRcIixcclxuLy8gXHRcdFx0dGhpcy5oaWRlVmlzaWJpbGl0eU9uRW5kLmJpbmQodGhpcylcclxuLy8gXHRcdCk7XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRjbG9zZU1lbnVDbGVhbigpIHtcclxuLy8gXHRcdHRoaXMubWVudS5jbGFzc0xpc3QucmVtb3ZlKFwidG9nZ2xlZFwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcbi8vIFx0XHR0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcbi8vIFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNjcm9sbC1sb2NrXCIpO1xyXG4vLyBcdFx0aWYgKHRoaXMucHJlZmVyc1JlZHVjZWQpIHtcclxuLy8gXHRcdFx0dGhpcy5oaWRlVmlzaWJpbGl0eU9uRW5kKCk7XHJcbi8vIFx0XHRcdHJldHVybjtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcblxyXG4vLyBcdGdldExhc3RGb2N1c2FibGUoKSB7XHJcbi8vIFx0XHRsZXQgZm9jdXNhYmxlID0gW107XHJcbi8vIFx0XHRsZXQgYWxsRGVzY2VuZGFudHMgPSB0aGlzLm1lbnUucXVlcnlTZWxlY3RvckFsbChcIipcIik7XHJcbi8vIFx0XHRhbGxEZXNjZW5kYW50cy5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4vLyBcdFx0XHRpZiAodGhpcy5pc0ZvY3VzYWJsZShjaGlsZCkpIHtcclxuLy8gXHRcdFx0XHRmb2N1c2FibGUucHVzaChjaGlsZCk7XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdH0pO1xyXG4vLyBcdFx0cmV0dXJuIGZvY3VzYWJsZVtmb2N1c2FibGUubGVuZ3RoIC0gMV07XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRpc0ZvY3VzYWJsZShlbGVtZW50KSB7XHJcbi8vIFx0XHRpZiAoZWxlbWVudC50YWJJbmRleCA8IDApIHtcclxuLy8gXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4vLyBcdFx0fVxyXG5cclxuLy8gXHRcdGlmIChlbGVtZW50LmRpc2FibGVkKSB7XHJcbi8vIFx0XHRcdHJldHVybiBmYWxzZTtcclxuLy8gXHRcdH1cclxuLy8gXHRcdGlmICghZWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcclxuLy8gXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4vLyBcdFx0fVxyXG4vLyBcdFx0c3dpdGNoIChlbGVtZW50Lm5vZGVOYW1lKSB7XHJcbi8vIFx0XHRcdGNhc2UgXCJBXCI6XHJcbi8vIFx0XHRcdFx0cmV0dXJuICEhZWxlbWVudC5ocmVmICYmIGVsZW1lbnQucmVsICE9IFwiaWdub3JlXCI7XHJcbi8vIFx0XHRcdGNhc2UgXCJJTlBVVFwiOlxyXG4vLyBcdFx0XHRcdHJldHVybiBlbGVtZW50LnR5cGUgIT0gXCJoaWRkZW5cIjtcclxuLy8gXHRcdFx0Y2FzZSBcIkJVVFRPTlwiOlxyXG4vLyBcdFx0XHRjYXNlIFwiU0VMRUNUXCI6XHJcbi8vIFx0XHRcdGNhc2UgXCJURVhUQVJFQVwiOlxyXG4vLyBcdFx0XHRcdHJldHVybiB0cnVlO1xyXG4vLyBcdFx0XHRkZWZhdWx0OlxyXG4vLyBcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcblxyXG4vLyBcdGZvY3VzSGFuZGxlcihlKSB7XHJcbi8vIFx0XHRpZiAoXHJcbi8vIFx0XHRcdGUudGFyZ2V0ID09IHRoaXMubGFzdEZvY3VzYWJsZSAmJlxyXG4vLyBcdFx0XHQhdGhpcy5tZW51LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldClcclxuLy8gXHRcdCkge1xyXG4vLyBcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vIFx0XHRcdHRoaXMuZmlyc3RGb2N1c2FibGUuZm9jdXMoKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcblxyXG4vLyBcdGVzY0hhbmRsZXIoZSkge1xyXG4vLyBcdFx0aWYgKGUua2V5ID09IFwiRXNjYXBlXCIpIHtcclxuLy8gXHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcbi8vIH1cclxuXHJcbmNvbnN0IGhhbWJ1cmdlclRvZ2dsZSA9ICgpID0+IHtcclxuXHJcblx0Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciNtYXN0aGVhZCAuaGVhZGVyIC5oYW1idXJnZXJfY29udGFpbmVyIGJ1dHRvbiNoYW1idXJnZXJcIik7XHJcblx0Y29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciNtYXN0aGVhZDpub3QoOmhhcyh+IC5ob21lLXBhZ2UpKSAjc2l0ZS1uYXZpZ2F0aW9uXCIpO1xyXG5cclxuXHRpZiAoIWJ1dHRvbiB8fCAhbmF2KSByZXR1cm47XHJcblxyXG5cdC8vIFRvZ2dsZSBuYXYgb24gYnV0dG9uIGNsaWNrXHJcblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcclxuXHJcblx0XHQvLyBPcHRpb25hbDogYWRkIGJvcmRlciB0byB0ZXN0XHJcblx0XHQvL2J1dHRvbi5zdHlsZS5ib3JkZXIgPSBuYXYuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSA/IFwiMnB4IHNvbGlkIHJlZFwiIDogXCJcIjtcclxuXHR9KTtcclxuXHJcblx0Ly8gQ2xvc2UgbmF2IHdoZW4gY2xpY2tpbmcgb3V0c2lkZVxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cdFx0aWYgKCFuYXYuY29udGFpbnMoZS50YXJnZXQpICYmICFidXR0b24uY29udGFpbnMoZS50YXJnZXQpKSB7XHJcblx0XHRcdG5hdi5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcclxuXHRcdFx0Ly9idXR0b24uc3R5bGUuYm9yZGVyID0gXCJcIjsgLy8gcmVtb3ZlIHRlc3QgYm9yZGVyXHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG5jb25zdCBoYW1idXJnZXJUb2dnbGVNb2JpbGUgPSAoKSA9PiB7XHJcblxyXG5cdGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIjbWFzdGhlYWQuYmdfbGlnaHRfZ3JheS5tb2JpbGVfb25seSAuaGVhZGVyIC5oYW1idXJnZXJfY29udGFpbmVyIGJ1dHRvbiNoYW1idXJnZXJfbW9iaWxlXCIpO1xyXG5cdGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIjbWFzdGhlYWQuYmdfbGlnaHRfZ3JheS5tb2JpbGVfb25seTpub3QoOmhhcyh+IC5ob21lLXBhZ2UpKSAjbW9iaWxlX25hdlwiKTtcclxuXHJcblx0aWYgKCFidXR0b24gfHwgIW5hdikgcmV0dXJuO1xyXG5cclxuXHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdGlmIChuYXYuc3R5bGUudmlzaWJpbGl0eSA9PT0gXCJ2aXNpYmxlXCIpIHtcclxuXHRcdFx0bmF2LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bmF2LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcblx0XHRpZiAoIW5hdi5jb250YWlucyhlLnRhcmdldCkgJiYgIWJ1dHRvbi5jb250YWlucyhlLnRhcmdldCkpIHtcclxuXHRcdFx0bmF2LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFxyXG59O1xyXG5cclxuLy8gLy8gRW5zdXJlIGl0IHJ1bnMgYWZ0ZXIgRE9NIGxvYWRlZFxyXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBoYW1idXJnZXJUb2dnbGUpO1xyXG5cclxuLy8gY29uc3QgZHluYW1pY1ZIID0gKCkgPT4ge1xyXG4vLyBcdHNldERvY0hlaWdodCgpO1xyXG4vLyBcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNldERvY0hlaWdodCk7XHJcbi8vIFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBzZXREb2NIZWlnaHQpO1xyXG5cclxuLy8gXHRmdW5jdGlvbiBzZXREb2NIZWlnaHQoKSB7XHJcbi8vIFx0XHRjb25zb2xlLmxvZyhcInNldCBkb2MgaGVpZ2h0XCIpO1xyXG4vLyBcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KFxyXG4vLyBcdFx0XHRcIi0tdmhcIixcclxuLy8gXHRcdFx0YCR7d2luZG93LmlubmVySGVpZ2h0IC8gMTAwfXB4YFxyXG4vLyBcdFx0KTtcclxuLy8gXHR9XHJcbi8vIH07XHJcblxyXG4vLyBjb25zdCBuYXZpZ2F0aW9uID0gKCkgPT4ge1xyXG4vLyBcdGFsZXJ0KCd5ZXknKTtcclxuLy8gXHRsZXQgaXNIb3ZlcmluZyA9IGZhbHNlO1xyXG4vLyBcdGxldCBpc0NsaWNrZWQgPSBmYWxzZTtcclxuLy8gXHRjb25zdCBzaXRlTmF2aWdhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9iaWxlX25hdlwiKTtcclxuLy8gXHRjb25zdCBidXR0b25IYW1idXJnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhhbWJ1cmdlcl9tb2JpbGVcIik7XHJcbi8vIFx0bGV0IG5hdk1lbnUgPSBuZXcgTmF2TWVudShzaXRlTmF2aWdhdGlvbiwgYnV0dG9uSGFtYnVyZ2VyKTtcclxuXHJcbi8vIFx0bGV0IG5hdkhlYWRlckp1bXBMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbi8vIFx0XHRcIi5oZWFkZXItanVtcC1saW5rLCNtYXN0aGVhZCAuYnNsIGEsICNzaXRlLXJlZ2lzdHJhdGlvbiBhXCJcclxuLy8gXHQpO1xyXG4vLyBcdGlmIChuYXZIZWFkZXJKdW1wTGlua3MubGVuZ3RoKSB7XHJcbi8vIFx0XHRuYXZIZWFkZXJKdW1wTGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xyXG4vLyBcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBuYXZNZW51LmNsb3NlTWVudUNsZWFuLmJpbmQobmF2TWVudSkpO1xyXG4vLyBcdFx0fSk7XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRjb25zdCBtb2JpbGVTdWJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hdl9zZWxlY3RcIik7XHJcbi8vIFx0aWYgKG1vYmlsZVN1Yk5hdikge1xyXG4vLyBcdFx0bW9iaWxlU3ViTmF2LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuLy8gXHRcdFx0aWYgKGUudGFyZ2V0LnZhbHVlKSB7XHJcbi8vIFx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBlLnRhcmdldC52YWx1ZTtcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0fSk7XHJcbi8vIFx0fVxyXG4vLyBcdGxldCBzdWJOYXZUcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKTtcclxuLy8gXHRsZXQgcHJlZmVyc1JlZHVjZWQgPVxyXG4vLyBcdFx0d2luZG93Lm1hdGNoTWVkaWEoYChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpYCkgPT09IHRydWUgfHxcclxuLy8gXHRcdHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlcIikubWF0Y2hlcyA9PSB0cnVlO1xyXG4vLyBcdGlmIChzdWJOYXZUcmlnZ2Vycy5sZW5ndGgpIHtcclxuLy8gXHRcdHN1Yk5hdlRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIsIGkpID0+IHtcclxuLy8gXHRcdFx0Y29uc3QgdHJpZ2dlckxpbmsgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpO1xyXG4vLyBcdFx0XHR0cmlnZ2VyTGluay5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xyXG4vLyBcdFx0XHR0cmlnZ2VyTGluay5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcbi8vIFx0XHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiwgXCJzdWItbWVudS1cIiArIGkpO1xyXG4vLyBcdFx0XHRjb25zdCBiYWNrTGluayA9IHRyaWdnZXIucXVlcnlTZWxlY3RvcihcIi5tZW51LWl0ZW0tYmFjay1saW5rXCIpO1xyXG4vLyBcdFx0XHRjb25zdCBzdWJOYXYgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLW1lbnVcIik7XHJcbi8vIFx0XHRcdHN1Yk5hdi5pZCA9IFwic3ViLW1lbnUtXCIgKyBpO1xyXG4vLyBcdFx0XHRzdWJOYXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4vLyBcdFx0XHRjb25zdCBzdWJOYXZMaW5rcyA9IHN1Yk5hdi5xdWVyeVNlbGVjdG9yQWxsKFwiYSwgaW5wdXRcIik7XHJcbi8vIFx0XHRcdGlmIChzdWJOYXZMaW5rcy5sZW5ndGgpIHtcclxuLy8gXHRcdFx0XHRzdWJOYXYuZmlyc3QgPSBzdWJOYXZMaW5rc1swXTtcclxuLy8gXHRcdFx0XHRzdWJOYXYubGFzdCA9IHN1Yk5hdkxpbmtzW3N1Yk5hdkxpbmtzLmxlbmd0aCAtIDFdO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHRcdHRyaWdnZXJMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtZW51Q2xpY2tIYW5kbGVyKTtcclxuLy8gXHRcdFx0dHJpZ2dlckxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgbWVudUhvdmVySGFuZGxlcik7XHJcbi8vIFx0XHRcdGlmIChiYWNrTGluaykge1xyXG4vLyBcdFx0XHRcdGJhY2tMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4vLyBcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyBcdFx0XHRcdFx0Y2xvc2VBbGwodHJpZ2dlcik7XHJcbi8vIFx0XHRcdFx0fSk7XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdH0pO1xyXG4vLyBcdH1cclxuLy8gXHRmdW5jdGlvbiBtZW51Q2xpY2tIYW5kbGVyKGUpIHtcclxuLy8gXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gXHRcdGlmIChpc0hvdmVyaW5nKSByZXR1cm47XHJcbi8vIFx0XHQvLyBjbG9zZUFsbCgpO1xyXG4vLyBcdFx0Y29uc3QgdHJpZ2dlciA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50O1xyXG4vLyBcdFx0aWYgKHRyaWdnZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkX21lZ2FfbWVudVwiKSkge1xyXG4vLyBcdFx0XHRwb3NpdGlvbk1lZ2FtZW51KHRyaWdnZXIpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdFx0Y29uc3QgdHJpZ2dlckxpbmsgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpO1xyXG4vLyBcdFx0Y29uc3Qgc3ViTmF2ID0gdHJpZ2dlci5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1tZW51XCIpO1xyXG4vLyBcdFx0Y29uc3QgcGFyZW50ID0gdHJpZ2dlci5wYXJlbnRFbGVtZW50O1xyXG4vLyBcdFx0aWYgKHRyaWdnZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwib3BlblwiKSkge1xyXG4vLyBcdFx0XHRpc0NsaWNrZWQgPSBmYWxzZTtcclxuLy8gXHRcdFx0c3ViTmF2LmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpO1xyXG4vLyBcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZShcInN1Yl9vcGVuXCIpO1xyXG4vLyBcdFx0XHR0cmlnZ2VyLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuXCIpO1xyXG4vLyBcdFx0XHR0cmlnZ2VyTGluay5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcbi8vIFx0XHRcdGlmIChwcmVmZXJzUmVkdWNlZCkge1xyXG4vLyBcdFx0XHRcdHN1Yk5hdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbi8vIFx0XHRcdH0gZWxzZSB7XHJcbi8vIFx0XHRcdFx0c3ViTmF2LmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIHNldERpc3BsYXlOb25lKTtcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0fSBlbHNlIHtcclxuLy8gXHRcdFx0aXNDbGlja2VkID0gdHJ1ZTtcclxuLy8gXHRcdFx0c3ViTmF2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbi8vIFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG4vLyBcdFx0XHRcdHN1Yk5hdi5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuLy8gXHRcdFx0XHQvL1RoaXMgaXMgYmVjYXVzZSBTYWZhcmkgc2VlbXMgdG8gcmVnaXN0ZXIgdGhlIHByb2dyYW1tYXRpYyBmb2N1cyBhcyBmb2N1cy12aXNpYmxlXHJcbi8vIFx0XHRcdFx0aWYgKCFlLnBvaW50ZXJUeXBlKSB7XHJcbi8vIFx0XHRcdFx0XHRzdWJOYXYuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgc2V0Rm9jdXMpO1xyXG4vLyBcdFx0XHRcdH1cclxuLy8gXHRcdFx0XHR0cmlnZ2VyTGluay5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuLy8gXHRcdFx0fSwgMTAwKTtcclxuXHJcbi8vIFx0XHRcdHBhcmVudC5jbGFzc0xpc3QuYWRkKFwic3ViX29wZW5cIik7XHJcbi8vIFx0XHRcdHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XHJcbi8vIFx0XHRcdHN1Yk5hdi5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjbG9zZU9uVGFiT3V0T3JFc2MpO1xyXG4vLyBcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGNsb3NlT25TY3JvbGwpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdH1cclxuXHJcbi8vIFx0ZnVuY3Rpb24gbWVudUhvdmVySGFuZGxlcihlKSB7XHJcbi8vIFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vIFx0XHRpZiAod2luZG93LmlubmVyV2lkdGggPCAxMjAwKSByZXR1cm47XHJcbi8vIFx0XHRpZiAoaXNDbGlja2VkKSByZXR1cm47XHJcbi8vIFx0XHRpZiAoaXNIb3ZlcmluZykgcmV0dXJuO1xyXG4vLyBcdFx0aXNIb3ZlcmluZyA9IHRydWU7XHJcbi8vIFx0XHRjbG9zZUFsbCgpO1xyXG4vLyBcdFx0Y29uc3QgdHJpZ2dlciA9IGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50O1xyXG4vLyBcdFx0aWYgKHRyaWdnZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWRkX21lZ2FfbWVudVwiKSkge1xyXG4vLyBcdFx0XHRwb3NpdGlvbk1lZ2FtZW51KHRyaWdnZXIpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdFx0Y29uc3QgdHJpZ2dlckxpbmsgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpO1xyXG4vLyBcdFx0Y29uc3Qgc3ViTmF2ID0gdHJpZ2dlci5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1tZW51XCIpO1xyXG4vLyBcdFx0Y29uc3QgcGFyZW50ID0gdHJpZ2dlci5wYXJlbnRFbGVtZW50O1xyXG4vLyBcdFx0c3ViTmF2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbi8vIFx0XHRzdWJOYXYuY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XHJcbi8vIFx0XHR0cmlnZ2VyTGluay5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuLy8gXHRcdHBhcmVudC5jbGFzc0xpc3QuYWRkKFwic3ViX29wZW5cIik7XHJcbi8vIFx0XHR0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xyXG4vLyBcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBjbG9zZU9uU2Nyb2xsKTtcclxuLy8gXHRcdHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4ge1xyXG4vLyBcdFx0XHRpc0hvdmVyaW5nID0gZmFsc2U7XHJcbi8vIFx0XHRcdGNsb3NlQWxsKCk7XHJcbi8vIFx0XHR9KTtcclxuLy8gXHR9XHJcbi8vIFx0ZnVuY3Rpb24gc2V0RGlzcGxheU5vbmUoZSkge1xyXG4vLyBcdFx0ZS50YXJnZXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4vLyBcdFx0ZS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgc2V0RGlzcGxheU5vbmUpO1xyXG4vLyBcdH1cclxuXHJcbi8vIFx0ZnVuY3Rpb24gc2V0Rm9jdXMoZSkge1xyXG4vLyBcdFx0ZS50YXJnZXQucXVlcnlTZWxlY3RvcihcImEsaW5wdXRcIikuZm9jdXMoKTtcclxuLy8gXHRcdGUudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIHNldEZvY3VzKTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdGZ1bmN0aW9uIGNsb3NlT25UYWJPdXRPckVzYyhlKSB7XHJcbi8vIFx0XHRpZiAoZS5rZXkgPT0gXCJFc2NhcGVcIikge1xyXG4vLyBcdFx0XHRlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjbG9zZU9uVGFiT3V0T3JFc2MpO1xyXG4vLyBcdFx0XHRpZiAoZS5zcmNFbGVtZW50LnRhZ05hbWUgPT0gXCJJTlBVVFwiKSB7XHJcbi8vIFx0XHRcdFx0ZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4vLyBcdFx0XHRcdFx0LnF1ZXJ5U2VsZWN0b3IoXCJhXCIpXHJcbi8vIFx0XHRcdFx0XHQuZm9jdXMoKTtcclxuLy8gXHRcdFx0XHRjbG9zZUFsbChcclxuLy8gXHRcdFx0XHRcdGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuLy8gXHRcdFx0XHQpO1xyXG4vLyBcdFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHRcdGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbi8vIFx0XHRcdFx0XHQucXVlcnlTZWxlY3RvcihcImFcIilcclxuLy8gXHRcdFx0XHRcdC5mb2N1cygpO1xyXG4vLyBcdFx0XHRcdGNsb3NlQWxsKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0fSBlbHNlIGlmIChlLmtleSA9PSBcIlRhYlwiKSB7XHJcbi8vIFx0XHRcdGxldCBwYXJlbnQgPSBlLnNyY0VsZW1lbnQuY2xvc2VzdChcIi5zdWItbWVudVwiKTtcclxuLy8gXHRcdFx0Ly9sZXQgZ3JhbmRwYXJlbnQgPSBwYXJlbnQuY2xvc2VzdChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpO1xyXG4vLyBcdFx0XHRsZXQgZmlyc3QgPSBwYXJlbnQuZmlyc3Q7XHJcbi8vIFx0XHRcdGxldCBsYXN0ID0gcGFyZW50Lmxhc3Q7XHJcbi8vIFx0XHRcdGlmIChlLnNoaWZ0S2V5KSB7XHJcbi8vIFx0XHRcdFx0aWYgKGUuc3JjRWxlbWVudCA9PSBmaXJzdCkge1xyXG4vLyBcdFx0XHRcdFx0Y2xvc2VBbGwocGFyZW50KTtcclxuLy8gXHRcdFx0XHRcdHBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjbG9zZU9uVGFiT3V0T3JFc2MpO1xyXG4vLyBcdFx0XHRcdH1cclxuLy8gXHRcdFx0fSBlbHNlIHtcclxuLy8gXHRcdFx0XHRpZiAoZS5zcmNFbGVtZW50ID09IGxhc3QpIHtcclxuLy8gXHRcdFx0XHRcdGNsb3NlQWxsKHBhcmVudCk7XHJcbi8vIFx0XHRcdFx0XHRwYXJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgY2xvc2VPblRhYk91dE9yRXNjKTtcclxuLy8gXHRcdFx0XHR9XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcbi8vIFx0ZnVuY3Rpb24gY2xvc2VPblNjcm9sbChlKSB7XHJcbi8vIFx0XHRjbG9zZUFsbCgpO1xyXG4vLyBcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBjbG9zZU9uU2Nyb2xsKTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdGZ1bmN0aW9uIGNsb3NlQWxsKGN1cnJlbnRTdWJOYXYgPSBudWxsKSB7XHJcblxyXG4vLyBcdFx0aXNDbGlja2VkID0gZmFsc2U7XHJcbi8vIFx0XHRpc0hvdmVyaW5nID0gZmFsc2U7XHJcbi8vIFx0XHRzdWJOYXZUcmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XHJcbi8vIFx0XHRcdHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XHJcbi8vIFx0XHRcdGNvbnN0IHRyaWdnZXJMaW5rID0gdHJpZ2dlci5xdWVyeVNlbGVjdG9yKFwiYVwiKTtcclxuLy8gXHRcdFx0dHJpZ2dlci5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzdWJfb3BlblwiKTtcclxuLy8gXHRcdFx0Y29uc3Qgc3ViTmF2ID0gdHJpZ2dlci5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1tZW51XCIpO1xyXG4vLyBcdFx0XHRzdWJOYXYuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XHJcbi8vIFx0XHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuLy8gXHRcdFx0aWYgKHN1Yk5hdiA9PSBjdXJyZW50U3ViTmF2KSB7XHJcbi8vIFx0XHRcdFx0aWYgKHByZWZlcnNSZWR1Y2VkKSB7XHJcbi8vIFx0XHRcdFx0XHRzdWJOYXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4vLyBcdFx0XHRcdH0gZWxzZSB7XHJcbi8vIFx0XHRcdFx0XHRzdWJOYXYuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgc2V0RGlzcGxheU5vbmUpO1xyXG4vLyBcdFx0XHRcdH1cclxuLy8gXHRcdFx0fSBlbHNlIHtcclxuLy8gXHRcdFx0XHRzdWJOYXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHR9KTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdGZ1bmN0aW9uIHBvc2l0aW9uTWVnYW1lbnUodHJpZ2dlcikge1xyXG4vLyBcdFx0Y29uc3Qgc3ViTmF2ID0gdHJpZ2dlci5xdWVyeVNlbGVjdG9yKFwiLnN1Yi1tZW51XCIpO1xyXG4vLyBcdFx0Y29uc3QgdHJpZ2dlclJlY3QgPSB0cmlnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4vLyBcdFx0Y29uc3QgdHJpZ2dlckxlZnQgPSB0cmlnZ2VyUmVjdC5sZWZ0O1xyXG4vLyBcdFx0Y29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuLy8gXHRcdGNvbnN0IG9mZnNldCA9IHRyaWdnZXJMZWZ0IC0gd2luZG93V2lkdGggLyAyO1xyXG4vLyBcdFx0c3ViTmF2LnN0eWxlLmxlZnQgPSBgLSR7b2Zmc2V0fXB4YDtcclxuLy8gXHR9XHJcbi8vIH07XHJcblxyXG4vLyBjb25zdCBuYXZTY3JvbGxXYXRjaGVyID0gKCkgPT4ge1xyXG4vLyBcdGxldCBoZWFkZXJ3cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaXRlLWhlYWRlci5kZXNrdG9wX29ubHlcIik7XHJcbi8vIFx0dmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoaGVhZGVyd3JhcCk7XHJcbi8vIFx0aWYgKHN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xyXG4vLyBcdFx0aGVhZGVyd3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2l0ZS1oZWFkZXIubW9iaWxlX29ubHlcIik7XHJcbi8vIFx0fSBlbHNlIHtcclxuXHJcbi8vIFx0fVxyXG5cclxuLy8gXHRjb25zdCBzZWFyY2hDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdi1zZWFyY2gtZm9ybVwiKTtcclxuLy8gXHRsZXQgbGFzdFNjcm9sbFRvcCA9IDA7XHJcblxyXG4vLyBcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGVhZGVyc2xpZGUpO1xyXG5cclxuLy8gXHRmdW5jdGlvbiBoZWFkZXJzbGlkZSgpIHtcclxuLy8gXHRcdGlmIChzZWFyY2hDb250YWluZXIgJiYgc2VhcmNoQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcIm9wZW5fc2VhcmNoXCIpKSB7XHJcbi8vIFx0XHRcdHNlYXJjaENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwib3Blbl9zZWFyY2hcIik7XHJcbi8vIFx0XHR9XHJcbi8vIFx0XHRsZXQgc3QgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuLy8gXHRcdGlmIChzdCA+PSAyMDAgJiYgc3QgPD0gNDAwKSB7XHJcbi8vIFx0XHRcdGhlYWRlcndyYXAuY2xhc3NMaXN0LmFkZChcImFkZEZpeGVkXCIpO1xyXG4vLyBcdFx0XHRoZWFkZXJ3cmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZUluRG93blwiLCBcInNsaWRlT3V0XCIpO1xyXG4vLyBcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1lbnUtdmlzaWJsZVwiKTtcclxuLy8gXHRcdH0gZWxzZSBpZiAoc3QgPiA0MDAgJiYgc3QgPD0gNjAwKSB7XHJcbi8vIFx0XHRcdGhlYWRlcndyYXAuY2xhc3NMaXN0LmFkZChcInNsaWRlT3V0XCIpO1xyXG4vLyBcdFx0XHRpZiAoc3QgPCBsYXN0U2Nyb2xsVG9wKSB7XHJcbi8vIFx0XHRcdFx0aGVhZGVyd3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwic2xpZGVJbkRvd25cIik7XHJcbi8vIFx0XHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtZW51LXZpc2libGVcIik7XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdH0gZWxzZSBpZiAoc3QgPiA2MDAgJiYgc3QgPCBsYXN0U2Nyb2xsVG9wKSB7XHJcbi8vIFx0XHRcdGhlYWRlcndyYXAuY2xhc3NMaXN0LmFkZChcInNsaWRlT3V0XCIsIFwic2xpZGVJbkRvd25cIik7XHJcbi8vIFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibWVudS12aXNpYmxlXCIpO1xyXG4vLyBcdFx0fSBlbHNlIGlmIChzdCA+IDYwMCAmJiBzdCA+IGxhc3RTY3JvbGxUb3ApIHtcclxuLy8gXHRcdFx0aGVhZGVyd3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwic2xpZGVJbkRvd25cIik7XHJcbi8vIFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibWVudS12aXNpYmxlXCIpO1xyXG4vLyBcdFx0fSBlbHNlIHtcclxuLy8gXHRcdFx0aGVhZGVyd3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwic2xpZGVJbkRvd25cIiwgXCJzbGlkZU91dFwiLCBcImFkZEZpeGVkXCIpO1xyXG4vLyBcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1lbnUtdmlzaWJsZVwiKTtcclxuLy8gXHRcdH1cclxuLy8gXHRcdGxhc3RTY3JvbGxUb3AgPSBzdDtcclxuLy8gXHR9XHJcbi8vIH07XHJcblxyXG4vLyBjb25zdCBtZWdhTWVudSA9ICgpID0+IHtcclxuLy8gXHRjb25zdCBtZWdhTWVudUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbi8vIFx0XHRcIiNwcmltYXJ5LW1lbnUgbGkuYWRkX21lZ2FfbWVudSB1bFwiXHJcbi8vIFx0KTtcclxuLy8gXHRpZiAoIW1lZ2FNZW51Q29udGFpbmVyKSByZXR1cm47XHJcbi8vIFx0Y29uc3QgbWVnYU1lbnVNb2JpbGVDT250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4vLyBcdFx0XCIjbW9iaWxlLW1lbnUgbGkuYWRkX21lZ2FfbWVudSB1bFwiXHJcbi8vIFx0KTtcclxuLy8gXHRjb25zdCBtZWdhTWVudUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lZ2FtZW51XCIpO1xyXG4vLyBcdGNvbnN0IG1lZ2FDbG9uZSA9IG1lZ2FNZW51Q29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcbi8vIFx0bWVnYU1lbnVDb250YWluZXIuYXBwZW5kQ2hpbGQobWVnYU1lbnVDb250ZW50KTtcclxuLy8gXHRtZWdhTWVudU1vYmlsZUNPbnRhaW5lci5hcHBlbmRDaGlsZChtZWdhQ2xvbmUpO1xyXG4vLyBcdG1lZ2FNZW51Q29udGVudC5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XHJcbi8vIFx0bWVnYUNsb25lLnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcclxuLy8gfTtcclxuXHJcbi8vIGZ1bmN0aW9uIG5hdk5vdGljZSgpIHtcclxuLy8gXHRsZXQgbm90aWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNub3RpY2VcIik7XHJcbi8vIFx0aWYgKCFub3RpY2UpIHJldHVybjtcclxuLy8gXHRsZXQgbm90aWNlQnV0dG9uID0gbm90aWNlLnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2Vfbm90aWNlXCIpO1xyXG4vLyBcdG5vdGljZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuLy8gXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gXHRcdG5vdGljZS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcclxuLy8gXHRcdGxldCBjb29raWVOYW1lID0gYG5vdGljZV9jbG9zZWRfJHtub3RpY2UuZGF0YXNldC5ub3RpY2V9YDtcclxuLy8gXHRcdGxldCBkYXRlID0gbmV3IERhdGUoKTtcclxuLy8gXHRcdGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIDMwKVxyXG4vLyBcdFx0bGV0IGV4cGlyZXMgPSBkYXRlLnRvVVRDU3RyaW5nKCk7XHJcbi8vIFx0XHRkb2N1bWVudC5jb29raWUgPSBgJHtjb29raWVOYW1lfT0xOyBleHBpcmVzPSR7ZXhwaXJlc307IHBhdGg9LztgO1xyXG4vLyBcdFx0bm90aWNlQnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xyXG5cclxuLy8gXHR9KTtcclxuLy8gfVxyXG4vLyBleHBvcnQgeyBoYW1idXJnZXJUb2dnbGUsIGR5bmFtaWNWSCwgbmF2aWdhdGlvbiwgbmF2U2Nyb2xsV2F0Y2hlciwgbWVnYU1lbnUsIG5hdk5vdGljZSB9O1xyXG5leHBvcnQgeyBoYW1idXJnZXJUb2dnbGUsIGhhbWJ1cmdlclRvZ2dsZU1vYmlsZSB9O1xyXG4iLCJpbXBvcnQge1xyXG5cdC8vIG5hdmlnYXRpb24sXHJcblx0Ly8gZHluYW1pY1ZILFxyXG5cdC8vIG5hdlNjcm9sbFdhdGNoZXIsXHJcblx0Ly8gbWVnYU1lbnUsXHJcblx0Ly8gbmF2Tm90aWNlLFxyXG5cdGhhbWJ1cmdlclRvZ2dsZSxcclxuXHRoYW1idXJnZXJUb2dnbGVNb2JpbGVcclxufSBmcm9tIFwiLi9qcy9uYXZpZ2F0aW9uLmpzXCI7XHJcblxyXG4vLyBpbXBvcnQge1xyXG4vLyBcdGZpbHRlcnMsXHJcbi8vIFx0ZGlzY292ZXJGaWx0ZXIsXHJcbi8vIFx0c2hvd01vcmUsXHJcbi8vIFx0anVtcEZpbHRlcnMsXHJcbi8vIFx0c2hvcEJ5Q2F0ZWdvcnksXHJcbi8vIH0gZnJvbSBcIi4vanMvZmlsdGVycy5qc1wiO1xyXG5cclxuLy9pbXBvcnQge3N3aXRjaGVzLGFsdEJsb2NrLGxhbmd1YWdlU3dpdGNoZXJ9IGZyb20gXCIuL2pzL2FjY2Vzc2liaWxpdHkuanNcIjtcclxuLy9pbXBvcnQgcGxheWVyV2l0aENvdmVyIGZyb20gXCIuL2pzL3BsYXllci5qc1wiO1xyXG4vLyBpbXBvcnQge1xyXG4vLyBcdGZvcm1IYW5kbGVyLFxyXG4vLyBcdGZvcm1Td2l0Y2hlcixcclxuLy8gfSBmcm9tIFwiLi9qcy9mb3Jtcy5qc1wiO1xyXG4vLyBpbXBvcnQgc3dpcGVyX2luaXQgZnJvbSBcIi4vanMvc3dpcGVyLWluaXQuanNcIjtcclxuLy8gaW1wb3J0IGxpZ2h0Ym94IGZyb20gXCIuL2pzL2xpZ2h0Ym94LmpzXCI7XHJcbi8vIGltcG9ydCBhY2NvcmRpb24gZnJvbSBcIi4vanMvYWNjb3JkaW9uLmpzXCI7XHJcbi8vIGltcG9ydCBtb2RhbEhhbmRsZXJzIGZyb20gXCIuL2pzL21vZGFsLmpzXCI7XHJcbi8vaW1wb3J0IHNoYXJPbk1vYmlsZSBmcm9tIFwiLi9qcy9zb2NpYWwuanNcIjtcclxuLy9pbXBvcnQgdGFiSGFuZGxlcnMgZnJvbSBcIi4vanMvdGFicy5qc1wiO1xyXG4vLyBpbXBvcnQgeyBvc19zaG93cm9vbV9tYXAgfSBmcm9tIFwiLi9qcy9tYXAuanNcIjtcclxuLy8gaW1wb3J0IGNhcmRMaW5rcyBmcm9tIFwiLi9qcy9jYXJkcy5qc1wiO1xyXG4vL2ltcG9ydCB0aW1ldGFibGVIYW5kbGVyIGZyb20gXCIuL2pzL3RpbWV0YWJsZS5qc1wiO1xyXG5cclxuLy9pbXBvcnQgYmFza2V0IGZyb20gXCIuL2pzL2Jhc2tldC5qc1wiO1xyXG4vL2ltcG9ydCBjcm9zc1NlbGwgZnJvbSBcIi4vanMvY3Jvc3NzZWxscy5qc1wiO1xyXG5cclxuLy8gZHluYW1pY1ZIKCk7XHJcbi8vIG1lZ2FNZW51KCk7XHJcbi8vIG5hdmlnYXRpb24oKTtcclxuLy8gbmF2U2Nyb2xsV2F0Y2hlcigpO1xyXG4vLyBuYXZOb3RpY2UoKTtcclxuaGFtYnVyZ2VyVG9nZ2xlKCk7XHJcbmhhbWJ1cmdlclRvZ2dsZU1vYmlsZSgpO1xyXG5cclxuLy8gb3Nfc2hvd3Jvb21fbWFwKCk7XHJcbi8vIGNhcmRMaW5rcygpO1xyXG4vL2xhbmd1YWdlU3dpdGNoZXIoKTtcclxuLy9zd2l0Y2hlcygpO1xyXG4vL2FsdEJsb2NrKCk7XHJcblxyXG4vLyBmaWx0ZXJzKCk7XHJcbi8vIGp1bXBGaWx0ZXJzKCk7XHJcbi8vIHNob3BCeUNhdGVnb3J5KCk7XHJcbi8vIGRpc2NvdmVyRmlsdGVyKCk7XHJcbi8vIHNob3dNb3JlKCk7XHJcbi8vIHBsYXllcldpdGhDb3ZlcigpO1xyXG4vLyBmb3JtSGFuZGxlcigpO1xyXG4vLyBmb3JtU3dpdGNoZXIoKTtcclxuLy8gc3dpcGVyX2luaXQoKTtcclxuLy8gbGlnaHRib3goKTtcclxuLy8gYWNjb3JkaW9uKCk7XHJcbi8vIG1vZGFsSGFuZGxlcnMoKTtcclxuXHJcbi8vdGltZXRhYmxlSGFuZGxlcigpO1xyXG4vL3NoYXJPbk1vYmlsZSgpO1xyXG5cclxuIl19

//# sourceMappingURL=scripts.js.map
