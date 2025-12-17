const modalHandlers = () => {
	class Modal {
		constructor(el) {
			this.el = el;
			this.el.active = false;
			this.modal = document.getElementById(this.el.dataset.modal_id);
			this.modal.style.display = "none";
			this.close = this.modal.querySelector(".close");
			this.prefersReduced =
				window.matchMedia("(prefers-reduced-motion: reduce)") === true ||
				window.matchMedia("(prefers-reduced-motion: reduce)").matches == true;
			[this.firstFocusable, this.lastFocusable] =
				this.getFirstAndLastFocusable();
			this.el.addEventListener("click", this);
			this.close.addEventListener("click", this);
		}
		handleEvent(e) {
			switch (e.type) {
				case "click":
					if (e.target === this.close || e.target.closest(".close")) {
						e.preventDefault();
						this.closeModal();
					} else if (
						e.target === this.el ||
						e.target.closest(".toggle_modal")
					) {
						e.preventDefault();
						this.openModal(e);
					}
					break;
				case "keydown":
					this.tabTrap(e);
					break;
				case "transitionend":
					console.log(e);
					this.setDisplayNone();
			}
		}

		openModal(e) {
			this.el.active = true;
			e.preventDefault();
			this.modal.style.display = "block";
			//Mini timeout here as the display block needs to be set before the modal is opened so that the transition fires
			setTimeout(() => {
				this.modal.classList.add("open");
			}, 50);
			this.modal.classList.remove("close");
			document.documentElement.classList.add("scrolly_lock");
			this.firstFocusable.focus();
			this.modal.addEventListener("keydown", this);
			const event = new CustomEvent("modal_opened", {
				detail: {
					modal: this.modal,
					trigger: e.currentTarget,
					thisModal: this,
				},
			});
			window.dispatchEvent(event);
		}

		closeModal(e = null) {
			if (e) {
				e.preventDefault();
			}
			if (!this.el.active) return;
			this.el.active = false;
			this.modal.classList.add("close");
			this.modal.classList.remove("open");
			document.documentElement.classList.remove("scrolly_lock");
			this.el.focus();
			if (this.prefersReduced) {
				this.setDisplayNone();
			} else {
				this.modal.addEventListener("transitionend", this);
			}
			this.modal.removeEventListener("keydown", this);
		}

		setDisplayNone() {
			this.modal.style.display = "none";
			this.modal.removeEventListener("transitionend", this);
		}
		getFirstAndLastFocusable() {
			let focusable = [];
			let allDescendants = this.modal.querySelectorAll("*");
			allDescendants.forEach((child) => {
				if (this.isFocusable(child)) {
					focusable.push(child);
				}
			});
			return [focusable[0], focusable[focusable.length - 1]];
		}

		isFocusable(element) {
			if (element.tabIndex < 0) {
				return false;
			}

			if (element.disabled) {
				return false;
			}

			switch (element.nodeName) {
				case "A":
					return !!element.href && element.rel != "ignore";
				case "INPUT":
					return element.type != "hidden";
				case "BUTTON":
				case "SELECT":
				case "TEXTAREA":
					return true;
				default:
					return false;
			}
		}

		tabTrap(e) {
			if (e.code != "Tab") return;
			if (e.target == this.lastFocusable && !e.shiftKey) {
				e.preventDefault();
				this.firstFocusable.focus();
			} else if (e.target == this.firstFocusable && e.shiftKey) {
				e.preventDefault();
				this.lastFocusable.focus();
			}
		}
	}
	const modals = document.querySelectorAll(".toggle_modal");
	modals.forEach((modal) => {
		new Modal(modal);
	});

	const pElement = document.getElementById("footer_address");
	const content = pElement.innerHTML;
	const parts = content.split("<br>");
	parts[0] = `<span class="first_address">${parts[0]}</span>`;
	pElement.innerHTML = parts.join("<br>");

	// //Code to add spaces between the footer menu items
	// const ul = document.getElementById("footer-menu");
	// const items = Array.from(ul.getElementsByTagName("li"));

	// let spaceAdded = false;
	// let count = 0;
	// let lastSpace = null;

	// for (let i = 0; i < items.length; i++) {
	// 	if (i === 2 && !spaceAdded) {
	// 		const space = document.createElement("li");
	// 		space.classList.add("list-space");
	// 		ul.insertBefore(space, items[i + 1]);
	// 		spaceAdded = true;
	// 		count = 0;
	// 		lastSpace = space;
	// 	}

	// 	if (i > 2) {
	// 		count++;
	// 		if (count % 2 === 0) {
	// 			const space = document.createElement("li");
	// 			space.classList.add("list-space");
	// 			ul.insertBefore(space, items[i + 1]);
	// 			lastSpace = space;
	// 		}
	// 	}
	// }

	// if (items.length % 2 === 0 && lastSpace) {
	// 	if (lastSpace) {
	// 		ul.removeChild(lastSpace);
	// 	}
	// }
};

export default modalHandlers;
