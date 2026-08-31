(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.scrollama = factory());
})(void 0, function () {
  'use strict';

  // DOM helper functions

  // public
  function selectAll(selector) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    if (typeof selector === 'string') {
      return Array.from(parent.querySelectorAll(selector));
    } else if (selector instanceof Element) {
      return [selector];
    } else if (selector instanceof NodeList) {
      return Array.from(selector);
    } else if (selector instanceof Array) {
      return selector;
    }
    return [];
  }

  // SETUP
  function create(className) {
    var el = document.createElement("div");
    el.className = "scrollama__debug-step ".concat(className);
    el.style.position = "fixed";
    el.style.left = "0";
    el.style.width = "100%";
    el.style.zIndex = "9999";
    el.style.borderTop = "2px solid black";
    el.style.borderBottom = "2px solid black";
    var p = document.createElement("p");
    p.style.position = "absolute";
    p.style.left = "0";
    p.style.height = "1px";
    p.style.width = "100%";
    p.style.borderTop = "1px dashed black";
    el.appendChild(p);
    document.body.appendChild(el);
    return el;
  }

  // UPDATE
  function update(_ref) {
    var id = _ref.id,
      step = _ref.step,
      marginTop = _ref.marginTop;
    var index = step.index,
      height = step.height;
    var className = "scrollama__debug-step--".concat(id, "-").concat(index);
    var el = document.querySelector(".".concat(className));
    if (!el) el = create(className);
    el.style.top = "".concat(marginTop * -1, "px");
    el.style.height = "".concat(height, "px");
    el.querySelector("p").style.top = "".concat(height / 2, "px");
  }
  function generateId() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var date = Date.now();
    var result = [];
    for (var i = 0; i < 6; i += 1) {
      var _char = alphabet[Math.floor(Math.random() * alphabet.length)];
      result.push(_char);
    }
    return "".concat(result.join("")).concat(date);
  }
  function err$1(msg) {
    console.error("scrollama error: ".concat(msg));
  }
  function getIndex(node) {
    return +node.getAttribute("data-scrollama-index");
  }
  function createProgressThreshold(height, threshold) {
    var count = Math.ceil(height / threshold);
    var t = [];
    var ratio = 1 / count;
    for (var i = 0; i < count + 1; i += 1) {
      t.push(i * ratio);
    }
    return t;
  }
  function parseOffset(x) {
    if (typeof x === "string" && x.indexOf("px") > 0) {
      var v = +x.replace("px", "");
      if (!isNaN(v)) return {
        format: "pixels",
        value: v
      };else {
        err("offset value must be in 'px' format. Fallback to 0.5.");
        return {
          format: "percent",
          value: 0.5
        };
      }
    } else if (typeof x === "number" || !isNaN(+x)) {
      if (x > 1) err("offset value is greater than 1. Fallback to 1.");
      if (x < 0) err("offset value is lower than 0. Fallback to 0.");
      return {
        format: "percent",
        value: Math.min(Math.max(0, x), 1)
      };
    }
    return null;
  }
  function indexSteps(steps) {
    steps.forEach(function (step) {
      return step.node.setAttribute("data-scrollama-index", step.index);
    });
  }
  function getOffsetTop(node) {
    var _node$getBoundingClie = node.getBoundingClientRect(),
      top = _node$getBoundingClie.top;
    var scrollTop = window.pageYOffset;
    var clientTop = document.body.clientTop || 0;
    return top + scrollTop - clientTop;
  }
  var currentScrollY;
  var comparisonScrollY;
  var direction;
  function onScroll(container) {
    var scrollTop = container ? container.scrollTop : window.pageYOffset;
    if (currentScrollY === scrollTop) return;
    currentScrollY = scrollTop;
    if (currentScrollY > comparisonScrollY) direction = "down";else if (currentScrollY < comparisonScrollY) direction = "up";
    comparisonScrollY = currentScrollY;
  }
  function setupScroll(container) {
    currentScrollY = 0;
    comparisonScrollY = 0;
    document.addEventListener("scroll", function () {
      return onScroll(container);
    });
  }
  function scrollama() {
    var cb = {};
    var id = generateId();
    var steps = [];
    var globalOffset;
    var containerElement;
    var rootElement;
    var progressThreshold = 0;
    var isEnabled = false;
    var isProgress = false;
    var isDebug = false;
    var isTriggerOnce = false;
    var exclude = [];

    /* HELPERS */
    function reset() {
      cb = {
        stepEnter: function stepEnter() {},
        stepExit: function stepExit() {},
        stepProgress: function stepProgress() {}
      };
      exclude = [];
    }
    function handleEnable(shouldEnable) {
      if (shouldEnable && !isEnabled) updateObservers();
      if (!shouldEnable && isEnabled) disconnectObservers();
      isEnabled = shouldEnable;
    }

    /* NOTIFY CALLBACKS */
    function notifyProgress(element, progress) {
      var index = getIndex(element);
      var step = steps[index];
      if (progress !== undefined) step.progress = progress;
      var response = {
        element: element,
        index: index,
        progress: progress,
        direction: direction
      };
      if (step.state === "enter") cb.stepProgress(response);
    }
    function notifyStepEnter(element) {
      var check = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var index = getIndex(element);
      var step = steps[index];
      var response = {
        element: element,
        index: index,
        direction: direction
      };
      step.direction = direction;
      step.state = "enter";

      // if (isPreserveOrder && check && direction !== "up")
      //   notifyOthers(index, "above");
      // if (isPreserveOrder && check && direction === "up")
      //   notifyOthers(index, "below");

      if (!exclude[index]) cb.stepEnter(response);
      if (isTriggerOnce) exclude[index] = true;
    }
    function notifyStepExit(element) {
      var check = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var index = getIndex(element);
      var step = steps[index];
      if (!step.state) return false;
      var response = {
        element: element,
        index: index,
        direction: direction
      };
      if (isProgress) {
        if (direction === "down" && step.progress < 1) notifyProgress(element, 1);else if (direction === "up" && step.progress > 0) notifyProgress(element, 0);
      }
      step.direction = direction;
      step.state = "exit";
      cb.stepExit(response);
    }

    /* OBSERVERS - HANDLING */
    function resizeStep(_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
        entry = _ref3[0];
      var index = getIndex(entry.target);
      var step = steps[index];
      var h = entry.target.offsetHeight;
      if (h !== step.height) {
        step.height = h;
        disconnectObserver(step);
        updateStepObserver(step);
        updateResizeObserver(step);
      }
    }
    function intersectStep(_ref4) {
      var _ref5 = _slicedToArray(_ref4, 1),
        entry = _ref5[0];
      onScroll(containerElement);
      var isIntersecting = entry.isIntersecting,
        target = entry.target;
      if (isIntersecting) notifyStepEnter(target);else notifyStepExit(target);
    }
    function intersectProgress(_ref6) {
      var _ref7 = _slicedToArray(_ref6, 1),
        entry = _ref7[0];
      var index = getIndex(entry.target);
      var step = steps[index];
      var isIntersecting = entry.isIntersecting,
        intersectionRatio = entry.intersectionRatio,
        target = entry.target;
      if (isIntersecting && step.state === "enter") notifyProgress(target, intersectionRatio);
    }

    /*  OBSERVERS - CREATION */
    function disconnectObserver(_ref8) {
      var observers = _ref8.observers;
      Object.keys(observers).map(function (name) {
        observers[name].disconnect();
      });
    }
    function disconnectObservers() {
      steps.forEach(disconnectObserver);
    }
    function updateResizeObserver(step) {
      var observer = new ResizeObserver(resizeStep);
      observer.observe(step.node);
      step.observers.resize = observer;
    }
    function updateResizeObservers() {
      steps.forEach(updateResizeObserver);
    }
    function updateStepObserver(step) {
      var h = window.innerHeight;
      var off = step.offset || globalOffset;
      var factor = off.format === "pixels" ? 1 : h;
      var offset = off.value * factor;
      var marginTop = step.height / 2 - offset;
      var marginBottom = step.height / 2 - (h - offset);
      var rootMargin = "".concat(marginTop, "px 0px ").concat(marginBottom, "px 0px");
      var root = rootElement;
      var threshold = 0.5;
      var options = {
        rootMargin: rootMargin,
        threshold: threshold,
        root: root
      };
      var observer = new IntersectionObserver(intersectStep, options);
      observer.observe(step.node);
      step.observers.step = observer;
      if (isDebug) update({
        id: id,
        step: step,
        marginTop: marginTop,
        marginBottom: marginBottom
      });
    }
    function updateStepObservers() {
      steps.forEach(updateStepObserver);
    }
    function updateProgressObserver(step) {
      var h = window.innerHeight;
      var off = step.offset || globalOffset;
      var factor = off.format === "pixels" ? 1 : h;
      var offset = off.value * factor;
      var marginTop = -offset + step.height;
      var marginBottom = offset - h;
      var rootMargin = "".concat(marginTop, "px 0px ").concat(marginBottom, "px 0px");
      var threshold = createProgressThreshold(step.height, progressThreshold);
      var options = {
        rootMargin: rootMargin,
        threshold: threshold
      };
      var observer = new IntersectionObserver(intersectProgress, options);
      observer.observe(step.node);
      step.observers.progress = observer;
    }
    function updateProgressObservers() {
      steps.forEach(updateProgressObserver);
    }
    function updateObservers() {
      disconnectObservers();
      updateResizeObservers();
      updateStepObservers();
      if (isProgress) updateProgressObservers();
    }

    /* SETUP */
    var S = {};
    S.setup = function (_ref9) {
      var step = _ref9.step,
        parent = _ref9.parent,
        _ref9$offset = _ref9.offset,
        offset = _ref9$offset === void 0 ? 0.5 : _ref9$offset,
        _ref9$threshold = _ref9.threshold,
        threshold = _ref9$threshold === void 0 ? 4 : _ref9$threshold,
        _ref9$progress = _ref9.progress,
        progress = _ref9$progress === void 0 ? false : _ref9$progress,
        _ref9$once = _ref9.once,
        once = _ref9$once === void 0 ? false : _ref9$once,
        _ref9$debug = _ref9.debug,
        debug = _ref9$debug === void 0 ? false : _ref9$debug,
        _ref9$container = _ref9.container,
        container = _ref9$container === void 0 ? undefined : _ref9$container,
        _ref9$root = _ref9.root,
        root = _ref9$root === void 0 ? null : _ref9$root;
      setupScroll(container);
      steps = selectAll(step, parent).map(function (node, index) {
        return {
          index: index,
          direction: undefined,
          height: node.offsetHeight,
          node: node,
          observers: {},
          offset: parseOffset(node.dataset.offset),
          top: getOffsetTop(node),
          progress: 0,
          state: undefined
        };
      });
      if (!steps.length) {
        err$1("no step elements");
        return S;
      }
      isProgress = progress;
      isTriggerOnce = once;
      isDebug = debug;
      progressThreshold = Math.max(1, +threshold);
      globalOffset = parseOffset(offset);
      containerElement = container;
      rootElement = root;
      reset();
      indexSteps(steps);
      handleEnable(true);
      return S;
    };
    S.enable = function () {
      handleEnable(true);
      return S;
    };
    S.disable = function () {
      handleEnable(false);
      return S;
    };
    S.destroy = function () {
      handleEnable(false);
      reset();
      return S;
    };
    S.resize = function () {
      updateObservers();
      return S;
    };
    S.offset = function (x) {
      if (x === null || x === undefined) return globalOffset.value;
      globalOffset = parseOffset(x);
      updateObservers();
      return S;
    };
    S.onStepEnter = function (f) {
      if (typeof f === "function") cb.stepEnter = f;else err$1("onStepEnter requires a function");
      return S;
    };
    S.onStepExit = function (f) {
      if (typeof f === "function") cb.stepExit = f;else err$1("onStepExit requires a function");
      return S;
    };
    S.onStepProgress = function (f) {
      if (typeof f === "function") cb.stepProgress = f;else err$1("onStepProgress requires a function");
      return S;
    };
    return S;
  }
  return scrollama;
});

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _scrollama = _interopRequireDefault(require("scrollama"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var scroll = function scroll() {
  var scroller = (0, _scrollama["default"])();

  // setup the instance, pass callback functions
  scroller.setup({
    step: ".scroll-detect",
    offset: 0,
    threshold: 1
  }).onStepEnter(function (response) {
    var element = response.element,
      index = response.index,
      direction = response.direction;
    if (element.classList.contains('scroll-over-block') || element.classList.contains('zoom-block')) {
      element.classList.add('active');
    }
    if (element.classList.contains('zoom-block__overlay-text') && direction === 'up') {
      element.parentNode.classList.remove('zoom');
    }
  }).onStepExit(function (response) {
    var element = response.element,
      index = response.index,
      direction = response.direction;
    if (element.classList.contains('scroll-over-block') || element.classList.contains('zoom-block')) {
      element.classList.remove('active');
    }
    if (element.classList.contains('zoom-block__zooming-text') && direction === 'up') {
      element.parentNode.classList.remove('zoom');
    }
    if (element.classList.contains('zoom-block__overlay-text') && direction === 'down') {
      element.parentNode.classList.add('zoom');
    }
  });
};
var _default = exports["default"] = scroll;

},{"scrollama":1}],4:[function(require,module,exports){
"use strict";

var _navigation = require("./js/navigation.js");
var _scroll = _interopRequireDefault(require("./js/scroll.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
(0, _scroll["default"])();

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

},{"./js/navigation.js":2,"./js/scroll.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc2Nyb2xsYW1hL2J1aWxkL3Njcm9sbGFtYS5qcyIsInNyYy9qcy9uYXZpZ2F0aW9uLmpzIiwic3JjL2pzL3Njcm9sbC5qcyIsInNyYy9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FDQUMsV0FBVSxNQUFNLEVBQUUsT0FBTyxFQUFFO0VBQzFCLFFBQU8sT0FBTyxpQ0FBQSxPQUFBLENBQVAsT0FBTyxPQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxHQUN6RixPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQzNELE1BQU0sR0FBRyxNQUFNLElBQUksSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDLFVBQVEsWUFBWTtFQUFFLFlBQVk7O0VBRWpDOztFQUVBO0VBQ0EsU0FBUyxTQUFTLENBQUMsUUFBUSxFQUFxQjtJQUFBLElBQW5CLE1BQU0sR0FBQSxTQUFBLENBQUEsTUFBQSxRQUFBLFNBQUEsUUFBQSxTQUFBLEdBQUEsU0FBQSxNQUFHLFFBQVE7SUFDNUMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7TUFDaEMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDLE1BQU0sSUFBSSxRQUFRLFlBQVksT0FBTyxFQUFFO01BQ3RDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDbkIsQ0FBQyxNQUFNLElBQUksUUFBUSxZQUFZLFFBQVEsRUFBRTtNQUN2QyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lB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RUQsQ0FBQyxDQUFDLGNBQWMsR0FBRyxVQUFDLENBQUMsRUFBSztNQUN6QixJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsRUFBRSxFQUFFLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxLQUM1QyxLQUFLLENBQUMsb0NBQW9DLENBQUM7TUFDaEQsT0FBTyxDQUFDO0lBQ1QsQ0FBQztJQUNELE9BQU8sQ0FBQztFQUNUO0VBRUEsT0FBTyxTQUFTO0FBRWxCLENBQUUsQ0FBQzs7Ozs7Ozs7O0FDL1pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTSxlQUFlLEdBQUEs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SUFDQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUN2QixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUN6QjtNQUNELEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM3QjtFQUVELENBQUMsQ0FBQztBQUVILENBQUM7O0FBRUQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMzZ0JBLElBQUEsVUFBQSxHQUFBLHNCQUFBLENBQUEsT0FBQTtBQUFrQyxTQUFBLHVCQUFBLEdBQUEsV0FBQSxHQUFBLElBQUEsR0FBQSxDQUFBLFVBQUEsR0FBQSxHQUFBLGdCQUFBLEdBQUE7QUFDbEMsSUFBTSxNQUFNLEdBQUcsU0FBVCxNQUFNLENBQUEsRUFBUztFQUVqQixJQUFNLFFBQVEsR0FBRyxJQUFBLHFCQUFTLEVBQUMsQ0FBQzs7RUFFNUI7RUFDQSxRQUFRLENBQ1AsS0FBSyxDQUFDO0lBQ0gsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixNQUFNLEVBQUUsQ0FBQztJQUNULFNBQVMsRUFBRTtFQUNmLENBQUMsQ0FBQyxDQUNELFdBQVcsQ0FBQyxVQUFDLFFBQVEsRUFBSztJQUN2QixJQUFRLE9BQU8sR0FBdUIsUUFBUSxDQUF0QyxPQUFPO01BQUUsS0FBSyxHQUFnQixRQUFRLENBQTdCLEtBQUs7TUFBRSxTQUFTLEdBQUssUUFBUSxDQUF0QixTQUFTO0lBQ2pDLElBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtNQUMxRixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDbkM7SUFDQSxJQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLElBQUUsU0FBUyxLQUFHLElBQUksRUFBRTtNQUN6RSxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQy9DO0VBQ0osQ0FBQyxDQUFDLENBQ0QsVUFBVSxDQUFDLFVBQUMsUUFBUSxFQUFLO0lBQ3RCLElBQVEsT0FBTyxHQUF1QixRQUFRLENBQXRDLE9BQU87TUFBRSxLQUFLLEdBQWdCLFFBQVEsQ0FBN0IsS0FBSztNQUFFLFNBQVMsR0FBSyxRQUFRLENBQXRCLFNBQVM7SUFDakMsSUFBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO01BQzFGLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUN0QztJQUNBLElBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsSUFBRSxTQUFTLEtBQUcsSUFBSSxFQUFFO01BQ3pFLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDL0M7SUFDQSxJQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDBCQUEwQixDQUFDLElBQUUsU0FBUyxLQUFHLE1BQU0sRUFBRTtNQUMzRSxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzVDO0VBQ0osQ0FBQyxDQUFDO0FBRU4sQ0FBQztBQUFDLElBQUEsUUFBQSxHQUFBLE9BQUEsY0FFYSxNQUFNOzs7OztBQ3BDckIsSUFBQSxXQUFBLEdBQUEsT0FBQTtBQVVBLElBQUEsT0FBQSxHQUFBLHNCQUFBLENBQUEsT0FBQTtBQUFvQyxTQUFBLHVCQUFBLEdBQUEsV0FBQSxHQUFBLElBQUEsR0FBQSxDQUFBLFVBQUEsR0FBQSxHQUFBLGdCQUFBLEdBQUE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUEsMkJBQWUsRUFBQyxDQUFDO0FBQ2pCLElBQUEsaUNBQXFCLEVBQUMsQ0FBQztBQUN2QixJQUFBLDJCQUFlLEVBQUMsQ0FBQztBQUNqQixJQUFBLGtCQUFNLEVBQUMsQ0FBQzs7QUFFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5zY3JvbGxhbWEgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgLy8gRE9NIGhlbHBlciBmdW5jdGlvbnNcblxuICAvLyBwdWJsaWNcbiAgZnVuY3Rpb24gc2VsZWN0QWxsKHNlbGVjdG9yLCBwYXJlbnQgPSBkb2N1bWVudCkge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICByZXR1cm4gW3NlbGVjdG9yXTtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHNlbGVjdG9yKTtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLy8gU0VUVVBcbiAgZnVuY3Rpb24gY3JlYXRlKGNsYXNzTmFtZSkge1xuICBcdGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgXHRlbC5jbGFzc05hbWUgPSBgc2Nyb2xsYW1hX19kZWJ1Zy1zdGVwICR7Y2xhc3NOYW1lfWA7XG4gIFx0ZWwuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG4gIFx0ZWwuc3R5bGUubGVmdCA9IFwiMFwiO1xuICBcdGVsLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gIFx0ZWwuc3R5bGUuekluZGV4ID0gXCI5OTk5XCI7XG4gIFx0ZWwuc3R5bGUuYm9yZGVyVG9wID0gXCIycHggc29saWQgYmxhY2tcIjtcbiAgXHRlbC5zdHlsZS5ib3JkZXJCb3R0b20gPSBcIjJweCBzb2xpZCBibGFja1wiO1xuXG4gIFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBcdHAuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIFx0cC5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gIFx0cC5zdHlsZS5oZWlnaHQgPSBcIjFweFwiO1xuICBcdHAuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgXHRwLnN0eWxlLmJvcmRlclRvcCA9IFwiMXB4IGRhc2hlZCBibGFja1wiO1xuXG4gIFx0ZWwuYXBwZW5kQ2hpbGQocCk7XG4gIFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG4gIFx0cmV0dXJuIGVsO1xuICB9XG5cbiAgLy8gVVBEQVRFXG4gIGZ1bmN0aW9uIHVwZGF0ZSh7IGlkLCBzdGVwLCBtYXJnaW5Ub3AgfSkge1xuICBcdGNvbnN0IHsgaW5kZXgsIGhlaWdodCB9ID0gc3RlcDtcbiAgXHRjb25zdCBjbGFzc05hbWUgPSBgc2Nyb2xsYW1hX19kZWJ1Zy1zdGVwLS0ke2lkfS0ke2luZGV4fWA7XG4gIFx0bGV0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApO1xuICBcdGlmICghZWwpIGVsID0gY3JlYXRlKGNsYXNzTmFtZSk7XG5cbiAgXHRlbC5zdHlsZS50b3AgPSBgJHttYXJnaW5Ub3AgKiAtMX1weGA7XG4gIFx0ZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgXHRlbC5xdWVyeVNlbGVjdG9yKFwicFwiKS5zdHlsZS50b3AgPSBgJHtoZWlnaHQgLyAyfXB4YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSWQoKSB7XG4gICAgICBjb25zdCBhbHBoYWJldCA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjtcbiAgICAgIGNvbnN0IGRhdGUgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBjaGFyID0gYWxwaGFiZXRbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWxwaGFiZXQubGVuZ3RoKV07XG4gICAgICAgIHJlc3VsdC5wdXNoKGNoYXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGAke3Jlc3VsdC5qb2luKFwiXCIpfSR7ZGF0ZX1gO1xuICAgIH1cblxuICBmdW5jdGlvbiBlcnIkMShtc2cpIHtcbiAgXHRjb25zb2xlLmVycm9yKGBzY3JvbGxhbWEgZXJyb3I6ICR7bXNnfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5kZXgobm9kZSkge1xuICBcdHJldHVybiArbm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNjcm9sbGFtYS1pbmRleFwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByb2dyZXNzVGhyZXNob2xkKGhlaWdodCwgdGhyZXNob2xkKSB7XG4gICAgICBjb25zdCBjb3VudCA9IE1hdGguY2VpbChoZWlnaHQgLyB0aHJlc2hvbGQpO1xuICAgICAgY29uc3QgdCA9IFtdO1xuICAgICAgY29uc3QgcmF0aW8gPSAxIC8gY291bnQ7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50ICsgMTsgaSArPSAxKSB7XG4gICAgICAgIHQucHVzaChpICogcmF0aW8pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHQ7XG4gICAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlT2Zmc2V0KHgpIHtcbiAgXHRpZiAodHlwZW9mIHggPT09IFwic3RyaW5nXCIgJiYgeC5pbmRleE9mKFwicHhcIikgPiAwKSB7XG4gIFx0XHRjb25zdCB2ID0gK3gucmVwbGFjZShcInB4XCIsIFwiXCIpO1xuICBcdFx0aWYgKCFpc05hTih2KSkgcmV0dXJuIHsgZm9ybWF0OiBcInBpeGVsc1wiLCB2YWx1ZTogdiB9O1xuICBcdFx0ZWxzZSB7XG4gIFx0XHRcdGVycihcIm9mZnNldCB2YWx1ZSBtdXN0IGJlIGluICdweCcgZm9ybWF0LiBGYWxsYmFjayB0byAwLjUuXCIpO1xuICBcdFx0XHRyZXR1cm4geyBmb3JtYXQ6IFwicGVyY2VudFwiLCB2YWx1ZTogMC41IH07XG4gIFx0XHR9XG4gIFx0fSBlbHNlIGlmICh0eXBlb2YgeCA9PT0gXCJudW1iZXJcIiB8fCAhaXNOYU4oK3gpKSB7XG4gIFx0XHRpZiAoeCA+IDEpIGVycihcIm9mZnNldCB2YWx1ZSBpcyBncmVhdGVyIHRoYW4gMS4gRmFsbGJhY2sgdG8gMS5cIik7XG4gIFx0XHRpZiAoeCA8IDApIGVycihcIm9mZnNldCB2YWx1ZSBpcyBsb3dlciB0aGFuIDAuIEZhbGxiYWNrIHRvIDAuXCIpO1xuICBcdFx0cmV0dXJuIHsgZm9ybWF0OiBcInBlcmNlbnRcIiwgdmFsdWU6IE1hdGgubWluKE1hdGgubWF4KDAsIHgpLCAxKSB9O1xuICBcdH1cbiAgXHRyZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluZGV4U3RlcHMoc3RlcHMpIHtcbiAgXHRzdGVwcy5mb3JFYWNoKChzdGVwKSA9PlxuICBcdFx0c3RlcC5ub2RlLnNldEF0dHJpYnV0ZShcImRhdGEtc2Nyb2xsYW1hLWluZGV4XCIsIHN0ZXAuaW5kZXgpXG4gIFx0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE9mZnNldFRvcChub2RlKSB7XG4gICAgY29uc3QgeyB0b3AgfSA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgIGNvbnN0IGNsaWVudFRvcCA9IGRvY3VtZW50LmJvZHkuY2xpZW50VG9wIHx8IDA7XG4gICAgcmV0dXJuIHRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcDtcbiAgfVxuXG4gIGxldCBjdXJyZW50U2Nyb2xsWTtcbiAgbGV0IGNvbXBhcmlzb25TY3JvbGxZO1xuICBsZXQgZGlyZWN0aW9uO1xuXG4gIGZ1bmN0aW9uIG9uU2Nyb2xsKGNvbnRhaW5lcikge1xuICBcdGNvbnN0IHNjcm9sbFRvcCA9IGNvbnRhaW5lciA/IGNvbnRhaW5lci5zY3JvbGxUb3AgOiB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgXHRpZiAoY3VycmVudFNjcm9sbFkgPT09IHNjcm9sbFRvcCkgcmV0dXJuO1xuICBcdGN1cnJlbnRTY3JvbGxZID0gc2Nyb2xsVG9wO1xuICBcdGlmIChjdXJyZW50U2Nyb2xsWSA+IGNvbXBhcmlzb25TY3JvbGxZKSBkaXJlY3Rpb24gPSBcImRvd25cIjtcbiAgXHRlbHNlIGlmIChjdXJyZW50U2Nyb2xsWSA8IGNvbXBhcmlzb25TY3JvbGxZKSBkaXJlY3Rpb24gPSBcInVwXCI7XG4gIFx0Y29tcGFyaXNvblNjcm9sbFkgPSBjdXJyZW50U2Nyb2xsWTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldHVwU2Nyb2xsKGNvbnRhaW5lcikge1xuICBcdGN1cnJlbnRTY3JvbGxZID0gMDtcbiAgXHRjb21wYXJpc29uU2Nyb2xsWSA9IDA7XG4gIFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiBvblNjcm9sbChjb250YWluZXIpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNjcm9sbGFtYSgpIHtcbiAgXHRsZXQgY2IgPSB7fTtcblxuICBcdGxldCBpZCA9IGdlbmVyYXRlSWQoKTtcbiAgXHRsZXQgc3RlcHMgPSBbXTtcbiAgXHRsZXQgZ2xvYmFsT2Zmc2V0O1xuICBcdGxldCBjb250YWluZXJFbGVtZW50O1xuICBcdGxldCByb290RWxlbWVudDtcblxuICBcdGxldCBwcm9ncmVzc1RocmVzaG9sZCA9IDA7XG5cbiAgXHRsZXQgaXNFbmFibGVkID0gZmFsc2U7XG4gIFx0bGV0IGlzUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgXHRsZXQgaXNEZWJ1ZyA9IGZhbHNlO1xuICBcdGxldCBpc1RyaWdnZXJPbmNlID0gZmFsc2U7XG5cbiAgXHRsZXQgZXhjbHVkZSA9IFtdO1xuXG4gIFx0LyogSEVMUEVSUyAqL1xuICBcdGZ1bmN0aW9uIHJlc2V0KCkge1xuICBcdFx0Y2IgPSB7XG4gIFx0XHRcdHN0ZXBFbnRlcjogKCkgPT4geyB9LFxuICBcdFx0XHRzdGVwRXhpdDogKCkgPT4geyB9LFxuICBcdFx0XHRzdGVwUHJvZ3Jlc3M6ICgpID0+IHsgfSxcbiAgXHRcdH07XG4gIFx0XHRleGNsdWRlID0gW107XG4gIFx0fVxuXG4gIFx0ZnVuY3Rpb24gaGFuZGxlRW5hYmxlKHNob3VsZEVuYWJsZSkge1xuICBcdFx0aWYgKHNob3VsZEVuYWJsZSAmJiAhaXNFbmFibGVkKSB1cGRhdGVPYnNlcnZlcnMoKTtcbiAgXHRcdGlmICghc2hvdWxkRW5hYmxlICYmIGlzRW5hYmxlZCkgZGlzY29ubmVjdE9ic2VydmVycygpO1xuICBcdFx0aXNFbmFibGVkID0gc2hvdWxkRW5hYmxlO1xuICBcdH1cblxuICBcdC8qIE5PVElGWSBDQUxMQkFDS1MgKi9cbiAgXHRmdW5jdGlvbiBub3RpZnlQcm9ncmVzcyhlbGVtZW50LCBwcm9ncmVzcykge1xuICBcdFx0Y29uc3QgaW5kZXggPSBnZXRJbmRleChlbGVtZW50KTtcbiAgXHRcdGNvbnN0IHN0ZXAgPSBzdGVwc1tpbmRleF07XG4gIFx0XHRpZiAocHJvZ3Jlc3MgIT09IHVuZGVmaW5lZCkgc3RlcC5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICBcdFx0Y29uc3QgcmVzcG9uc2UgPSB7IGVsZW1lbnQsIGluZGV4LCBwcm9ncmVzcywgZGlyZWN0aW9uIH07XG4gIFx0XHRpZiAoc3RlcC5zdGF0ZSA9PT0gXCJlbnRlclwiKSBjYi5zdGVwUHJvZ3Jlc3MocmVzcG9uc2UpO1xuICBcdH1cblxuICBcdGZ1bmN0aW9uIG5vdGlmeVN0ZXBFbnRlcihlbGVtZW50LCBjaGVjayA9IHRydWUpIHtcbiAgXHRcdGNvbnN0IGluZGV4ID0gZ2V0SW5kZXgoZWxlbWVudCk7XG4gIFx0XHRjb25zdCBzdGVwID0gc3RlcHNbaW5kZXhdO1xuICBcdFx0Y29uc3QgcmVzcG9uc2UgPSB7IGVsZW1lbnQsIGluZGV4LCBkaXJlY3Rpb24gfTtcblxuICBcdFx0c3RlcC5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gIFx0XHRzdGVwLnN0YXRlID0gXCJlbnRlclwiO1xuXG4gIFx0XHQvLyBpZiAoaXNQcmVzZXJ2ZU9yZGVyICYmIGNoZWNrICYmIGRpcmVjdGlvbiAhPT0gXCJ1cFwiKVxuICBcdFx0Ly8gICBub3RpZnlPdGhlcnMoaW5kZXgsIFwiYWJvdmVcIik7XG4gIFx0XHQvLyBpZiAoaXNQcmVzZXJ2ZU9yZGVyICYmIGNoZWNrICYmIGRpcmVjdGlvbiA9PT0gXCJ1cFwiKVxuICBcdFx0Ly8gICBub3RpZnlPdGhlcnMoaW5kZXgsIFwiYmVsb3dcIik7XG5cbiAgXHRcdGlmICghZXhjbHVkZVtpbmRleF0pIGNiLnN0ZXBFbnRlcihyZXNwb25zZSk7XG4gIFx0XHRpZiAoaXNUcmlnZ2VyT25jZSkgZXhjbHVkZVtpbmRleF0gPSB0cnVlO1xuICBcdH1cblxuICBcdGZ1bmN0aW9uIG5vdGlmeVN0ZXBFeGl0KGVsZW1lbnQsIGNoZWNrID0gdHJ1ZSkge1xuICBcdFx0Y29uc3QgaW5kZXggPSBnZXRJbmRleChlbGVtZW50KTtcbiAgXHRcdGNvbnN0IHN0ZXAgPSBzdGVwc1tpbmRleF07XG5cbiAgXHRcdGlmICghc3RlcC5zdGF0ZSkgcmV0dXJuIGZhbHNlO1xuXG4gIFx0XHRjb25zdCByZXNwb25zZSA9IHsgZWxlbWVudCwgaW5kZXgsIGRpcmVjdGlvbiB9O1xuXG4gIFx0XHRpZiAoaXNQcm9ncmVzcykge1xuICBcdFx0XHRpZiAoZGlyZWN0aW9uID09PSBcImRvd25cIiAmJiBzdGVwLnByb2dyZXNzIDwgMSkgbm90aWZ5UHJvZ3Jlc3MoZWxlbWVudCwgMSk7XG4gIFx0XHRcdGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJ1cFwiICYmIHN0ZXAucHJvZ3Jlc3MgPiAwKVxuICBcdFx0XHRcdG5vdGlmeVByb2dyZXNzKGVsZW1lbnQsIDApO1xuICBcdFx0fVxuXG4gIFx0XHRzdGVwLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgXHRcdHN0ZXAuc3RhdGUgPSBcImV4aXRcIjtcblxuICBcdFx0Y2Iuc3RlcEV4aXQocmVzcG9uc2UpO1xuICBcdH1cblxuICBcdC8qIE9CU0VSVkVSUyAtIEhBTkRMSU5HICovXG4gIFx0ZnVuY3Rpb24gcmVzaXplU3RlcChbZW50cnldKSB7XG4gIFx0XHRjb25zdCBpbmRleCA9IGdldEluZGV4KGVudHJ5LnRhcmdldCk7XG4gIFx0XHRjb25zdCBzdGVwID0gc3RlcHNbaW5kZXhdO1xuICBcdFx0Y29uc3QgaCA9IGVudHJ5LnRhcmdldC5vZmZzZXRIZWlnaHQ7XG4gIFx0XHRpZiAoaCAhPT0gc3RlcC5oZWlnaHQpIHtcbiAgXHRcdFx0c3RlcC5oZWlnaHQgPSBoO1xuICBcdFx0XHRkaXNjb25uZWN0T2JzZXJ2ZXIoc3RlcCk7XG4gIFx0XHRcdHVwZGF0ZVN0ZXBPYnNlcnZlcihzdGVwKTtcbiAgXHRcdFx0dXBkYXRlUmVzaXplT2JzZXJ2ZXIoc3RlcCk7XG4gIFx0XHR9XG4gIFx0fVxuXG4gIFx0ZnVuY3Rpb24gaW50ZXJzZWN0U3RlcChbZW50cnldKSB7XG4gIFx0XHRvblNjcm9sbChjb250YWluZXJFbGVtZW50KTtcblxuICBcdFx0Y29uc3QgeyBpc0ludGVyc2VjdGluZywgdGFyZ2V0IH0gPSBlbnRyeTtcbiAgXHRcdGlmIChpc0ludGVyc2VjdGluZykgbm90aWZ5U3RlcEVudGVyKHRhcmdldCk7XG4gIFx0XHRlbHNlIG5vdGlmeVN0ZXBFeGl0KHRhcmdldCk7XG4gIFx0fVxuXG4gIFx0ZnVuY3Rpb24gaW50ZXJzZWN0UHJvZ3Jlc3MoW2VudHJ5XSkge1xuICBcdFx0Y29uc3QgaW5kZXggPSBnZXRJbmRleChlbnRyeS50YXJnZXQpO1xuICBcdFx0Y29uc3Qgc3RlcCA9IHN0ZXBzW2luZGV4XTtcbiAgXHRcdGNvbnN0IHsgaXNJbnRlcnNlY3RpbmcsIGludGVyc2VjdGlvblJhdGlvLCB0YXJnZXQgfSA9IGVudHJ5O1xuICBcdFx0aWYgKGlzSW50ZXJzZWN0aW5nICYmIHN0ZXAuc3RhdGUgPT09IFwiZW50ZXJcIilcbiAgXHRcdFx0bm90aWZ5UHJvZ3Jlc3ModGFyZ2V0LCBpbnRlcnNlY3Rpb25SYXRpbyk7XG4gIFx0fVxuXG4gIFx0LyogIE9CU0VSVkVSUyAtIENSRUFUSU9OICovXG4gIFx0ZnVuY3Rpb24gZGlzY29ubmVjdE9ic2VydmVyKHsgb2JzZXJ2ZXJzIH0pIHtcbiAgXHRcdE9iamVjdC5rZXlzKG9ic2VydmVycykubWFwKChuYW1lKSA9PiB7XG4gIFx0XHRcdG9ic2VydmVyc1tuYW1lXS5kaXNjb25uZWN0KCk7XG4gIFx0XHR9KTtcbiAgXHR9XG5cbiAgXHRmdW5jdGlvbiBkaXNjb25uZWN0T2JzZXJ2ZXJzKCkge1xuICBcdFx0c3RlcHMuZm9yRWFjaChkaXNjb25uZWN0T2JzZXJ2ZXIpO1xuICBcdH1cblxuICBcdGZ1bmN0aW9uIHVwZGF0ZVJlc2l6ZU9ic2VydmVyKHN0ZXApIHtcbiAgXHRcdGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKHJlc2l6ZVN0ZXApO1xuICBcdFx0b2JzZXJ2ZXIub2JzZXJ2ZShzdGVwLm5vZGUpO1xuICBcdFx0c3RlcC5vYnNlcnZlcnMucmVzaXplID0gb2JzZXJ2ZXI7XG4gIFx0fVxuXG4gIFx0ZnVuY3Rpb24gdXBkYXRlUmVzaXplT2JzZXJ2ZXJzKCkge1xuICBcdFx0c3RlcHMuZm9yRWFjaCh1cGRhdGVSZXNpemVPYnNlcnZlcik7XG4gIFx0fVxuXG4gIFx0ZnVuY3Rpb24gdXBkYXRlU3RlcE9ic2VydmVyKHN0ZXApIHtcbiAgXHRcdGNvbnN0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIFx0XHRjb25zdCBvZmYgPSBzdGVwLm9mZnNldCB8fCBnbG9iYWxPZmZzZXQ7XG4gIFx0XHRjb25zdCBmYWN0b3IgPSBvZmYuZm9ybWF0ID09PSBcInBpeGVsc1wiID8gMSA6IGg7XG4gIFx0XHRjb25zdCBvZmZzZXQgPSBvZmYudmFsdWUgKiBmYWN0b3I7XG4gIFx0XHRjb25zdCBtYXJnaW5Ub3AgPSBzdGVwLmhlaWdodCAvIDIgLSBvZmZzZXQ7XG4gIFx0XHRjb25zdCBtYXJnaW5Cb3R0b20gPSBzdGVwLmhlaWdodCAvIDIgLSAoaCAtIG9mZnNldCk7XG4gIFx0XHRjb25zdCByb290TWFyZ2luID0gYCR7bWFyZ2luVG9wfXB4IDBweCAke21hcmdpbkJvdHRvbX1weCAwcHhgO1xuICBcdFx0Y29uc3Qgcm9vdCA9IHJvb3RFbGVtZW50O1xuXG4gIFx0XHRjb25zdCB0aHJlc2hvbGQgPSAwLjU7XG4gIFx0XHRjb25zdCBvcHRpb25zID0geyByb290TWFyZ2luLCB0aHJlc2hvbGQsIHJvb3QgfTtcbiAgXHRcdGNvbnN0IG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGludGVyc2VjdFN0ZXAsIG9wdGlvbnMpO1xuXG4gIFx0XHRvYnNlcnZlci5vYnNlcnZlKHN0ZXAubm9kZSk7XG4gIFx0XHRzdGVwLm9ic2VydmVycy5zdGVwID0gb2JzZXJ2ZXI7XG5cbiAgXHRcdGlmIChpc0RlYnVnKSB1cGRhdGUoeyBpZCwgc3RlcCwgbWFyZ2luVG9wLCBtYXJnaW5Cb3R0b20gfSk7XG4gIFx0fVxuXG4gIFx0ZnVuY3Rpb24gdXBkYXRlU3RlcE9ic2VydmVycygpIHtcbiAgXHRcdHN0ZXBzLmZvckVhY2godXBkYXRlU3RlcE9ic2VydmVyKTtcbiAgXHR9XG5cbiAgXHRmdW5jdGlvbiB1cGRhdGVQcm9ncmVzc09ic2VydmVyKHN0ZXApIHtcbiAgXHRcdGNvbnN0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIFx0XHRjb25zdCBvZmYgPSBzdGVwLm9mZnNldCB8fCBnbG9iYWxPZmZzZXQ7XG4gIFx0XHRjb25zdCBmYWN0b3IgPSBvZmYuZm9ybWF0ID09PSBcInBpeGVsc1wiID8gMSA6IGg7XG4gIFx0XHRjb25zdCBvZmZzZXQgPSBvZmYudmFsdWUgKiBmYWN0b3I7XG4gIFx0XHRjb25zdCBtYXJnaW5Ub3AgPSAtb2Zmc2V0ICsgc3RlcC5oZWlnaHQ7XG4gIFx0XHRjb25zdCBtYXJnaW5Cb3R0b20gPSBvZmZzZXQgLSBoO1xuICBcdFx0Y29uc3Qgcm9vdE1hcmdpbiA9IGAke21hcmdpblRvcH1weCAwcHggJHttYXJnaW5Cb3R0b219cHggMHB4YDtcblxuICBcdFx0Y29uc3QgdGhyZXNob2xkID0gY3JlYXRlUHJvZ3Jlc3NUaHJlc2hvbGQoc3RlcC5oZWlnaHQsIHByb2dyZXNzVGhyZXNob2xkKTtcbiAgXHRcdGNvbnN0IG9wdGlvbnMgPSB7IHJvb3RNYXJnaW4sIHRocmVzaG9sZCB9O1xuICBcdFx0Y29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaW50ZXJzZWN0UHJvZ3Jlc3MsIG9wdGlvbnMpO1xuXG4gIFx0XHRvYnNlcnZlci5vYnNlcnZlKHN0ZXAubm9kZSk7XG4gIFx0XHRzdGVwLm9ic2VydmVycy5wcm9ncmVzcyA9IG9ic2VydmVyO1xuICBcdH1cblxuICBcdGZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzT2JzZXJ2ZXJzKCkge1xuICBcdFx0c3RlcHMuZm9yRWFjaCh1cGRhdGVQcm9ncmVzc09ic2VydmVyKTtcbiAgXHR9XG5cbiAgXHRmdW5jdGlvbiB1cGRhdGVPYnNlcnZlcnMoKSB7XG4gIFx0XHRkaXNjb25uZWN0T2JzZXJ2ZXJzKCk7XG4gIFx0XHR1cGRhdGVSZXNpemVPYnNlcnZlcnMoKTtcbiAgXHRcdHVwZGF0ZVN0ZXBPYnNlcnZlcnMoKTtcbiAgXHRcdGlmIChpc1Byb2dyZXNzKSB1cGRhdGVQcm9ncmVzc09ic2VydmVycygpO1xuICBcdH1cblxuICBcdC8qIFNFVFVQICovXG4gIFx0Y29uc3QgUyA9IHt9O1xuXG4gIFx0Uy5zZXR1cCA9ICh7XG4gIFx0XHRzdGVwLFxuICBcdFx0cGFyZW50LFxuICBcdFx0b2Zmc2V0ID0gMC41LFxuICBcdFx0dGhyZXNob2xkID0gNCxcbiAgXHRcdHByb2dyZXNzID0gZmFsc2UsXG4gIFx0XHRvbmNlID0gZmFsc2UsXG4gIFx0XHRkZWJ1ZyA9IGZhbHNlLFxuICBcdFx0Y29udGFpbmVyID0gdW5kZWZpbmVkLFxuICBcdFx0cm9vdCA9IG51bGxcbiAgXHR9KSA9PiB7XG5cbiAgXHRcdHNldHVwU2Nyb2xsKGNvbnRhaW5lcik7XG5cbiAgXHRcdHN0ZXBzID0gc2VsZWN0QWxsKHN0ZXAsIHBhcmVudCkubWFwKChub2RlLCBpbmRleCkgPT4gKHtcbiAgXHRcdFx0aW5kZXgsXG4gIFx0XHRcdGRpcmVjdGlvbjogdW5kZWZpbmVkLFxuICBcdFx0XHRoZWlnaHQ6IG5vZGUub2Zmc2V0SGVpZ2h0LFxuICBcdFx0XHRub2RlLFxuICBcdFx0XHRvYnNlcnZlcnM6IHt9LFxuICBcdFx0XHRvZmZzZXQ6IHBhcnNlT2Zmc2V0KG5vZGUuZGF0YXNldC5vZmZzZXQpLFxuICBcdFx0XHR0b3A6IGdldE9mZnNldFRvcChub2RlKSxcbiAgXHRcdFx0cHJvZ3Jlc3M6IDAsXG4gIFx0XHRcdHN0YXRlOiB1bmRlZmluZWQsXG4gIFx0XHR9KSk7XG5cbiAgXHRcdGlmICghc3RlcHMubGVuZ3RoKSB7XG4gIFx0XHRcdGVyciQxKFwibm8gc3RlcCBlbGVtZW50c1wiKTtcbiAgXHRcdFx0cmV0dXJuIFM7XG4gIFx0XHR9XG5cbiAgXHRcdGlzUHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgXHRcdGlzVHJpZ2dlck9uY2UgPSBvbmNlO1xuICBcdFx0aXNEZWJ1ZyA9IGRlYnVnO1xuICBcdFx0cHJvZ3Jlc3NUaHJlc2hvbGQgPSBNYXRoLm1heCgxLCArdGhyZXNob2xkKTtcbiAgXHRcdGdsb2JhbE9mZnNldCA9IHBhcnNlT2Zmc2V0KG9mZnNldCk7XG4gIFx0XHRjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xuICBcdFx0cm9vdEVsZW1lbnQgPSByb290O1xuXG4gIFx0XHRyZXNldCgpO1xuICBcdFx0aW5kZXhTdGVwcyhzdGVwcyk7XG4gIFx0XHRoYW5kbGVFbmFibGUodHJ1ZSk7XG4gIFx0XHRyZXR1cm4gUztcbiAgXHR9O1xuXG4gIFx0Uy5lbmFibGUgPSAoKSA9PiB7XG4gIFx0XHRoYW5kbGVFbmFibGUodHJ1ZSk7XG4gIFx0XHRyZXR1cm4gUztcbiAgXHR9O1xuXG4gIFx0Uy5kaXNhYmxlID0gKCkgPT4ge1xuICBcdFx0aGFuZGxlRW5hYmxlKGZhbHNlKTtcbiAgXHRcdHJldHVybiBTO1xuICBcdH07XG5cbiAgXHRTLmRlc3Ryb3kgPSAoKSA9PiB7XG4gIFx0XHRoYW5kbGVFbmFibGUoZmFsc2UpO1xuICBcdFx0cmVzZXQoKTtcbiAgXHRcdHJldHVybiBTO1xuICBcdH07XG5cbiAgXHRTLnJlc2l6ZSA9ICgpID0+IHtcbiAgXHRcdHVwZGF0ZU9ic2VydmVycygpO1xuICBcdFx0cmV0dXJuIFM7XG4gIFx0fTtcblxuICBcdFMub2Zmc2V0ID0gKHgpID0+IHtcbiAgXHRcdGlmICh4ID09PSBudWxsIHx8IHggPT09IHVuZGVmaW5lZCkgcmV0dXJuIGdsb2JhbE9mZnNldC52YWx1ZTtcbiAgXHRcdGdsb2JhbE9mZnNldCA9IHBhcnNlT2Zmc2V0KHgpO1xuICBcdFx0dXBkYXRlT2JzZXJ2ZXJzKCk7XG4gIFx0XHRyZXR1cm4gUztcbiAgXHR9O1xuXG4gIFx0Uy5vblN0ZXBFbnRlciA9IChmKSA9PiB7XG4gIFx0XHRpZiAodHlwZW9mIGYgPT09IFwiZnVuY3Rpb25cIikgY2Iuc3RlcEVudGVyID0gZjtcbiAgXHRcdGVsc2UgZXJyJDEoXCJvblN0ZXBFbnRlciByZXF1aXJlcyBhIGZ1bmN0aW9uXCIpO1xuICBcdFx0cmV0dXJuIFM7XG4gIFx0fTtcblxuICBcdFMub25TdGVwRXhpdCA9IChmKSA9PiB7XG4gIFx0XHRpZiAodHlwZW9mIGYgPT09IFwiZnVuY3Rpb25cIikgY2Iuc3RlcEV4aXQgPSBmO1xuICBcdFx0ZWxzZSBlcnIkMShcIm9uU3RlcEV4aXQgcmVxdWlyZXMgYSBmdW5jdGlvblwiKTtcbiAgXHRcdHJldHVybiBTO1xuICBcdH07XG5cbiAgXHRTLm9uU3RlcFByb2dyZXNzID0gKGYpID0+IHtcbiAgXHRcdGlmICh0eXBlb2YgZiA9PT0gXCJmdW5jdGlvblwiKSBjYi5zdGVwUHJvZ3Jlc3MgPSBmO1xuICBcdFx0ZWxzZSBlcnIkMShcIm9uU3RlcFByb2dyZXNzIHJlcXVpcmVzIGEgZnVuY3Rpb25cIik7XG4gIFx0XHRyZXR1cm4gUztcbiAgXHR9O1xuICBcdHJldHVybiBTO1xuICB9XG5cbiAgcmV0dXJuIHNjcm9sbGFtYTtcblxufSkpKTtcbiIsIi8qKlxyXG4gKiBGaWxlIG5hdmlnYXRpb24uanMuXHJcbiAqXHJcbiAqIEhhbmRsZXMgdG9nZ2xpbmcgdGhlIG5hdmlnYXRpb24gbWVudSBmb3Igc21hbGwgc2NyZWVucyBhbmQgZW5hYmxlcyBUQUIga2V5XHJcbiAqIG5hdmlnYXRpb24gc3VwcG9ydCBmb3IgZHJvcGRvd24gbWVudXMuXHJcbiAqL1xyXG4vLyBjbGFzcyBOYXZNZW51IHtcclxuLy8gXHRjb25zdHJ1Y3RvcihtZW51LCBidXR0b24pIHtcclxuLy8gXHRcdHRoaXMubWVudSA9IG1lbnU7XHJcbi8vIFx0XHR0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcclxuLy8gXHRcdHRoaXMuZmlyc3RGb2N1c2FibGUgPSBidXR0b247XHJcbi8vIFx0XHR0aGlzLmxhc3RGb2N1c2FibGUgPSB0aGlzLmdldExhc3RGb2N1c2FibGUoKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnRvZ2dsZU1lbnUuYmluZCh0aGlzKSk7XHJcbi8vIFx0XHR0aGlzLm1lbnVJc09wZW4gPSBmYWxzZTtcclxuLy8gXHRcdHRoaXMudHJhbnNpdGlvbkVuZElzQWRkZWQgPSBmYWxzZTtcclxuLy8gXHRcdHRoaXMucHJlZmVyc1JlZHVjZWQgPVxyXG4vLyBcdFx0XHR3aW5kb3cubWF0Y2hNZWRpYShgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlgKSA9PT0gdHJ1ZSB8fFxyXG4vLyBcdFx0XHR3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpLm1hdGNoZXMgPT0gdHJ1ZTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdHRvZ2dsZU1lbnUoZSkge1xyXG4vLyBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyBcdFx0YWxlcnQoJ1dvcmtzJyk7XHJcbi8vIFx0XHRpZiAodGhpcy5tZW51SXNPcGVuKSB7XHJcbi8vIFx0XHRcdHRoaXMuY2xvc2VNZW51KCk7XHJcbi8vIFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHR0aGlzLm9wZW5NZW51KCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRvcGVuTWVudSgpIHtcclxuXHJcbi8vIFx0XHR0aGlzLm1lbnVJc09wZW4gPSB0cnVlO1xyXG4vLyBcdFx0dGhpcy5tZW51LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuLy8gXHRcdHRoaXMubWVudS5jbGFzc0xpc3QuYWRkKFwidG9nZ2xlZFwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJpcy1hY3RpdmVcIik7XHJcbi8vIFx0XHR0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcclxuLy8gXHRcdHRoaXMuZmlyc3RGb2N1c2FibGUuZm9jdXMoKTtcclxuLy8gXHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2Nyb2xsLWxvY2tcIik7XHJcbi8vIFx0XHR0aGlzLm1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3Vzb3V0XCIsIHRoaXMuZm9jdXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4vLyBcdFx0dGhpcy5tZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuZXNjSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdGNsb3NlTWVudSgpIHtcclxuLy8gXHRcdHRoaXMubWVudUlzT3BlbiA9IGZhbHNlO1xyXG4vLyBcdFx0dGhpcy5tZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGVkXCIpO1xyXG4vLyBcdFx0dGhpcy5idXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmZvY3VzKCk7XHJcbi8vIFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNjcm9sbC1sb2NrXCIpO1xyXG4vLyBcdFx0dGhpcy5tZW51LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCB0aGlzLmZvY3VzSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuLy8gXHRcdHRoaXMubWVudS5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmVzY0hhbmRsZXIuYmluZCh0aGlzKSk7XHJcbi8vIFx0XHRjb25zdCBjbG9zZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwibWVudV9jbG9zZWRcIiwge1xyXG4vLyBcdFx0XHRkZXRhaWw6IHsgbWVudTogdGhpcy5tZW51IH0sXHJcbi8vIFx0XHR9KTtcclxuLy8gXHRcdHdpbmRvdy5kaXNwYXRjaEV2ZW50KGNsb3NlRXZlbnQpO1xyXG4vLyBcdFx0aWYgKHRoaXMucHJlZmVyc1JlZHVjZWQpIHtcclxuLy8gXHRcdFx0YWxlcnQoXCJ0aGlzXCIpO1xyXG4vLyBcdFx0XHR0aGlzLmhpZGVWaXNpYmlsaXR5T25FbmQoKTtcclxuLy8gXHRcdFx0cmV0dXJuO1xyXG4vLyBcdFx0fVxyXG4vLyBcdFx0aWYgKCF0aGlzLnRyYW5zaXRpb25FbmRJc0FkZGVkKSB7XHJcbi8vIFx0XHRcdHRoaXMubWVudS5hZGRFdmVudExpc3RlbmVyKFxyXG4vLyBcdFx0XHRcdFwidHJhbnNpdGlvbmVuZFwiLFxyXG4vLyBcdFx0XHRcdHRoaXMuaGlkZVZpc2liaWxpdHlPbkVuZCh0aGlzKVxyXG4vLyBcdFx0XHQpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdH1cclxuXHJcbi8vIFx0aGlkZVZpc2liaWxpdHlPbkVuZCgpIHtcclxuLy8gXHRcdGlmICh0aGlzLm1lbnVJc09wZW4pIHJldHVybjtcclxuLy8gXHRcdHRoaXMubWVudS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuLy8gXHRcdHRoaXMubWVudS5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4vLyBcdFx0XHRcInRyYW5zaXRpb25lbmRcIixcclxuLy8gXHRcdFx0dGhpcy5oaWRlVmlzaWJpbGl0eU9uRW5kLmJpbmQodGhpcylcclxuLy8gXHRcdCk7XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRjbG9zZU1lbnVDbGVhbigpIHtcclxuLy8gXHRcdHRoaXMubWVudS5jbGFzc0xpc3QucmVtb3ZlKFwidG9nZ2xlZFwiKTtcclxuLy8gXHRcdHRoaXMuYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1hY3RpdmVcIik7XHJcbi8vIFx0XHR0aGlzLmJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIFwiZmFsc2VcIik7XHJcbi8vIFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNjcm9sbC1sb2NrXCIpO1xyXG4vLyBcdFx0aWYgKHRoaXMucHJlZmVyc1JlZHVjZWQpIHtcclxuLy8gXHRcdFx0dGhpcy5oaWRlVmlzaWJpbGl0eU9uRW5kKCk7XHJcbi8vIFx0XHRcdHJldHVybjtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcblxyXG4vLyBcdGdldExhc3RGb2N1c2FibGUoKSB7XHJcbi8vIFx0XHRsZXQgZm9jdXNhYmxlID0gW107XHJcbi8vIFx0XHRsZXQgYWxsRGVzY2VuZGFudHMgPSB0aGlzLm1lbnUucXVlcnlTZWxlY3RvckFsbChcIipcIik7XHJcbi8vIFx0XHRhbGxEZXNjZW5kYW50cy5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4vLyBcdFx0XHRpZiAodGhpcy5pc0ZvY3VzYWJsZShjaGlsZCkpIHtcclxuLy8gXHRcdFx0XHRmb2N1c2FibGUucHVzaChjaGlsZCk7XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdH0pO1xyXG4vLyBcdFx0cmV0dXJuIGZvY3VzYWJsZVtmb2N1c2FibGUubGVuZ3RoIC0gMV07XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRpc0ZvY3VzYWJsZShlbGVtZW50KSB7XHJcbi8vIFx0XHRpZiAoZWxlbWVudC50YWJJbmRleCA8IDApIHtcclxuLy8gXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4vLyBcdFx0fVxyXG5cclxuLy8gXHRcdGlmIChlbGVtZW50LmRpc2FibGVkKSB7XHJcbi8vIFx0XHRcdHJldHVybiBmYWxzZTtcclxuLy8gXHRcdH1cclxuLy8gXHRcdGlmICghZWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcclxuLy8gXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG4vLyBcdFx0fVxyXG4vLyBcdFx0c3dpdGNoIChlbGVtZW50Lm5vZGVOYW1lKSB7XHJcbi8vIFx0XHRcdGNhc2UgXCJBXCI6XHJcbi8vIFx0XHRcdFx0cmV0dXJuICEhZWxlbWVudC5ocmVmICYmIGVsZW1lbnQucmVsICE9IFwiaWdub3JlXCI7XHJcbi8vIFx0XHRcdGNhc2UgXCJJTlBVVFwiOlxyXG4vLyBcdFx0XHRcdHJldHVybiBlbGVtZW50LnR5cGUgIT0gXCJoaWRkZW5cIjtcclxuLy8gXHRcdFx0Y2FzZSBcIkJVVFRPTlwiOlxyXG4vLyBcdFx0XHRjYXNlIFwiU0VMRUNUXCI6XHJcbi8vIFx0XHRcdGNhc2UgXCJURVhUQVJFQVwiOlxyXG4vLyBcdFx0XHRcdHJldHVybiB0cnVlO1xyXG4vLyBcdFx0XHRkZWZhdWx0OlxyXG4vLyBcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcblxyXG4vLyBcdGZvY3VzSGFuZGxlcihlKSB7XHJcbi8vIFx0XHRpZiAoXHJcbi8vIFx0XHRcdGUudGFyZ2V0ID09IHRoaXMubGFzdEZvY3VzYWJsZSAmJlxyXG4vLyBcdFx0XHQhdGhpcy5tZW51LmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldClcclxuLy8gXHRcdCkge1xyXG4vLyBcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vIFx0XHRcdHRoaXMuZmlyc3RGb2N1c2FibGUuZm9jdXMoKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcblxyXG4vLyBcdGVzY0hhbmRsZXIoZSkge1xyXG4vLyBcdFx0aWYgKGUua2V5ID09IFwiRXNjYXBlXCIpIHtcclxuLy8gXHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9XHJcbi8vIH1cclxuXHJcbmNvbnN0IGhhbWJ1cmdlclRvZ2dsZSA9ICgpID0+IHtcclxuXHJcblx0Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciNtYXN0aGVhZCAuaGVhZGVyIC5oYW1idXJnZXJfY29udGFpbmVyIGJ1dHRvbiNoYW1idXJnZXJcIik7XHJcblx0Y29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciNtYXN0aGVhZDpub3QoOmhhcyh+IC5ob21lLXBhZ2UpKSAjc2l0ZS1uYXZpZ2F0aW9uXCIpO1xyXG5cclxuXHRpZiAoIWJ1dHRvbiB8fCAhbmF2KSByZXR1cm47XHJcblxyXG5cdC8vIFRvZ2dsZSBuYXYgb24gYnV0dG9uIGNsaWNrXHJcblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcclxuXHJcblx0XHQvLyBPcHRpb25hbDogYWRkIGJvcmRlciB0byB0ZXN0XHJcblx0XHQvL2J1dHRvbi5zdHlsZS5ib3JkZXIgPSBuYXYuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSA/IFwiMnB4IHNvbGlkIHJlZFwiIDogXCJcIjtcclxuXHR9KTtcclxuXHJcblx0Ly8gQ2xvc2UgbmF2IHdoZW4gY2xpY2tpbmcgb3V0c2lkZVxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cdFx0aWYgKCFuYXYuY29udGFpbnMoZS50YXJnZXQpICYmICFidXR0b24uY29udGFpbnMoZS50YXJnZXQpKSB7XHJcblx0XHRcdG5hdi5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcclxuXHRcdFx0Ly9idXR0b24uc3R5bGUuYm9yZGVyID0gXCJcIjsgLy8gcmVtb3ZlIHRlc3QgYm9yZGVyXHJcblx0XHR9XHJcblx0fSk7XHJcbn07XHJcblxyXG5jb25zdCBoYW1idXJnZXJUb2dnbGVNb2JpbGUgPSAoKSA9PiB7XHJcblxyXG5cdGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIjbWFzdGhlYWQuYmdfbGlnaHRfZ3JheS5tb2JpbGVfb25seSAuaGVhZGVyIC5oYW1idXJnZXJfY29udGFpbmVyIGJ1dHRvbiNoYW1idXJnZXJfbW9iaWxlXCIpO1xyXG5cdGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIjbWFzdGhlYWQuYmdfbGlnaHRfZ3JheS5tb2JpbGVfb25seTpub3QoOmhhcyh+IC5ob21lLXBhZ2UpKSAjbW9iaWxlX25hdlwiKTtcclxuXHJcblx0aWYgKCFidXR0b24gfHwgIW5hdikgcmV0dXJuO1xyXG5cclxuXHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuXHRcdC8vIGlmIChuYXYuc3R5bGUudmlzaWJpbGl0eSA9PT0gXCJ2aXNpYmxlXCIpIHtcclxuXHRcdC8vIFx0bmF2LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG5cdFx0Ly8gfSBlbHNlIHtcclxuXHRcdC8vIFx0bmF2LnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcclxuXHRcdC8vIH1cclxuXHRcdG5hdi5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcclxuXHR9KTtcclxuXHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcblx0XHRpZiAoIW5hdi5jb250YWlucyhlLnRhcmdldCkgJiYgIWJ1dHRvbi5jb250YWlucyhlLnRhcmdldCkpIHtcclxuXHRcdFx0Ly8gbmF2LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdFxyXG59O1xyXG5cclxuLy9WZXJ5IE5ldyBhZnRlciByZWRlc2lnblxyXG5jb25zdCBtb2JpbGVOYXZUb2dnbGUgPSAoKSA9PiB7XHJcblxyXG5cdGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGFtYnVyZ2VyX21vYmlsZVwiKTtcclxuXHRjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vYmlsZV9uYXZcIik7XHJcblx0Y29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb3NlLW1lbnUtYnRuXCIpXHJcblxyXG5cdGlmICghYnV0dG9uIHx8ICFuYXYpIHJldHVybjtcclxuXHJcblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRuYXYuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XHJcblx0fSk7XHJcblxyXG5cdGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRuYXYuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcblx0fSk7XHJcblxyXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cclxuXHRcdGlmIChcclxuXHRcdFx0IW5hdi5jb250YWlucyhlLnRhcmdldCkgJiZcclxuXHRcdFx0IWJ1dHRvbi5jb250YWlucyhlLnRhcmdldClcclxuXHRcdCkge1xyXG5cdFx0XHRuYXYuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XHJcblx0XHR9XHJcblxyXG5cdH0pO1xyXG5cclxufTtcclxuXHJcbi8vZXhwb3J0IHsgbW9iaWxlTmF2VG9nZ2xlIH07XHJcblxyXG4vLyAvLyBFbnN1cmUgaXQgcnVucyBhZnRlciBET00gbG9hZGVkXHJcbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGhhbWJ1cmdlclRvZ2dsZSk7XHJcblxyXG4vLyBjb25zdCBkeW5hbWljVkggPSAoKSA9PiB7XHJcbi8vIFx0c2V0RG9jSGVpZ2h0KCk7XHJcbi8vIFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2V0RG9jSGVpZ2h0KTtcclxuLy8gXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIHNldERvY0hlaWdodCk7XHJcblxyXG4vLyBcdGZ1bmN0aW9uIHNldERvY0hlaWdodCgpIHtcclxuLy8gXHRcdGNvbnNvbGUubG9nKFwic2V0IGRvYyBoZWlnaHRcIik7XHJcbi8vIFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXHJcbi8vIFx0XHRcdFwiLS12aFwiLFxyXG4vLyBcdFx0XHRgJHt3aW5kb3cuaW5uZXJIZWlnaHQgLyAxMDB9cHhgXHJcbi8vIFx0XHQpO1xyXG4vLyBcdH1cclxuLy8gfTtcclxuXHJcbi8vIGNvbnN0IG5hdmlnYXRpb24gPSAoKSA9PiB7XHJcbi8vIFx0YWxlcnQoJ3lleScpO1xyXG4vLyBcdGxldCBpc0hvdmVyaW5nID0gZmFsc2U7XHJcbi8vIFx0bGV0IGlzQ2xpY2tlZCA9IGZhbHNlO1xyXG4vLyBcdGNvbnN0IHNpdGVOYXZpZ2F0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2JpbGVfbmF2XCIpO1xyXG4vLyBcdGNvbnN0IGJ1dHRvbkhhbWJ1cmdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGFtYnVyZ2VyX21vYmlsZVwiKTtcclxuLy8gXHRsZXQgbmF2TWVudSA9IG5ldyBOYXZNZW51KHNpdGVOYXZpZ2F0aW9uLCBidXR0b25IYW1idXJnZXIpO1xyXG5cclxuLy8gXHRsZXQgbmF2SGVhZGVySnVtcExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuLy8gXHRcdFwiLmhlYWRlci1qdW1wLWxpbmssI21hc3RoZWFkIC5ic2wgYSwgI3NpdGUtcmVnaXN0cmF0aW9uIGFcIlxyXG4vLyBcdCk7XHJcbi8vIFx0aWYgKG5hdkhlYWRlckp1bXBMaW5rcy5sZW5ndGgpIHtcclxuLy8gXHRcdG5hdkhlYWRlckp1bXBMaW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XHJcbi8vIFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG5hdk1lbnUuY2xvc2VNZW51Q2xlYW4uYmluZChuYXZNZW51KSk7XHJcbi8vIFx0XHR9KTtcclxuLy8gXHR9XHJcblxyXG4vLyBcdGNvbnN0IG1vYmlsZVN1Yk5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmF2X3NlbGVjdFwiKTtcclxuLy8gXHRpZiAobW9iaWxlU3ViTmF2KSB7XHJcbi8vIFx0XHRtb2JpbGVTdWJOYXYuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4vLyBcdFx0XHRpZiAoZS50YXJnZXQudmFsdWUpIHtcclxuLy8gXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGUudGFyZ2V0LnZhbHVlO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHR9KTtcclxuLy8gXHR9XHJcbi8vIFx0bGV0IHN1Yk5hdlRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpO1xyXG4vLyBcdGxldCBwcmVmZXJzUmVkdWNlZCA9XHJcbi8vIFx0XHR3aW5kb3cubWF0Y2hNZWRpYShgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlgKSA9PT0gdHJ1ZSB8fFxyXG4vLyBcdFx0d2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKS5tYXRjaGVzID09IHRydWU7XHJcbi8vIFx0aWYgKHN1Yk5hdlRyaWdnZXJzLmxlbmd0aCkge1xyXG4vLyBcdFx0c3ViTmF2VHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlciwgaSkgPT4ge1xyXG4vLyBcdFx0XHRjb25zdCB0cmlnZ2VyTGluayA9IHRyaWdnZXIucXVlcnlTZWxlY3RvcihcImFcIik7XHJcbi8vIFx0XHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XHJcbi8vIFx0XHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuLy8gXHRcdFx0dHJpZ2dlckxpbmsuc2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiLCBcInN1Yi1tZW51LVwiICsgaSk7XHJcbi8vIFx0XHRcdGNvbnN0IGJhY2tMaW5rID0gdHJpZ2dlci5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtaXRlbS1iYWNrLWxpbmtcIik7XHJcbi8vIFx0XHRcdGNvbnN0IHN1Yk5hdiA9IHRyaWdnZXIucXVlcnlTZWxlY3RvcihcIi5zdWItbWVudVwiKTtcclxuLy8gXHRcdFx0c3ViTmF2LmlkID0gXCJzdWItbWVudS1cIiArIGk7XHJcbi8vIFx0XHRcdHN1Yk5hdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbi8vIFx0XHRcdGNvbnN0IHN1Yk5hdkxpbmtzID0gc3ViTmF2LnF1ZXJ5U2VsZWN0b3JBbGwoXCJhLCBpbnB1dFwiKTtcclxuLy8gXHRcdFx0aWYgKHN1Yk5hdkxpbmtzLmxlbmd0aCkge1xyXG4vLyBcdFx0XHRcdHN1Yk5hdi5maXJzdCA9IHN1Yk5hdkxpbmtzWzBdO1xyXG4vLyBcdFx0XHRcdHN1Yk5hdi5sYXN0ID0gc3ViTmF2TGlua3Nbc3ViTmF2TGlua3MubGVuZ3RoIC0gMV07XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdFx0dHJpZ2dlckxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1lbnVDbGlja0hhbmRsZXIpO1xyXG4vLyBcdFx0XHR0cmlnZ2VyTGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBtZW51SG92ZXJIYW5kbGVyKTtcclxuLy8gXHRcdFx0aWYgKGJhY2tMaW5rKSB7XHJcbi8vIFx0XHRcdFx0YmFja0xpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbi8vIFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbi8vIFx0XHRcdFx0XHRjbG9zZUFsbCh0cmlnZ2VyKTtcclxuLy8gXHRcdFx0XHR9KTtcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0fSk7XHJcbi8vIFx0fVxyXG4vLyBcdGZ1bmN0aW9uIG1lbnVDbGlja0hhbmRsZXIoZSkge1xyXG4vLyBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyBcdFx0aWYgKGlzSG92ZXJpbmcpIHJldHVybjtcclxuLy8gXHRcdC8vIGNsb3NlQWxsKCk7XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQ7XHJcbi8vIFx0XHRpZiAodHJpZ2dlci5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGRfbWVnYV9tZW51XCIpKSB7XHJcbi8vIFx0XHRcdHBvc2l0aW9uTWVnYW1lbnUodHJpZ2dlcik7XHJcbi8vIFx0XHR9XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyTGluayA9IHRyaWdnZXIucXVlcnlTZWxlY3RvcihcImFcIik7XHJcbi8vIFx0XHRjb25zdCBzdWJOYXYgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLW1lbnVcIik7XHJcbi8vIFx0XHRjb25zdCBwYXJlbnQgPSB0cmlnZ2VyLnBhcmVudEVsZW1lbnQ7XHJcbi8vIFx0XHRpZiAodHJpZ2dlci5jbGFzc0xpc3QuY29udGFpbnMoXCJvcGVuXCIpKSB7XHJcbi8vIFx0XHRcdGlzQ2xpY2tlZCA9IGZhbHNlO1xyXG4vLyBcdFx0XHRzdWJOYXYuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XHJcbi8vIFx0XHRcdHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKFwic3ViX29wZW5cIik7XHJcbi8vIFx0XHRcdHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XHJcbi8vIFx0XHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcclxuLy8gXHRcdFx0aWYgKHByZWZlcnNSZWR1Y2VkKSB7XHJcbi8vIFx0XHRcdFx0c3ViTmF2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuLy8gXHRcdFx0fSBlbHNlIHtcclxuLy8gXHRcdFx0XHRzdWJOYXYuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgc2V0RGlzcGxheU5vbmUpO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHRpc0NsaWNrZWQgPSB0cnVlO1xyXG4vLyBcdFx0XHRzdWJOYXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuLy8gXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcbi8vIFx0XHRcdFx0c3ViTmF2LmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xyXG4vLyBcdFx0XHRcdC8vVGhpcyBpcyBiZWNhdXNlIFNhZmFyaSBzZWVtcyB0byByZWdpc3RlciB0aGUgcHJvZ3JhbW1hdGljIGZvY3VzIGFzIGZvY3VzLXZpc2libGVcclxuLy8gXHRcdFx0XHRpZiAoIWUucG9pbnRlclR5cGUpIHtcclxuLy8gXHRcdFx0XHRcdHN1Yk5hdi5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBzZXRGb2N1cyk7XHJcbi8vIFx0XHRcdFx0fVxyXG4vLyBcdFx0XHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG4vLyBcdFx0XHR9LCAxMDApO1xyXG5cclxuLy8gXHRcdFx0cGFyZW50LmNsYXNzTGlzdC5hZGQoXCJzdWJfb3BlblwiKTtcclxuLy8gXHRcdFx0dHJpZ2dlci5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuLy8gXHRcdFx0c3ViTmF2LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNsb3NlT25UYWJPdXRPckVzYyk7XHJcbi8vIFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgY2xvc2VPblNjcm9sbCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRmdW5jdGlvbiBtZW51SG92ZXJIYW5kbGVyKGUpIHtcclxuLy8gXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gXHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDEyMDApIHJldHVybjtcclxuLy8gXHRcdGlmIChpc0NsaWNrZWQpIHJldHVybjtcclxuLy8gXHRcdGlmIChpc0hvdmVyaW5nKSByZXR1cm47XHJcbi8vIFx0XHRpc0hvdmVyaW5nID0gdHJ1ZTtcclxuLy8gXHRcdGNsb3NlQWxsKCk7XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyID0gZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQ7XHJcbi8vIFx0XHRpZiAodHJpZ2dlci5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGRfbWVnYV9tZW51XCIpKSB7XHJcbi8vIFx0XHRcdHBvc2l0aW9uTWVnYW1lbnUodHJpZ2dlcik7XHJcbi8vIFx0XHR9XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyTGluayA9IHRyaWdnZXIucXVlcnlTZWxlY3RvcihcImFcIik7XHJcbi8vIFx0XHRjb25zdCBzdWJOYXYgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLW1lbnVcIik7XHJcbi8vIFx0XHRjb25zdCBwYXJlbnQgPSB0cmlnZ2VyLnBhcmVudEVsZW1lbnQ7XHJcbi8vIFx0XHRzdWJOYXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuLy8gXHRcdHN1Yk5hdi5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuLy8gXHRcdHRyaWdnZXJMaW5rLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgXCJ0cnVlXCIpO1xyXG4vLyBcdFx0cGFyZW50LmNsYXNzTGlzdC5hZGQoXCJzdWJfb3BlblwiKTtcclxuLy8gXHRcdHRyaWdnZXIuY2xhc3NMaXN0LmFkZChcIm9wZW5cIik7XHJcbi8vIFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGNsb3NlT25TY3JvbGwpO1xyXG4vLyBcdFx0dHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XHJcbi8vIFx0XHRcdGlzSG92ZXJpbmcgPSBmYWxzZTtcclxuLy8gXHRcdFx0Y2xvc2VBbGwoKTtcclxuLy8gXHRcdH0pO1xyXG4vLyBcdH1cclxuLy8gXHRmdW5jdGlvbiBzZXREaXNwbGF5Tm9uZShlKSB7XHJcbi8vIFx0XHRlLnRhcmdldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbi8vIFx0XHRlLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBzZXREaXNwbGF5Tm9uZSk7XHJcbi8vIFx0fVxyXG5cclxuLy8gXHRmdW5jdGlvbiBzZXRGb2N1cyhlKSB7XHJcbi8vIFx0XHRlLnRhcmdldC5xdWVyeVNlbGVjdG9yKFwiYSxpbnB1dFwiKS5mb2N1cygpO1xyXG4vLyBcdFx0ZS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgc2V0Rm9jdXMpO1xyXG4vLyBcdH1cclxuXHJcbi8vIFx0ZnVuY3Rpb24gY2xvc2VPblRhYk91dE9yRXNjKGUpIHtcclxuLy8gXHRcdGlmIChlLmtleSA9PSBcIkVzY2FwZVwiKSB7XHJcbi8vIFx0XHRcdGUudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNsb3NlT25UYWJPdXRPckVzYyk7XHJcbi8vIFx0XHRcdGlmIChlLnNyY0VsZW1lbnQudGFnTmFtZSA9PSBcIklOUFVUXCIpIHtcclxuLy8gXHRcdFx0XHRlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XHJcbi8vIFx0XHRcdFx0XHQucXVlcnlTZWxlY3RvcihcImFcIilcclxuLy8gXHRcdFx0XHRcdC5mb2N1cygpO1xyXG4vLyBcdFx0XHRcdGNsb3NlQWxsKFxyXG4vLyBcdFx0XHRcdFx0ZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxyXG4vLyBcdFx0XHRcdCk7XHJcbi8vIFx0XHRcdH0gZWxzZSB7XHJcbi8vIFx0XHRcdFx0ZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuLy8gXHRcdFx0XHRcdC5xdWVyeVNlbGVjdG9yKFwiYVwiKVxyXG4vLyBcdFx0XHRcdFx0LmZvY3VzKCk7XHJcbi8vIFx0XHRcdFx0Y2xvc2VBbGwoZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xyXG4vLyBcdFx0XHR9XHJcbi8vIFx0XHR9IGVsc2UgaWYgKGUua2V5ID09IFwiVGFiXCIpIHtcclxuLy8gXHRcdFx0bGV0IHBhcmVudCA9IGUuc3JjRWxlbWVudC5jbG9zZXN0KFwiLnN1Yi1tZW51XCIpO1xyXG4vLyBcdFx0XHQvL2xldCBncmFuZHBhcmVudCA9IHBhcmVudC5jbG9zZXN0KFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIik7XHJcbi8vIFx0XHRcdGxldCBmaXJzdCA9IHBhcmVudC5maXJzdDtcclxuLy8gXHRcdFx0bGV0IGxhc3QgPSBwYXJlbnQubGFzdDtcclxuLy8gXHRcdFx0aWYgKGUuc2hpZnRLZXkpIHtcclxuLy8gXHRcdFx0XHRpZiAoZS5zcmNFbGVtZW50ID09IGZpcnN0KSB7XHJcbi8vIFx0XHRcdFx0XHRjbG9zZUFsbChwYXJlbnQpO1xyXG4vLyBcdFx0XHRcdFx0cGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGNsb3NlT25UYWJPdXRPckVzYyk7XHJcbi8vIFx0XHRcdFx0fVxyXG4vLyBcdFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHRcdGlmIChlLnNyY0VsZW1lbnQgPT0gbGFzdCkge1xyXG4vLyBcdFx0XHRcdFx0Y2xvc2VBbGwocGFyZW50KTtcclxuLy8gXHRcdFx0XHRcdHBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBjbG9zZU9uVGFiT3V0T3JFc2MpO1xyXG4vLyBcdFx0XHRcdH1cclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0fVxyXG4vLyBcdH1cclxuLy8gXHRmdW5jdGlvbiBjbG9zZU9uU2Nyb2xsKGUpIHtcclxuLy8gXHRcdGNsb3NlQWxsKCk7XHJcbi8vIFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGNsb3NlT25TY3JvbGwpO1xyXG4vLyBcdH1cclxuXHJcbi8vIFx0ZnVuY3Rpb24gY2xvc2VBbGwoY3VycmVudFN1Yk5hdiA9IG51bGwpIHtcclxuXHJcbi8vIFx0XHRpc0NsaWNrZWQgPSBmYWxzZTtcclxuLy8gXHRcdGlzSG92ZXJpbmcgPSBmYWxzZTtcclxuLy8gXHRcdHN1Yk5hdlRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcclxuLy8gXHRcdFx0dHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcclxuLy8gXHRcdFx0Y29uc3QgdHJpZ2dlckxpbmsgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpO1xyXG4vLyBcdFx0XHR0cmlnZ2VyLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN1Yl9vcGVuXCIpO1xyXG4vLyBcdFx0XHRjb25zdCBzdWJOYXYgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLW1lbnVcIik7XHJcbi8vIFx0XHRcdHN1Yk5hdi5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcclxuLy8gXHRcdFx0dHJpZ2dlckxpbmsuc2V0QXR0cmlidXRlKFwiYXJpYS1leHBhbmRlZFwiLCBcImZhbHNlXCIpO1xyXG4vLyBcdFx0XHRpZiAoc3ViTmF2ID09IGN1cnJlbnRTdWJOYXYpIHtcclxuLy8gXHRcdFx0XHRpZiAocHJlZmVyc1JlZHVjZWQpIHtcclxuLy8gXHRcdFx0XHRcdHN1Yk5hdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbi8vIFx0XHRcdFx0fSBlbHNlIHtcclxuLy8gXHRcdFx0XHRcdHN1Yk5hdi5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBzZXREaXNwbGF5Tm9uZSk7XHJcbi8vIFx0XHRcdFx0fVxyXG4vLyBcdFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHRcdHN1Yk5hdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbi8vIFx0XHRcdH1cclxuLy8gXHRcdH0pO1xyXG4vLyBcdH1cclxuXHJcbi8vIFx0ZnVuY3Rpb24gcG9zaXRpb25NZWdhbWVudSh0cmlnZ2VyKSB7XHJcbi8vIFx0XHRjb25zdCBzdWJOYXYgPSB0cmlnZ2VyLnF1ZXJ5U2VsZWN0b3IoXCIuc3ViLW1lbnVcIik7XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyUmVjdCA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbi8vIFx0XHRjb25zdCB0cmlnZ2VyTGVmdCA9IHRyaWdnZXJSZWN0LmxlZnQ7XHJcbi8vIFx0XHRjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4vLyBcdFx0Y29uc3Qgb2Zmc2V0ID0gdHJpZ2dlckxlZnQgLSB3aW5kb3dXaWR0aCAvIDI7XHJcbi8vIFx0XHRzdWJOYXYuc3R5bGUubGVmdCA9IGAtJHtvZmZzZXR9cHhgO1xyXG4vLyBcdH1cclxuLy8gfTtcclxuXHJcbi8vIGNvbnN0IG5hdlNjcm9sbFdhdGNoZXIgPSAoKSA9PiB7XHJcbi8vIFx0bGV0IGhlYWRlcndyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpdGUtaGVhZGVyLmRlc2t0b3Bfb25seVwiKTtcclxuLy8gXHR2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShoZWFkZXJ3cmFwKTtcclxuLy8gXHRpZiAoc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XHJcbi8vIFx0XHRoZWFkZXJ3cmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaXRlLWhlYWRlci5tb2JpbGVfb25seVwiKTtcclxuLy8gXHR9IGVsc2Uge1xyXG5cclxuLy8gXHR9XHJcblxyXG4vLyBcdGNvbnN0IHNlYXJjaENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2LXNlYXJjaC1mb3JtXCIpO1xyXG4vLyBcdGxldCBsYXN0U2Nyb2xsVG9wID0gMDtcclxuXHJcbi8vIFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoZWFkZXJzbGlkZSk7XHJcblxyXG4vLyBcdGZ1bmN0aW9uIGhlYWRlcnNsaWRlKCkge1xyXG4vLyBcdFx0aWYgKHNlYXJjaENvbnRhaW5lciAmJiBzZWFyY2hDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwib3Blbl9zZWFyY2hcIikpIHtcclxuLy8gXHRcdFx0c2VhcmNoQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuX3NlYXJjaFwiKTtcclxuLy8gXHRcdH1cclxuLy8gXHRcdGxldCBzdCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4vLyBcdFx0aWYgKHN0ID49IDIwMCAmJiBzdCA8PSA0MDApIHtcclxuLy8gXHRcdFx0aGVhZGVyd3JhcC5jbGFzc0xpc3QuYWRkKFwiYWRkRml4ZWRcIik7XHJcbi8vIFx0XHRcdGhlYWRlcndyYXAuY2xhc3NMaXN0LnJlbW92ZShcInNsaWRlSW5Eb3duXCIsIFwic2xpZGVPdXRcIik7XHJcbi8vIFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibWVudS12aXNpYmxlXCIpO1xyXG4vLyBcdFx0fSBlbHNlIGlmIChzdCA+IDQwMCAmJiBzdCA8PSA2MDApIHtcclxuLy8gXHRcdFx0aGVhZGVyd3JhcC5jbGFzc0xpc3QuYWRkKFwic2xpZGVPdXRcIik7XHJcbi8vIFx0XHRcdGlmIChzdCA8IGxhc3RTY3JvbGxUb3ApIHtcclxuLy8gXHRcdFx0XHRoZWFkZXJ3cmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZUluRG93blwiKTtcclxuLy8gXHRcdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcIm1lbnUtdmlzaWJsZVwiKTtcclxuLy8gXHRcdFx0fVxyXG4vLyBcdFx0fSBlbHNlIGlmIChzdCA+IDYwMCAmJiBzdCA8IGxhc3RTY3JvbGxUb3ApIHtcclxuLy8gXHRcdFx0aGVhZGVyd3JhcC5jbGFzc0xpc3QuYWRkKFwic2xpZGVPdXRcIiwgXCJzbGlkZUluRG93blwiKTtcclxuLy8gXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJtZW51LXZpc2libGVcIik7XHJcbi8vIFx0XHR9IGVsc2UgaWYgKHN0ID4gNjAwICYmIHN0ID4gbGFzdFNjcm9sbFRvcCkge1xyXG4vLyBcdFx0XHRoZWFkZXJ3cmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZUluRG93blwiKTtcclxuLy8gXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJtZW51LXZpc2libGVcIik7XHJcbi8vIFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHRoZWFkZXJ3cmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZUluRG93blwiLCBcInNsaWRlT3V0XCIsIFwiYWRkRml4ZWRcIik7XHJcbi8vIFx0XHRcdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibWVudS12aXNpYmxlXCIpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdFx0bGFzdFNjcm9sbFRvcCA9IHN0O1xyXG4vLyBcdH1cclxuLy8gfTtcclxuXHJcbi8vIGNvbnN0IG1lZ2FNZW51ID0gKCkgPT4ge1xyXG4vLyBcdGNvbnN0IG1lZ2FNZW51Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuLy8gXHRcdFwiI3ByaW1hcnktbWVudSBsaS5hZGRfbWVnYV9tZW51IHVsXCJcclxuLy8gXHQpO1xyXG4vLyBcdGlmICghbWVnYU1lbnVDb250YWluZXIpIHJldHVybjtcclxuLy8gXHRjb25zdCBtZWdhTWVudU1vYmlsZUNPbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbi8vIFx0XHRcIiNtb2JpbGUtbWVudSBsaS5hZGRfbWVnYV9tZW51IHVsXCJcclxuLy8gXHQpO1xyXG4vLyBcdGNvbnN0IG1lZ2FNZW51Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVnYW1lbnVcIik7XHJcbi8vIFx0Y29uc3QgbWVnYUNsb25lID0gbWVnYU1lbnVDb250ZW50LmNsb25lTm9kZSh0cnVlKTtcclxuLy8gXHRtZWdhTWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWdhTWVudUNvbnRlbnQpO1xyXG4vLyBcdG1lZ2FNZW51TW9iaWxlQ09udGFpbmVyLmFwcGVuZENoaWxkKG1lZ2FDbG9uZSk7XHJcbi8vIFx0bWVnYU1lbnVDb250ZW50LnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcclxuLy8gXHRtZWdhQ2xvbmUuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xyXG4vLyB9O1xyXG5cclxuLy8gZnVuY3Rpb24gbmF2Tm90aWNlKCkge1xyXG4vLyBcdGxldCBub3RpY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25vdGljZVwiKTtcclxuLy8gXHRpZiAoIW5vdGljZSkgcmV0dXJuO1xyXG4vLyBcdGxldCBub3RpY2VCdXR0b24gPSBub3RpY2UucXVlcnlTZWxlY3RvcihcIiNjbG9zZV9ub3RpY2VcIik7XHJcbi8vIFx0bm90aWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4vLyBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyBcdFx0bm90aWNlLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xyXG4vLyBcdFx0bGV0IGNvb2tpZU5hbWUgPSBgbm90aWNlX2Nsb3NlZF8ke25vdGljZS5kYXRhc2V0Lm5vdGljZX1gO1xyXG4vLyBcdFx0bGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4vLyBcdFx0ZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgMzApXHJcbi8vIFx0XHRsZXQgZXhwaXJlcyA9IGRhdGUudG9VVENTdHJpbmcoKTtcclxuLy8gXHRcdGRvY3VtZW50LmNvb2tpZSA9IGAke2Nvb2tpZU5hbWV9PTE7IGV4cGlyZXM9JHtleHBpcmVzfTsgcGF0aD0vO2A7XHJcbi8vIFx0XHRub3RpY2VCdXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XHJcblxyXG4vLyBcdH0pO1xyXG4vLyB9XHJcbi8vIGV4cG9ydCB7IGhhbWJ1cmdlclRvZ2dsZSwgZHluYW1pY1ZILCBuYXZpZ2F0aW9uLCBuYXZTY3JvbGxXYXRjaGVyLCBtZWdhTWVudSwgbmF2Tm90aWNlIH07XHJcbmV4cG9ydCB7IGhhbWJ1cmdlclRvZ2dsZSwgaGFtYnVyZ2VyVG9nZ2xlTW9iaWxlLCBtb2JpbGVOYXZUb2dnbGUgfTtcclxuIiwiaW1wb3J0IHNjcm9sbGFtYSBmcm9tICdzY3JvbGxhbWEnO1xyXG5jb25zdCBzY3JvbGwgPSAoKSA9PiB7XHJcblx0XHJcbiAgICBjb25zdCBzY3JvbGxlciA9IHNjcm9sbGFtYSgpO1xyXG5cclxuICAgIC8vIHNldHVwIHRoZSBpbnN0YW5jZSwgcGFzcyBjYWxsYmFjayBmdW5jdGlvbnNcclxuICAgIHNjcm9sbGVyXHJcbiAgICAuc2V0dXAoe1xyXG4gICAgICAgIHN0ZXA6IFwiLnNjcm9sbC1kZXRlY3RcIixcclxuICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgdGhyZXNob2xkOiAxLFxyXG4gICAgfSlcclxuICAgIC5vblN0ZXBFbnRlcigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICBjb25zdCB7IGVsZW1lbnQsIGluZGV4LCBkaXJlY3Rpb24gfSA9IHJlc3BvbnNlO1xyXG4gICAgICAgIGlmKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzY3JvbGwtb3Zlci1ibG9jaycpfHxlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnem9vbS1ibG9jaycpKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd6b29tLWJsb2NrX19vdmVybGF5LXRleHQnKSYmZGlyZWN0aW9uPT09J3VwJykge1xyXG4gICAgICAgICAgICBlbGVtZW50LnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnem9vbScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pIFxyXG4gICAgLm9uU3RlcEV4aXQoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBlbGVtZW50LCBpbmRleCwgZGlyZWN0aW9uIH0gPSByZXNwb25zZTtcclxuICAgICAgICBpZihlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsLW92ZXItYmxvY2snKXx8ZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3pvb20tYmxvY2snKSkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnem9vbS1ibG9ja19fem9vbWluZy10ZXh0JykmJmRpcmVjdGlvbj09PSd1cCcpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ3pvb20nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3pvb20tYmxvY2tfX292ZXJsYXktdGV4dCcpJiZkaXJlY3Rpb249PT0nZG93bicpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ3pvb20nKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzY3JvbGw7ICIsImltcG9ydCB7XHJcblx0Ly8gbmF2aWdhdGlvbixcclxuXHQvLyBkeW5hbWljVkgsXHJcblx0Ly8gbmF2U2Nyb2xsV2F0Y2hlcixcclxuXHQvLyBtZWdhTWVudSxcclxuXHQvLyBuYXZOb3RpY2UsXHJcblx0aGFtYnVyZ2VyVG9nZ2xlLFxyXG5cdGhhbWJ1cmdlclRvZ2dsZU1vYmlsZSxcclxuXHRtb2JpbGVOYXZUb2dnbGUsXHJcbn0gZnJvbSBcIi4vanMvbmF2aWdhdGlvbi5qc1wiO1xyXG5pbXBvcnQgc2Nyb2xsIGZyb20gXCIuL2pzL3Njcm9sbC5qc1wiO1xyXG4vLyBpbXBvcnQge1xyXG4vLyBcdGZpbHRlcnMsXHJcbi8vIFx0ZGlzY292ZXJGaWx0ZXIsXHJcbi8vIFx0c2hvd01vcmUsXHJcbi8vIFx0anVtcEZpbHRlcnMsXHJcbi8vIFx0c2hvcEJ5Q2F0ZWdvcnksXHJcbi8vIH0gZnJvbSBcIi4vanMvZmlsdGVycy5qc1wiO1xyXG5cclxuLy9pbXBvcnQge3N3aXRjaGVzLGFsdEJsb2NrLGxhbmd1YWdlU3dpdGNoZXJ9IGZyb20gXCIuL2pzL2FjY2Vzc2liaWxpdHkuanNcIjtcclxuLy9pbXBvcnQgcGxheWVyV2l0aENvdmVyIGZyb20gXCIuL2pzL3BsYXllci5qc1wiO1xyXG4vLyBpbXBvcnQge1xyXG4vLyBcdGZvcm1IYW5kbGVyLFxyXG4vLyBcdGZvcm1Td2l0Y2hlcixcclxuLy8gfSBmcm9tIFwiLi9qcy9mb3Jtcy5qc1wiO1xyXG4vLyBpbXBvcnQgc3dpcGVyX2luaXQgZnJvbSBcIi4vanMvc3dpcGVyLWluaXQuanNcIjtcclxuLy8gaW1wb3J0IGxpZ2h0Ym94IGZyb20gXCIuL2pzL2xpZ2h0Ym94LmpzXCI7XHJcbi8vIGltcG9ydCBhY2NvcmRpb24gZnJvbSBcIi4vanMvYWNjb3JkaW9uLmpzXCI7XHJcbi8vIGltcG9ydCBtb2RhbEhhbmRsZXJzIGZyb20gXCIuL2pzL21vZGFsLmpzXCI7XHJcbi8vaW1wb3J0IHNoYXJPbk1vYmlsZSBmcm9tIFwiLi9qcy9zb2NpYWwuanNcIjtcclxuLy9pbXBvcnQgdGFiSGFuZGxlcnMgZnJvbSBcIi4vanMvdGFicy5qc1wiO1xyXG4vLyBpbXBvcnQgeyBvc19zaG93cm9vbV9tYXAgfSBmcm9tIFwiLi9qcy9tYXAuanNcIjtcclxuLy8gaW1wb3J0IGNhcmRMaW5rcyBmcm9tIFwiLi9qcy9jYXJkcy5qc1wiO1xyXG4vL2ltcG9ydCB0aW1ldGFibGVIYW5kbGVyIGZyb20gXCIuL2pzL3RpbWV0YWJsZS5qc1wiO1xyXG5cclxuLy9pbXBvcnQgYmFza2V0IGZyb20gXCIuL2pzL2Jhc2tldC5qc1wiO1xyXG4vL2ltcG9ydCBjcm9zc1NlbGwgZnJvbSBcIi4vanMvY3Jvc3NzZWxscy5qc1wiO1xyXG5cclxuLy8gZHluYW1pY1ZIKCk7XHJcbi8vIG1lZ2FNZW51KCk7XHJcbi8vIG5hdmlnYXRpb24oKTtcclxuLy8gbmF2U2Nyb2xsV2F0Y2hlcigpO1xyXG4vLyBuYXZOb3RpY2UoKTtcclxuaGFtYnVyZ2VyVG9nZ2xlKCk7XHJcbmhhbWJ1cmdlclRvZ2dsZU1vYmlsZSgpO1xyXG5tb2JpbGVOYXZUb2dnbGUoKTtcclxuc2Nyb2xsKCk7XHJcblxyXG4vLyBvc19zaG93cm9vbV9tYXAoKTtcclxuLy8gY2FyZExpbmtzKCk7XHJcbi8vbGFuZ3VhZ2VTd2l0Y2hlcigpO1xyXG4vL3N3aXRjaGVzKCk7XHJcbi8vYWx0QmxvY2soKTtcclxuXHJcbi8vIGZpbHRlcnMoKTtcclxuLy8ganVtcEZpbHRlcnMoKTtcclxuLy8gc2hvcEJ5Q2F0ZWdvcnkoKTtcclxuLy8gZGlzY292ZXJGaWx0ZXIoKTtcclxuLy8gc2hvd01vcmUoKTtcclxuLy8gcGxheWVyV2l0aENvdmVyKCk7XHJcbi8vIGZvcm1IYW5kbGVyKCk7XHJcbi8vIGZvcm1Td2l0Y2hlcigpO1xyXG4vLyBzd2lwZXJfaW5pdCgpO1xyXG4vLyBsaWdodGJveCgpO1xyXG4vLyBhY2NvcmRpb24oKTtcclxuLy8gbW9kYWxIYW5kbGVycygpO1xyXG5cclxuLy90aW1ldGFibGVIYW5kbGVyKCk7XHJcbi8vc2hhck9uTW9iaWxlKCk7XHJcblxyXG4iXX0=

//# sourceMappingURL=scripts.js.map
