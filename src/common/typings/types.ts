export interface PullRequestCommit {
    url: string;
    title: string;
    number: number;
    state: 'open' | 'closed' | 'merged';
    createdAt: string;
    updatedAt: string;
    closedAt: string | null;
    mergedAt: string | null;
    body: string;
    draft: boolean;
    commits: number;

    mergedBy?: {
        login: string;
        avatar: string;
        gravatar: string;
        url: string;
    };

    author: {
        login: string;
        avatar: string;
        gravatar: string;
        url: string;
    };

    head: {
        label: string;
        ref: string;
        sha: string;
        repo: {
            name: string;
            url: string;
        };
    };

    repo: {
        owner: string;
        name: string;
        label: string;
    };

    commit?: {
        sha: string;
        url: string;
        author: {
            login: string;
            avatar?: string;
            gravatar?: string;
            url?: string;
        };
        files: GithubFile[];
    };

    files?: GithubFile[];
}

export interface GithubFile {
    sha: string;
    path: string;
    extension: string;
    status: 'added' | 'removed' | 'modified' | 'renamed' | 'copied' | 'changed' | 'unchanged';
    additions: number;
    deletions: number;
    changes: number;
    rawUrl: string;
    blobUrl: string;
}
