/**
 * Grammar
 */
class Grammar
{
    constructor()
    {
        this._graphs = {};
        this._graphOrder = [];
        // TODO: Manage the graph offsets!
    }

    get graphs()
    {
        return this._graphs;
    }

    get graphOrder()
    {
        return this._graphOrder;
    }

    calcGraphIndex(graph)
    {
        let index = 0;
        for (const name of this._graphOrder) {
            if (this._graphs[name] == graph) {
                return index;
            }
            ++index;
        }
        return null;
    }

    addGraph(name, graph)
    {
        // TODO: Check the name of the graph!
        this._graphs[name] = graph;
        this._graphOrder.push(name);
    }

    removeGraph(graph)
    {
        let index = 0;
        for (const name of this._graphOrder) {
            if (this._graphs[name] == graph) {
                delete this._graphs[name];
                this._graphOrder.splice(index, 1);
                return;
            }
            ++index;
        }
    }

    removeGraphByName(name)
    {
        // TODO: Check the name of the graph!
        delete this._graphs[name];
        let index = this._graphOrder.indexOf(name);
        if (index > -1) {
            this._graphOrder.splice(index, 1);
        }
    }

    /**
     * Convert to the source code of the grammar.
     */
    toSourceCode()
    {
        let source = "";
        for (const name of this._graphOrder) {
            source += "expression \"" + name + "\"\n";
            source += this._graphs[name].toSourceCode();
            source += "\n";
        }
        return source;
    }

    /**
     * Split the source code line of a gate into list of strings.
     */
    splitGateSourceLine(line)
    {
        // WARN: It does not handle many of the possible errors!
        let firstQuoteMarkIndex = 0;
        while (line[firstQuoteMarkIndex] != "\"") {
            ++firstQuoteMarkIndex;
        }
        let lastQuoteMarkIndex = line.length - 1;
        while (line[lastQuoteMarkIndex] != "\"") {
            --lastQuoteMarkIndex;
        }
        let value = line.slice(firstQuoteMarkIndex + 1, lastQuoteMarkIndex);
        value = value.replace(/\"/g, "\"").replace(/\\/g, "\\")
        let slices = line.split(" ");
        return [slices[0], slices[1], value, slices[slices.length - 2], slices[slices.length - 1]];
    }

    /**
     * Build the grammar from the source code.
     */
    fromSourceCode(source)
    {
        this._graphs = {};
        this._graphOrder = [];

        let name = null;
        let graph = null;

        for (const line of source.split("\n")) {
            const items = line.split(" ");
            if (items.length == 0) {
                // Ignore!
            }
            if (items.length == 1) {
                if (items[0] == "nodes") {
                }
                else if (items[0] == "edges") {
                }
                else {
                    // Invalid syntax!
                }
            }
            else if (items.length == 2) {
                if (items[0] == "expression") {
                    if (graph != null) {
                        graph.updateLastGateId();
                        this._graphs[name] = graph;
                        this._graphOrder.push(name);
                    }
                    name = items[1];
                    name = name.slice(1, name.length - 1);
                    graph = new Graph();
                }
                else {
                    let sourceId = parseInt(items[0]);
                    let targetId = parseInt(items[1]);
                    graph.addRail(sourceId, targetId);
                }
            }
            else {
                let slices = this.splitGateSourceLine(line);
                let gateId = parseInt(slices[0]);
                let type = slices[1];
                let value = slices[2];
                let x = parseInt(slices[3]);
                let y = parseInt(slices[4]);
                let gate = new Gate(type, x, y);
                gate.value = value;
                graph.setGate(gateId, gate);
            }
            console.log(items);
        }
        if (graph != null) {
            graph.updateLastGateId();
            this._graphs[name] = graph;
            this._graphOrder.push(name);
        }
    }
}
