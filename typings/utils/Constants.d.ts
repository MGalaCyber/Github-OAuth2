export enum Scopes {
    Repo,
    RepoStatus,
    RepoDeployment,
    PublicRepo,
    RepoInvite,
    SecurityEvents,
    AdminRepoHook,
    WriteRepoHook,
    ReadRepoHook,
    AdminOrg,
    WriteOrg,
    ReadOrg,
    AdminPublicKey,
    WritePublicKey,
    ReadPublicKey,
    AdminOrgHook,
    Gist,
    Notifications,
    User,
    ReadUser,
    UserEmail,
    UserFollow,
    Project,
    ReadProject,
    DeleteRepo,
    WritePackages,
    ReadPackages,
    DeletePackages,
    AdminGpgKey,
    WriteGpgKey,
    ReadGpgKey,
    Codespace,
    Workflow,
}

export interface GenerateOAuth2UrlParams {
    scope: readonly Scopes[],
    loginAccount?: string;
    allowSignUp?: boolean;
}

export interface GetUserProfileParams {
    accessToken: string;
    userAgent: string;
}

export interface GetUserEmailsParams {
    accessToken: string;
    userAgent: string;
}

export interface GetUserRepositories {
    accessToken: string;
    userAgent: string;
}

export interface GetUserEmails {
    accessToken: string;
    userAgent: string;
}

export interface GetUserPublicEmails {
    accessToken: string;
    userAgent: string;
}

export interface FollowUserParams {
    accessToken: string;
    userAgent: string;
    username: string;
}

export interface UnfollowUserParams {
    accessToken: string;
    userAgent: string;
    username: string;
}

export interface IsFollowingParams {
    accessToken: string;
    userAgent: string;
    username: string;
}

export interface FollowingOtherUserParams {
    accessToken: string;
    userAgent: string;
    username: string;
    target: string;
}

export interface FollowersParams {
    accessToken: string;
    userAgent: string;
}

export interface FollowingParams {
    accessToken: string;
    userAgent: string;
}

export interface FollowersListParams {
    accessToken: string;
    userAgent: string;
    username: string;
}

export interface FollowingListParams {
    accessToken: string;
    userAgent: string;
    username: string;
}

export interface RepositoryCloneParams {
    accessToken: string;
    repoOwner: string;
    repoName: string;
    localPath: string;
}