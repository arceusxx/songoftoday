import { SongType, QueryOptionsType, BaseURL } from 'src/types';

export const date = async (date: string, options: QueryOptionsType = {}): Promise<SongType> => {
	const formattedDate = encodeURIComponent(date);
	const url = new URL(`${BaseURL}/date/${formattedDate}`);

	for (const [key, value] of Object.entries(options)) {
		if (value !== undefined) {
			url.searchParams.set(key, value);
		}
	}

	const response = await fetch(url);

	const statusCode = response.status;

	const data = await response.json();

	if (!data || typeof data !== 'object' || Array.isArray(data)) {
		throw new Error('Invalid response data format');
	}

	const song = data as SongType;

	if (!response.ok || !song) {
		switch (statusCode) {
			case 400:
				throw new Error('Invalid request. Make sure the date format is DD-MM-YYYY and not in the future.');
			case 500:
				throw new Error('Failed to fetch data from the API.');
			case 404:
				throw new Error('No song found for this date.');
			default:
				throw new Error(`Unknown error: ${statusCode}`);
		}
	}

	return song;
};
