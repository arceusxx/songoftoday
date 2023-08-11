import { LyricsResponse, LyricsQueryOptions, BaseURL } from 'src/types';

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
				throw new Error('Invalid request. Make sure the date format is DD-MM-YYYY and not in the future.');
			case 500:
				throw new Error('Can not find lyrics for this song.');
			default:
				throw new Error(`Unknown error: ${statusCode}`);
		}
	}

	return lyrics;
};

