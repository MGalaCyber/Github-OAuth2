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