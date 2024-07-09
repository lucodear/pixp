import GitHub, { type GitHubProfile } from '@auth/core/providers/github';
import { defineConfig } from 'auth-astro';
import type { FullSession } from 'src/common/backend/session.type';

export default defineConfig({
    session: { strategy: 'jwt' },
    secret: import.meta.env.AUTH_SECRET,
    trustHost:
        import.meta.env.AUTH_TRUST_HOST === 'true' || import.meta.env.AUTH_TRUST_HOST === true,
    providers: [
        GitHub({
            clientId: import.meta.env.GITHUB_CLIENT_ID,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            const fullSession = {
                github: {
                    accessToken: token.accessToken as string,
                    profile: token.profile as GitHubProfile
                },
                ...session
            } satisfies FullSession;
            return fullSession;
        },
        jwt: ({ token, account, profile }) => {
            if (account) {
                token.accessToken = account.access_token;
            }

            if (profile) {
                token.profile = {
                    html_url: profile.html_url,
                    login: profile.login
                };
            }

            return token;
        }
    }
});
