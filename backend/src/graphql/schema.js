const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    artist(id: ID!): Artist,
    relatedArtists(id: ID!): [Artist],
    artists(ids: [ID!]!): [Artist],
    artistAlbums(id: ID!, market: String, limit: Int, offset: String, include_groups: String): [Album]
    artistTopTracks(id: ID!, market: String!): [Track]
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
  type External_ID {
    isrc: String
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
  },
  type Track {
    album: Album,
    artists: [Artist],
    disc_number: Int,
    duration_ms: Int,
    explicit: Boolean,
    external_ids: External_ID,
    external_urls: External_Urls
    href: String,
    id: ID,
    is_local: Boolean,
    is_playable: Boolean,
    name: String,
    popularity: Int,
    preview_url: String,
    track_number: Int,
    type: String,
    uri: String
  }
`);

module.exports = schema;