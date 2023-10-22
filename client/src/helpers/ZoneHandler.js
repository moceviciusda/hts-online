export default class ZoneHandler {
    constructor(scene) {
        this.renderZone = (x, y, width, height) => {
            let dropZone = scene.add.zone(x, y, width, height).setRectangleDropZone(width, height)

            return dropZone
        }

        this.renderOutline = (dropZone, color) => {
            let dropZoneOutline = scene.add.rectangle(dropZone.x, dropZone.y, dropZone.displayWidth, dropZone.displayHeight).setStrokeStyle(4, color).setAngle(dropZone.angle)
            // dropZoneOutline.lineStyle(4, color)
            // dropZoneOutline.strokeRect(dropZone.x - dropZone.displayWidth/2, dropZone.y - dropZone.displayHeight/2, dropZone.displayWidth, dropZone.displayHeight) //.setAngle(dropZone.angle)

            return dropZoneOutline
        }
    }
}