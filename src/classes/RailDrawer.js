/**
 * Helper class for drawing rails
 */
class RailDrawer
{
    constructor()
    {
        this._curviness = 40;
    }

    drawRail(context, sourcePoint, targetPoint)
    {
        let distanceX = targetPoint.x - sourcePoint.x;
        let distanceY = targetPoint.y - sourcePoint.y;
        if (distanceX > this._curviness) {
            this.drawStepCurve(context, sourcePoint, targetPoint);
        }
        else {
            if (Math.abs(distanceY) < this._curviness) {
                this.drawShoeCurve(context, sourcePoint, targetPoint, this._curviness);
            }
            else {
                this.drawZigzagCurve(context, sourcePoint, targetPoint, this._curviness);
            }
        }
    }

    drawStepCurve(context, sourcePoint, targetPoint)
    {
        let middleX = (sourcePoint.x + targetPoint.x) / 2;
        context.beginPath();
        context.moveTo(sourcePoint.x, sourcePoint.y);
        context.bezierCurveTo(
            middleX, sourcePoint.y,
            middleX, targetPoint.y,
            targetPoint.x, targetPoint.y
        );
        context.stroke();
    }

    drawShoeCurve(context, sourcePoint, targetPoint)
    {
        let middleX = (sourcePoint.x + targetPoint.x) / 2;
        let sourceSideX = sourcePoint.x + this._curviness;
        let targetSideX = targetPoint.x - this._curviness;
        let supportY = targetPoint.y;
        if (sourcePoint.y < targetPoint.y) {
            supportY += this._curviness;
        }
        else {
            supportY -= this._curviness;
        }
        context.beginPath();
        context.moveTo(sourcePoint.x, sourcePoint.y);
        context.bezierCurveTo(
            sourceSideX, sourcePoint.y,
            sourceSideX, supportY,
            middleX, supportY
        );
        context.bezierCurveTo(
            targetSideX, supportY,
            targetSideX, targetPoint.y,
            targetPoint.x, targetPoint.y
        );
        context.stroke();
    }

    drawZigzagCurve(context, sourcePoint, targetPoint)
    {
        let middleX = (sourcePoint.x + targetPoint.x) / 2;
        let middleY = (sourcePoint.y + targetPoint.y) / 2;
        let sourceSideX = sourcePoint.x + this._curviness;
        let targetSideX = targetPoint.x - this._curviness;
        context.beginPath();
        context.moveTo(sourcePoint.x, sourcePoint.y);
        context.bezierCurveTo(
            sourceSideX, sourcePoint.y,
            sourceSideX, (sourcePoint.y + middleY) / 2,
            middleX, middleY
        );
        context.bezierCurveTo(
            targetSideX, (targetPoint.y + middleY) / 2,
            targetSideX, targetPoint.y,
            targetPoint.x, targetPoint.y
        );
        context.stroke();
    }
}

