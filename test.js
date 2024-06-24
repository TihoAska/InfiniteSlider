document.addEventListener('DOMContentLoaded', (event) => {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    rightArrow.addEventListener('click', () => { 
        const topSliderImages = document.querySelectorAll('.top-slider-img');
        const bottomSliderImages = document.querySelectorAll('.bottom-slider-img');

        const lastTopSlideImage = topSliderImages[topSliderImages.length - 1];
        const lastBottomSlideImage = bottomSliderImages[bottomSliderImages.length - 1];

        const clonedTopImage = lastTopSlideImage.cloneNode(true);
        const clonedBottomImage = lastBottomSlideImage.cloneNode(true);

        document.querySelector('.top-images-container').prepend(clonedTopImage);
        document.querySelector('.bottom-images-container').prepend(clonedBottomImage);

        document.querySelectorAll('.top-slider-img').forEach(image => {
            translateByX(`${topSliderImages[topSliderImages.length - 1].naturalWidth + getFlexGap(document.querySelector('.top-images-container'))}`, image);
        });

        document.querySelectorAll('.bottom-slider-img').forEach(image => {
            translateByX(`${bottomSliderImages[bottomSliderImages.length - 1].naturalWidth + getFlexGap(document.querySelector('.bottom-images-container'))}`, image);
        });

        const topImagesContainer = document.querySelector('.top-images-container');
        translateByX(`-${topSliderImages[topSliderImages.length - 1].naturalWidth + getFlexGap(document.querySelector('.top-images-container'))}`, topImagesContainer);
        
        const bottomImagesContainer = document.querySelector('.bottom-images-container');
        translateByX(`-${bottomSliderImages[bottomSliderImages.length - 1].naturalWidth + getFlexGap(document.querySelector('.bottom-images-container'))}`, bottomImagesContainer);

        document.querySelector('.top-images-container').removeChild(lastTopSlideImage);
        document.querySelector('.bottom-images-container').removeChild(lastBottomSlideImage);
    })

    leftArrow.addEventListener('click', () => {
        const topSliderImages = document.querySelectorAll('.top-slider-img');
        const bottomSliderImages = document.querySelectorAll('.bottom-slider-img');

        const firstTopSlideImage = topSliderImages[0];
        const firstBottomSlideImage = bottomSliderImages[0];

        const clonedTopImage = firstTopSlideImage.cloneNode(true);
        const clonedBottomImage = firstBottomSlideImage.cloneNode(true);

        document.querySelector('.top-images-container').append(clonedTopImage);
        document.querySelector('.bottom-images-container').append(clonedBottomImage);

        document.querySelectorAll('.top-slider-img').forEach(image => {
            translateByX(`-${topSliderImages[0].naturalWidth + getFlexGap(document.querySelector('.top-images-container'))}`, image);
        });

        document.querySelectorAll('.bottom-slider-img').forEach(image => {
            translateByX(`-${bottomSliderImages[0].naturalWidth + getFlexGap(document.querySelector('.bottom-images-container'))}`, image);
        });

        const topImagesContainer = document.querySelector('.top-images-container');
        translateByX(`${topSliderImages[0].naturalWidth + getFlexGap(document.querySelector('.top-images-container'))}`, topImagesContainer);
        
        const bottomImagesContainer = document.querySelector('.bottom-images-container');
        translateByX(`${bottomSliderImages[0].naturalWidth + getFlexGap(document.querySelector('.bottom-images-container'))}`, bottomImagesContainer);

        document.querySelector('.top-images-container').removeChild(document.querySelectorAll('.top-slider-img')[0]);
        document.querySelector('.bottom-images-container').removeChild(document.querySelectorAll('.bottom-slider-img')[0]);
    }) 

    //Dohvacam gap: 10px, da ne hard codam vrijednosti
    function getFlexGap(container) {
        return getComputedStyle(container).gap != "normal" ? parseInt(getComputedStyle(container).gap, 10) : 0;
    }

    //chatGPT... u translateX(1970px) dohvacam vrijednost 1970, dodajem/oduzimam velicinu
    //slike npr 1970-500 i tu vrijednost stavljam u string.
    //Prvo sam radio content.style.transform += "translateX(imageWidth)"
    //ali sam kasnije shvatio da to samo dodaje stringove npr. "translateX(500px) translateX(450px) translateX(520px)" 
    //sto je zapravo radilo, ali onda bi se u nedogled zbrajali stringovi i u devToolsima bi <img> imao po 30 translateX
    //tj. onoliko koliko puta se klikne na arrow.
    //Moze i bez ove funkcije, ali bolje je ovako.
    function translateByX(translateX, content) {
        let transform;

        if(content.style.transform == ""){
            transform = "translateX(0px)";
        } else {
            transform = content.style.transform;
        }

        let match = transform.match(/translateX\(([^)]+)px\)/);

        if (match) {
            let currentTranslateX = parseFloat(match[1]);
            let newTranslateX = currentTranslateX + parseFloat(translateX);
            transform = transform.replace(/translateX\([^)]+\)/, 'translateX(' + newTranslateX + 'px)');
        } else {
            transform += 'translateX(' + translateX + 'px)';
        }

        content.style.transform = transform;
        console.log("Transition: " + getComputedStyle(content).transition);
    }
});