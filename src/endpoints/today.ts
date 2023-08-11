import { SongType, QueryOptionsType, BaseURL } from 'src/types';

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
