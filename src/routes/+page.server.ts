import type { PageServerLoad } from './$types';

type OutputType = {
	mozi: string;
};

export const load: PageServerLoad<OutputType> = async () => {
	const mozi = 'これは文字です。';
	return {
		mozi: mozi
	};
};
