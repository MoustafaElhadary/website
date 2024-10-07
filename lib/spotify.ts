import { Track } from "@spotify/web-api-ts-sdk";

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export type SpotifyTrack = {
  artist: string;
  songUrl: string;
  imageURL?: string;
  previewURL: string | null;
  title: string;
};

export type NowPlayingData = {
  album?: string;
  albumImageUrl?: string;
  artist?: string;
  isPlaying: boolean;
  songUrl?: string;
  title?: string;
  previewURL?: string | null;
};

const getAccessToken = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: client_id!,
      client_secret: client_secret!,
      refresh_token: refresh_token!,
    }),
  };

  const response = await fetch(TOKEN_ENDPOINT, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getNowPlaying = async (): Promise<NowPlayingData> => {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await response.json();
    console.log({ data });

    if (!data.is_playing || !data.item) {
      return { isPlaying: false };
    }

    const isPlaying = data.is_playing;
    const item = data.item as Track;
    const title = item.name;
    const artist = item.artists.map((_artist) => _artist.name).join(", ");
    const album = item.album.name;
    const albumImageUrl = item.album.images[0].url;
    const songUrl = item.external_urls.spotify;
    const previewURL = item.preview_url;

    return {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      previewURL,
    };
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return { isPlaying: false };
  }
};

export const getTopTracks = async (): Promise<SpotifyTrack[]> => {
  const { access_token } = await getAccessToken();

  const response = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const items = data.items as Track[];

  return items
    .map((track) => ({
      artist: track.artists.map((_artist) => _artist.name).join(", "),
      songUrl: track.external_urls.spotify,
      title: track.name,
      imageURL: track.album.images?.find((e) => e.height == 640)?.url,
      previewURL: track.preview_url,
    }))
    .slice(0, 10);
};
