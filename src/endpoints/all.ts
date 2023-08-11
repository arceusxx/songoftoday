import { SongType, QueryOptionsType, BaseURL } from '../types/index';

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
