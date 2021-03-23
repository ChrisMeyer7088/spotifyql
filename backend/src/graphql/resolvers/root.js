const artist = require('./artist')
const album = require('./album')
const track = require('./track')
const market = require('./market')
const user = require('./user')
const browse = require('./browse')

const root = {}

Object.assign(root, artist)
Object.assign(root, album)
Object.assign(root, track)
Object.assign(root, market)
Object.assign(root, user)
Object.assign(root, browse)

module.exports = root
