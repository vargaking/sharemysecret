import { supabase } from '$lib/supabaseClient';
import { fail } from '@sveltejs/kit';

import sha256 from 'crypto-js/sha256';

export const actions = {
	createSecret: async ({ request }) => {
		const data = await request.formData();

		const secret = data.get('secret') as string | null;

		if (!secret || secret.length < 1) {
			console.log('Secret is required');
			return fail(400, { error: 'Secret is required' });
		}

		console.log('secret', secret);

		const hashedSecret = sha256(secret).toString();

		const { error } = await supabase.from('secrets').insert([
			{
				secret: secret,
				url: hashedSecret
			}
		]);

		if (error) {
			return fail(500, { error: 'Something went wrong' });
		}

		console.log('hashedSecret', hashedSecret);

		return { url: hashedSecret };
	}
};
