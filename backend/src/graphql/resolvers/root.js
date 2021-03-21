const artist = require('./artist')
const album = require('./album')

const root = {}

Object.assign(root, artist)
Object.assign(root, album)

module.exports = root