import cardLinks from "./cards";
const filters = () => {
	const filters = document.querySelector("#filter");
	if (!filters) return;
	const container = document.getElementById("response");
	const action = filters.action;
	const _clearFilters = filters.querySelector('[type="reset"]');
	const currentFilters = Array.from(filters.querySelectorAll(".selected"));
	const checkboxes = filters.querySelectorAll('input[type="checkbox"], input[type="radio"]');
	let date_setter = filters.querySelector('#filter_date');
	const date_filter_all = filters.querySelector('#date_filter_all');
	let dateSelector = filters.querySelector(".date_selector");
	let summaryArea = filters.querySelector(".filter_summary");
	let summary = summaryArea.querySelector(".grid");
	showHideSummary();
	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener("change", filterListings);
	});
	addButtonListeners();
	
	filters.addEventListener("reset", clearAllFilters);
	filters.addEventListener("submit", (e)=>{e.preventDefault();});
	if (_clearFilters) {
		_clearFilters.addEventListener("click", clearAllFilters);
	}

	function addButtonListeners() {
		let buttons = filters.querySelectorAll('button');
		buttons.forEach((button) => {
			//Removing them all first so we don't double up
			button.removeEventListener("click", filterListings);
			button.addEventListener("click", filterListings);
		});
	}
	function filterListings(e) {
		 e.preventDefault();
		let urlParams = "";
		if(e.currentTarget.tagName === "BUTTON"){
			console.log(e.currentTarget);
			handleButtonPress(e);	
		}
		else if (e.currentTarget.type === "checkbox") {
			addActiveFilter(e.target);
		}
		else if (e.currentTarget.type === "radio") {
			addActiveDateFilter(e.currentTarget.dataset.date);
			resetDateSelector();
		}
		const liveFilters = new FormData(filters);
		let toDelete = [];
		for (const pair of liveFilters.entries()) {
			if (pair[1] === "") {
				toDelete.push(pair[0]);
			}
		}
		toDelete.forEach((key) => liveFilters.delete(key));
		urlParams = new URLSearchParams(liveFilters).toString();

		history.pushState("", "", `?${urlParams}`);
		container.classList.add("loading");
		container.setAttribute("aria-busy", "true");
		fetch(`${action}?${urlParams}`)
			.then((response) => response.json())
			.then((data) => changeResponse(data))
			.catch((error) => {
				console.log(error);
				container.classList.remove("loading");
				container.setAttribute("aria-busy", "false");
			}); 
	}

	function handleButtonPress(e){
		date_setter = filters.querySelector('#filter_date');
		if(e.currentTarget.classList.contains('date_changer')){
			date_setter.value = e.currentTarget.dataset.date;
			resetDateSelector(e.currentTarget.dataset.date);
			addActiveDateFilter(e.currentTarget.dataset.date);
			addButtonListeners();
		}
		else if(e.currentTarget.classList.contains('remove')){	
			let type = e.currentTarget.dataset.remove;
			let name = e.currentTarget.dataset.name;
			if(type === 'filter_date_type'){
				date_filter_all.checked = true;
				date_setter.value = "";
				e.currentTarget.remove();
				resetDateSelector();
				showHideSummary();
			}
			else if(type === 'filter_date'){
				date_setter.value = "";
				e.currentTarget.remove();
				resetDateSelector();
				showHideSummary();
			}
			else{
				let checks = Array.from(checkboxes);
				let input = checks.find((checkbox) => {
					console.log(checkbox.name,type);
					return checkbox.value === name && checkbox.name === `${type}[]`;
				});
				console.log(input);
				input.checked = false;
				input.removeAttribute("checked");
				addActiveFilter(input);
			}
		}
	}

	function getDateType(){
		let date_types = filters.querySelectorAll('input[name="filter_date_type"]'); 
		let date_type = Array.from(date_types).find((type) => type.checked);
		if(!date_type){
			date_type='all';
		}
		else{
			date_type = date_type.value;
		}
		return date_type;
	}

	function resetDateSelector(date=false){
		let date_type = getDateType();
		fetch(`${action}_get_date_selector?filter_date_type=${date_type}${date?`&filter_date=${date}`:""}`)
		.then((response) => response.json())
		.then((data) => {
			dateSelector.innerHTML = data.markup;
			addButtonListeners();
			dateSelector = filters.querySelector(".date_selector");
		})
		.catch((error) => {
			console.log(error);
			dateSelector.innerHTML = "";
		});
	}

	function clearFilters(taxonomy) {
		filters
			.querySelectorAll(`input[data-taxonomy="${taxonomy}"]`)
			.forEach((input) => {
				if (input === typeAll || input === themeAll) return;
				input.checked = false;
				input.removeAttribute("checked");
			});
	}

	function clearAllFilters() {
		filters.reset();
		filters.querySelectorAll('input[type="checkbox"]').forEach((input) => {
			input.checked = false;
			//This weirdness is because for some reason the checked=false wasn't working on inputs set by php
			input.removeAttribute("checked");
		});
		if(summary.children.length > 1){
			Array.from(summary.children).forEach((child) => {
				if(child.classList.contains("remove")){
					child.remove();
				}
			});
		}
		showHideSummary();
		history.pushState("", "", "?");
		container.classList.add("loading");
		fetch(`${action}`)
			.then((response) => response.json())
			.then((data) => changeResponse(data))
			.catch((error) => {
				console.log(error);
				container.classList.remove("loading");
			});
		currentFilters.forEach((filter) => {
			filter.innerHTML = "Select...";
			setParentWidth(filter);
		});
	}

	function uncheck(taxonomy) {
		const input = filters.querySelector(`#${taxonomy}_all`);
		input.checked = false;
		input.removeAttribute("checked");
	}

	function changeResponse(data) {
		container.innerHTML = data;
		container.classList.remove("loading");
		container.setAttribute("aria-busy", "false");
		cardLinks();
	}

	function addActiveFilter(target) {
		if (target.type !== "checkbox"&&target.type!=="radio") return;
		const type = target.dataset.type;
		let selectedArea = currentFilters.filter(
			(filter) => filter.dataset.type === type
		);
		selectedArea = selectedArea[0];
		const liCount = selectedArea.querySelectorAll("li");
		if (target.checked) {
			if (!liCount || liCount.length == 0) {
				let ul = document.createElement("ul");
				ul.setAttribute("aria-label", "Currently selected");
				selectedArea.innerHTML = "";
				selectedArea.appendChild(ul);
			}
			let textContent = target.nextElementSibling.textContent;
			let li = document.createElement("li");
			li.setAttribute("data-slug", target.value);
				li.textContent = textContent;
				selectedArea.firstElementChild.appendChild(li);
				const filter = target.closest(".filter");
				filter?.removeAttribute("open")
				filter?.classList.remove("open");
				summary.insertAdjacentHTML(
					"beforeend",`
					<button class="remove ${type}_remover" data-remove="filter_${type}" data-name="${target.value}"><span class="screen-reader-text">Remove the filter: </span>${textContent}</button>
				`)
		} else {

			let list = Array.from(liCount);
			let li = list.filter((li) => li.dataset.slug === target.value);
			li[0].remove();
			if (liCount.length == 1) {
				selectedArea.innerHTML = type == 'event_type'?'WHAT':'WHO';
			}
			Array.from(summary.children).forEach((child) => {
				if (child.dataset.name === target.value) {
					child.remove();
				}
			});
				

		}
		addButtonListeners();
		showHideSummary();
		setParentWidth(selectedArea);
	}

	function addActiveDateFilter(date){
		let dateType = getDateType();
		if(summary.children.length > 1){
			Array.from(summary.children).forEach((child) => {
				if (child.classList.contains("date_remover")) {
					child.remove();
				}
			});
		}
		if(dateType!=='all'){
			date = date.split('_');
			let start = Date.parse(date[0]);
			let end = Date.parse(date[1]);
			let time = Date.now();
			if(date&&!(start<time&&time<end)){
				let start = new Date(date[0]);
				let end = new Date(date[1]);
				let startDate = {
					year: start.getFullYear(),
					month: start.getMonth(),
					day: start.getDate(),
				}
				let endDate = {
					year: end.getFullYear(),
					month: end.getMonth(),
					day: end.getDate(),
				}
				let months = [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December"
				];
				let rangeString = '';
				if(startDate.year==endDate.year){
					if(startDate.month==endDate.month){
						rangeString = `${startDate.day}-${endDate.day} ${months[startDate.month]} ${startDate.year}`;
					}
					else{
						rangeString = `${startDate.day} ${months[startDate.month]}-${endDate.day} ${months[endDate.month]} ${startDate.year}`;
					}
				}
				else{
					rangeString = `${startDate.day} ${months[startDate.month]} ${startDate.year}-${endDate.day} ${months[endDate.month]} ${endDate.year}`;
				}

				summary.insertAdjacentHTML(
					"beforeend",`
					<button class="remove date_remover" data-remove="filter_date"><span class="screen-reader-text">Remove the filter: </span>${rangeString}</button>
				`)
			}
			else{
				summary.insertAdjacentHTML(
					"beforeend",`
					<button class="remove date_remover" data-remove="filter_date_type"><span class="screen-reader-text">Remove the filter: </span>This ${dateType}</button>
					`
				)
			}
		}
		else{
			date_setter = filters.querySelector('#filter_date');
			date_setter.value = "";
		}
		showHideSummary();
	}

	function setParentWidth(selectedArea) {
		let width = selectedArea.offsetWidth;
		let ancestor = selectedArea.closest(".filter_wrapper");
		ancestor.style.width = `${width}px`;
	}

	function showHideSummary(){
		if(summary.children.length === 1){
			summaryArea.classList.add("hide");
		}
		else{
			summaryArea.classList.remove("hide");
		}
	}
};

