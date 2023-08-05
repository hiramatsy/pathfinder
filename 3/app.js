window.addEventListener('load', () => {
    const samplePath = [
        { x: 1, y: 2 },
        { x: 2, y: 3 },
    ];
    renderGrid(5, 4, document.body, samplePath);
});
