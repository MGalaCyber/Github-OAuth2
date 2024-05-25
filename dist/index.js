const { URLSearchParams } = require("url");
const { request } = require("undici");
const Crypto = require("crypto");

const Scopes = {
    Repo: "repo",
    RepoStatus: "repo:status",
    RepoDeployment: "repo_deployment",
    PublicRepo: "public_repo",
    RepoInvite: "repo:invite",
    SecurityEvents: "security_events",
    AdminRepoHook: "admin:repo_hook",
    WriteRepoHook: "write:repo_hook",
    ReadRepoHook: "read:repo_hook",
    AdminOrg: "admin:org",
    WriteOrg: "write:org",
    ReadOrg: "read:org",
    AdminPublicKey: "admin:public_key",
    WritePublicKey: "write:public_key",
    ReadPublicKey: "read:public_key",
    AdminOrgHook: "admin:org_hook",
    Gist: "gist",
    Notifications: "notifications",
    User: "user",
    ReadUser: "read:user",
    UserEmail: "user:email",
    UserFollow: "user:follow",
    Project: "project",
    ReadProject: "read:project",
    DeleteRepo: "delete_repo",
    WritePackages: "write:packages",
    ReadPackages: "read:packages",
    DeletePackages: "delete:packages",
    AdminGpgKey: "admin:gpg_key",
    WriteGpgKey: "write:gpg_key",
    ReadGpgKey: "read:gpg_key",
    Codespace: "codespace",
    Workflow: "workflow",
};

const ResponseCodeTypes = {
    Code: "code",
    Token: "token",
};

const PromptTypes = {
    Consent: "consent",
    None: "none",
};

const IntegrationTypes = {
    GuildInstall: 0,
    UserInstall: 1,
};

const MetaDataTypes = {
    IntegerLessThanOrEqual: 1,
    IntegerGreaterThanOrEqual: 2,
    IntegerEqual: 3,
    IntegerNotEqual: 4,
    DatetimeLessThanOrEqual: 5,
    DatetimeGreaterThanOrEqual: 6,
    BooleanEqual: 7,
    BooleanNotEqual: 8,
};

class GithubOAuth2 {
    constructor({clientId, clientToken, redirectUri}) {
        if (!clientId || !redirectUri) throw new Error("Missing required parameters: clientId, redirectUri");
        if (typeof clientId !== "string" || typeof clientToken !== "string" || typeof redirectUri !== "string") throw new Error("Invalid parameter types: clientId, clientToken, redirectUri must be strings");

        this.clientId = clientId ? clientId : "";
        this.clientToken = clientToken ? clientToken : "";
        this.redirectUri = redirectUri ? redirectUri : "";
    };

    GenerateOAuth2Url({ login, scope, allowSignUp }) {
        if (!login || !scope || allowSignUp) throw new Error("Missing required parameters: state, scope, allowSignUp");
        if (!Array.isArray(scope)) throw new Error("Invalid parameter type: scope must be an array");
        if (typeof allowSignUp !== "boolean") throw new Error("Invalid parameter type: allowSignUp must be a boolean");
        if (typeof login !== "string" || typeof allowSignUp !== "string") throw new Error("Invalid parameter types: login, allowSignUp must be strings");

        return new Promise((resolve, reject) => {
            let genState = Crypto.randomBytes(16).toString("hex");
            const genParams = new URLSearchParams({
                client_id: this.clientId,
                redirect_uri: this.redirectUri,
                login: login,
                scope: Array.isArray(scope) ? scope.join(" ") : scope,
                state: genState,
                allow_signup: allowSignUp
            });
            return resolve({
                state: genState,
                url: `https://github.com/login/oauth/authorize?${genParams.toString()}`
            });
        });
    };

