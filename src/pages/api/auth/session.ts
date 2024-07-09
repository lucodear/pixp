import type { Session } from '@auth/core/types';
import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import res from 'src/common/backend/res';

/**
 * This endpoint is only here to override the default session endpoint added by auth-astro
 * in order to avoid exposing unnecessary information about the session to the client.
 *
 * By default, the session endpoint returns the entire session object, which could potentially
 * contain sensitive data. By overriding it, we only show stuff that make sense presentation-wise.
 */
export const GET: APIRoute = async ({ request }) => {
    const session = await getSession(request);
    if (!session) {
        return res.err(401, 'Session not found');
    }

    return res.from({
        user: session.user,
        expires: session.expires
    } satisfies Session);
};
