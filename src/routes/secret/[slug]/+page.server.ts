import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
	const { data, error } = await supabase.from('secrets').select('*').eq('url', params.slug);

	console.log('data', data);

	if (error) {
		return {
			status: 500,
			error: 'Something went wrong'
		};
	}

	if (data.length < 1) {
		return {
			status: 404,
			error: 'Secret not found'
		};
	}

	return {
		status: 200,
		secret: data[0].secret
	};
}
