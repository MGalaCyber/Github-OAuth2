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

export enum MetaDataTypes {
    IntegerLessThanOrEqual,
    IntegerGreaterThanOrEqual,
    IntegerEqual,
    IntegerNotEqual,
    DatetimeLessThanOrEqual,
    DatetimeGreaterThanOrEqual,
    BooleanEqual,
    BooleanNotEqual,
}

export interface GenerateOAuth2UrlParams {
    login: string;
    scope: readonly Scopes[],
    allowSignUp: string;
}

export interface GuildMemberParams {
    accessToken: string;
    guildId: string;
}

export interface AddGuildMemberParams {
    accessToken: string;
    params: { guildId: string; userId: string };
    body?: { nick: string; roles: string[]; mute: boolean; deaf: boolean };
}

export interface AddGroupMemberParams {
    accessToken: string;
    params: { groupId: string; userId: string };
    body?: { nick: string };
}

export interface PushUserMetaDataParams {
    refreshToken: string;
    body: { platformName: string, metaData: object };
}

export interface RegisterMetaDataParams extends Array<{
    key: string;
    name: string;
    nameLocalizations?: string;
    description: string;
    descriptionLocalizations?: string;
    type: MetaDataTypes
}> {}