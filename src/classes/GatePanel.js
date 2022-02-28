/**
 * Gate toolbar panel
 */
class GatePanel extends Panel
{
    constructor(x, y, width, height)
    {
        super(x, y, width, height);
        this._gates = []
        this.createGateIcons();
    }

    createGateIcons()
    {
        for (let i = 0; i < 10; ++i) {
            let gate = new Gate(GATE_TYPES[i], i * 48 + 12 + 16, 26);
            this._gates.push(gate);
        }
    }

    onMouseDown(mouseEvent)
    {
        let i = Math.floor((mouseEvent.x - 12) / 48);
        if (i >= 0 && i < 10) {
            editor.insertableGate = new Gate(GATE_TYPES[i], mouseEvent.x, mouseEvent.y);
        }
    }

    onMouseMove(mouseEvent)
    {
        if (editor.insertableGate != null) {
            editor.insertableGate.move(mouseEvent.x, mouseEvent.y);
        }
    }

    onMouseUp(mouseEvent)
    {
        editor.insertableGate = null;
    }

    draw(context)
    {
        super.draw(context);
        for (let gate of this._gates) {
            gate.draw(context);
        }

        if (editor.insertableGate != null) {
            editor.insertableGate.draw(context);
        }
    }
}

