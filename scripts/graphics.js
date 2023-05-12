// ------------------------------------------------------------------
// 
// This is the graphics object.  It provides a pseudo pixel rendering
// space for use in demonstrating some basic rendering techniques.
//
// ------------------------------------------------------------------
MySample.graphics = (function(pixelsX, pixelsY, showPixels) {
    'use strict';

    let canvas = document.getElementById('canvas-main');
    let context = canvas.getContext('2d', { alpha: false });

    let deltaX = canvas.width / pixelsX;
    let deltaY = canvas.height / pixelsY;

    //------------------------------------------------------------------
    //
    // Public function that allows the client code to clear the canvas.
    //
    //------------------------------------------------------------------
    function clear() {
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();

        // Draw a very light background to show the "pixels" for the framebuffer.
        if (showPixels) {
            context.save();
            context.lineWidth = .1;
            context.strokeStyle = 'rgb(150, 150, 150)';
            context.beginPath();
            for (let y = 0; y <= pixelsY; y++) {
                context.moveTo(1, y * deltaY);
                context.lineTo(canvas.width, y * deltaY);
            }
            for (let x = 0; x <= pixelsX; x++) {
                context.moveTo(x * deltaX, 1);
                context.lineTo(x * deltaX, canvas.width);
            }
            context.stroke();
            context.restore();
        }
    }

    //------------------------------------------------------------------
    //
    // Public function that renders a "pixel" on the framebuffer.
    //
    //------------------------------------------------------------------
    function drawPixel(x, y, color) {
        context.fillStyle = color;
        context.fillRect(Math.floor(x * deltaX), Math.floor(y * deltaY), Math.ceil(deltaX), Math.ceil(deltaY));
    }

    //------------------------------------------------------------------
    //
    // Bresenham line drawing algorithm.
    //
    //------------------------------------------------------------------

    //Quadrant 1
    function drawLine(x1, y1, x2, y2, color) {
        let deltaX = Math.abs(x2 - x1);
        let deltaY = Math.abs(y2 - y1);
        let m = deltaY/deltaX;
        let b = y1 - m * x1;
        let c = 2 * deltaY + (deltaX * (2 * b - 1));
        let pk = (2 * deltaY * x1) - (2 * deltaX * y1) + c;
        // Octant 0
        if(x1 < x2 && y2 < y1 && deltaX < deltaY) {
            [x1,y1]=[x2,y2]
            for(let y = y1; y >= y2; y--){
                drawPixel(x1,y,color);
                if(pk >= 0) {
                    pk = pk + 2 * deltaY - 2 * deltaX;
                    x1++;
                }else{
                    pk = pk + (2 * deltaY);
                }
            }
        }
        // Octant 7
        else if(x1 > x2 && y2 < y1 && deltaX <= deltaY) {
            for(let y = y1; y >= y2; y--){
                drawPixel(x1,y,color);
                if(pk >= 0) {
                    pk = pk + 2 * deltaY - 2 * deltaX;
                    x1--;
                }else{
                    pk = pk + (2 * deltaY);
                }
            }
        }
        // Octant 1
        else if(x1 < x2 && (y2 - y1) > 0){
            for(let x = x1; x <= x2; x++){
                drawPixel(x,y1,color);
                if(pk >= 0) {
                    pk = pk + ((2 * deltaY) - (2 * deltaX));
                    y1++;
                }else{
                    pk = pk + (2 * deltaY);
                }
            }
        }
        //Octant 2
       else if(x1 < x2 && y2 < y1){
            for(let x = x1; x < x2; x++){
                drawPixel(x,y1,color);
                if(pk >= 0) {
                    pk = pk + ((2 * deltaY) - (2 * deltaX));
                    y1--;
                }else{
                    pk = pk + (2 * deltaY);
                }
            }
        }
        // Octant 6
        else if (x2 < x1 && y2 < y1){
            for(let x = x1; x > x2; x--){
                drawPixel(x,y1,color);
                if(pk >= 0) {
                    pk = pk + ((2 * deltaY) - (2 * deltaX));
                    y1--;
                }else{
                    pk = pk + (2 * deltaY);
                }
            }
        }
        //Octant 5
        else if (x2 < x1 && y2 > y1){
            for(let x = x1; x > x2; x--){
                drawPixel(x,y1,color);
                if(pk >= 0) {
                    pk = pk + ((2 * deltaY) - (2 * deltaX));
                    y1++;
                }else{
                    pk = pk + (2 * deltaY);
                }
            }
        } 
    }
    //Octant 4


    let api = {
        clear: clear,
        drawPixel: drawPixel,
        drawLine: drawLine,
        get sizeX() { return pixelsX; },
        get sizeY() { return pixelsY; }
    };
    return api;
}(150, 150, true));
