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

        //
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
    function drawLine(x1, y1, x2, y2, color) {
        
        if(Math.abs(x1 - x2) < Math.abs(y1-y2)){
           let swap1 = y1;
           let swap2 = y2;
           y1 = x1;
           y2 = x2;
           x1 = swap1;
           x2 = swap2;
        }
        if (x1 > x2) {
           let swap1 = x1;
           let swap2 = y1;
           x1 = x2;
           y1 = y2;
           x2 = swap1;
           y2 = swap2;
        }
        let x_k = x1;
        let y_k = y1;
        let m = (y2 - y1)/(x2 - x1);
        let b = y1 - (m * x1);
        let deltaX = x2 - x1;
        let deltaY = y2 - y1;
        let c = (2*deltaY) + (deltaX*(2*b - 1));
        let pk = (2 * deltaY * x_k) - (2*deltaX * y_k) + c;
        while(x_k != x2){
            if(pk >= 0) {
                drawPixel(x_k,y_k + 1,color);
                pk = pk + (2 * deltaY) - (2 * deltaX);
                if (y2 > y1){
                    y_k++;
                }else{
                    y_k--;
                }
            }else{
                drawPixel(x_k,y_k,color);
                pk = pk + (2 * deltaY);
            }
            x_k++;
        }
    }

    let api = {
        clear: clear,
        drawPixel: drawPixel,
        drawLine: drawLine,
        get sizeX() { return pixelsX; },
        get sizeY() { return pixelsY; }
    };
    return api;
}(150, 150, true));
