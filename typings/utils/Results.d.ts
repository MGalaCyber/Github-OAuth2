export interface GenerateOAuth2Url {
    state: string;
    url: string;
}

export interface AuthorizationToken {
    accessToken: string;
    tokenType: string;
    scope: string;
}

export interface UserProfile {
    login: string;
    id: number;
    nodeId: string;
    avatarUrl: string;
    gravatarId: string;
    url: string;
    htmlUrl: string;
    followersUrl: string;
    followingUrl: string;
    gistsUrl: string;
    starredUrl: string;
    subscriptionsUrl: string;
    organizationsUrl: string;
    reposUrl: string;
    eventsUrl: string;
    receivedEventsUrl: string;
    type: string;
    siteAdmin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    twitterUsername: string;
    publicRepos: number;
    publicGists: number;
    followers: number;
    following: number;
    createdAt: string;
    updatedAt: string;
    privateGists: string;
    totalPrivateRepos: number;
    ownedPrivateRepos: number;
    diskUsage: number;
    collaborators: number;
    twoFactorAuthentication: boolean;
    plan: {
        name: string;
        space: number;
        collaborators: number;
        privateRepos: number;
    }
}

export interface Owner {
    login: string;
    id: number;
    nodeId: string;
    avatarUrl: string;
    gravatarId: string;
    url: string;
    htmlUrl: string;
    followersUrl: string;
    followingUrl: string;
    gistsUrl: string;
    starredUrl: string;
    subscriptionsUrl: string;
    organizationsUrl: string;
    reposUrl: string;
    eventsUrl: string;
    receivedEventsUrl: string;
    type: string;
    siteAdmin: boolean;
}

export interface Licence {
    key: string;
    name: string;
    spdxId: string;
    url: string;
    nodeId: string;
}

export interface UserRepos {
    id: number;
    nodeId: string;
    name: string;
    fullName: string;
    private: boolean;
    owner: Owner;
    htmlUrl: string;
    description: string | null;
    fork: boolean;
    url: string;
    forksUrl: string;
    keysUrl: string;
    collaboratorsUrl: string;
    teamsUrl: string;
    hooksUrl: string;
    issueEventsUrl: string;
    eventsUrl: string;
    assigneesUrl: string;
    branchesUrl: string;
    tagsUrl: string;
    blobsUrl: string;
    gitTagsUrl: string;
    gitRefsUrl: string;
    treesUrl: string;
    statusesUrl: string;
    languagesUrl: string;
    stargazersUrl: string;
    contributorsUrl: string;
    subscribersUrl: string;
    subscriptionUrl: string;
    commitsUrl: string;
    gitCommitsUrl: string;
    commentsUrl: string;
    issueCommentUrl: string;
    contentsUrl: string;
    compareUrl: string;
    mergesUrl: string;
    archiveUrl: string;
    downloadsUrl: string;
    issuesUrl: string;
    pullsUrl: string;
    milestonesUrl: string;
    notificationsUrl: string;
    labelsUrl: string;
    releasesUrl: string;
    deploymentsUrl: string;
    createdAt: string;
    updatedAt: string;
    pushedAt: string;
    gitUrl: string;
    sshUrl: string;
    cloneUrl: string;
    svnUrl: string;
    homepage: string | null;
    size: number;
    stargazersCount: number;
    watchersCount: number;
    language: string;
    hasIssues: boolean;
    hasProjects: boolean;
    hasDownloads: boolean;
    hasWiki: boolean;
    hasPages: boolean;
    hasDiscussions: boolean;
    forksCount: number;
    mirrorUrl: string | null;
    archived: boolean;
    disabled: boolean;
    openIssuesCount: number;
    license: Licence | null;
    allowForking: boolean;
    isTemplate: boolean;
    webCommitSignoffRequired: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    openIssues: number;
    watchers: number;
    defaultBranch: string;
    permissions: {
        admin: boolean;
        maintain: boolean;
        push: boolean;
        triage: boolean;
        pull: boolean;
    };
}