const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    artist(id: ID!): Artist,
    relatedArtists(id: ID!): [Artist],
    artists(ids: [ID!]!): [Artist],
    artistAlbums(id: ID!, market: String, limit: Int, offset: String, include_groups: String): [Album],
    artistTopTracks(id: ID!, market: String!): [Track],
    albums(ids: [ID]!, market: String): [Album],
    album(id: ID!, market: String): Album,
    albumTracks(id: ID!, market: String, limit: Int, offset: Int): [Track],
    track(id: ID!, market: String): Track,
    tracks(ids: [ID]!, market: String): [Track],
    trackAudioFeature(id: ID!): AudioFeature,
    tracksAudioFeatures(ids: [ID]!): [AudioFeature],
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
    id: ID!,
    name: String!,
    external_urls: External_Urls,
    followers: Followers,
    genres: [String],
    href: String,
    images: [Image],
    popularity: Int,
    type: String,
    uri: String
  },
  type Album {
    id: ID!,
    name: String!,
    album_group: String,
    album_type: String,
    artists: [Artist],
    external_urls: External_Urls,
    href: String,
    images: [Image],
    release_date: String,
    release_date_precision: String,
    total_tracks: Int,
    type: String,
    uri: String
  },
  type Track {
    id: ID!,
    name: String!,
    album: Album,
    artists: [Artist],
    disc_number: Int,
    duration_ms: Int,
    explicit: Boolean,
    external_ids: External_ID,
    external_urls: External_Urls
    href: String,
    is_local: Boolean,
    is_playable: Boolean,
    popularity: Int,
    preview_url: String,
    track_number: Int,
    type: String,
    uri: String,
    available_markets: [String],
  },
  type AudioFeature {
    id: ID!,
    danceability: Float,
    energy: Float,
    key: Int,
    loudness: Float,
    mode: Int,
    speechiness: Float,
    acousticness: Float,
    instrumentalness: Float,
    liveness: Float,
    valence: Float,
    tempo: Float,
    type: String,
    uri: String,
    track_href: String,
    analysis_url: String,
    duration_ms: Int,
    time_signature: Int,
  }
`);

module.exports = schema;