const showMore = () => {
	const showMoreButton = document.querySelector("#show-more-posts");
	const filter = document.querySelector("#attraction-filter");
	if (!showMoreButton) return;
	showMoreButton.addEventListener("click", getMorePosts);
	function getMorePosts(e){
		e.preventDefault();
		const postType = e.target.dataset.postType;
		const listingRow = document.querySelector(".listing-row");
		const rows = listingRow.querySelectorAll("li");
		const offset = rows.length;
		const attraction_id = filter?.value;
		const data = {
			action: "get_more_posts",
			post_type: postType,
			offset: offset,
			attraction_id: attraction_id,
		};
		listingRow.classList.add("loading");
		fetch(ajax_object.ajax_url, {
			method: "POST",
			body: new URLSearchParams(data),
		})
			.then((response) => response.text())
			.then((data) => {
				if (data.trim() === "") {
					showMoreButton.style.display = "none";
				} else {
					listingRow.insertAdjacentHTML('beforeend',data);
					listingRow.classList.remove("loading");
					let list = listingRow.querySelectorAll("li")
					let newCount = list.length;
					list[newCount-3].querySelector('a').focus();

					cardLinks();
					if (newCount % 3 !== 0) {
						showMoreButton.style.display = "none";
					}
				}
			})
			.catch((error) => console.log(error));
	
	}
}

