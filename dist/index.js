const { URLSearchParams } = require("url");
const { request } = require("undici");
const Crypto = require("crypto");

const CloneGithubRepository = require("./clone");
const GetUserRepositories = require("./repos");
const GetUserProfiles = require("./profile");

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
    constructor({clientId, clientSecret, redirectUri}) {
        if (!clientId) throw new Error("Missing required parameters: clientId");
        if (!clientSecret) throw new Error("Missing required parameters: clientSecret");
        if (!redirectUri) throw new Error("Missing required parameters: redirectUri");
        if (typeof clientId !== "string" || typeof clientSecret !== "string" || typeof redirectUri !== "string") throw new Error("Invalid parameter types: clientId, clientSecret, redirectUri must be strings");

        this.clientId = clientId ? clientId : "";
        this.clientSecret = clientSecret ? clientSecret : "";
        this.redirectUri = redirectUri ? redirectUri : "";
    };

    GenerateOAuth2Url({ scope, loginAccount, allowSignUp }) {
        if (!scope) throw new Error("Missing required parameters: scope");
        if (!Array.isArray(scope)) throw new Error("Invalid parameter type: scope must be an array");
        if (loginAccount !== undefined && typeof loginAccount !== "string") throw new Error("Invalid parameter types: loginAccount must be string");
        if (allowSignUp !== undefined && typeof allowSignUp !== "boolean") throw new Error("Invalid parameter type: allowSignUp must be a boolean");

        return new Promise((resolve, reject) => {
            let genState = Crypto.randomBytes(16).toString("hex");
            const genParams = new URLSearchParams({
                client_id: this.clientId,
                redirect_uri: this.redirectUri,
                scope: Array.isArray(scope) ? scope.join(" ") : scope,
                state: genState,
                ...(loginAccount && { login: loginAccount }),
                ...(allowSignUp !== undefined && { allow_signup: allowSignUp.toString() }),
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
                    Accept: "application/json"
                },
                body: genParams.toString()

            }).catch((error) => reject(error));

            const getResult = await getResponse.body.json();
            const formatResult = {
                accessToken: getResult.access_token,
                tokenType: getResult.token_type,
                scope: getResult.scope,
            };

            return resolve(formatResult);
        });
    };

    GetUserProfile({ accessToken, userAgent }) {
        if (!accessToken) throw new Error("Missing required parameter: accessToken");
        if (!userAgent) throw new Error("Missing required parameter: userAgent");
        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");

        return GetUserProfiles({ accessToken, userAgent });
    };

    GetUserRepos({ accessToken, userAgent }) {
        if (!accessToken) throw new Error("Missing required parameter: accessToken");
        if (!userAgent) throw new Error("Missing required parameter: userAgent");
        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
        if (typeof userAgent !== "string") throw new Error("Invalid parameter type: userAgent must be a string");

        return GetUserRepositories({ accessToken, userAgent });
    };

    CloneRepository({ accessToken, repoOwner, repoName, localPath }) {
        if (!accessToken) throw new Error("Missing required parameter: accessToken");
        if (!repoOwner) throw new Error("Missing required parameter: repoOwner");
        if (!repoName) throw new Error("Missing required parameter: repoName");
        if (!localPath) throw new Error("Missing required parameter: localPath");
        if (typeof accessToken !== "string") throw new Error("Invalid parameter type: accessToken must be a string");
        if (typeof repoOwner !== "string") throw new Error("Invalid parameter type: repoOwner must be a string");
        if (typeof repoName !== "string") throw new Error("Invalid parameter type: repoName must be a string");
        if (typeof localPath !== "string") throw new Error("Invalid parameter type: localPath must be a string");

        return CloneGithubRepository({ accessToken, repoOwner, repoName, localPath }).then(() => {
            console.log(`Repository ${repoOwner}/${repoName} cloned successfully!`);
        });
    };
};

module.exports = { GithubOAuth2, Scopes };