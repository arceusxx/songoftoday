export const BaseURL = 'https://api.songof.today/v2';

export interface SongType {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    artist: string;
    lyrics: string | null;
    date: string;
    usedPlaylist: string | null;
    genre: string;
    previewUrl: string;
}

export interface QueryOptionsType {
    filter?: FilterOptions;
    genre?: GenreOptions;
    page?: number;
    limit?: number;
}

export interface LyricsResponse {
    id: string;
    lyrics: string | null;
}

export interface LyricsQueryOptions {
    genre?: GenreOptions;
}

export interface RangeParams {
    startDate: string;
    endDate: string;
    filter?: string;
    genre?: string;
}

export interface RangeResponse {
    songs: SongType[];
}

export type FilterOptions = 'none' | 'url' | 'urls' | 'title' | 'titles' | 'artist' | 'artists' | 'thumbnail' | 'thumbnails' | 'redirect' | 'lyrics';
export type GenreOptions = 'global' | 'pop' | 'rock' | 'electro' | 'kpop' | 'hardstyle' | 'metal' | 'german';
