const artist = require('./artist')
const album = require('./album')
const track = require('./track')

const root = {}

Object.assign(root, artist)
Object.assign(root, album)
Object.assign(root, track)

module.exports = root
