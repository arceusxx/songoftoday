import { LyricsResponse, LyricsQueryOptions, BaseURL } from 'src/types';

/**
 * Fetches lyrics data for a specific date with optional query options.
 * @param date - The date in the format DD-MM-YYYY for which to fetch lyrics data.
 * @param options - Optional query options to filter the lyrics data.
 * @returns A Promise resolving to the lyrics data for the specified date.
 * @throws Throws an error if the request fails or if the response is invalid.
 * @example
 * const lyricsData = await lyrics('11-03-2023', { genre: 'pop' });
 * console.log(lyricsData);
 */
export const lyrics = async (date: string, options: LyricsQueryOptions = {}): Promise<LyricsResponse> => {
	const url = new URL(`${BaseURL}/lyrics/${date}`);

	for (const [key, value] of Object.entries(options)) {
		if (value !== undefined) {
			url.searchParams.set(key, value);
		}
	}

	const response = await fetch(url);

	const data = await response.json();

	const statusCode = response.status;

	const lyrics = data as LyricsResponse;

	if (!response.ok || !lyrics) {
		switch (statusCode) {
			case 400:
				throw new Error('Invalid request. Make sure the date format is DD-MM-YYYY, not in the future and too far in the past..');
			case 500:
				throw new Error('Can not find lyrics for this song.');
			default:
				throw new Error(`Unknown error: ${statusCode}`);
		}
	}
	return lyrics;
};

