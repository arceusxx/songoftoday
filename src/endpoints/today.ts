import { SongType, QueryOptionsType, BaseURL } from 'src/types';

/**
 * Fetches song data for today's date with optional query options.
 * @param options - Optional query options to filter the song data.
 * @returns A Promise resolving to the song data for today's date.
 * @throws Throws an error if the request fails or if the response is invalid.
 * @example
 * const songData = await today({ filter: 'artist', genre: 'german' });
 * console.log(songData);
 */
export const today = async (options: QueryOptionsType = {}): Promise<SongType> => {
	const url = new URL(`${BaseURL}/today`);

	for (const [key, value] of Object.entries(options)) {
		if (value !== undefined) {
			url.searchParams.set(key, value);
		}
	}

	const response = await fetch(url);

	const data = await response.json();

	const song = data as SongType;

	if (!song) { throw new Error('No song found'); }

	return song;
};
