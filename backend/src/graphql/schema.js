const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    artist(id: ID!): Artist,
    artists(ids: [ID!]!): [Artist],
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
  type Followers {
    href: String,
    total: Int
  },
  type Artist {
    id: ID,
    followers: Followers,
    genres: [String],
    href: String,
    images: Image,
    name: String,
    popularity: Int,
    type: SpotifyTypes,
    uri: String
  },
`);

module.exports = schema;