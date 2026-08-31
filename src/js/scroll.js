import scrollama from 'scrollama';
const scroll = () => {
	
    const scroller = scrollama();

    // setup the instance, pass callback functions
    scroller
    .setup({
        step: ".scroll-detect",
        offset: 0,
        threshold: 1,
    })
    .onStepEnter((response) => {
        const { element, index, direction } = response;
        if(element.classList.contains('scroll-over-block')||element.classList.contains('zoom-block')) {
            element.classList.add('active');
        }
        if(element.classList.contains('zoom-block__overlay-text')&&direction==='up') {
            element.parentNode.classList.remove('zoom');
        }
    }) 
    .onStepExit((response) => {
        const { element, index, direction } = response;
        if(element.classList.contains('scroll-over-block')||element.classList.contains('zoom-block')) {
            element.classList.remove('active');
        }
        if(element.classList.contains('zoom-block__zooming-text')&&direction==='up') {
            element.parentNode.classList.remove('zoom');
        }
        if(element.classList.contains('zoom-block__overlay-text')&&direction==='down') {
            element.parentNode.classList.add('zoom');
        }
    })
    
};

export default scroll; 