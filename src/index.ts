import { RangeParams, SongType, RangeResponse } from './types/index';

export const range = async (params: RangeParams): Promise<SongType[]> => {
	const { startDate, endDate, filter, genre } = params;
	const apiUrl = `https://api.songof.today/v2/range/${startDate}/${endDate}`;
	const url = new URL(apiUrl);

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

	const statusCode = response.status;

	const data = await response.json() as RangeResponse;

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
