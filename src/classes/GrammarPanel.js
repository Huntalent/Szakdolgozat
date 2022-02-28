/**
 * Grammar selection panel
 */
class GrammarPanel extends Panel
{
    constructor(x, y, width, height)
    {
        super(x, y, width, height);
        this._rowHeight = 30;
        this._rowOffset = 0;
    }

    onMouseDown(mouseEvent)
    {
        let rowIndex = this.calcRowIndex(mouseEvent);
        console.log("Row index: " + rowIndex);
        if (rowIndex != null) {
            let name = editor.grammar.graphOrder[rowIndex];
            editor.selectGraphByName(name);
        }
    }

    onMouseMove(mouseEvent)
    {
    }

    onMouseUp(mouseEvent)
    {
    }

    /**
     * Calculate the index of the row under the mouse cursor.
     * Returns null, when there is no row under the cursor.
     */
    calcRowIndex(mouseEvent)
    {
        let rowIndex = Math.floor((mouseEvent.y - this._rowOffset) / this._rowHeight);
        if (rowIndex >= 0 && rowIndex < editor.grammar.graphOrder.length) {
            return rowIndex;
        }
        return null;
    }

    draw(context)
    {
        super.draw(context);
        this.drawSelection(context);
        this.drawGraphNames(context);
    }

    drawSelection(context)
    {
        context.fillStyle = "#FFF";
        let rowIndex = editor.grammar.calcGraphIndex(editor.selectedGraph);
        if (rowIndex != null) {
            let y = this._rowOffset + rowIndex * this._rowHeight;
            context.fillRect(0, y, this.width, this._rowHeight);
        }
    }

    drawGraphNames(context)
    {
        context.font = "16px Verdana";
        context.fillStyle = "#000";
        context.textAlign = "left";
        let y = this._rowOffset;
        for (const name of editor.grammar.graphOrder) {
            context.fillText(name, 20, y + 20);
            y += this._rowHeight;
        }
    }
}

