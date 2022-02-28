const GATE_TYPES = [
    "start",
    "finish",
    "connection",
    "expression",
    "info",
    "error",
    "output",
    "token",
    "default",
    "assign"
];

const GATE_ICON_SIZE = 32;

/**
 * Gate
 */
class Gate extends Point
{
    constructor(type, x, y)
    {
        super(x, y);
        // TODO: Check that the type is in the possible types!
        this.type = type;
        this.value = "";
    }

    get type()
    {
        return this._type;
    }
    
    set type(t)
    {
        this._type = t;
    }

    get value()
    {
        return this._value;
    }

    set value(v)
    {
        this._value = v;
    }
    
    draw(context)
    {
        let iconIndex = GATE_TYPES.indexOf(this.type);
        if (iconIndex >= 0) {
            context.drawImage(Gate.gateImage,
                iconIndex * GATE_ICON_SIZE, 0, GATE_ICON_SIZE, GATE_ICON_SIZE,
                this.x - GATE_ICON_SIZE / 2, this.y - GATE_ICON_SIZE / 2, GATE_ICON_SIZE, GATE_ICON_SIZE
            );
            context.font = "16px Verdana";
            if (this.type != "error") {
                context.textAlign = "center";
                context.fillStyle = "#028";
                context.fillText(this.value, this.x, this.y + 36);
            }
            else {
                context.textAlign = "left";
                context.fillStyle = "#800";
                context.fillText(this.value, this.x - 40, this.y + 36);
            }
        }
    }
}
