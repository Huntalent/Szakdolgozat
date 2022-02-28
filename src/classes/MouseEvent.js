/**
 * Mouse event
 */
class MouseEvent extends Point
{
    constructor(x, y, button)
    {
        super(x, y);
        this._button = button;
    }

    get button() { return this._button; }
}

