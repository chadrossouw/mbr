const basket = () => {
    const cart_donate = document.querySelector('#cart_donate');
    const cart_login = document.querySelector('#cart_login');
    const cart_register = document.querySelector('#cart_register');
    const cart_parking = document.querySelector('#parking');
    const submit = document.querySelector('#update_cart');
    if(cart_donate) {
        cart_donate.addEventListener('change',handleChange);
        cart_donate.addEventListener('submit',handleSubmit);
    }
    if(cart_login) {
        cart_login.addEventListener('submit',handleSubmit);
    }
    if(cart_register) {
        cart_register.addEventListener('submit',handleSubmit);
    }
    if(cart_parking) {
        cart_parking.addEventListener('submit',handleSubmit);
    }
    if(submit){
        submit.setAttribute('disabled','disabled');
        const form = submit.closest('form');
        form.addEventListener('change',()=>{
            submit.removeAttribute('disabled');
        });
    }


    const crossSells = document.querySelectorAll('.crosssell--item');
    if(crossSells.length){
        crossSells.forEach(crossSell=>{
            const ajaxButton = crossSell.querySelector('.ajax_add_to_cart');
            ajaxButton?.addEventListener('click',(e)=>{
                let message = document.createElement('div');
                message.classList.add('message');
                message.innerHTML = 'Added to basket';
                ajaxButton.parentElement.appendChild(message);
            });
        });
    }
}

function handleChange(e){
    if(e.target.name == 'donation_amount'){
        let donationOptions = cart_donate.querySelectorAll('input[name=donation_amount]');
        let actualValue = cart_donate.querySelector('#donation_actual_amount');
        let value = e.target.value;
        if(e.target.type == 'radio'){
            donationOptions.forEach(option=>{
               if(option.type == 'number'){
                   option.value = '';
               }
            });
        }
        else if(e.target.type == 'number'){
            donationOptions.forEach(option=>{
                if(option.type == 'radio'){
                    option.checked = false;
                }
            });
        }
        actualValue.value = value;
    }
    if(e.target.name == 'donation'){
        const donation = cart_donate.querySelector('.donation_details');
        if(e.target.value == 'yes'){
            donation.classList.remove('hidden');
        }else{
            donation.classList.add('hidden');
        }
    }
}

function handleSubmit(e){
    e.preventDefault();
    const form = e.target;
    const submit = form.querySelector('button[type=submit]');
    const message = form.querySelector('.log_message');
    const action = form.dataset.action
    form.classList.add('loading');
    submit.setAttribute('disabled','disabled');

    const data = new FormData(form);
    fetch(action,{
        method: 'POST',
        headers: {
            'X-WP-Nonce': form.dataset.nonce
        },
        body: data
    })
    .then(response=>response.json())
    .then(response=>{
        form.classList.remove('loading');
        submit.removeAttribute('disabled');
        if(response.success){
            message.innerHTML = response.message;
            if(response.redirect){
                window.location.href = response.redirect;
            }
        }else{
            message.innerHTML = response.message;
        }
    })
    .catch(error=>{
        form.classList.remove('loading');
        submit.removeAttribute('disabled');
        message.innerHTML = 'An error occurred, please try again';
    })

}

export default basket;