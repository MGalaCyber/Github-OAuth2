const GithubApis = require("./github");

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

class GithubOAuth2 {
    constructor({ clientId, clientSecret, redirectUri }) {
        if (!clientId) throw new Error("Missing required parameters: clientId");
        if (!clientSecret) throw new Error("Missing required parameters: clientSecret");
        if (!redirectUri) throw new Error("Missing required parameters: redirectUri");
        if (typeof clientId !== "string") throw new Error("Invalid parameter types: clientId must be string");
        if (typeof clientSecret !== "string") throw new Error("Invalid parameter types: clientSecret must be string");
        if (typeof redirectUri !== "string") throw new Error("Invalid parameter types: redirectUri must be string");

        this.clientId = clientId ? clientId : "";
        this.clientSecret = clientSecret ? clientSecret : "";
        this.redirectUri = redirectUri ? redirectUri : "";
    };

    GenerateOAuth2Url({ scope, loginAccount, allowSignUp }) {
        if (!scope) throw new Error("Missing required parameters: scope");
        if (!Array.isArray(scope)) throw new Error("Invalid parameter type: scope must be an array");
        if (loginAccount !== undefined && typeof loginAccount !== "string") throw new Error("Invalid parameter types: loginAccount must be string");
        if (allowSignUp !== undefined && typeof allowSignUp !== "boolean") throw new Error("Invalid parameter type: allowSignUp must be a boolean");

        return GithubApis.OAuth2Url(this.clientId, this.clientSecret, this.redirectUri, { scope, loginAccount, allowSignUp });
    };

    GetAccessToken(callbackCode) {
        if (!callbackCode) throw new Error("Missing required parameter: callbackCode");
        if (typeof callbackCode !== "string") throw new Error("Invalid parameter type: callbackCode must be a string");

        return GithubApis.AccessToken(this.clientId, this.clientSecret, this.redirectUri, { callbackCode });
    };

    get RespositorySchemas() {
        return {
            Clone({ accessToken, repoOwner, repoName, localPath }) {
                if (!accessToken) throw new Error("Missing required parameter: accessToken");
                if (!repoOwner) throw new Error("Missing required parameter: repoOwner");
                if (!repoName) throw new Error("Missing required parameter: repoName");
                if (!localPath) throw new Error("Missing required parameter: localPath");
                if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                if (typeof repoOwner !== "string") throw new Error("Invalid parameter type: repoOwner must be a string");
                if (typeof repoName !== "string") throw new Error("Invalid parameter type: repoName must be a string");
                if (typeof localPath !== "string") throw new Error("Invalid parameter type: localPath must be a string");
        
                return GithubApis.Respository.Clone(this.clientId, this.clientSecret, this.redirectUri, { accessToken, repoOwner, repoName, localPath }).then((result) => {
                    if (result.status) console.log(`Repository ${repoOwner}/${repoName} cloned successfully!`);
                    if (!result.status) console.log(result.message);
                });
            }
        }
    }

    get UserSchemas() {
        return {
            GetUserProfile({ accessToken, userAgent }) {
                if (!accessToken) throw new Error("Missing required parameter: accessToken");
                if (!userAgent) throw new Error("Missing required parameter: userAgent");
                if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
        
                return GithubApis.User.Profile(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent });
            },
            GetUserRepositories({ accessToken, userAgent }) {
                if (!accessToken) throw new Error("Missing required parameter: accessToken");
                if (!userAgent) throw new Error("Missing required parameter: userAgent");
                if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
        
                return GithubApis.User.Repositories(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent });
            },

