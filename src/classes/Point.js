/**
 * Two dimensional point
 */
class Point
{
    constructor(x, y)
    {
        this.move(x, y);
    }
    
    get x()
    {
        return this._x;
    }

    get y()
    {
        return this._y;
    }

    move(x, y)
    {
        this._x = x;
        this._y = y;
    }
    
    translate(dx, dy)
    {
        this._x += dx;
        this._y += dy;
    }
    
    distance(other)
    {
        let dx = other.x - this._x;
        let dy = other.y - this._y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }
}

