import type { GitHubProfile } from '@auth/core/providers/github';
import type { Session } from '@auth/core/types';

export interface FullSession extends Session {
    github: {
        profile: Partial<GitHubProfile>;
        accessToken: string;
    };
}
