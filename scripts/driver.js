
MySample.main = (function(graphics) {
    'use strict';

    //------------------------------------------------------------------
    //
    // Scene updates go here.
    //
    //------------------------------------------------------------------
    function update() {
        
    }

    //------------------------------------------------------------------
    //
    // Rendering code goes here
    //
    //------------------------------------------------------------------
    function render() {
        graphics.clear();
        graphics.drawLine(50,10,50,25,"green");
        graphics.drawLine(75,57,10,30, "orange");
    }

    //------------------------------------------------------------------
    //
    // This is the animation loop.
    //
    //------------------------------------------------------------------
    function animationLoop(time) {

        update();
        render();

        requestAnimationFrame(animationLoop);
    }

    console.log('initializing...');
    requestAnimationFrame(animationLoop); 

}(MySample.graphics));
