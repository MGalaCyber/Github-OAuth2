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

export interface GetUserProfile {
    accessToken: string;
    userAgent: string;
}