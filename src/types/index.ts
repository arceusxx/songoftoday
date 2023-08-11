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

export interface QueryOptionType {
    filter?: FilterOption;
    genre?: GenreOption;
    page?: number;
    limit?: number;
}

// for /all
export interface QueryOptionTypes {
    filter?: FilterOptions;
    genre?: string;
}

export interface LyricsResponse {
    id: string;
    lyrics: string | null;
}

export interface LyricsQueryOptions {
    genre?: GenreOption;
}

export interface RangeParams {
    startDate: string;
    endDate: string;
    filter?: FilterOptions;
    genre?: GenreOption;
}

export interface RangeResponse {
    songs: SongType[];
}
// for /all
export type FilterOptions = 'none' | 'urls' | 'titles' | 'artists' | 'thumbnails' | 'lyrics';

export type FilterOption = 'none' | 'url' | 'title' | 'artist' | 'thumbnail' | 'redirect' | 'lyrics';
export type GenreOption = 'global' | 'pop' | 'rock' | 'electro' | 'kpop' | 'hardstyle' | 'metal' | 'german';
