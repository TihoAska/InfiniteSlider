$(document).ready(function() {
    const leftArrow = $('.left-arrow');
    const rightArrow = $('.right-arrow');

    addArrowHover();

    rightArrow.on('click', () => { 
        if(rightArrow.prop('disabled')) return;
        rightArrow.prop('disabled', true);
        leftArrow.prop('disabled', true);

        const lastTopSlideImage = $('.top-slider-img').last()[0];
        const lastBottomSlideImage = $('.bottom-slider-img').last()[0];

        $('.top-images-container').prepend(lastTopSlideImage.cloneNode(true));
        $('.bottom-images-container').prepend(lastBottomSlideImage.cloneNode(true));

        $('.top-slider-img').each(function() {
            translateByX(`${lastTopSlideImage.naturalWidth + getFlexGap($('.top-images-container'))}`, this);
        });

        $('.bottom-slider-img').each(function() {
            translateByX(`${lastBottomSlideImage.naturalWidth + getFlexGap($('.bottom-images-container'))}`, this);
        });

        translateByX(`-${lastTopSlideImage.naturalWidth + getFlexGap($('.top-images-container'))}`, $('.top-images-container')[0]);
        translateByX(`-${lastBottomSlideImage.naturalWidth + getFlexGap($('.bottom-images-container'))}`, $('.bottom-images-container')[0]);

        setTimeout(() => {
            $('.top-slider-img').last().remove();
            $('.bottom-slider-img').last().remove();
            rightArrow.prop('disabled', false);
            leftArrow.prop('disabled', false);
        }, 300);
    });

    leftArrow.on('click', () => {
        if(leftArrow.prop('disabled')) return;
        leftArrow.prop('disabled', true);
        rightArrow.prop('disabled', true);

        const firstTopSlideImage = $('.top-slider-img').first()[0];
        const firstBottomSlideImage = $('.bottom-slider-img').first()[0];

        $('.top-images-container').append(firstTopSlideImage.cloneNode(true));
        $('.bottom-images-container').append(firstBottomSlideImage.cloneNode(true));

        $('.top-slider-img').last().addClass('fade-in');
        $('.bottom-slider-img').last().addClass('fade-in');

        $('.top-slider-img').each(function() {
            translateByX(`-${firstTopSlideImage.naturalWidth + getFlexGap($('.top-images-container'))}`, this);
        });

        $('.bottom-slider-img').each(function() {
            translateByX(`-${firstBottomSlideImage.naturalWidth + getFlexGap($('.bottom-images-container'))}`, this);
        });

        translateByX(`${firstTopSlideImage.naturalWidth + getFlexGap($('.top-images-container'))}`, $('.top-images-container')[0]);
        translateByX(`${firstBottomSlideImage.naturalWidth + getFlexGap($('.bottom-images-container'))}`, $('.bottom-images-container')[0]);

        $('.top-slider-img').first().remove();
        $('.bottom-slider-img').first().remove();

        setTimeout(() => {
            leftArrow.prop('disabled', false);
            rightArrow.prop('disabled', false);
        }, 300);
    }) 

    function getFlexGap(container) {
        return container[0].style.gap !== "" ? parseInt(container[0].gap, 10) : 0;
    }

    function translateByX(translateX, content) {
        const transformValue = $(content).css('transform');
        let transform;

        if(transformValue == "" || transformValue == "none" || transformValue == undefined){
            transform = "translateX(0px)";
        } else {
            transform = $(content).css('transform');
        }

        let match = transform.match(/^matrix\((.+)\)$/);

        if (match) {
            const matrixValues = match[1].split(', ');
            let currentTranslateX = parseFloat(matrixValues[4]);
            let newTranslateX = currentTranslateX + parseFloat(translateX);
            matrixValues[4] = newTranslateX.toString();
            transform = `matrix(${matrixValues.join(', ')})`;
        } else {
            transform += 'translateX(' + translateX + 'px)';
        }

        $(content).css('transform', transform);
    }

    function addArrowHover(){
        leftArrow.on('mouseover', () => {
            leftArrow.find('img').attr('src', 'assets/arrow-gray-left.png');
            leftArrow.css('border-color', 'lightgray');
        });
    
        leftArrow.on('mouseout', () => {
            leftArrow.find('img').attr('src', 'assets/arrow-blue-left.png');
            leftArrow.css('border-color', '#134880');
        });
    
        rightArrow.on('mouseover', () => {
            rightArrow.find('img').attr('src', 'assets/arrow-gray-right.png');
            rightArrow.css('border-color', 'lightgray');
        });
    
        rightArrow.on('mouseout', () => {
            rightArrow.find('img').attr('src', 'assets/arrow-blue-right.png');
            rightArrow.css('border-color', '#134880');
        });
    }
});