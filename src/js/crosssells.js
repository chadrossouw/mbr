const crossSell = () => {
    let crosSellContainer = document.querySelector('.book-ticket-content .cross-sell');
    if(!crosSellContainer) return;
    let crossSellItems = crosSellContainer.querySelectorAll('.crosssell--item');
    if(!crossSellItems) return;
    crossSellItems.forEach((item) => {
        let date = item.dataset.date;
        let select = item.querySelector('option[data-date="'+date+'"]');
        console.log(select);
        if(select) {
            select.setAttribute('selected', 'selected');
            select.selected = true;
            select.parentElement.dispatchEvent(new Event('change'));
        }
    });

}

export default crossSell;