import Player from "@vimeo/player";
class playerYTClass {
	constructor(playerEl, playerElParent) {
		this.playerEl = playerEl;
		this.playerContainer = playerElParent;
		this.modal = playerElParent.querySelector(".video_modal");
		this.modal.style.display = "none";
		if (
			this.playerContainer.parentNode.classList.contains("timeline-slide-video-player")
		) {
			let section = document.querySelector(".timeline");
			if (section) {
				section.appendChild(this.modal);
			}
		}
		this.playerButton = playerElParent.querySelector(".video_toggle");
		this.closeButton = this.modal.querySelector(".close_video");
		

		this.ytID = playerEl.dataset.id;
		this.player = new YT.Player(this.playerEl, {
			videoId: this.ytID,
			events: {
				onStateChange: this.onPlayerPause.bind(this),
				onReady: this.onPlayerReady.bind(this),
			},
		});
		this.firstFocusable = this.playerEl;
		this.lastFocusable = this.closeButton;
		this.event = new CustomEvent("playingYTNow", {
			detail: { player: this.player },
		});
		window.addEventListener(
			"playingYTNow",
			this.windowPlayingHandler.bind(this)
		);
		
	}

	onPlayerPause() {
		/* let pauser = setTimeout(() => {
			if (this.player.getPlayerState() == 2) {
				this.playerContainer.classList.add("disabled");
				this.closeVideoModal();
			} else {
				clearTimeout(pauser);
				this.playerContainer.classList.remove("disabled");
			}
		}, 1000); */
	}

	onPlayerReady() {
		if (!this.playerContainer.classList.contains("has_title")) {
			const playText = this.playerContainer.querySelector(
				".screen-reader-text"
			);
			const title = this.player.getVideoData().title;
			if (playText) {
				playText.innerHTML = `Play ${title}`;
			}
		}
		this.playerContainer.classList.add("ready");
		this.firstFocusable = this.modal.querySelector('iframe').contentWindow;
		//this.playerContainer.addEventListener('click',this.playVideo.bind(this));
		this.playerButton.addEventListener("click", this.playVideo.bind(this));
		this.closeButton.addEventListener("click", this.playVideo.bind(this));
	}

	playVideo(e) {
		if (this.playerContainer.classList.contains("disabled")) {
			return;
		}
		if(this.player.getPlayerState() === 0 && e.currentTarget == this.closeButton){

			this.closeVideoModal();
		} 
		else if(e.target == this.closeButton && this.player.getPlayerState() === 2){
			this.closeVideoModal();
			
		}
		else{
			if (
				this.player.getPlayerState() == 1 ||
				this.player.getPlayerState() == 3
			) {
				this.player.pauseVideo();
				this.closeVideoModal();
			} else {
				this.player.playVideo();
				this.openVideoModal();
				window.dispatchEvent(this.event);
			}
		}
	}
	windowPlayingHandler(e) {
		if (e.detail.player != this.player) {
			this.player.pauseVideo();
		}
	}

	closeVideoModal() {
		this.playerContainer.classList.remove("playing");
		this.playerContainer.classList.remove("disabled");
		this.playerContainer.classList.remove("open");
		this.playerContainer.classList.add("close");
		document.documentElement.classList.remove("scroll_lock");
		this.modal.classList.remove("open");
		this.modal.addEventListener("transitionend", this.addDisplayNone.bind(this));
		this.modal.removeEventListener("keydown", this.tabTrap);
		const buttons = this.playerContainer.querySelectorAll("button");
		buttons.forEach((button) => {
			if (button.getAttribute("aria-expanded") === "true") {
				button.setAttribute("aria-expanded", "false");
			} else {
				button.setAttribute("aria-expanded", "true");
			}
		});
	}

	openVideoModal() {
		this.playerContainer.classList.remove("disabled");
		this.playerContainer.classList.add("playing");
		this.playerContainer.classList.remove("close");
		this.playerContainer.classList.add("open");
		document.documentElement.classList.add("scroll_lock");
		this.modal.classList.add("open");
		this.modal.style.display = "block";
		this.firstFocusable.focus();
		this.modal.addEventListener("keydown", this.tabTrap.bind(this));
		
	}

