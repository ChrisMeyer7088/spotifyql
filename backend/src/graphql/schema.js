const { buildSchema } = require("graphql");

const schema = buildSchema(`
  "Operations for retrieving server-side information from spotify."
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
    markets: [String],
    user(user_id: ID!): User,
    me: User,
    browseNewReleases(country: String, limit: Int, offset: Int): BrowseAlbum,
    browseFeaturedPlaylists(country: String, locale: String, timestamp: String, limit: Int, offset: Int): BrowsePlaylist,
    browseCategoryPlaylists(category_id: ID!, country: String, limit: Int, offset: Int): BrowsePlaylist,
    getCategory(category_id: ID!, country: String, locale: String): Category,
    getCategories(country: String, locale: String, limit: Int, offset: Int): BrowseCategories,
    genres: [String],
    show(id: ID!, market: String): Show,
    shows(ids: [ID]!, market: String): [Show],
    showEpisodes(id: ID!, market: String, limit: Int, offset: Int): BrowseEpisode,
    search(q: String!, type: [String!]!, market: String, limit: Int, offset: Int): Search,
    episode(id: ID!, market: String): Episode,
    episodes(ids: [ID]!, market: String): [Episode],
    topArtists(time_range: String, limit: Int, offset: Int): BrowseArtist,
    topTracks(time_range: String, limit: Int, offset: Int): BrowseTrack,
    playlists(limit: Int, offset: Int): BrowsePlaylist,
    playlist(playlist_id: ID!, market: String): Playlist,
    playlistImages(playlist_id: ID!): [Image],
    playlistTracks(playlist_id: ID!, market: String!, limit: Int, offset: Int): BrowseTrack,
    userPlaylists(user_id: ID!, limit: Int, offset: Int): BrowsePlaylist,
    
    "Gets followed artist."
    myArtists(after: ID, limit: Int): BrowseArtist,

    "Check if current user follows artists."
    followsArtists(ids: [ID!]!): [Boolean],

    "Check if current user follows users."
    followsUsers(ids: [ID!]!): [Boolean],

    "Check if users follows a playlist."
    followsPlaylist(ids: [ID!]!, playlist_id: ID!): [Boolean],

    "Gets current player information."
    player(market: ID, additional_types: [String]): Player,
    
    "Get's available devices."
    devices: [Device],

    "Get's currently playing track."
    currentTrack(market: String!, additional_types: [String]): Player,

    "Get's recently played track."
    recentlyPlayed(limit: Int, after: ID, before: ID): [RecentlyPlayed],
  },
  """
  Operations for creating, updating and deleting server-side information. 
  
  Will require the appropriate scopes, for more information on spotify scopes visit: https://developer.spotify.com/documentation/general/guides/scopes/
  """
  type Mutation {
    "Creates an empty playlist for the given user."
    createPlaylist(user_id: ID!, name: String, public: Boolean, collaborative: Boolean, description: String): Playlist,
    
    """
    Adds tracks to a given playlist via spotify uris.
    
    For more information on spotify types visit: https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids
    """
    addToPlaylist(playlist_id: ID!, position: Int, uris: [String]): Snapshot,
    
    "Changes a playlist details, returns operation status code."
    changePlaylist(playlist_id: ID!, name: String, public: Boolean, collaborative: Boolean, description: String): String,

    "Reorders a playlist's tracks."
    reorderPlaylist(playlist_id: ID!, uris: [String], range_start: Int, inset_before: Int, ranger_length: Int): Snapshot,

    """
    Remove tracks from a given playlist via spotify uris.
    
    For more information on spotify types visit: https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids
    """
    removePlaylistTracks(playlist_id: ID!, uris: [String]): Snapshot,

    "Follows a given array of users."
    followUsers(ids: [ID!]!): String,

    "Follows a given array of artist."
    followArtists(ids: [ID!]!): String,

    "Follows a given playlist."
    followPlaylist(playlist_id: ID!, public: Boolean): String,

    "Unfollows given users."
    unfollowUsers(ids: [ID!]!): String,

    "Unfollows given artist."
    unfollowArtists(ids: [ID!]!): String,

    "Unfollows given playlist."
    unfollowPlaylist(playlist_id: ID!): String,

    "Plays the next track on a given device."
    nextTrack(device_id: ID!): String,

    "Plays the previous track on a given device."
    previousTrack(device_id: ID!): String,

    "Plays a track to the end of the playback queue."
    addToQueue(uri: String!, device_id: ID!): String,

    "Pauses a user's playback."
    pausePlayback(device_id: ID!): String,

    "Plays a user's playback."
    playPlayback(device_id: ID!): String,

    "Sets repeat mode for a user's playback."
    repeatPlayer(device_id: ID!): String,

    "Plays a user's playback."
    seekTo(position_ms: Int, device_id: ID!): String,

    "Toggle on shuffle mode for a user's playback."
    shufflePlayer(state: Boolean, device_id: ID!): String,

    "Sets a devices volume percentage."
    volumeTo(volume_percent: Int, device_id: ID!): String,

    "Transfers playback to a new device."
    transferPlayback(device_ids: [ID!]!, play: Boolean): String,
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
  type Snapshot {
    snapshot_id: String!
  },
  type TrackNumber {
    href: String,
    total: Int,
  },
  type Category {
    id: ID,
    href: String,
    icons: [Image],
    name: String,
  },
  type Artist {
    id: ID,
    name: String,
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
    id: ID,
    name: String,
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
    uri: String,
    available_markets: [String],
  },
  type Track {
    id: ID,
    name: String,
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
  type Playlist {
    id: ID,
    name: String,
    collaborative: Boolean,
    description: String,
    external_urls: External_Urls,
    images: [Image],
    href: String,
    owner: User,
    primary_color: String,
    public: String,
    snapshot_id: String,
    tracks: TrackNumber,
    type: String,
    uri: String,
  },
  type AudioFeature {
    id: ID,
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
  type User {
    id: ID,
    display_name: String,
    external_urls: External_Urls,
    followers: Followers,
    href: String,
    images: Image,
    type: String,
    uri: String,
  },
  type BrowseAlbum {
    href: String,
    items: [Album],
    limit: Int,
    next: String,
    offset: Int,
    previous: String,
    total: Int,
  },
  type BrowsePlaylist {
    href: String,
    limit: Int,
    next: String,
    offset: Int,
    previous: String,
    total: Int,
    items: [Playlist]
  },
  type BrowseCategories {
    href: String,
    limit: Int,
    next: String,
    offset: Int,
    previous: String,
    total: Int,
    items: [Category]
  },
  type BrowseEpisode {
    href: String,
    items: [Episode],
    offset: Int,
    limit: Int,
    next: String,
    previous: String,
    total: Int,
  },
  type BrowseShow {
    href: String,
    items: [Show],
    offset: Int,
    limit: Int,
    next: String,
    previous: String,
    total: Int,
  },
  type BrowseArtist {
    href: String,
    items: [Artist],
    offset: Int,
    limit: Int,
    next: String,
    previous: String,
    total: Int,
  },
  type BrowseTrack {
    href: String,
    items: [Track],
    offset: Int,
    limit: Int,
    next: String,
    previous: String,
    total: Int,
  },
  type Show {
    id: ID,
    name: String,
    available_markets: [String],
    description: String,
    explicit: Boolean,
    external_urls: External_Urls,
    href: String,
    images: [Image],
    is_externally_hosted: Boolean,
    languages: [String],
    media_type: String,
    publisher: String,
    total_episodes: Int,
    type: String,
    uri: String,
  },
  type Episode {
    id: ID,
    name: String,
    href: String,
    audio_preview_url: String,
    description: String,
    duration_ms: Int,
    explicit: Boolean,
    external_urls: External_Urls,
    images: [Image],
    is_externally_hosted: Boolean,
    is_playable: Boolean,
    language: String,
    languages: [String],
    release_date: String,
    release_date_precision: String,
    type: String,
    uri: String,
  },
  type Search {
    albums: BrowseAlbum,
    artists: BrowseArtist,
    tracks: BrowseTrack,
    playlists: BrowsePlaylist,
    shows: BrowseShow,
    episodes: BrowseEpisode,
  },
  type Device {
    id: ID!,
    name: String,
    is_active: Boolean,
    is_private_session: Boolean,
    is_restricted: Boolean,
    type: String,
    volume_percent: Int,
  },
  type Context {
    id: ID,
    external_urls: External_Urls,
    href: String,
    type: String,
    uri: String,
  },
  type PlayerItem {
    album: Album,
    artists: [Artist],
    disc_number: Int,
    duration_ms: Int,
    explicit: Boolean,
    external_urls: External_Urls,
    href: String,
    id: ID,
    is_local: Boolean,
    is_playable: Boolean,
    linked_from: Context,
    name: String,
    popularity: Int,
    preview_url: String,
    track_number: Int,
    type: String,
    uri: String,
  },
  type Player {
    device: Device,
    context: Context,
    shuffle_state: Boolean,
    repeat_state: String,
    timestamp: ID,
    progress_ms: Int,
    item: PlayerItem,
    is_playing: Boolean,
    currently_playing_type: String,
  },
  type RecentlyPlayed {
    track: Track,
    played_at: ID,
    context: Context
  }
`);

module.exports = schema;
