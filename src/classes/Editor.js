const SIDE_PANEL_WIDTH = 240;
const TOOLBAR_HEIGHT = 48;
const CONTROL_PANEL_HEIGHT = 100;

/**
 * Graph editor with controllers
 */
class Editor
{
    constructor()
    {
        this._width = 0;
        this._height = 0;

        this.createPanels();

        this._grammar = new Grammar();

        this._selectedGraph = null;
        this._insertableGate = null;
        this._selectedGate = null;
        this._lastSelections = [];
    }

    createPanels()
    {
        this._panels = {
            "gate": new GatePanel(0, 0, 0, 0),
            "graph": new GraphPanel(0, 0, 0, 0),
            "grammar": new GrammarPanel(0, 0, 0, 0),
            "control": new ControlPanel(0, 0, 0, 0)
        }
        this._panels["gate"].backgroundColor = "#EEE";
        this._panels["graph"].backgroundColor = "#FFF";
        this._panels["grammar"].backgroundColor = "#DDD";
        this._panels["control"].backgroundColor = "#CCC";
    }

    get grammar()
    {
        return this._grammar;
    }

    set grammar(grammar)
    {
        this._grammar = grammar;
    }

    selectGraphByName(name)
    {
        // TODO: Check tha name!
        this._selectedGraph = this.grammar.graphs[name];
        this._selectedGate = null;
        this._lastSelections = [];
    }

    get selectedGraph()
    {
        return this._selectedGraph;
    }

    set selectedGraph(graph)
    {
        this._selectedGraph = graph;
    }

    get insertableGate()
    {
        return this._insertableGate;
    }
    
    set insertableGate(gate)
    {
        this._insertableGate = gate;
    }

    get selectedGate()
    {
        return this._selectedGate;
    }

    set selectedGate(gate)
    {
        this._selectedGate = gate;
    }

    get lastSelections()
    {
        return this._lastSelections;
    }

    set context(context)
    {
        this._context = context;
    }

    /**
     * Create a new graph.
     */
    createNewGraph(name)
    {
        let graph = new Graph();
        this.grammar.addGraph(name, graph);
        this.selectGraphByName(name);
    }

    /**
     * Resize the editor.
     */
    resize(width, height)
    {
        this._width = width;
        this._height = height;
        this.updatePanels(width, height);
        this.draw(this._context);
    }

    /**
     * Handle mouse down event.
     */
    onMouseDown(mouseEvent)
    {
        var panel = this.findPanelAt(mouseEvent);
        let dx = -panel.x;
        let dy = -panel.y;
        mouseEvent.translate(dx, dy);
        panel.onMouseDown(mouseEvent);

        // WARN: It is not necessarily the most efficient way of updating the content!
        this.draw();
    }

    /**
     * Handle mouse move event.
     */
    onMouseMove(mouseEvent)
    {
        var panel = this.findPanelAt(mouseEvent);
        let dx = -panel.x;
        let dy = -panel.y;
        mouseEvent.translate(dx, dy);
        panel.onMouseMove(mouseEvent);
        
        // WARN: It is not necessarily the most efficient way of updating the content!
        this.draw();
    }

    /**
     * Handle mouse up event.
     */
    onMouseUp(mouseEvent)
    {
        var panel = this.findPanelAt(mouseEvent);
        let dx = -panel.x;
        let dy = -panel.y;
        mouseEvent.translate(dx, dy);
        panel.onMouseUp(mouseEvent);
        this.draw();
    }

    /**
     * Handle key down event.
     */
    onKeyDown(event)
    {
        console.log("key = '" + event.key + "'");
        if (event.key == "Enter" || event.key == "e") {
            this._panels["graph"].editGateValue();
            this.draw();
        }
        if (event.key == " ") {
            this._panels["graph"].toggleRail();
            this.draw();
        }
        if (event.key == "Escape") {
            this._panels["graph"].clearSelection();
            this.draw();
        }
    }

    /**
     * Find the child panel at the given position.
     */
    findPanelAt(point)
    {
        if (point.x < SIDE_PANEL_WIDTH) {
            if (point.y < this._height - CONTROL_PANEL_HEIGHT) {
                return this._panels["grammar"];
            }
            else {
                return this._panels["control"];
            }
        }
        else {
            if (point.y < TOOLBAR_HEIGHT) {
                return this._panels["gate"];
            }
            else {
                return this._panels["graph"];
            }
        }
    }

    /**
     * Update the positions of the panels.
     */
    updatePanels(width, height)
    {
        this._panels["gate"].resize(
            SIDE_PANEL_WIDTH,
            0,
            width - SIDE_PANEL_WIDTH,
            TOOLBAR_HEIGHT);
        this._panels["graph"].resize(
            SIDE_PANEL_WIDTH,
            TOOLBAR_HEIGHT,
            width - SIDE_PANEL_WIDTH,
            height - TOOLBAR_HEIGHT);
        this._panels["grammar"].resize(
            0,
            0,
            SIDE_PANEL_WIDTH,
            height - CONTROL_PANEL_HEIGHT);
        this._panels["control"].resize(
            0,
            height - CONTROL_PANEL_HEIGHT,
            SIDE_PANEL_WIDTH,
            CONTROL_PANEL_HEIGHT);
    }

    draw()
    {
        this._context.clearRect(0, 0, this._width, this._height);
        this.drawPanels(this._context);
    }

    /**
     * Draw the panels.
     */
    drawPanels(context)
    {
        for (var panel of Object.values(this._panels)) {
            context.save();
            context.translate(panel.x, panel.y);
            panel.draw(context);
            context.restore();
        }
    }
}