    GetAccessToken(callbackCode) {
        if (!callbackCode) throw new Error("Missing required parameter: callbackCode");
        if (typeof callbackCode !== "string") throw new Error("Invalid parameter type: callbackCode must be a string");

        return new Promise(async (resolve, reject) => {
            const genParams = new URLSearchParams({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code: callbackCode,
                redirect_uri: this.redirectUri
            });

            const getResponse = await request("https://github.com/login/oauth/access_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: genParams.toString()

            }).catch((error) => reject(error));

            const getResult = await getResponse.body.json();
            const formatResult = {
                accessToken: getResult.access_token,
                tokenType: getResult.token_type,
                scope: getResult.scope,
            };

            resolve(formatResult);
        });
    };

    get UserDataSchema() {
        return {
            GetUserProfile(accessToken) {
                if (!accessToken) throw new Error("Missing required parameter: accessToken");
                if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");

                return new Promise(async (resolve, reject) => {
                    const getResponse = await request("https://api.github.com/user", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        },

                    }).catch((error) => reject(error));

                    const getResult = await getResponse.body.json();
                    // const formatResult = {
                    //     id: getResult.id,
                    //     username: getResult.username,
                    //     avatar: getResult.avatar,
                    //     discriminator: getResult.discriminator,
                    //     publicFlags: getResult.public_flags,
                    //     flags: getResult.flags,
                    //     banner: getResult.banner,
                    //     accentColor: getResult.accent_color,
                    //     globalName: getResult.global_name,
                    //     avatarDecorationData: {
                    //         asset: getResult.avatar_decoration_data.asset,
                    //         skuId: getResult.avatar_decoration_data.sku_id,
                    //     },
                    //     bannerColor: getResult.banner_color,
                    //     clan: getResult.clan,
                    //     mfaEnabled: getResult.mfa_enabled,
                    //     locale: getResult.locale,
                    //     premiumType: getResult.premium_type,
                    //     email: getResult.email,
                    //     verified: getResult.verified,
                    // };

                    return resolve(getResult);
                });
            },
            GetUserGuilds(accessToken) {
                if (!accessToken) throw new Error("Missing required parameter: accessToken");
                if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");

                return new Promise(async (resolve, reject) => {
                    const getResponse = await request("https://discord.com/api/users/@me/guilds", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        },

                    }).catch((error) => reject(error));

                    const getResult = await getResponse.body.json();
                    const formatResult = getResult.map(({ id, name, icon, owner, permissions, permissions_new, features }) => ({
                        id,
                        name,
                        icon,
                        owner,
                        permissions,
                        permissionsNew: permissions_new,
                        features: features
                    }));

                    return resolve(formatResult);
                });
            },
            GetUserConnections(accessToken) {
                if (!accessToken) throw new Error("Missing required parameter: accessToken");
                if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");

                return new Promise(async (resolve, reject) => {
                    const getResponse = await request("https://discord.com/api/users/@me/connections", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        },

                    }).catch((error) => reject(error));

                    const getResult = await getResponse.body.json();
                    const formatResult = getResult.map(({ id, name, type, friend_sync, metadata_visibility, show_activity, two_way_link, verified, visibility }) => ({
                        id,
                        name,
                        type,
                        friendSync: friend_sync,
                        metadataVisibility: metadata_visibility,
                        showActivity: show_activity,
                        twoWayLink: two_way_link,
                        verified,
                        visibility
                    }));

                    return resolve(formatResult);
                });
            },
            GetUserGuildMember({ accessToken, guildId }) {
                if (!accessToken || !guildId) throw new Error("Missing required parameter: accessToken, guildId");
                if (typeof accessToken !== "string" || typeof guildId !== "string") throw new Error("Invalid parameter types: accessToken, guildId must be strings");

                return new Promise(async (resolve, reject) => {
                    const getResponse = await request(`https://discord.com/api/users/@me/guilds/${guildId}/member`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        },

                    }).catch((error) => reject(error));

                    const getResult = await getResponse.body.json();
                    const formatResult = {
                        avatar: getResult.avatar,
                        communicationDisabledUntil: getResult.communication_disabled_until,
                        flags: getResult.flags,
                        joinedAt: getResult.joined_at,
                        nick: getResult.nick,
                        pending: getResult.pending,
                        premiumSince: getResult.premium_since,
                        roles: getResult.roles,
                        unusualDMActivityUntil: getResult.unusual_dm_activity_until,
                        user: {
                            id: getResult.user.id,
                            username: getResult.user.username,
                            avatar: getResult.user.avatar,
                            discriminator: getResult.user.discriminator,
                            publicFlags: getResult.user.public_flags,
                            flags: getResult.user.flags,
                            banner: getResult.user.banner,
                            accentColor: getResult.user.accent_color,
                            globalName: getResult.user.global_name,
                            avatarDecorationData: {
                                asset: getResult.user.avatar_decoration_data.asset,
                                skuId: getResult.user.avatar_decoration_data.sku_id,
                            },
                            bannerColor: getResult.user.banner_color,
                            clan: getResult.user.clan,
                        },
                        mute: getResult.mute,
                        deaf: getResult.deaf,
                        bio: getResult.bio,
                        banner: getResult.banner,
                    };

                    resolve(formatResult);
                });
            },
        };
    };

    get AddUserSchema() {
        return {
            AddGuildMember({ accessToken, params = { guildId, userId }, body = { nick: "", roles: [], mute: false, deaf: false } }) {
                if (!accessToken || !params || !params.guildId || !params.userId) throw new Error("Missing required parameters: accessToken, params.guildId, params.userId");
                if (typeof accessToken !== "string" || typeof params.guildId !== "string" || typeof params.userId !== "string") throw new Error("Invalid parameter types: accessToken, params.guildId, params.userId must be strings");
                if (typeof body !== "object") throw new Error("Invalid parameter type: body must be an object");
                if (typeof body.nick !== "string") throw new Error("Invalid parameter type: body.nick must be a string");
                if (typeof body.mute !== "boolean" || typeof body.deaf !== "boolean") throw new Error("Invalid parameter types: body.mute, body.deaf must be booleans");
                if (!Array.isArray(body.roles)) throw new Error("Invalid parameter type: body.roles must be an array");

                return new Promise(async (resolve, reject) => {
                    await request(`https://discord.com/api/guilds/${params.guildId}/members/${params.userId}`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bot ${this.clientToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            access_token: accessToken,
                            ...body
                        })

                    }).catch((error) => reject(error));
                });
            },
            AddGroupMember({ accessToken, params = { groupId, userId }, body = { nick: "" } }) {
                if (!accessToken || !params || !params.groupId || !params.userId) throw new Error("Missing required parameters: accessToken, params.groupId, params.userId");
                if (typeof accessToken !== "string" || typeof params.groupId !== "string" || typeof params.userId !== "string") throw new Error("Invalid parameter types: accessToken, params.groupId, params.userId must be strings");
                if (typeof body !== "object") throw new Error("Invalid parameter type: body must be an object");
                if (typeof body.nick !== "string") throw new Error("Invalid parameter type: body.nick must be a string");

                return new Promise(async (resolve, reject) => {
                    await request(`https://discord.com/api/channels/${params.groupId}/recipients/${params.userId}`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bot ${this.clientToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            access_token: accessToken,
                            ...body
                        })

                    }).catch((error) => reject(error));
                });
            },
        };
    };

    get LinkedRolesSchema() {
        return {
            GetUserMetaData(refreshToken) {
                if (!refreshToken) throw new Error("Missing required parameter: refreshToken");
                if (typeof refreshToken !== "string") throw new Error("Invalid parameter type: refreshToken must be a string");

                return new Promise(async (resolve, reject) => {
                    const getRefreshToken = await this.GetRefreshToken(refreshToken);
                    const getResponse = await request(`https://discord.com/api/users/@me/applications/${this.clientId}/role-connection`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${getRefreshToken.accessToken}`,
                            "Content-Type": "application/json"
                        },

                    }).catch((error) => reject(error));

                    const getResult = await getResponse.body.json();
                    return resolve(getResult)
                });
            },
            PushUserMetaData({ refreshToken, body = { platformName, metaData: {} } }) {
                if (!refreshToken || !body || !body.platformName || !body.metaData) throw new Error("Missing required parameters: refreshToken, body.platformName, body.metaData");
                if (typeof refreshToken !== "string" || typeof body.platformName !== "string") throw new Error("Invalid parameter types: refreshToken, body.platformName, must be strings");
                if (typeof body !== "object" || typeof body.metaData !== "object") throw new Error("Invalid parameter types: body, metaData, must be objects");

                return new Promise(async (resolve, reject) => {
                    const getRefreshToken = await this.GetRefreshToken(refreshToken);
                    const getResponse = await request(`https://discord.com/api/users/@me/applications/${this.clientId}/role-connection`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${getRefreshToken.accessToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            platform_name: body.platformName,
                            metadata: body.metaData
                        })

                    }).catch((error) => reject(error));

                    const getResult = await getResponse.body.json();
                    return resolve(getResult);
                });
            },
            RegisterMetaData(metaDataArray) {
                if (!metaDataArray) throw new Error("Missing required parameter: metaDataArray");
                if (!Array.isArray(metaDataArray)) throw new Error("Invalid parameter type: metaDataArray must be an array");

                return new Promise(async (resolve, reject) => {
                    const formatMetaData = metaDataArray.map(({ key, name, nameLocalizations, description, descriptionLocalizations, type }) => ({
                        key,
                        name: name || nameLocalizations,
                        name_localizations: nameLocalizations,
                        description,
                        description_localizations: descriptionLocalizations,
                        type
                    }));
                    const getResponse = await request(`https://discord.com/api/applications/${this.clientId}/role-connections/metadata`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bot ${this.clientToken}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formatMetaData)

                    }).catch((error) => reject(error));

                    const getResult = await getResponse.body.json();
                    return resolve(getResult);
                });
            },
        };
    };
};

module.exports = { GithubOAuth2, Scopes, ResponseCodeTypes, PromptTypes, IntegrationTypes, MetaDataTypes };