	addDisplayNone(e){
		this.modal.style.display = "none";
		this.modal.removeEventListener("transitionend", this.addDisplayNone);
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

class playerVMClass {
	constructor(playerEl, playerElParent) {
		this.playerEl = playerEl;
		this.playerContainer = playerElParent;
		this.vmID = playerEl.dataset.id;
		this.modal = playerElParent.querySelector(".video_modal");
		this.modal.style.display = "none";
		if (
			this.playerContainer.parentNode.classList.contains("timeline-slide-video-player")
		) {
			let section = document.querySelector(".timeline");
			if (section) {
				section.appendChild(this.modal);
			}
		}
		this.playerButton = playerElParent.querySelector(".video_toggle");
		this.closeButton = this.modal.querySelector(".close_video");
		this.player = new Player(this.playerEl, {
			id: this.vmID,
			dnt: true,
			responsive: true,
		});
		this.player.ready().then(this.onPlayerReady.bind(this));
		this.player.on("play", this.onPlayerReady.bind(this));
		this.player.on("pause", this.onPlayerPause.bind(this));
		this.event = new CustomEvent("playingVMNow", {
			detail: { player: this.player },
		});
		this.firstFocusable = this.playerEl;
		this.lastFocusable = this.closeButton;
		window.addEventListener(
			"playingVMNow",
			this.windowPlayingHandler.bind(this)
		);
	}

	onPlayerPause() {
		this.playerContainer.classList.remove("playing");
	}

	onPlayerReady() {
		if (!this.playerContainer.classList.contains("has_title")) {
			const playText = this.playerContainer.querySelector(
				".screen-reader-text"
			);
			this.player.getVideoTitle()
			.then((title) => {
				if (playText) {
					playText.innerHTML = `Play ${title}`;
				}
			});
		}
		this.playerContainer.classList.add("ready");
		this.firstFocusable = this.modal.querySelector('iframe').contentWindow;
		//this.playerContainer.addEventListener('click',this.playVideo.bind(this));
		this.playerButton.addEventListener("click", this.playVideo.bind(this));
		this.closeButton.addEventListener("click", this.playVideo.bind(this));
	}

	playVideo(e) {
		console.log(this);
		if (this.playerContainer.classList.contains("disabled")) {
			return;
		}
		this.player.getPaused().then((paused)=>{
			if(e.currentTarget == this.closeButton &&paused){
				this.closeVideoModal();
			}
			else if (paused) {
				this.player.play();
				this.openVideoModal();
				this.playerContainer.classList.add("playing");
				
			} else {
				this.player.pause();
				this.closeVideoModal();
			}
		});
	}
	
	windowPlayingHandler(e) {
		if (e.detail.player != this.player) {
			this.player.pause();
		}
	}

	closeVideoModal() {
		this.playerContainer.classList.remove("playing");
		this.playerContainer.classList.remove("disabled");
		this.playerContainer.classList.remove("open");
		this.playerContainer.classList.add("close");
		document.documentElement.classList.remove("scroll_lock");
		this.modal.classList.remove("open");
		this.modal.addEventListener("transitionend", this.addDisplayNone.bind(this));
		this.modal.removeEventListener("keydown", this.tabTrap);
		const buttons = this.playerContainer.querySelectorAll("button");
		buttons.forEach((button) => {
			if (button.getAttribute("aria-expanded") === "true") {
				button.setAttribute("aria-expanded", "false");
			} else {
				button.setAttribute("aria-expanded", "true");
			}
		});
	}

	openVideoModal() {
		this.playerContainer.classList.remove("disabled");
		this.playerContainer.classList.add("playing");
		this.playerContainer.classList.remove("close");
		this.playerContainer.classList.add("open");
		document.documentElement.classList.add("scroll_lock");
		this.modal.classList.add("open");
		this.modal.style.display = "block";
		this.firstFocusable.focus();
		this.modal.addEventListener("keydown", this.tabTrap.bind(this));
		
	}

	addDisplayNone(e){
		this.modal.style.display = "none";
		this.modal.removeEventListener("transitionend", this.addDisplayNone);
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

class playerVMAutoPlayClass {
	constructor(playerEl) {
		this.playerEl = playerEl;
		this.parentEl = this.playerEl.parentNode;
		this.button = this.parentEl.querySelector('.video_bg__play');
		this.init();
	}
	init(){
        this.vmID = this.playerEl.dataset.id;
        this.player = new Player(this.playerEl,{
            id:this.vmID,
            dnt: true,
            responsive: true,
            });
        this.player.on('play',this.onPlayerPlaying.bind(this));
        this.player.on('pause',this.onPlayerPause.bind(this));
        this.event = new CustomEvent("playingVMNow", {
            detail: { player: this.player },
        });
		this.button.addEventListener('click',this.playVideo.bind(this));
       /*  this.muteButton = this.playerContainer.querySelector('.volume_button');
        this.muteButton?.addEventListener('click',()=>{
            if(this.playerContainer.classList.contains('volume_on')){
                this.player.setMuted(true);
                this.playerContainer.classList.remove('volume_on');
            }
            else{
                this.player.setMuted(false);
                this.playerContainer.classList.add('volume_on');
            }
        }); */
        window.addEventListener('playingVMNow',this.windowPlayingHandler.bind(this))
    }

	onPlayerPlaying(){
        /*Adding delay to prevent weird flash of white*/
        setTimeout(()=>{
            this.parentEl.classList.add("playing")
            window.dispatchEvent(this.event);
        },200);
    }

	 onPlayerPause(){
       
        this.parentEl.classList.remove("playing")
    }

	 windowPlayingHandler(e){
        if(e.detail.player!=this.player){
            this.player.pause();
        }
    }

	playVideo(e) {
		if (this.parentEl.classList.contains("disabled")) {
			return;
		}
		this.player.getPaused().then((paused)=>{
			if (paused) {
				this.player.play();
				this.parentEl.classList.add("playing");
				
			} else {
				this.player.pause();
				this.parentEl.classList.remove("playing");
			}
		});
	}
}

class playerYTAutoPlayClass {
	constructor(playerEl) {
		
		this.playerEl = playerEl;
		this.playerEl.src = this.playerEl.getAttribute('data-src');
		this.parentEl = this.playerEl.parentNode;
		this.button = this.parentEl.querySelector('.video_bg__play');
		this.player = new YT.Player(this.playerEl, {
			events: {
				onReady: this.onPlayerReady.bind(this),
			},
		});
		this.event = new CustomEvent("playingYTNow", {
			detail: { player: this.player }, 
		});

		window.addEventListener(
			"playingYTNow",
			this.windowPlayingHandler.bind(this)
		);
		this.button.addEventListener('click',this.playOrPause.bind(this));
	}
	play(){
		this.player.playVideo();
		this.playing = true;
		this.paused = false;
		this.parentEl.classList.add("playing");
	}
	pause(){
		this.player.pauseVideo();
		this.playing = false;
		this.paused = true;
		this.parentEl.classList.remove("playing");
	}
	playOrPause(){
		if (
			this.player.getPlayerState() == 1 ||
			this.player.getPlayerState() == 3
		) {
			this.pause();
		} else {
			this.play();
		}
	}
	onPlayerReady() {
		this.playing = true;
		this.paused = false;
		this.parentEl.classList.add("ready");
		this.parentEl.classList.add("playing");
	}

	windowPlayingHandler(e) {
		if (e.detail.player != this.player) {
			this.player.pauseVideo();
		}
	}
}
const playerWithCover = (url) => {
	let yt_players = document.querySelectorAll(".player.youtube");
	let vm_players = document.querySelectorAll(".player.vimeo");
	if (!yt_players.length && !vm_players.length) {
		return;
	}
	if (yt_players.length) {
		if (typeof YT == "undefined") {
			const tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			const firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			window.onYouTubeIframeAPIReady = () => {
				yt_players.forEach((yt_player) => {
					if(yt_player.classList.contains('video_bg__video')){
						const player = new playerYTAutoPlayClass(
							yt_player
						);
					}
					else{
						const player = new playerYTClass(
							yt_player,
							yt_player.parentNode.parentNode
						);
					}
				});
			};
		} else {
			yt_players.forEach((yt_player) => {
				if(yt_player.classList.contains('video_bg__video')){
					const player = new playerYTAutoPlayClass(
						yt_player
					);
				}
				else{
					const player = new playerYTClass(
						yt_player,
						yt_player.parentNode.parentNode
					);
				}
			});
		}
	}
	if (vm_players.length) {
		vm_players.forEach((vm_player) => {
			if(vm_player.classList.contains('video_bg__video')){
				const player = new playerVMAutoPlayClass(vm_player);
			}
			else{
				const player = new playerVMClass(vm_player, vm_player.parentNode.parentNode);
			}
		});
	}
};

export default playerWithCover;
export { playerYTClass, playerVMClass };
