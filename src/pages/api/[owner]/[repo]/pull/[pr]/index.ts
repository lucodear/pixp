import type { APIRoute } from 'astro';
import { getSession } from 'auth-astro/server';
import path from 'node:path';
import type { GithubFile, PullRequestCommit } from 'src/common/typings/types';
import res from '~backend/res';
import type { FullSession } from '~backend/session.type';
import gh from '~gh';
import { LogLevel, Logger } from '~logger';
export const prerender = false;

const log = new Logger('api:pr', LogLevel.Debug);

export const GET: APIRoute = async ({ params, request }) => {
    const session = ((await getSession(request)) ?? undefined) as FullSession | undefined;

    let { owner, repo, pr } = params;

    if (!owner || !repo || !pr) {
        return res.err(400, 'Bad Request: Missing parameters');
    }

    log.debug('Fetching PR info from github', { owner, repo, pr });

    let [prRes, prFiles] = await Promise.all([
        gh.pr(owner, repo, pr, session?.github.accessToken),
        gh.files(owner, repo, pr, 100, 1, session?.github.accessToken)
    ]);

    // if any of the requests failed, we return an error with the status code
    if (!prRes.ok) {
        // try to get the error message from the response
        const message = await prRes.text();
        log.error('Failed to fetch PR', prRes.status, message);
        return res.err(prRes.status, 'Failed to fetch PR');
    }

    if (!prFiles.ok) {
        const message = await prRes.text();
        log.error('Failed to fetch files', prFiles.status, message);
        return res.err(prFiles.status, 'Failed to fetch files');
    }

    let prData = await prRes.json();
    let files = await prFiles.json();

    log.silly('pull request data', prData);
    log.silly('pull request files', files);

    const data: PullRequestCommit = {
        url: prData.html_url,
        number: prData.number,
        title: prData.title,
        state: prData.merged === true ? 'merged' : prData.state,
        createdAt: prData.created_at,
        updatedAt: prData.updated_at,
        closedAt: prData.closed_at,
        mergedAt: prData.merged_at,
        body: prData.body_html,
        draft: prData.draft,
        commits: prData.commits,
        mergedBy: prData.merged_by
            ? {
                  login: prData.merged_by.login,
                  avatar: prData.merged_by.avatar_url,
                  gravatar: prData.merged_by.gravatar_id,
                  url: prData.merged_by.html_url
              }
            : undefined,
        author: {
            login: prData.user?.login,
            avatar: prData.user?.avatar_url,
            gravatar: prData.user?.gravatar_id,
            url: prData.user?.html_url
        },
        repo: {
            owner,
            name: repo,
            label: prData.base.label
        },
        head: {
            label: prData.head.label,
            ref: prData.head.ref,
            sha: prData.head.sha,
            repo: {
                name: prData.head.repo.name,
                url: prData.head.repo.html_url
            }
        },
        files: files
            ?.map((file: any) => {
                const extension = path.extname(file.filename).slice(1);

                if (extension !== 'svg') {
                    return null;
                }

                return {
                    sha: file.sha,
                    path: file.filename,
                    extension,
                    status: file.status,
                    additions: file.additions,
                    deletions: file.deletions,
                    changes: file.changes,
                    rawUrl: file.raw_url,
                    blobUrl: file.blob_url
                } satisfies GithubFile;
            })
            .filter(Boolean)
    };

    return res.from(data);
};
