/** Utility function to fetch data from the GitHub REST API */
const get = async (endopoint: string, token?: string) => {
    const url = `https://api.github.com/${endopoint}`;

    const headers: any = {
        Accept: `application/vnd.github.full+json`,
        'User-Agent': 'node-fetch/1.0'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url, {
        headers
    });
};

/** Fetches pull request information from the GitHub REST API */
const pr = async (owner: string, repo: string, pr: string, token?: string) => {
    return get(`repos/${owner}/${repo}/pulls/${pr}`, token);
};

/** Fetches the array of files affected by a pull request from the GitHub REST API */
const files = async (
    owner: string,
    repo: string,
    pr: string,
    perPage = 100,
    page = 1,
    token?: string
) => {
    return get(`repos/${owner}/${repo}/pulls/${pr}/files?per_page=${perPage}&page=${page}`, token);
};

/** Fetches commit information from the GitHub REST API */
const commit = async (owner: string, repo: string, ref: string, token?: string) => {
    return get(`repos/${owner}/${repo}/commits/${ref}`, token);
};

/**
 * **gh**
 *
 * Fetches data from the GitHub REST API.
 *
 * Not authenticated requests have strict rate limits. To increase the rate limit, a token must be
 * provided.
 *
 * _This is implemented as a common utility to be able to use it both in the frontend and the
 * backend, as required._
 */
export default {
    pr,
    files,
    commit
};
