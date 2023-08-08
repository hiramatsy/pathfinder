window.addEventListener('load', () => {
    const uiEls = initializeUi();



    uiEls.registerSampleGameInput("Sample1", 3, 3, [], { x: 0, y: 0 }, { x: 1, y: 2 });
    uiEls.registerSampleGameInput("Sample2", 3, 3, [{ x: 1, y: 1 }], { x: 0, y: 0 }, { x: 1, y: 2 });
    uiEls.registerSampleGameInput("Sample3", 3, 3, [{ x: 1, y: 1 }, { x: 2, y: 1 }], { x: 0, y: 0 }, { x: 1, y: 2 });
    uiEls.registerSampleGameInput("Sample4",
        7, 7,
        [
            { x: 1, y: 1 },
            { x: 1, y: 3 },
            { x: 1, y: 5 },
            { x: 3, y: 1 },
            { x: 3, y: 3 },
            { x: 3, y: 5 },
            { x: 5, y: 1 },
            { x: 5, y: 3 },
            { x: 5, y: 5 }
        ],
        { x: 0, y: 0 }, { x: 1, y: 2 });
});
