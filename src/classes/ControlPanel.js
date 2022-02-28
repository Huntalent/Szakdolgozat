/**
 * Control panel
 */
class ControlPanel extends Panel
{
    constructor(x, y, width, height)
    {
        super(x, y, width, height);
    }
    
    onMouseDown(mouseEvent)
    {
        console.log("Control panel :: (" + mouseEvent.x + ", " + mouseEvent.y + ")");
        if (mouseEvent.y < 50) {
            if (mouseEvent.x < 75) {
                this.addGraph();
            }
            else {
                this.removeGraph();
            }
        }
        else {
            showSourceCode();
        }
    }

    onMouseMove(mouseEvent)
    {
    }

    onMouseUp(mouseEvent)
    {
    }

    addGraph()
    {
        let name = prompt("Graph name");
        if (name != null && name != "") {
            editor.createNewGraph(name);
        }
    }

    removeGraph()
    {
        if (window.confirm("Do you want to remove the selected graph?") == true) {
            editor.grammar.removeGraph(editor.selectedGraph);
            editor.selectedGraph = null;
        }
    }

    draw(context)
    {
        super.draw(context);
        context.fillStyle = "#888";
        context.fillRect(10, 10, 60, 30);
        context.fillRect(80, 10, 60, 30);
        context.fillStyle = "#FFF";
        context.font = "20px Verdana";
        context.textAlign = "center";
        context.fillText("+", 40, 30);
        context.fillText("-", 110, 30);
    }
}

