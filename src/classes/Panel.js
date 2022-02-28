/**
 * Represent a rectangular-shaped graphical control area.
 */
class Panel
{
    /**
     * Construct a new panel.
     */
    constructor(x, y, width, height)
    {
        this.resize(x, y, width, height);
        this._backgroundColor = "#FFF";
    }

    get x() { return this._x; }
    get y() { return this._y; }
    get width() { return this._width; }
    get height() { return this._height; }
    get backgroundColor() { return this._backgroundColor; }

    /**
     * Resize the panel.
     */
    resize(x, y, width, height)
    {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }    

    set backgroundColor(color)
    {
        this._backgroundColor = color;
    }

    onMouseDown(mouseEvent)
    {
        console.log("(" + mouseEvent.x + ", " + mouseEvent.y + ")");
    }

    /**
     * Draw the content of the panel.
     */
    draw(context)
    {
        context.fillStyle = this.backgroundColor;
        context.fillRect(0, 0, this.width, this.height);
    }
}

