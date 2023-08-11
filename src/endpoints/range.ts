import { RangeParams, SongType, RangeResponse, BaseURL } from '../types/index';

/**
 * Fetches a range of song data between two dates with optional query options.
 * @param params - Object containing startDate, endDate, filter, and genre parameters.
 * @returns A Promise resolving to an array of song data within the specified date range.
 * @throws Throws an error if the request fails or if the response is invalid.
 * @example
 * const songRange = await range({
 *    startDate: '11-03-2023',
 *    endDate: '13-03-2023',
 *    filter: 'artist',
 *    genre: 'german'
 * });
 * console.log(songRange);
 */
export const range = async (params: RangeParams): Promise<SongType[]> => {
	const { startDate, endDate, filter, genre } = params;
	const url = new URL(`${BaseURL}/range/${startDate}/${endDate}`);

	const options = {
		filter,
		genre,
	};

	for (const [key, value] of Object.entries(options)) {
		if (value !== undefined) {
			url.searchParams.set(key, value);
		}
	}

	const response = await fetch(url);

	const data = await response.json() as RangeResponse;

	const statusCode = response.status;

	if (!response.ok || !data) {
		switch (statusCode) {
			case 400:
				throw new Error('Invalid request. Make sure the date format is DD-MM-YYYY and not in the future.');
			case 500:
				throw new Error('Can not find lyrics for this song.');
			default:
				throw new Error(`Unknown error: ${statusCode}`);
		}
	}
	return data.songs;
};
