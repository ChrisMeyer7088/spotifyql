const artist = require('./artist')
const album = require('./album')
const track = require('./track')
const market = require('./market')

const root = {}

Object.assign(root, artist)
Object.assign(root, album)
Object.assign(root, track)
Object.assign(root, market)

module.exports = root
