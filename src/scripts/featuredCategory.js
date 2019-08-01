/* featured-work category */
document.addEventListener('click', function(event) {
    if (event.target.closest('.featured-work .category__label')) {
        const target = event.target.closest('.featured-work .category__label');
        const radioList = document.querySelectorAll('.featured-work .category__radio');
        const labelList = document.querySelectorAll('.featured-work .category__label');
        const galleryItemsList = document.querySelectorAll('.gallery__item');
        const toggleItem = (item) => galleryItemsList[item].classList.toggle('item_show');
        const sortGallery = (category) => {
            for (let i = 0, elem = 0; i < galleryItemsList.length; i++) {
                let item = document.querySelectorAll('.gallery__item')[elem];
                if (item.dataset.category !== category) {
                    document.querySelector('.featured-work .gallery').appendChild(item);
                } else {
                    elem++;
                }
            }
        };
        
        let currentIndex;
        let currentCategory;
        let chosenIndex;
        let chosenCategory;
        
        for (let i = 0; i < radioList.length; i++) {
            if (radioList[i].checked) {
                currentIndex = i;
                break;
            }
        }
        for (let i = 0; i < labelList.length; i++) {
            if (labelList[i] === target) {
                chosenIndex = i;
                break;
            }
        }
        if (currentIndex === chosenIndex) return;
        
        currentCategory = labelList[currentIndex].innerHTML;
        chosenCategory = labelList[chosenIndex].innerHTML;

        if (chosenCategory !== 'All') {
            sortGallery(chosenCategory);
        }

        setTimeout(function () {
            for (let i = 0; i < galleryItemsList.length; i++) {
                if (chosenCategory === 'All') {
                    if (galleryItemsList[i].dataset.category !== currentCategory) {
                        toggleItem(i);
                    }
                } else if (currentCategory === 'All') {
                    if (galleryItemsList[i].dataset.category !== chosenCategory) {
                        toggleItem(i);
                    }
                } else if (galleryItemsList[i].dataset.category === chosenCategory) {
                    toggleItem(i);
                } else if (galleryItemsList[i].dataset.category === currentCategory) {
                    toggleItem(i);
                }
            }
        },0);
    }
});
document.body.addEventListener('mouseover', function(event) {
    if (event.target.closest('.featured-work .category__label')) {
        const target = event.target.closest('.featured-work .category__label');
        const galleryItemsList = document.querySelectorAll('.gallery__item');

        for (let i = 0; i < galleryItemsList.length; i++) {
            if (galleryItemsList[i].dataset.category === target.innerHTML) {
                galleryItemsList[i].classList.toggle('item_preview');
            }
        }
    }
});
document.body.addEventListener('mouseout', function(event) {
    if (event.target.closest('.featured-work .category__label')) {
        const target = event.target.closest('.featured-work .category__label');
        const galleryItemsList = document.querySelectorAll('.gallery__item');

        for (let i = 0; i < galleryItemsList.length; i++) {
            if (galleryItemsList[i].dataset.category === target.innerHTML) {
                galleryItemsList[i].classList.toggle('item_preview');
            }
        }
    }
});