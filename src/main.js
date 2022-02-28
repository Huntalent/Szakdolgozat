var canvas = null;
var canvasPosition = null;
var context = null;

var editor = null;

function calcMouseEvent(event)
{
    let x = event.clientX - canvasPosition.left;
    let y = event.clientY - canvasPosition.top;
    let button = event.button;
    return new MouseEvent(x, y, button);
}

function mouseDown(event)
{
    var mouseEvent = calcMouseEvent(event);
    editor.onMouseDown(mouseEvent);
}

function mouseMove(event)
{
    var mouseEvent = calcMouseEvent(event);
    editor.onMouseMove(mouseEvent);
}

function mouseUp(event)
{
    var mouseEvent = calcMouseEvent(event);
    editor.onMouseUp(mouseEvent);
}

function keyDown(event)
{
    editor.onKeyDown(event);
}

function initialize()
{
    editor = new Editor();

    canvas = document.getElementById("my-canvas");
    canvasPosition = canvas.getBoundingClientRect();
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseMove, false);
    canvas.addEventListener("mouseup", mouseUp, false);
    window.addEventListener("keydown", keyDown, false);
    context = canvas.getContext("2d");

    Gate.gateImage = document.getElementById("gate-image");

    editor.context = context;
    resize();
}

function resize()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    editor.resize(canvas.width, canvas.height);
}

function showSourceCode()
{
    let source = editor.grammar.toSourceCode();
    let sourceDiv = document.getElementById("source-div");
    let sourceText = document.getElementById("source-text");

    sourceText.value = source;
    canvas.style.display = "none";
    sourceDiv.style.display = "block";
}

function showEditor()
{
    editor.selectedGraph = null;
    editor.draw();
    document.getElementById("source-div").style.display = "none";
    document.getElementById("my-canvas").style.display = "block";
}

function loadGrammar()
{
    let sourceText = document.getElementById("source-text");
    let source = sourceText.value;
    editor.grammar.fromSourceCode(source);
    // TODO: Check that the parsing process were successful!
    showEditor();
}
