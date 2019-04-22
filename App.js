function splitScroll() {
    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        duration: '200%',
        triggerElement: '.econ-personal',
        triggerHook: 0,
    })
    .setPin('.econ-personal')
    .addIndicators()
    .addTo(controller);
}

splitScroll();
