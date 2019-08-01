/* modal mode */
document.addEventListener('wheel', function(event) {
    if (event.target.classList.length === 0) return;
    if (event.target.classList.contains('modal_active') || event.target.classList.contains('modal__arrow') || event.target.classList.contains('modal__close')) {
        event.preventDefault();
    } else if (event.target.classList.contains('modal__content')) {
        const target = event.target;
        event.stopPropagation();
        if(target.scrollHeight - target.scrollTop === target.clientHeight && event.deltaY > 0) {
            event.preventDefault();
        } else if(target.scrollTop === 0 && event.deltaY < 0) {
            event.preventDefault();
        }
    } else if (event.target.offsetParent !== null && event.target.offsetParent.classList.contains('modal__content')) {
        const target = event.target.offsetParent;
        if(target.scrollHeight - target.scrollTop === target.clientHeight && event.deltaY > 0) {
            event.preventDefault();
        } else if(target.scrollTop === 0 && event.deltaY < 0) {
            event.preventDefault();
        }
    }
});
// TEXTAREA
document.addEventListener('wheel', function(event) {
    if (event.target.tagName === 'TEXTAREA') {
        const target = event.target;
        if(target.scrollHeight - target.scrollTop === target.clientHeight && event.deltaY > 0) {
            event.preventDefault();
        } else if(target.scrollTop === 0 && event.deltaY < 0) {
            event.preventDefault();
        }
    }
});