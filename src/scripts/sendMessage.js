document.querySelector('.smart-agency .form-send-message').addEventListener('submit', function(e) {
    e.preventDefault();
    const target = e.target;
    
    if(target.classList.contains('form-send-message_done')) {
        target.classList.remove('form-send-message_done');
        target.childNodes[0].childNodes[0].innerHTML = 'Send ';
        target.childNodes[0].childNodes[1].nodeValue = 'A Message';
        for(let i = 0; i < target.length - 1; i++) {
            target[i].disabled = false;
        }
        target[2].value = '';
        const textButton = target[3].innerText;
        const notTextButton = target[3].innerHTML.replace(textButton,'');
        target[3].innerHTML =  'Send Message ' + notTextButton;
    } else {
        target.classList.add('form-send-message_done');
        target.childNodes[0].childNodes[0].innerHTML = 'Thank ';
        target.childNodes[0].childNodes[1].nodeValue = 'You For Your Message';
        for(let i = 0; i < target.length - 1; i++) {
            target[i].disabled = true;
        }
        const textButton = target[3].innerText;
        const notTextButton = target[3].innerHTML.replace(textButton,'');
        target[3].innerHTML = notTextButton + ' Send Another Message';
        
        localStorage.setItem('Name', target[0].value);
        localStorage.setItem('Email', target[1].value);
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.smart-agency .form-send-message');
    form[0].value = localStorage.getItem('Name');
    form[1].value = localStorage.getItem('Email');
});