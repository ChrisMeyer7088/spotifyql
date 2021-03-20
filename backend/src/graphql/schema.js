const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    artist(id: ID!): Artist,
    relatedArtists(id: ID!): [Artist],
    artists(ids: [ID!]!): [Artist],
    artistAlbums(id: ID!, market: String, limit: Int, offset: String, include_groups: String): [Album]
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
  type External_Urls {
    spotify: String,
  },
  type Artist {
    id: ID,
    external_urls: External_Urls,
    followers: Followers,
    genres: [String],
    href: String,
    images: [Image],
    name: String,
    popularity: Int,
    type: String,
    uri: String
  },
  type Album {
    id: ID,
    album_group: String,
    album_type: String,
    artists: [Artist],
    external_urls: External_Urls,
    href: String,
    images: [Image],
    name: String,
    release_date: String,
    release_date_precision: String,
    total_tracks: Int,
    type: String,
    uri: String
  }
`);

module.exports = schema;