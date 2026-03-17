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

const hamburgerToggle = () => {

	const button = document.querySelector("header#masthead .header .hamburger_container button#hamburger");
	const nav = document.querySelector("header#masthead:not(:has(~ .home-page)) #site-navigation");

	if (!button || !nav) return;

	// Toggle nav on button click
	button.addEventListener("click", (e) => {
		e.stopPropagation();
		nav.classList.toggle("show");

		// Optional: add border to test
		//button.style.border = nav.classList.contains("show") ? "2px solid red" : "";
	});

	// Close nav when clicking outside
	document.addEventListener("click", (e) => {
		if (!nav.contains(e.target) && !button.contains(e.target)) {
			nav.classList.remove("show");
			//button.style.border = ""; // remove test border
		}
	});
};

const hamburgerToggleMobile = () => {

	const button = document.querySelector("header#masthead.bg_light_gray.mobile_only .header .hamburger_container button#hamburger_mobile");
	const nav = document.querySelector("header#masthead.bg_light_gray.mobile_only:not(:has(~ .home-page)) #mobile_nav");

	if (!button || !nav) return;

	button.addEventListener("click", (e) => {
		e.stopPropagation();

		if (nav.style.visibility === "visible") {
			nav.style.visibility = "hidden";
		} else {
			nav.style.visibility = "visible";
		}
	});

	document.addEventListener("click", (e) => {
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
export { hamburgerToggle, hamburgerToggleMobile };
