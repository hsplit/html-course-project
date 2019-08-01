/* slider specifications */
document.addEventListener('click', function(event) {
    if (event.target.closest('.services .list__label')) {
        const target = event.target.closest('.services .list__label');
        const radioList = document.querySelectorAll('.services .list__radio');
        const labelList = document.querySelectorAll('.services .list__label');
        const specificationsList = document.querySelectorAll('.services .specification');
        const specificationsLinesList = document.querySelectorAll('.services .specification .specification__line');

        let currentIndex;
        let chosenIndex;
        let currentLineWidth;

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

        currentLineWidth = parseInt(specificationsLinesList[currentIndex].style.width);
        specificationsList[currentIndex].classList.remove('specification_active');
        specificationsList[chosenIndex].classList.add('specification_active');

        setTimeout(function(){
            for (let i = 0; i < specificationsLinesList.length; i++) {
                const newWidth = currentLineWidth / (currentIndex + 1) * (chosenIndex + 1) + '%';
                specificationsLinesList[i].style.width = newWidth;
            }
        },0);
    }
});
