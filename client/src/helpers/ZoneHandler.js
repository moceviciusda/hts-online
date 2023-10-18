export default class ZoneHandler {
    constructor(scene) {
        this.renderZone = (x, y, width, height) => {
            let dropZone = scene.add.zone(x, y, width, height).setRectangleDropZone(width, height)
            dropZone.setData({
                // 'opponentSummonable': false,
                // 'playerSummonable': false,
                'cards': []
            })
            return dropZone
        }
        this.renderOutline = (dropZone, Color) => {
            let dropZoneOutline = scene.add.graphics()
            dropZoneOutline.lineStyle(4, Color)
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width/2, dropZone.y - dropZone.input.hitArea.height/2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
            return dropZoneOutline
        }
    }
}