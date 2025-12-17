/*Accessibility for cards, making the whole card clickable*/

const cardLinks = () => {
    const cards = document.querySelectorAll('.card'); 
    if(cards.length){
        cards.forEach(card=>{
            
            let link = card.querySelector('.card_target');
            if(!link) return;
            card.style.cursor = 'pointer';
            card.addEventListener('click', ()=>{
                link.click();
            });
        });
    } 
}
export default cardLinks; 