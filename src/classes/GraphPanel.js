/**
 * Graph drawing panel
 */
class GraphPanel extends Panel
{
    constructor(x, y, width, height)
    {
        super(x, y, width, height);
    }

    onMouseDown(mouseEvent)
    {
        if (editor.selectedGraph == null) {
            return;
        }

        let gate = editor.selectedGraph.findGateAt(mouseEvent);
        editor.selectedGate = gate;
        if (gate != null) {
            editor.lastSelections.push(gate);
            if (editor.lastSelections.length == 3) {
                editor.lastSelections.shift();
            }
        }
        else {
            editor.lastSelections.pop();
        }
    }

    onMouseMove(mouseEvent)
    {
        if (editor.selectedGraph == null) {
            return;
        }

        if (editor.insertableGate != null) {
            editor.selectedGraph.addGate(editor.insertableGate);
            editor.selectedGate = editor.insertableGate;
            editor.selectedGate.move(mouseEvent.x, mouseEvent.y);
            editor.insertableGate = null;
        }

        if (editor.selectedGate != null) {
            editor.selectedGate.move(mouseEvent.x, mouseEvent.y);
        }
    }

    onMouseUp(mouseEvent)
    {
        editor.selectedGate = null;
    }

    editGateValue()
    {
        if (editor.lastSelections.length == 1) {
            let gate = editor.lastSelections[0];
            let value = prompt("Gate value", gate.value);
            if (value != null) {
                gate.value = value;
            }
        }
    }

    toggleRail()
    {
        if (editor.lastSelections.length == 2) {
            let sourceGate = editor.lastSelections[0];
            let targetGate = editor.lastSelections[1];
            editor.selectedGraph.toggleRail(sourceGate, targetGate);
        }
    }

    clearSelection()
    {
        editor.lastSelections = [];
    }

    draw(context)
    {
        super.draw(context);
        this.drawEdgeSelectors(context);
        if (editor.selectedGraph != null) {
            editor.selectedGraph.draw(context);
        }
    }

    drawEdgeSelectors(context)
    {
        if (editor.lastSelections.length == 1) {
            this.drawGateSelector(context, editor.lastSelections[0]);
        }
        if (editor.lastSelections.length == 2) {
            this.drawSourceSelector(context, editor.lastSelections[0]);
            this.drawTargetSelector(context, editor.lastSelections[1]);
        }
    }

    drawGateSelector(context, gate)
    {
        context.fillStyle = "#0F0";
        context.beginPath();
        context.arc(gate.x, gate.y, 20, 0, 2 * Math.PI);
        context.fill();
    }

    drawSourceSelector(context, gate)
    {
        context.fillStyle = "#0F0";
        context.fillRect(gate.x, gate.y - 10, 20, 20);
    }

    drawTargetSelector(context, gate)
    {
        context.fillStyle = "#0F0";
        context.fillRect(gate.x - 20, gate.y - 10, 20, 20);
    }
}

