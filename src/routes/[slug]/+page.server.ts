import type { PageServerLoad } from './$types';

type OutputType = {
	mozi: string;
};

export const load: PageServerLoad<OutputType> = async ({ params, platform }) => {
	const cache = await platform?.env?.MY_KV.get('test_cache2');
	if (cache) {
		return {
			mozi: cache
		};
	}

	await platform?.env?.MY_KV.put('test_cache2', params.slug);
	return {
		mozi: params.slug
	};
};
