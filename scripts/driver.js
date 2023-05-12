
MySample.main = (function(graphics) {
    'use strict';
    let ptCenter = {x: graphics.sizeX / 2, y: graphics.sizeY / 2};
    let ptEnd = {x: graphics.sizeX / 2, y: graphics.sizeY / 4};
    let ptCenter2 = {x: graphics.sizeX / 2, y: graphics.sizeY / 2}
    let ptEnd2 = {x: graphics.sizeX / 3, y: graphics.sizeY / 4};
    let ptCenter3 = {x: graphics.sizeX / 2, y: graphics.sizeY / 2}
    let ptEnd3 = {x: graphics.sizeX / 4, y: graphics.sizeY / 4};
    let preTime = 0;
    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        const rotationRate = -0.001;
        const rotationRate2 = 0.0012;
        const rotationRate3 = 0.00012;
        ptEnd = {
            x: (ptEnd.x - ptCenter.x) * Math.cos(rotationRate * elapsedTime) - (ptEnd.y - ptCenter2.y) * Math.sin(rotationRate * elapsedTime) + ptCenter.x,
            y: (ptEnd.x - ptCenter.x) * Math.sin(rotationRate * elapsedTime) + (ptEnd.y - ptCenter2.y) * Math.cos(rotationRate * elapsedTime) + ptCenter.y
        }
        ptEnd2 = {
            x: (ptEnd2.x - ptCenter2.x) * Math.cos(rotationRate2 * elapsedTime) - (ptEnd2.y - ptCenter2.y) * Math.sin(rotationRate2 * elapsedTime) + ptCenter2.x,
            y: (ptEnd2.x - ptCenter2.x) * Math.sin(rotationRate2 * elapsedTime) + (ptEnd2.y - ptCenter2.y) * Math.cos(rotationRate2 * elapsedTime) + ptCenter2.y
        }

        ptEnd3 = {
            x: (ptEnd3.x - ptCenter3.x) * Math.cos(rotationRate3 * elapsedTime) - (ptEnd3.y - ptCenter3.y) * Math.sin(rotationRate3 * elapsedTime) + ptCenter3.x,
            y: (ptEnd3.x - ptCenter3.x) * Math.sin(rotationRate3 * elapsedTime) + (ptEnd3.y - ptCenter3.y) * Math.cos(rotationRate3 * elapsedTime) + ptCenter3.y

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
        graphics.drawLine(ptCenter.x,ptCenter.y,Math.trunc(ptEnd.x),Math.trunc(ptEnd.y),"grey");
        graphics.drawLine(ptCenter2.x,ptCenter2.y,Math.trunc(ptEnd2.x),Math.trunc(ptEnd2.y),"white");
        graphics.drawLine(ptCenter3.x,ptCenter3.y,Math.trunc(ptEnd3.x),Math.trunc(ptEnd3.y),"brown");
        // graphics.drawLine(75,75,80,79,"orange");// octant 2
        // graphics.drawLine(75,75,85,70,"blue"); //octant 1
        // graphics.drawLine(75,75,65,70, "pink") // Octant 6
        // graphics.drawLine(75,75,65,80,"yellow" )// Octant 5
        // graphics.drawLine(75,75,77,63,"white") // Octant 0
        // graphics.drawLine(75,75,74,80,"white");

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
