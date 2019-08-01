/* modal blocks */
// show modal
document.addEventListener('click', function(event) {
    if (event.target.nextElementSibling === null) return;
    if (event.target.nextElementSibling.className === 'modal') {
        const modal = event.target.nextElementSibling;
        modal.classList.toggle('modal_active');
        
        const currentElem = event.target.parentElement;
        let elemsList = [];
        
        if (currentElem.dataset.category === undefined) {
            elemsList = currentElem.parentElement.childNodes;
        } else {
            const radioList = document.querySelectorAll('.featured-work .category__radio');
            const labelList = document.querySelectorAll('.featured-work .category__label');
            let currentIndex;
            let currentCategory;

            for (let i = 0; i < radioList.length; i++) {
                if (radioList[i].checked) {
                    currentIndex = i;
                    break;
                }
            }
            currentCategory = labelList[currentIndex].innerHTML;

            if (currentCategory === 'All') {
                elemsList = currentElem.parentElement.childNodes;
            } else {
                elemsList = document.querySelectorAll('.gallery__item[data-category=' + currentCategory +']');
            }
        }
        
        if (modal.children[2] !== undefined) {
            const currentNumber = [...elemsList].indexOf(currentElem) + 1;
            modal.children[2].innerHTML = currentNumber + ' of ' + elemsList.length;
        } 
    }
});
// hide modal
document.addEventListener('mouseup', function(event) {
    if (event.target.classList.contains('modal_active')) {
        event.target.classList.toggle('modal_active');
    }
    if (event.target.classList.contains('modal__close')) {
        event.target.parentElement.classList.toggle('modal_active');
    }
});
// slide modal
document.addEventListener('mousedown', function(event) {
    if (event.target.classList.contains('modal__arrow')) {
        const target = event.target;
        const isRightArrow = target === target.parentElement.lastChild;
        const direction = isRightArrow ? 1 : -1;
        
        const currentElem = event.target.parentElement.parentElement;
        let elemsList = [];
        
        if (currentElem.dataset.category === undefined) {
            elemsList = currentElem.parentElement.childNodes;
        } else {
            const radioList = document.querySelectorAll('.featured-work .category__radio');
            const labelList = document.querySelectorAll('.featured-work .category__label');
            let currentIndex;
            let currentCategory;

            for (let i = 0; i < radioList.length; i++) {
                if (radioList[i].checked) {
                    currentIndex = i;
                    break;
                }
            }
            currentCategory = labelList[currentIndex].innerHTML;

            if (currentCategory === 'All') {
                elemsList = currentElem.parentElement.childNodes;
            } else {
                elemsList = document.querySelectorAll('.gallery__item[data-category=' + currentCategory +']');
            }
        }
        
        const currentIndex = [...elemsList].indexOf(currentElem);
        const lastIndex = elemsList.length - 1;
        const nextIndex = isRightArrow && currentIndex === lastIndex ? 0 :
            !isRightArrow && currentIndex === 0 ? lastIndex :
            currentIndex + direction;
        
        let modalList = [];
        for(let i = 0; i < elemsList.length; i++) {
            modalList.push(elemsList[i].lastElementChild);
        }
        modalList[currentIndex].classList.toggle('modal_active');
        modalList[nextIndex].classList.toggle('modal_active');
        modalList[nextIndex].children[2].innerHTML = nextIndex + 1 + ' of ' + elemsList.length;
    }
});