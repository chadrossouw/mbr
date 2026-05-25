(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mobileNavToggle = exports.hamburgerToggleMobile = exports.hamburgerToggle = void 0;
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

    // if (nav.style.visibility === "visible") {
    // 	nav.style.visibility = "hidden";
    // } else {
    // 	nav.style.visibility = "visible";
    // }
    nav.classList.add("show");
  });
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !button.contains(e.target)) {
      // nav.style.visibility = "hidden";
    }
  });
};

//Very New after redesign
var mobileNavToggle = exports.mobileNavToggle = function mobileNavToggle() {
  var button = document.querySelector("#hamburger_mobile");
  var nav = document.querySelector("#mobile_nav");
  var close = document.querySelector("#close-menu-btn");
  if (!button || !nav) return;
  button.addEventListener("click", function (e) {
    e.stopPropagation();
    nav.classList.add("show");
  });
  close.addEventListener("click", function (e) {
    e.stopPropagation();
    nav.classList.remove("show");
  });
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !button.contains(e.target)) {
      nav.classList.remove("show");
    }
  });
};

//export { mobileNavToggle };

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
(0, _navigation.mobileNavToggle)();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbmF2aWdhdGlvbi5qcyIsInNyYy9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLGVBQWUsR0FBQSxPQUFBLENBQUEsZUFBQSxHQUFHLFNBQWxCLGVBQWUsQ0FBQSxFQUFTO0VBRTdCLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENB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QyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQ3pCO01BQ0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzdCO0VBRUQsQ0FBQyxDQUFDO0FBRUgsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7O0FDM2dCQSxJQUFBLFdBQUEsR0FBQSxPQUFBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUEsMkJBQWUsRUFBQyxDQUFDO0FBQ2pCLElBQUEsaUNBQXFCLEVBQUMsQ0FBQztBQUN2QixJQUFBLDJCQUFlLEVBQUMsQ0FBQzs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qKlxyXG4gKiBGaWxlIG5hdmlnYXRpb24uanMuXHJcbiAqXHJcbiAqIEhhbmRsZXMgdG9nZ2xpbmcgdGhlIG5hdmlnYXRpb24gbWVudSBmb3Igc21hbGwgc2NyZWVucyBhbmQgZW5hYmxlcyBUQUIga2V5XHJcbiAqIG5hdmlnYXRpb24gc3VwcG9ydCBmb3IgZHJvcGRvd24gbWVudXMuXHJcbiAqL1xyXG4vLyBjbGFzcyBOYXZNZW51IHtcclxuLy8gXHRjb25zdHJ1Y3RvcihtZW51LCBidXR0b24pIHtcclxuLy8gXHRcdHRoaXMubWVudSA9IG1lbnU7XHJcbi8vIFx0XHR0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcclxuLy8gXHRcdHRoaXMuZmlyc3RGb2N1c2FibGUgPSBidXR0b247XHJcbi8vIFx0XHR0aGlzLmxhc3RGb2N1c2FibGUgPSB0aGlzLmdldExhc3RGb2N1c2FibGUoKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZU1lbnUuYmluZCh0aGlzKSk7XHJcbi8vIFx0XHR0aGlzLm1lbnVJc09wZW4gPSBmYWxzZTtcclxuLy8gXHRcdHRoaXMudHJhbnNpdGlvbkVuZElzQWRkZWQgPSBmYWxzZTtcclxuLy8gXHRcdHRoaXMucHJlZmVyc1JlZHVjZWQgPVxyXG4vLyBcdFx0XHR3aW5kb3cubWF0Y2hNZWRpYShgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlgKSA9PT0gdHJ1ZSB8fFxyXG4vLyBcdFx0XHR3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpLm1hdGNoZXMgPT0gdHJ1ZTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdHRvZ2dsZU1lbnUoZSkge1xyXG4vLyBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyBcdFx0YWxlcnQoJ1dvcmtzJyk7XHJcbi8vIFx0XHRpZiAodGhpcy5tZW51SXNPcGVuKSB7XHJcbi8vIFx0XHRcdHRoaXMuY2xvc2VNZW51KCk7XHJcbi8vIFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHR0aGlzLm9wZW5NZW51KCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRvcGVuTWVudSgpIHtcclxuXHJcbi8vIFx0XHR0aGlzLm1lbnVJc09wZW4gPSB0cnVlO1xyXG4vLyBcdFx0dGhpcy5tZW51LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuLy8gXHRcdHRoaXMubWVudS5jbGFzc0xpc3QuYWRkKFwidG9nZ2xlZFwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJpcy1hY3RpdmVcIik7XHJcbi8vIFx0XHR0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuLy8gXHRcdHRoaXMuZmlyc3RGb2N1c2FibGUuZm9jdXMoKTtcclxuLy8gXHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsLWxvY2tcIik7XHJcbi8vIFx0XHR0aGlzLm1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHRoaXMuZm9jdXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4vLyBcdFx0dGhpcy5tZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuZXNjSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdGNsb3NlTWVudSgpIHtcclxuLy8gXHRcdHRoaXMubWVudUlzT3BlbiA9IGZhbHNlO1xyXG4vLyBcdFx0dGhpcy5tZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGVkXCIpO1xyXG4vLyBcdFx0dGhpcy5idXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmZvY3VzKCk7XHJcbi8vIFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNjcm9sbC1sb2NrXCIpO1xyXG4vLyBcdFx0dGhpcy5tZW51LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCB0aGlzLmZvY3VzSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuLy8gXHRcdHRoaXMubWVudS5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmVzY0hhbmRsZXIuYmluZCh0aGlzKSk7XHJcbi8vIFx0XHRjb25zdCBjbG9zZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwibWVudV9jbG9zZWRcIiwge1xyXG4vLyBcdFx0XHRkZXRhaWw6IHsgbWVudTogdGhpcy5tZW51IH0sXHJcbi8vIFx0XHR9KTtcclxuLy8gXHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KGNsb3NlRXZlbnQpO1xyXG4vLyBcdFx0aWYgKHRoaXMucHJlZmVyc1JlZHVjZWQpIHtcclxuLy8gXHRcdFx0YWxlcnQoXCJ0aGlzXCIpO1xyXG4vLyBcdFx0XHR0aGlzLmhpZGVWaXNpYmlsaXR5T25FbmQoKTtcclxuLy8gXHRcdFx0cmV0dXJuO1xyXG4vLyBcdFx0fVxyXG4vLyBcdFx0aWYgKCF0aGlzLnRyYW5zaXRpb25FbmRJc0FkZGVkKSB7XHJcbi8vIFx0XHRcdHRoaXMubWVudS5hZGRFdmVudExpc3RlbmVyKFxyXG4vLyBcdFx0XHRcdFwidHJhbnNpdGlvbmVuZFwiLFxyXG4vLyBcdFx0XHRcdHRoaXMuaGlkZVZpc2liaWxpdHlPbkVuZCh0aGlzKVxyXG4vLyBcdFx0XHQpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdH1cclxuXHJcbi8vIFx0aGlkZVZpc2liaWxpdHlPbkVuZCgpIHtcclxuLy8gXHRcdGlmICh0aGlzLm1lbnVJc09wZW4pIHJldHVybjtcclxuLy8gXHRcdHRoaXMubWVudS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuLy8gXHRcdHRoaXMubWVudS5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4vLyBcdFx0XHRcInRyYW5zaXRpb25lbmRcIixcclxuLy8gXHRcdFx0dGhpcy5oaWRlVmlzaWJpbGl0eU9uRW5kLmJpbmQodGhpcylcclxuLy8gXHRcdCk7XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRjbG9zZU1lbnVDbGVhbigpIHtcclxuLy8gXHRcdHRoaXMubWVudS5jbGFzc0xpc3QucmVtb3ZlKFwidG9nZ2xlZFwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcbi8vIFx0XHR0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcbi8vIFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNjcm9sbC1sb2NrXCIpO1xyXG4vLyBcdFx0aWYgKHRoaXMucHJlZmVyc1JlZHVjZWQpIHtcclxuLy8gXHRcdFx0dGhpcy5oaWRlVmlzaWJpbGl0eU9uRW5kKCk7XHJcbi8vIFx0XHRcdHJldHVybjtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcblxyXG4vLyBcdGdldExhc3RGb2N1c2FibGUoKSB7XHJcbi8vIFx0XHRsZXQgZm9jdXNhYmxlID0gW107XHJcbi8vIFx0XHRsZXQgYWxsRGVzY2VuZGFudHMgPSB0aGlzLm1lbnUucXVlcnlTZWxlY3RvckFsbChcIipcIik7XHJcbi8vIFx0XHRhbGxEZXNjZW5kYW50cy5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4vLyBcdFx0XHRpZiAodGhpcy5pc0ZvY3VzYWJsZShjaGlsZCkpIHtcclxuLy8gXHRcdFx0XHRmb2N1c2FibGUucHVzaChjaGlsZCk7XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdH0pO1xyXG4vLyBcdFx0cmV0dXJuIGZvY3VzYWJsZVtmb2N1c2FibGUubGVuZ3RoIC0gMV07XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRpc0ZvY3VzYWJsZShlbGVtZW50KSB7XHJcbi8vIFx0XHRpZiAoZWxlbWVudC50YWJJbmRleCA8IDApIHtcclxuLy8gXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4vLyBcdFx0fVxyXG5cclxuLy8gXHRcdGlmIChlbGVtZW50LmRpc2FibGVkKSB7XHJcbi8vIFx0XHRcdHJldHVybiBmYWxzZTtcclxuLy8gXHRcdH1cclxuLy8gXHRcdGlmICghZWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcclxuLy8gXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4vLyBcdFx0fVxyXG4vLyBcdFx0c3dpdGNoIChlbGVtZW50Lm5vZGVOYW1lKSB7XHJcbi8vIFx0XHRcdGNhc2UgXCJBXCI6XHJcbi8vIFx0XHRcdFx0cmV0dXJuICEhZWxlbWVudC5ocmVmICYmIGVsZW1lbnQucmVsICE9IFwiaWdub3JlXCI7XHJcbi8vIFx0XHRcdGNhc2UgXCJJTlBVVFwiOlxyXG4vLyBcdFx0XHRcdHJldHVybiBlbGVtZW50LnR5cGUgIT0gXCJoaWRkZW5cIjtcclxuLy8gXHRcdFx0Y2FzZSBcIkJVVFRPTlwiOlxyXG4vLyBcdFx0XHRjYXNlIFwiU0VMRUNUXCI6XHJcbi8vIFx0XHRcdGNhc2UgXCJURVhUQVJFQVwiOlxyXG4vLyBcdFx0XHRcdHJldHVybiB0cnVlO1xyXG4vLyBcdFx0XHRkZWZhdWx0OlxyXG4vLyBcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcblxyXG4vLyBcdGZvY3VzSGFuZGxlcihlKSB7XHJcbi8vIFx0XHRpZiAoXHJcbi8vIFx0XHRcdGUudGFyZ2V0ID09IHRoaXMubGFzdEZvY3VzYWJsZSAmJlxyXG4vLyBcdFx0XHQhdGhpcy5tZW51LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldClcclxuLy8gXHRcdCkge1xyXG4vLyBcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vIFx0XHRcdHRoaXMuZmlyc3RGb2N1c2FibGUuZm9jdXMoKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcblxyXG4vLyBcdGVzY0hhbmRsZXIoZSkge1xyXG4vLyBcdFx0aWYgKGUua2V5ID09IFwiRXNjYXBlXCIpIHtcclxuLy8gXHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcbi8vIH1cclxuXHJcbmNvbnN0IGhhbWJ1cmdlclRvZ2dsZSA9ICgpID0+IHtcclxuXHJcblx0Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciNtYXN0aGVhZCAuaGVhZGVyIC5oYW1idXJnZXJfY29udGFpbmVyIGJ1dHRvbiNoYW1idXJnZXJcIik7XHJcblx0Y29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciNtYXN0aGVhZDpub3QoOmhhcyh+IC5ob21lLXBhZ2UpKSAjc2l0ZS1uYXZpZ2F0aW9uXCIpO1xyXG5cclxuXHRpZiAoIWJ1dHRvbiB8fCAhbmF2KSByZXR1cm47XHJcblxyXG5cdC8vIFRvZ2dsZSBuYXYgb24gYnV0dG9uIGNsaWNrXHJcblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcclxuXHJcblx0XHQvLyBPcHRpb25hbDogYWRkIGJvcmRlciB0byB0ZXN0XHJcblx0XHQvL2J1dHRvbi5zdHlsZS5ib3JkZXIgPSBuYXYuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSA/IFwiMnB4IHNvbGlkIHJlZFwiIDogXCJcIjtcclxuXHR9KTtcclxuXHJcblx0Ly8gQ2xvc2UgbmF2IHdoZW4gY2xpY2tpbmcgb3V0c2lkZVxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cdFx0aWYgKCFuYXYuY29udGFpbnMoZS50YXJnZXQpICYmICFidXR0b24uY29udGFpbnMoZS50YXJnZXQpKSB7XHJcblx0XHRcdG5hdi5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcclxuXHRcdFx0Ly9idXR0b24uc3R5bGUuYm9yZGVyID0gXCJcIjsgLy8gcmVtb3ZlIHRlc3QgYm9yZGVyXHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG5jb25zdCBoYW1idXJnZXJUb2dnbGVNb2JpbGUgPSAoKSA9PiB7XHJcblxyXG5cdGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIjbWFzdGhlYWQuYmdfbGlnaHRfZ3JheS5tb2JpbGVfb25seSAuaGVhZGVyIC5oYW1idXJnZXJfY29udGFpbmVyIGJ1dHRvbiNoYW1idXJnZXJfbW9iaWxlXCIpO1xyXG5cdGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIjbWFzdGhlYWQuYmdfbGlnaHRfZ3JheS5tb2JpbGVfb25seTpub3QoOmhhcyh+IC5ob21lLXBhZ2UpKSAjbW9iaWxlX25hdlwiKTtcclxuXHJcblx0aWYgKCFidXR0b24gfHwgIW5hdikgcmV0dXJuO1xyXG5cclxuXHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdC8vIGlmIChuYXYuc3R5bGUudmlzaWJpbGl0eSA9PT0gXCJ2aXNpYmxlXCIpIHtcclxuXHRcdC8vIFx0bmF2LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG5cdFx0Ly8gfSBlbHNlIHtcclxuXHRcdC8vIFx0bmF2LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuXHRcdC8vIH1cclxuXHRcdG5hdi5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuXHR9KTtcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcblx0XHRpZiAoIW5hdi5jb250YWlucyhlLnRhcmdldCkgJiYgIWJ1dHRvbi5jb250YWlucyhlLnRhcmdldCkpIHtcclxuXHRcdFx0Ly8gbmF2LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFxyXG59O1xyXG5cclxuLy9WZXJ5IE5ldyBhZnRlciByZWRlc2lnblxyXG5jb25zdCBtb2JpbGVOYXZUb2dnbGUgPSAoKSA9PiB7XHJcblxyXG5cdGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGFtYnVyZ2VyX21vYmlsZVwiKTtcclxuXHRjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vYmlsZV9uYXZcIik7XHJcblx0Y29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb3NlLW1lbnUtYnRuXCIpXHJcblxyXG5cdGlmICghYnV0dG9uIHx8ICFuYXYpIHJldHVybjtcclxuXHJcblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRuYXYuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XHJcblx0fSk7XHJcblxyXG5cdGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRuYXYuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcblx0fSk7XHJcblxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cclxuXHRcdGlmIChcclxuXHRcdFx0IW5hdi5jb250YWlucyhlLnRhcmdldCkgJiZcclxuXHRcdFx0IWJ1dHRvbi5jb250YWlucyhlLnRhcmdldClcclxuXHRcdCkge1xyXG5cdFx0XHRuYXYuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcblx0XHR9XHJcblxyXG5cdH0pO1xyXG5cclxufTtcclxuXHJcbi8vZXhwb3J0IHsgbW9iaWxlTmF2VG9nZ2xlIH07XHJcblxyXG4vLyAvLyBFbnN1cmUgaXQgcnVucyBhZnRlciBET00gbG9hZGVkXHJcbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGhhbWJ1cmdlclRvZ2dsZSk7XHJcblxyXG4vLyBjb25zdCBkeW5hbWljVkggPSAoKSA9PiB7XHJcbi8vIFx0c2V0RG9jSGVpZ2h0KCk7XHJcbi8vIFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2V0RG9jSGVpZ2h0KTtcclxuLy8gXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIHNldERvY0hlaWdodCk7XHJcblxyXG4vLyBcdGZ1bmN0aW9uIHNldERvY0hlaWdodCgpIHtcclxuLy8gXHRcdGNvbnNvbGUubG9nKFwic2V0IGRvYyBoZWlnaHRcIik7XHJcbi8vIFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXHJcbi8vIFx0XHRcdFwiLS12aFwiLFxyXG4vLyBcdFx0XHRgJHt3aW5kb3cuaW5uZXJIZWlnaHQgLyAxMDB9cHhgXHJcbi8vIFx0XHQpO1xyXG4vLyBcdH1cclxuLy8gfTtcclxuXHJcbi8vIGNvbnN0IG5hdmlnYXRpb24gPSAoKSA9PiB7XHJcbi8vIFx0YWxlcnQoJ3lleScpO1xyXG4vLyBcdGxldCBpc0hvdmVyaW5nID0gZmFsc2U7XHJcbi8vIFx0bGV0IGlzQ2xpY2tlZCA9IGZhbHNlO1xyXG4vLyBcdGNvbnN0IHNpdGVOYXZpZ2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2JpbGVfbmF2XCIpO1xyXG4vLyBcdGNvbnN0IGJ1dHRvbkhhbWJ1cmdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGFtYnVyZ2VyX21vYmlsZVwiKTtcclxuLy8gXHRsZXQgbmF2TWVudSA9IG5ldyBOYXZNZW51KHNpdGVOYXZpZ2F0aW9uLCBidXR0b25IYW1idXJnZXIpO1xyXG5cclxuLy8gXHRsZXQgbmF2SGVhZGVySnVtcExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuLy8gXHRcdFwiLmhlYWRlci1qdW1wLWxpbmssI21hc3RoZWFkIC5ic2wgYSwgI3NpdGUtcmVnaXN0cmF0aW9uIGFcIlxyXG4vLyBcdCk7XHJcbi8vIFx0aWYgKG5hdkhlYWRlckp1bXBMaW5rcy5sZW5ndGgpIHtcclxuLy8gXHRcdG5hdkhlYWRlckp1bXBMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XHJcbi8vIFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG5hdk1lbnUuY2xvc2VNZW51Q2xlYW4uYmluZChuYXZNZW51KSk7XHJcbi8vIFx0XHR9KTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdGNvbnN0IG1vYmlsZVN1Yk5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2X3NlbGVjdFwiKTtcclxuLy8gXHRpZiAobW9iaWxlU3ViTmF2KSB7XHJcbi8vIFx0XHRtb2JpbGVTdWJOYXYuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4vLyBcdFx0XHRpZiAoZS50YXJnZXQudmFsdWUpIHtcclxuLy8gXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGUudGFyZ2V0LnZhbHVlO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHR9KTtcclxuLy8gXHR9XHJcbi8vIFx0bGV0IHN1Yk5hdlRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpO1xyXG4vLyBcdGxldCBwcmVmZXJzUmVkdWNlZCA9XHJcbi8vIFx0XHR3aW5kb3cubWF0Y2hNZWRpYShgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlgKSA9PT0gdHJ1ZSB8fFxyXG4vLyBcdFx0d2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKS5tYXRjaGVzID09IHRydWU7XHJcbi8vIFx0aWYgKHN1Yk5hdlRyaWdnZXJzLmxlbmd0aCkge1xyXG4vLyBcdFx0c3ViTmF2VHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlciwgaSkgPT4ge1xyXG4vLyBcdFx0XHRjb25zdCB0cmlnZ2VyTGluayA9IHRyaWdnZXIucXVlcnlTZWxlY3RvcihcImFcIik7XHJcbi8vIFx0XHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XHJcbi8vIFx0XHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuLy8gXHRcdFx0dHJpZ2dlckxpbmsuc2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiLCBcInN1Yi1tZW51LVwiICsgaSk7XHJcbi8vIFx0XHRcdGNvbnN0IGJhY2tMaW5rID0gdHJpZ2dlci5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtaXRlbS1iYWNrLWxpbmtcIik7XHJcbi8vIFx0XHRcdGNvbnN0IHN1Yk5hdiA9IHRyaWdnZXIucXVlcnlTZWxlY3RvcihcIi5zdWItbWVudVwiKTtcclxuLy8gXHRcdFx0c3ViTmF2LmlkID0gXCJzdWItbWVudS1cIiArIGk7XHJcbi8vIFx0XHRcdHN1Yk5hdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbi8vIFx0XHRcdGNvbnN0IHN1Yk5hdkxpbmtzID0gc3ViTmF2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJhLCBpbnB1dFwiKTtcclxuLy8gXHRcdFx0aWYgKHN1Yk5hdkxpbmtzLmxlbmd0aCkge1xyXG4vLyBcdFx0XHRcdHN1Yk5hdi5maXJzdCA9IHN1Yk5hdkxpbmtzWzBdO1xyXG4vLyBcdFx0XHRcdHN1Yk5hdi5sYXN0ID0gc3ViTmF2TGlua3Nbc3ViTmF2TGlua3MubGVuZ3RoIC0gMV07XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdFx0dHJpZ2dlckxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1lbnVDbGlja0hhbmRsZXIpO1xyXG4vLyBcdFx0XHR0cmlnZ2VyTGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBtZW51SG92ZXJIYW5kbGVyKTtcclxuLy8gXHRcdFx0aWYgKGJhY2tMaW5rKSB7XHJcbi8vIFx0XHRcdFx0YmFja0xpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbi8vIFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vIFx0XHRcdFx0XHRjbG9zZUFsbCh0cmlnZ2VyKTtcclxuLy8gXHRcdFx0XHR9KTtcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0fSk7XHJcbi8vIFx0fVxyXG4vLyBcdGZ1bmN0aW9uIG1lbnVDbGlja0hhbmRsZXIoZSkge1xyXG4vLyBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyBcdFx0aWYgKGlzSG92ZXJpbmcpIHJldHVybjtcclxuLy8gXHRcdC8vIGNsb3NlQWxsKCk7XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQ7XHJcbi8vIFx0XHRpZiAodHJpZ2dlci5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGRfbWVnYV9tZW51XCIpKSB7XHJcbi8vIFx0XHRcdHBvc2l0aW9uTWVnYW1lbnUodHJpZ2dlcik7XHJcbi8vIFx0XHR9XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyTGluayA9IHRyaWdnZXIucXVlcnlTZWxlY3RvcihcImFcIik7XHJcbi8vIFx0XHRjb25zdCBzdWJOYXYgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLW1lbnVcIik7XHJcbi8vIFx0XHRjb25zdCBwYXJlbnQgPSB0cmlnZ2VyLnBhcmVudEVsZW1lbnQ7XHJcbi8vIFx0XHRpZiAodHJpZ2dlci5jbGFzc0xpc3QuY29udGFpbnMoXCJvcGVuXCIpKSB7XHJcbi8vIFx0XHRcdGlzQ2xpY2tlZCA9IGZhbHNlO1xyXG4vLyBcdFx0XHRzdWJOYXYuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XHJcbi8vIFx0XHRcdHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKFwic3ViX29wZW5cIik7XHJcbi8vIFx0XHRcdHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XHJcbi8vIFx0XHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuLy8gXHRcdFx0aWYgKHByZWZlcnNSZWR1Y2VkKSB7XHJcbi8vIFx0XHRcdFx0c3ViTmF2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuLy8gXHRcdFx0fSBlbHNlIHtcclxuLy8gXHRcdFx0XHRzdWJOYXYuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgc2V0RGlzcGxheU5vbmUpO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHRpc0NsaWNrZWQgPSB0cnVlO1xyXG4vLyBcdFx0XHRzdWJOYXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuLy8gXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcbi8vIFx0XHRcdFx0c3ViTmF2LmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xyXG4vLyBcdFx0XHRcdC8vVGhpcyBpcyBiZWNhdXNlIFNhZmFyaSBzZWVtcyB0byByZWdpc3RlciB0aGUgcHJvZ3JhbW1hdGljIGZvY3VzIGFzIGZvY3VzLXZpc2libGVcclxuLy8gXHRcdFx0XHRpZiAoIWUucG9pbnRlclR5cGUpIHtcclxuLy8gXHRcdFx0XHRcdHN1Yk5hdi5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBzZXRGb2N1cyk7XHJcbi8vIFx0XHRcdFx0fVxyXG4vLyBcdFx0XHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG4vLyBcdFx0XHR9LCAxMDApO1xyXG5cclxuLy8gXHRcdFx0cGFyZW50LmNsYXNzTGlzdC5hZGQoXCJzdWJfb3BlblwiKTtcclxuLy8gXHRcdFx0dHJpZ2dlci5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuLy8gXHRcdFx0c3ViTmF2LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNsb3NlT25UYWJPdXRPckVzYyk7XHJcbi8vIFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgY2xvc2VPblNjcm9sbCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRmdW5jdGlvbiBtZW51SG92ZXJIYW5kbGVyKGUpIHtcclxuLy8gXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gXHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDEyMDApIHJldHVybjtcclxuLy8gXHRcdGlmIChpc0NsaWNrZWQpIHJldHVybjtcclxuLy8gXHRcdGlmIChpc0hvdmVyaW5nKSByZXR1cm47XHJcbi8vIFx0XHRpc0hvdmVyaW5nID0gdHJ1ZTtcclxuLy8gXHRcdGNsb3NlQWxsKCk7XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQ7XHJcbi8vIFx0XHRpZiAodHJpZ2dlci5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGRfbWVnYV9tZW51XCIpKSB7XHJcbi8vIFx0XHRcdHBvc2l0aW9uTWVnYW1lbnUodHJpZ2dlcik7XHJcbi8vIFx0XHR9XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyTGluayA9IHRyaWdnZXIucXVlcnlTZWxlY3RvcihcImFcIik7XHJcbi8vIFx0XHRjb25zdCBzdWJOYXYgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLW1lbnVcIik7XHJcbi8vIFx0XHRjb25zdCBwYXJlbnQgPSB0cmlnZ2VyLnBhcmVudEVsZW1lbnQ7XHJcbi8vIFx0XHRzdWJOYXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuLy8gXHRcdHN1Yk5hdi5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuLy8gXHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG4vLyBcdFx0cGFyZW50LmNsYXNzTGlzdC5hZGQoXCJzdWJfb3BlblwiKTtcclxuLy8gXHRcdHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XHJcbi8vIFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGNsb3NlT25TY3JvbGwpO1xyXG4vLyBcdFx0dHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XHJcbi8vIFx0XHRcdGlzSG92ZXJpbmcgPSBmYWxzZTtcclxuLy8gXHRcdFx0Y2xvc2VBbGwoKTtcclxuLy8gXHRcdH0pO1xyXG4vLyBcdH1cclxuLy8gXHRmdW5jdGlvbiBzZXREaXNwbGF5Tm9uZShlKSB7XHJcbi8vIFx0XHRlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbi8vIFx0XHRlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBzZXREaXNwbGF5Tm9uZSk7XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRmdW5jdGlvbiBzZXRGb2N1cyhlKSB7XHJcbi8vIFx0XHRlLnRhcmdldC5xdWVyeVNlbGVjdG9yKFwiYSxpbnB1dFwiKS5mb2N1cygpO1xyXG4vLyBcdFx0ZS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgc2V0Rm9jdXMpO1xyXG4vLyBcdH1cclxuXHJcbi8vIFx0ZnVuY3Rpb24gY2xvc2VPblRhYk91dE9yRXNjKGUpIHtcclxuLy8gXHRcdGlmIChlLmtleSA9PSBcIkVzY2FwZVwiKSB7XHJcbi8vIFx0XHRcdGUudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNsb3NlT25UYWJPdXRPckVzYyk7XHJcbi8vIFx0XHRcdGlmIChlLnNyY0VsZW1lbnQudGFnTmFtZSA9PSBcIklOUFVUXCIpIHtcclxuLy8gXHRcdFx0XHRlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbi8vIFx0XHRcdFx0XHQucXVlcnlTZWxlY3RvcihcImFcIilcclxuLy8gXHRcdFx0XHRcdC5mb2N1cygpO1xyXG4vLyBcdFx0XHRcdGNsb3NlQWxsKFxyXG4vLyBcdFx0XHRcdFx0ZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4vLyBcdFx0XHRcdCk7XHJcbi8vIFx0XHRcdH0gZWxzZSB7XHJcbi8vIFx0XHRcdFx0ZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuLy8gXHRcdFx0XHRcdC5xdWVyeVNlbGVjdG9yKFwiYVwiKVxyXG4vLyBcdFx0XHRcdFx0LmZvY3VzKCk7XHJcbi8vIFx0XHRcdFx0Y2xvc2VBbGwoZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHR9IGVsc2UgaWYgKGUua2V5ID09IFwiVGFiXCIpIHtcclxuLy8gXHRcdFx0bGV0IHBhcmVudCA9IGUuc3JjRWxlbWVudC5jbG9zZXN0KFwiLnN1Yi1tZW51XCIpO1xyXG4vLyBcdFx0XHQvL2xldCBncmFuZHBhcmVudCA9IHBhcmVudC5jbG9zZXN0KFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIik7XHJcbi8vIFx0XHRcdGxldCBmaXJzdCA9IHBhcmVudC5maXJzdDtcclxuLy8gXHRcdFx0bGV0IGxhc3QgPSBwYXJlbnQubGFzdDtcclxuLy8gXHRcdFx0aWYgKGUuc2hpZnRLZXkpIHtcclxuLy8gXHRcdFx0XHRpZiAoZS5zcmNFbGVtZW50ID09IGZpcnN0KSB7XHJcbi8vIFx0XHRcdFx0XHRjbG9zZUFsbChwYXJlbnQpO1xyXG4vLyBcdFx0XHRcdFx0cGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNsb3NlT25UYWJPdXRPckVzYyk7XHJcbi8vIFx0XHRcdFx0fVxyXG4vLyBcdFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHRcdGlmIChlLnNyY0VsZW1lbnQgPT0gbGFzdCkge1xyXG4vLyBcdFx0XHRcdFx0Y2xvc2VBbGwocGFyZW50KTtcclxuLy8gXHRcdFx0XHRcdHBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjbG9zZU9uVGFiT3V0T3JFc2MpO1xyXG4vLyBcdFx0XHRcdH1cclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0fVxyXG4vLyBcdH1cclxuLy8gXHRmdW5jdGlvbiBjbG9zZU9uU2Nyb2xsKGUpIHtcclxuLy8gXHRcdGNsb3NlQWxsKCk7XHJcbi8vIFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGNsb3NlT25TY3JvbGwpO1xyXG4vLyBcdH1cclxuXHJcbi8vIFx0ZnVuY3Rpb24gY2xvc2VBbGwoY3VycmVudFN1Yk5hdiA9IG51bGwpIHtcclxuXHJcbi8vIFx0XHRpc0NsaWNrZWQgPSBmYWxzZTtcclxuLy8gXHRcdGlzSG92ZXJpbmcgPSBmYWxzZTtcclxuLy8gXHRcdHN1Yk5hdlRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcclxuLy8gXHRcdFx0dHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcclxuLy8gXHRcdFx0Y29uc3QgdHJpZ2dlckxpbmsgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpO1xyXG4vLyBcdFx0XHR0cmlnZ2VyLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN1Yl9vcGVuXCIpO1xyXG4vLyBcdFx0XHRjb25zdCBzdWJOYXYgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLW1lbnVcIik7XHJcbi8vIFx0XHRcdHN1Yk5hdi5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcclxuLy8gXHRcdFx0dHJpZ2dlckxpbmsuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xyXG4vLyBcdFx0XHRpZiAoc3ViTmF2ID09IGN1cnJlbnRTdWJOYXYpIHtcclxuLy8gXHRcdFx0XHRpZiAocHJlZmVyc1JlZHVjZWQpIHtcclxuLy8gXHRcdFx0XHRcdHN1Yk5hdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbi8vIFx0XHRcdFx0fSBlbHNlIHtcclxuLy8gXHRcdFx0XHRcdHN1Yk5hdi5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBzZXREaXNwbGF5Tm9uZSk7XHJcbi8vIFx0XHRcdFx0fVxyXG4vLyBcdFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHRcdHN1Yk5hdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdH0pO1xyXG4vLyBcdH1cclxuXHJcbi8vIFx0ZnVuY3Rpb24gcG9zaXRpb25NZWdhbWVudSh0cmlnZ2VyKSB7XHJcbi8vIFx0XHRjb25zdCBzdWJOYXYgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLW1lbnVcIik7XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyUmVjdCA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyTGVmdCA9IHRyaWdnZXJSZWN0LmxlZnQ7XHJcbi8vIFx0XHRjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4vLyBcdFx0Y29uc3Qgb2Zmc2V0ID0gdHJpZ2dlckxlZnQgLSB3aW5kb3dXaWR0aCAvIDI7XHJcbi8vIFx0XHRzdWJOYXYuc3R5bGUubGVmdCA9IGAtJHtvZmZzZXR9cHhgO1xyXG4vLyBcdH1cclxuLy8gfTtcclxuXHJcbi8vIGNvbnN0IG5hdlNjcm9sbFdhdGNoZXIgPSAoKSA9PiB7XHJcbi8vIFx0bGV0IGhlYWRlcndyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpdGUtaGVhZGVyLmRlc2t0b3Bfb25seVwiKTtcclxuLy8gXHR2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShoZWFkZXJ3cmFwKTtcclxuLy8gXHRpZiAoc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcbi8vIFx0XHRoZWFkZXJ3cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaXRlLWhlYWRlci5tb2JpbGVfb25seVwiKTtcclxuLy8gXHR9IGVsc2Uge1xyXG5cclxuLy8gXHR9XHJcblxyXG4vLyBcdGNvbnN0IHNlYXJjaENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2LXNlYXJjaC1mb3JtXCIpO1xyXG4vLyBcdGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcclxuXHJcbi8vIFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoZWFkZXJzbGlkZSk7XHJcblxyXG4vLyBcdGZ1bmN0aW9uIGhlYWRlcnNsaWRlKCkge1xyXG4vLyBcdFx0aWYgKHNlYXJjaENvbnRhaW5lciAmJiBzZWFyY2hDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwib3Blbl9zZWFyY2hcIikpIHtcclxuLy8gXHRcdFx0c2VhcmNoQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuX3NlYXJjaFwiKTtcclxuLy8gXHRcdH1cclxuLy8gXHRcdGxldCBzdCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4vLyBcdFx0aWYgKHN0ID49IDIwMCAmJiBzdCA8PSA0MDApIHtcclxuLy8gXHRcdFx0aGVhZGVyd3JhcC5jbGFzc0xpc3QuYWRkKFwiYWRkRml4ZWRcIik7XHJcbi8vIFx0XHRcdGhlYWRlcndyYXAuY2xhc3NMaXN0LnJlbW92ZShcInNsaWRlSW5Eb3duXCIsIFwic2xpZGVPdXRcIik7XHJcbi8vIFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibWVudS12aXNpYmxlXCIpO1xyXG4vLyBcdFx0fSBlbHNlIGlmIChzdCA+IDQwMCAmJiBzdCA8PSA2MDApIHtcclxuLy8gXHRcdFx0aGVhZGVyd3JhcC5jbGFzc0xpc3QuYWRkKFwic2xpZGVPdXRcIik7XHJcbi8vIFx0XHRcdGlmIChzdCA8IGxhc3RTY3JvbGxUb3ApIHtcclxuLy8gXHRcdFx0XHRoZWFkZXJ3cmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZUluRG93blwiKTtcclxuLy8gXHRcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1lbnUtdmlzaWJsZVwiKTtcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0fSBlbHNlIGlmIChzdCA+IDYwMCAmJiBzdCA8IGxhc3RTY3JvbGxUb3ApIHtcclxuLy8gXHRcdFx0aGVhZGVyd3JhcC5jbGFzc0xpc3QuYWRkKFwic2xpZGVPdXRcIiwgXCJzbGlkZUluRG93blwiKTtcclxuLy8gXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtZW51LXZpc2libGVcIik7XHJcbi8vIFx0XHR9IGVsc2UgaWYgKHN0ID4gNjAwICYmIHN0ID4gbGFzdFNjcm9sbFRvcCkge1xyXG4vLyBcdFx0XHRoZWFkZXJ3cmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZUluRG93blwiKTtcclxuLy8gXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtZW51LXZpc2libGVcIik7XHJcbi8vIFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHRoZWFkZXJ3cmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZUluRG93blwiLCBcInNsaWRlT3V0XCIsIFwiYWRkRml4ZWRcIik7XHJcbi8vIFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibWVudS12aXNpYmxlXCIpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdFx0bGFzdFNjcm9sbFRvcCA9IHN0O1xyXG4vLyBcdH1cclxuLy8gfTtcclxuXHJcbi8vIGNvbnN0IG1lZ2FNZW51ID0gKCkgPT4ge1xyXG4vLyBcdGNvbnN0IG1lZ2FNZW51Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuLy8gXHRcdFwiI3ByaW1hcnktbWVudSBsaS5hZGRfbWVnYV9tZW51IHVsXCJcclxuLy8gXHQpO1xyXG4vLyBcdGlmICghbWVnYU1lbnVDb250YWluZXIpIHJldHVybjtcclxuLy8gXHRjb25zdCBtZWdhTWVudU1vYmlsZUNPbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbi8vIFx0XHRcIiNtb2JpbGUtbWVudSBsaS5hZGRfbWVnYV9tZW51IHVsXCJcclxuLy8gXHQpO1xyXG4vLyBcdGNvbnN0IG1lZ2FNZW51Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVnYW1lbnVcIik7XHJcbi8vIFx0Y29uc3QgbWVnYUNsb25lID0gbWVnYU1lbnVDb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuLy8gXHRtZWdhTWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWdhTWVudUNvbnRlbnQpO1xyXG4vLyBcdG1lZ2FNZW51TW9iaWxlQ09udGFpbmVyLmFwcGVuZENoaWxkKG1lZ2FDbG9uZSk7XHJcbi8vIFx0bWVnYU1lbnVDb250ZW50LnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcclxuLy8gXHRtZWdhQ2xvbmUuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xyXG4vLyB9O1xyXG5cclxuLy8gZnVuY3Rpb24gbmF2Tm90aWNlKCkge1xyXG4vLyBcdGxldCBub3RpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25vdGljZVwiKTtcclxuLy8gXHRpZiAoIW5vdGljZSkgcmV0dXJuO1xyXG4vLyBcdGxldCBub3RpY2VCdXR0b24gPSBub3RpY2UucXVlcnlTZWxlY3RvcihcIiNjbG9zZV9ub3RpY2VcIik7XHJcbi8vIFx0bm90aWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4vLyBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyBcdFx0bm90aWNlLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4vLyBcdFx0bGV0IGNvb2tpZU5hbWUgPSBgbm90aWNlX2Nsb3NlZF8ke25vdGljZS5kYXRhc2V0Lm5vdGljZX1gO1xyXG4vLyBcdFx0bGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4vLyBcdFx0ZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgMzApXHJcbi8vIFx0XHRsZXQgZXhwaXJlcyA9IGRhdGUudG9VVENTdHJpbmcoKTtcclxuLy8gXHRcdGRvY3VtZW50LmNvb2tpZSA9IGAke2Nvb2tpZU5hbWV9PTE7IGV4cGlyZXM9JHtleHBpcmVzfTsgcGF0aD0vO2A7XHJcbi8vIFx0XHRub3RpY2VCdXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XHJcblxyXG4vLyBcdH0pO1xyXG4vLyB9XHJcbi8vIGV4cG9ydCB7IGhhbWJ1cmdlclRvZ2dsZSwgZHluYW1pY1ZILCBuYXZpZ2F0aW9uLCBuYXZTY3JvbGxXYXRjaGVyLCBtZWdhTWVudSwgbmF2Tm90aWNlIH07XHJcbmV4cG9ydCB7IGhhbWJ1cmdlclRvZ2dsZSwgaGFtYnVyZ2VyVG9nZ2xlTW9iaWxlLCBtb2JpbGVOYXZUb2dnbGUgfTtcclxuIiwiaW1wb3J0IHtcclxuXHQvLyBuYXZpZ2F0aW9uLFxyXG5cdC8vIGR5bmFtaWNWSCxcclxuXHQvLyBuYXZTY3JvbGxXYXRjaGVyLFxyXG5cdC8vIG1lZ2FNZW51LFxyXG5cdC8vIG5hdk5vdGljZSxcclxuXHRoYW1idXJnZXJUb2dnbGUsXHJcblx0aGFtYnVyZ2VyVG9nZ2xlTW9iaWxlLFxyXG5cdG1vYmlsZU5hdlRvZ2dsZSxcclxufSBmcm9tIFwiLi9qcy9uYXZpZ2F0aW9uLmpzXCI7XHJcblxyXG4vLyBpbXBvcnQge1xyXG4vLyBcdGZpbHRlcnMsXHJcbi8vIFx0ZGlzY292ZXJGaWx0ZXIsXHJcbi8vIFx0c2hvd01vcmUsXHJcbi8vIFx0anVtcEZpbHRlcnMsXHJcbi8vIFx0c2hvcEJ5Q2F0ZWdvcnksXHJcbi8vIH0gZnJvbSBcIi4vanMvZmlsdGVycy5qc1wiO1xyXG5cclxuLy9pbXBvcnQge3N3aXRjaGVzLGFsdEJsb2NrLGxhbmd1YWdlU3dpdGNoZXJ9IGZyb20gXCIuL2pzL2FjY2Vzc2liaWxpdHkuanNcIjtcclxuLy9pbXBvcnQgcGxheWVyV2l0aENvdmVyIGZyb20gXCIuL2pzL3BsYXllci5qc1wiO1xyXG4vLyBpbXBvcnQge1xyXG4vLyBcdGZvcm1IYW5kbGVyLFxyXG4vLyBcdGZvcm1Td2l0Y2hlcixcclxuLy8gfSBmcm9tIFwiLi9qcy9mb3Jtcy5qc1wiO1xyXG4vLyBpbXBvcnQgc3dpcGVyX2luaXQgZnJvbSBcIi4vanMvc3dpcGVyLWluaXQuanNcIjtcclxuLy8gaW1wb3J0IGxpZ2h0Ym94IGZyb20gXCIuL2pzL2xpZ2h0Ym94LmpzXCI7XHJcbi8vIGltcG9ydCBhY2NvcmRpb24gZnJvbSBcIi4vanMvYWNjb3JkaW9uLmpzXCI7XHJcbi8vIGltcG9ydCBtb2RhbEhhbmRsZXJzIGZyb20gXCIuL2pzL21vZGFsLmpzXCI7XHJcbi8vaW1wb3J0IHNoYXJPbk1vYmlsZSBmcm9tIFwiLi9qcy9zb2NpYWwuanNcIjtcclxuLy9pbXBvcnQgdGFiSGFuZGxlcnMgZnJvbSBcIi4vanMvdGFicy5qc1wiO1xyXG4vLyBpbXBvcnQgeyBvc19zaG93cm9vbV9tYXAgfSBmcm9tIFwiLi9qcy9tYXAuanNcIjtcclxuLy8gaW1wb3J0IGNhcmRMaW5rcyBmcm9tIFwiLi9qcy9jYXJkcy5qc1wiO1xyXG4vL2ltcG9ydCB0aW1ldGFibGVIYW5kbGVyIGZyb20gXCIuL2pzL3RpbWV0YWJsZS5qc1wiO1xyXG5cclxuLy9pbXBvcnQgYmFza2V0IGZyb20gXCIuL2pzL2Jhc2tldC5qc1wiO1xyXG4vL2ltcG9ydCBjcm9zc1NlbGwgZnJvbSBcIi4vanMvY3Jvc3NzZWxscy5qc1wiO1xyXG5cclxuLy8gZHluYW1pY1ZIKCk7XHJcbi8vIG1lZ2FNZW51KCk7XHJcbi8vIG5hdmlnYXRpb24oKTtcclxuLy8gbmF2U2Nyb2xsV2F0Y2hlcigpO1xyXG4vLyBuYXZOb3RpY2UoKTtcclxuaGFtYnVyZ2VyVG9nZ2xlKCk7XHJcbmhhbWJ1cmdlclRvZ2dsZU1vYmlsZSgpO1xyXG5tb2JpbGVOYXZUb2dnbGUoKTtcclxuXHJcbi8vIG9zX3Nob3dyb29tX21hcCgpO1xyXG4vLyBjYXJkTGlua3MoKTtcclxuLy9sYW5ndWFnZVN3aXRjaGVyKCk7XHJcbi8vc3dpdGNoZXMoKTtcclxuLy9hbHRCbG9jaygpO1xyXG5cclxuLy8gZmlsdGVycygpO1xyXG4vLyBqdW1wRmlsdGVycygpO1xyXG4vLyBzaG9wQnlDYXRlZ29yeSgpO1xyXG4vLyBkaXNjb3ZlckZpbHRlcigpO1xyXG4vLyBzaG93TW9yZSgpO1xyXG4vLyBwbGF5ZXJXaXRoQ292ZXIoKTtcclxuLy8gZm9ybUhhbmRsZXIoKTtcclxuLy8gZm9ybVN3aXRjaGVyKCk7XHJcbi8vIHN3aXBlcl9pbml0KCk7XHJcbi8vIGxpZ2h0Ym94KCk7XHJcbi8vIGFjY29yZGlvbigpO1xyXG4vLyBtb2RhbEhhbmRsZXJzKCk7XHJcblxyXG4vL3RpbWV0YWJsZUhhbmRsZXIoKTtcclxuLy9zaGFyT25Nb2JpbGUoKTtcclxuXHJcbiJdfQ==

//# sourceMappingURL=scripts.js.map
