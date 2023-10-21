export default class ZoneHandler {
    constructor(scene) {
        this.renderZone = (x, y, width, height) => {
            let dropZone = scene.add.zone(x, y, width, height).setRectangleDropZone(width, height)

            return dropZone
        }

        this.renderOutline = (dropZone, Color) => {
            let dropZoneOutline = scene.add.graphics()
            dropZoneOutline.lineStyle(4, Color)
            dropZoneOutline.strokeRect(dropZone.x - dropZone.displayWidth/2, dropZone.y - dropZone.displayHeight/2, dropZone.displayWidth, dropZone.displayHeight)
            
            return dropZoneOutline
        }
    }
}