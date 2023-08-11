import { SongType, QueryOptionsType, BaseURL } from '../types/index';

/**
 * Retrieves a list of songs from the songof.today API based on the specified query options.
 * @param {QueryOptionsType} options - Options to customize the song retrieval. (Optional)
 * @returns {Promise<SongType[]>} - A promise that resolves to an array of song objects.
 * @throws {Error} - If no songs are found or if the request fails.
 * @example
 * const songs = await all({ genre: 'pop', filter: 'artist' });
 * console.log(songs);
 */
export const all = async (options: QueryOptionsType = {}): Promise<SongType[]> => {
	const url = new URL(`${BaseURL}/all`);

	for (const [key, value] of Object.entries(options)) {
		if (value !== undefined) {
			url.searchParams.set(key, value);
		}
	}

	const response = await fetch(url);

	const data = await response.json();

	const songs = data.songs as SongType[];

	if (!songs) { throw new Error('No songs found'); }

	return songs;
};
