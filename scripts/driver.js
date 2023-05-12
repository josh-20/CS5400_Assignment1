
MySample.main = (function(graphics) {
    'use strict';
    let ptCenter = {x: graphics.sizeX / 2, y: graphics.sizeY / 2};
    let ptEnd = {x: graphics.sizeX / 2, y: graphics.sizeY / 4};
    let preTime = 0;
    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        const rotationRate = 0.001;
        ptEnd = {
            x: (ptEnd.x - ptCenter.x) * Math.cos(rotationRate * elapsedTime) - (ptEnd.y - ptCenter.y) * Math.sin(rotationRate * elapsedTime) + ptCenter.x,
            y: (ptEnd.x - ptCenter.x) * Math.sin(rotationRate * elapsedTime) + (ptEnd.y - ptCenter.y) * Math.cos(rotationRate * elapsedTime) + ptCenter.y
        }
        // something to do here.
        
        
    }

    //------------------------------------------------------------------
    //
    // Rendering code goes here
    //
    //------------------------------------------------------------------
    function render() {
        graphics.clear(); 
        // graphics.drawLine(ptCenter.x,ptCenter.y,Math.trunc(ptEnd.x),Math.trunc(ptEnd.y),"orange");
        // graphics.drawLine(75,75,30,90,"red");
        graphics.drawLine(75,75,80,79,"red");
        graphics.drawLine(75,75,65,80,"yellow");
        // graphics.drawLine(75,75,30,80,"blue");
        // graphics.drawLine(75,75,30,90,"red");
    }

    //------------------------------------------------------------------
    //
    // This is the animation loop.
    //
    //------------------------------------------------------------------
    function animationLoop(time) {
        let elapsedTime = time - preTime
        preTime = time;
        update(elapsedTime);
        render();

        requestAnimationFrame(animationLoop);
    }

    console.log('initializing...');
    requestAnimationFrame(animationLoop); 

}(MySample.graphics));
