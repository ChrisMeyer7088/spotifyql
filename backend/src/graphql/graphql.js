const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    artist(id: ID!): Artist
  },
  enum SpotifyTypes {
    ARTIST,
    ALBUM
  },
  type Image {
    height: Int,
    width: Int,
    url: String
  },
  type Artist {
    id: ID,
    followers: Int,
    genres: [String],
    href: String,
    images: Image,
    name: String,
    popularity: Int,
    type: SpotifyTypes,
    uri: String
  },
`);

const getArtistById = function(args) {
  return {
    "followers": 5202567,
    "genres": [
      "adult standards",
      "rock-and-roll",
      "rockabilly"
    ],
    "href": "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE",
    "id": "43ZHCT0cAZBISjO8DG9PnE",
    "images": [
      {
        "height": 640,
        "url": "https://i.scdn.co/image/5629fbf1c4e0bc4155eca3e08a2b98065eedd305",
        "width": 640
      },
      {
        "height": 320,
        "url": "https://i.scdn.co/image/de7df722a14208c879f169e26bd7792a9902c7ba",
        "width": 320
      },
      {
        "height": 160,
        "url": "https://i.scdn.co/image/11386c4abb5bdf71a86862cdb1a5390f37a7d8a5",
        "width": 160
      }
    ],
    "name": "Elvis Presley",
    "popularity": 82,
    "type": "artist",
    "uri": "spotify:artist:43ZHCT0cAZBISjO8DG9PnE"
  }
};

const root = {
  artist: getArtistById,
};

module.exports = {
  root,
  schema
};