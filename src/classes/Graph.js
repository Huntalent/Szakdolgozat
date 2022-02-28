/**
 * Syntax graph
 */
class Graph
{
    constructor()
    {
        this._lastGateId = 0;
        this._gates = {};
        this._rails = [];

        this._railDrawer = new RailDrawer();

        // TODO: Remove the sample gates!
        // this.addGate(new Gate("start", 40, 50));
        // this.addGate(new Gate("finish", 200, 50));
    }

    addGate(gate)
    {
        ++this._lastGateId;
        this._gates[this._lastGateId] = gate;
    }

    setGate(gateId, gate)
    {
        this._gates[gateId] = gate;
    }

    updateLastGateId()
    {
        this._lastGateId = 0;
        for (const k of Object.keys(this._gates)) {
            let gateId = parseInt(k);
            if (gateId > this._lastGateId) {
                this._lastGateId = gateId;
            }
        }
        console.log("Update gate id = " + this._lastGateId);
    }

    /**
     * Find a gate under the given position.
     * Returns null, when there is no gate at the given position.
     */
    findGateAt(position)
    {
        for (const [gateId, gate] of Object.entries(this._gates)) {
            var distance = gate.distance(position);
            if (distance < GATE_ICON_SIZE) {
                return gate;
            }
        }
        return null;
    }

    /**
     * Find the gate identifier.
     */
    findGateId(gate)
    {
        for (const [gateId, g] of Object.entries(this._gates)) {
            if (g == gate) {
                return gateId;
            }
        }
        return null;
    }

    /**
     * Add new rail to the graph.
     */
    addRail(sourceGateId, targetGateId)
    {
        this._rails.push([sourceGateId, targetGateId]);
    }

    /**
     * Toggle the rail between the gates.
     */
    toggleRail(sourceGate, targetGate)
    {
        let sourceGateId = this.findGateId(sourceGate);
        let targetGateId = this.findGateId(targetGate);
        let index = this.findRailIndex(sourceGateId, targetGateId);
        if (index == null) {
            this.addRail(sourceGateId, targetGateId);
        }
        else {
            this._rails.splice(index, 1);
        }
    }

    /**
     * Find the index of the rail between the given gates.
     */
    findRailIndex(sourceGateId, targetGateId)
    {
        for (let i = 0; i < this._rails.length; ++i) {
            let rail = this._rails[i];
            if (rail[0] == sourceGateId && rail[1] == targetGateId) {
                return i;
            }
        }
        return null;
    }

    draw(context)
    {
        this.drawRails(context);
        this.drawGates(context);
    }

    drawGates(context)
    {
        for (let gate of Object.values(this._gates)) {
            gate.draw(context);
        }
    }
    
    drawRails(context)
    {
        for (let rail of this._rails) {
            let sourceGate = this._gates[rail[0]];
            let targetGate = this._gates[rail[1]];
            let sourcePoint = new Point(sourceGate.x + 16, sourceGate.y);
            let targetPoint = new Point(targetGate.x - 16, targetGate.y);
            this._railDrawer.drawRail(context, sourcePoint, targetPoint);
        }
    }

    toSourceCode()
    {
        let source = "";
        source += "nodes\n";
        for (const [gateId, gate] of Object.entries(this._gates)) {
            let value = gate.value.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
            source += gateId + " "
                + gate.type + " "
                + "\"" + value + "\" " +
                + gate.x + " " + gate.y + "\n";
        }
        source += "edges\n";
        for (let rail of this._rails) {
            source += rail[0] + " " + rail[1] + "\n";
        }
        return source;
    }
}