const discoverFilter = () => {
	const filter = document.querySelector("#attraction-filter");
	console.log(filter);
	if (!filter) return;
	filter.addEventListener("change", (e)=>{
		if(e.target.tagName !== "SELECT") return;
		if(e.target.value){
			const urlParams = new URLSearchParams({attraction_id:e.target.value});
			window.location.search = urlParams;
		}
		else{
			window.location.search = "";
		}
	});
}


export {filters,discoverFilter,showMore};

//Show More button on Discover & Learn and News pages
/* 
jQuery(document).ready(function ($) {
	$("#show-more-posts").on("click", function () {
		var postType = $(this).data("post-type");
		var offset = $("#post-grid .listing-row").length * 3; // Calculate the offset
		var data = {
			action: "get_more_posts",
			post_type: postType,
			offset: offset,
		};
		$.post(ajax_object.ajax_url, data, function (response) {
			// Trim response to remove whitespace
			var trimmedResponse = response.trim();
			if (!trimmedResponse) {
				// If trimmedResponse is empty or contains only whitespace, hide the button
				$("#show-more-posts").hide();
			} else {
				// Append the fetched posts in a new listing-row div after the last listing-row
				var $newRow = $("<div class='listing-row discover-news-row'></div>")
					.insertBefore("#show-more-posts")
					.append(trimmedResponse);
				// Check if the new row has less than 3 posts and hide the button accordingly
				if ($newRow.children().length < 3) {
					$("#show-more-posts").hide();
				}
			}
		});
	});
});
 */