            get EmailSchemas() {
                return {
                    GetEmails({ accessToken, userAgent }) {
                        if (!accessToken) throw new Error("Missing required parameter: accessToken");
                        if (!userAgent) throw new Error("Missing required parameter: userAgent");
                        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
                
                        return GithubApis.User.Email.Emails(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent });
                    },
                    GetPublicEmails({ accessToken, userAgent }) {
                        if (!accessToken) throw new Error("Missing required parameter: accessToken");
                        if (!userAgent) throw new Error("Missing required parameter: userAgent");
                        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
                
                        return GithubApis.User.Email.PublicEmails(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent });
                    },
                }
            },

            get Followers() {
                return {
                    Follow({ accessToken, userAgent, username }) {
                        if (!accessToken) throw new Error("Missing required parameter: accessToken");
                        if (!userAgent) throw new Error("Missing required parameter: userAgent");
                        if (!username) throw new Error("Missing required parameter: username");
                        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
                        if (typeof username !== "string") throw new Error("Invalid parameter type: username must be a string");
                
                        return GithubApis.User.Followers.Follow(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent, username });
                    },
                    Unfollow({ accessToken, userAgent, username }) {
                        if (!accessToken) throw new Error("Missing required parameter: accessToken");
                        if (!userAgent) throw new Error("Missing required parameter: userAgent");
                        if (!username) throw new Error("Missing required parameter: username");
                        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
                        if (typeof username !== "string") throw new Error("Invalid parameter type: username must be a string");
                
                        return GithubApis.User.Followers.Unfollow(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent, username });
                    },
                    IsFollowing({ accessToken, userAgent, username }) {
                        if (!accessToken) throw new Error("Missing required parameter: accessToken");
                        if (!userAgent) throw new Error("Missing required parameter: userAgent");
                        if (!username) throw new Error("Missing required parameter: username");
                        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
                        if (typeof username !== "string") throw new Error("Invalid parameter type: username must be a string");
                
                        return GithubApis.User.Followers.IsFollowing(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent, username });
                    },
                    FollowingOtherUser({ accessToken, userAgent, username, target }) {
                        if (!accessToken) throw new Error("Missing required parameter: accessToken");
                        if (!userAgent) throw new Error("Missing required parameter: userAgent");
                        if (!username) throw new Error("Missing required parameter: username");
                        if (!target) throw new Error("Missing required parameter: target");
                        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
                        if (typeof username !== "string") throw new Error("Invalid parameter type: username must be a string");
                        if (typeof target !== "string") throw new Error("Invalid parameter type: target must be a string");
                
                        return GithubApis.User.Followers.IsFollowing(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent, username, target });
                    },
                    Followers({ accessToken, userAgent }) {
                        if (!accessToken) throw new Error("Missing required parameter: accessToken");
                        if (!userAgent) throw new Error("Missing required parameter: userAgent");
                        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
                
                        return GithubApis.User.Followers.Followers(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent, username });
                    },
                    Following({ accessToken, userAgent }) {
                        if (!accessToken) throw new Error("Missing required parameter: accessToken");
                        if (!userAgent) throw new Error("Missing required parameter: userAgent");
                        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
                
                        return GithubApis.User.Followers.Following(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent, username });
                    },
                    FollowersList({ accessToken, userAgent, username }) {
                        if (!accessToken) throw new Error("Missing required parameter: accessToken");
                        if (!userAgent) throw new Error("Missing required parameter: userAgent");
                        if (!username) throw new Error("Missing required parameter: username");
                        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
                        if (typeof username !== "string") throw new Error("Invalid parameter type: username must be a string");
                
                        return GithubApis.User.Followers.FollowersList(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent, username });
                    },
                    FollowingList({ accessToken, userAgent, username }) {
                        if (!accessToken) throw new Error("Missing required parameter: accessToken");
                        if (!userAgent) throw new Error("Missing required parameter: userAgent");
                        if (!username) throw new Error("Missing required parameter: username");
                        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
                        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");
                        if (typeof username !== "string") throw new Error("Invalid parameter type: username must be a string");
                
                        return GithubApis.User.Followers.FollowingList(this.clientId, this.clientSecret, this.redirectUri, { accessToken, userAgent, username });
                    },
                }
            }
        }
    }
};

module.exports = { GithubOAuth2, Scopes };