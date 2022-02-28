HTML Canvas
===========

Create a canvas
---------------

.. code-block:: html

   <html lang="en">
     <head>
       <meta charset="utf-8" />
     </head>
     <style>
     </style>
     <script>
     var canvas = null;
     var canvasPosition = null;
     var context = null;

     function calcMouseEvent(event)
     {
        return {
          x: event.clientX - canvasPosition.left,
          y: event.clientY - canvasPosition.top,
          button: event.button
        };
     }

     function mouseDown(event)
     {
       const mouse = calcMouseEvent(event);
       console.log("Click at (" + event.x + ", " + event.y + ")");
       draw();
     }

     function mouseMove(event)
     {
       const mouse = calcMouseEvent(event);
     }

     function mouseUp(event)
     {
       const mouse = calcMouseEvent(event);
     }

     function mouseWheel(event)
     {
       const mouse = calcMouseEvent(event);
       const delta = event.wheelDelta;
       event.preventDefault();
     }

     function draw()
     {
       context.fillStyle = "blue";
       context.fillRect(50, 60, 40, 40);
     }

     function initialize()
     {
       canvas = document.getElementById("my-canvas");
       canvasPosition = canvas.getBoundingClientRect();
       context = canvas.getContext("2d");
       canvas.addEventListener("mousedown", mouseDown, false);
       canvas.addEventListener("mousemove", mouseMove, false);
       canvas.addEventListener("mouseup", mouseUp, false);
       canvas.addEventListener("mousewheel", mouseWheel, false);
     }
     </script>
     <body onload="initialize()">
       <canvas id="my-canvas" width="800" height="600">
       </canvas>
     </body>
   </html>


The ``button`` is an integer value.

* 0: left button
* 1: middle button
* 2: right button

For disabling right click context menu add the following line to the event listeners.

.. code-block:: javascript

   canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); });


Background color or image
-------------------------

.. code-block:: css

   canvas#my-canvas {
     background-color: #800;
     background-image: url('background.png');
   }


Drawing methods
---------------

Clear the canvas

.. code-block:: javascript

   context.clearRect(0, 0, canvas.width, canvas.height);


Draw lines

.. code-block:: javascript

   context.beginPath();
   context.moveTo(10, 20);
   context.lineTo(50, 60);
   context.stroke()


Draw rectangles

.. code-block:: javascript

   context.beginPath();
   context.lineWidth = 6;
   context.strokeStyle = "blue";
   context.rect(10, 20, 300, 200);
   context.stroke();

   context.fillStyle = "yellow";
   context.fillRect(50, 60, 10, 10);


Draw circles

.. code-block:: javascript

   context.beginPath();
   context.arc(200, 100, 50, 0, 2 * Math.PI);
   context.stroke();


Draw images

.. code-block:: javascript

   var image = document.getElementById("image");
   context.drawImage(image, 10, 20, 300, 200);


Draw text

.. code-block:: javascript

   context.font = "24px Georgia";
   context.fillText("Text!", 20, 30);


Some web safe fonts

* ``serif``: Georgia, Palatino, Times
* ``sans-serif``: Arial, Gadget, Impact, Tahoma, Helvetica, Verdana
* ``monospace``: Courier, Monaco


Keyboard events
---------------

.. code-block:: javascript

   function keyDown(event)
   {
   }

   function keyUp(event)
   {
   }

   window.addEventListener("keydown", keyDown, false);
   window.addEventListener("keyup", keyUp, false);


Some useful attributes of the key events:

* ``altKey``, ``ctrlKey``, ``shiftKey``: status of the modifier keys,
* ``code``: unique code of the key,
* ``key``: the represented character,
* ``keyCode``: identifier of the key as an integer value,
* ``repeat``: signs that whether the key is autorepeated or not.


Animation
---------

The second parameter of the ``setInterval`` method is the elapsed time between the ``timerEvent`` function calls in milliseconds.

.. code-block:: javascript

   function timerEvent()
   {
   }

   // to the initialization
   window.setInterval(timerEvent, 100);
