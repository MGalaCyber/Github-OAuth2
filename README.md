<p align="center">
    <a href="https://nodei.co/npm/@mgalacyber/github-oauth2">
        <img src="https://nodei.co/npm/@mgalacyber/github-oauth2.png">
    </a>
</p>

# GITHUB OAUTH2

**Github OAuth2** is a comprehensive utility designed for Github integration, offering robust functionalities for user authentication and profile management.

## Features
- 🚀 Streamlined OAuth2 workflow for seamless user authentication and authorization.
- 📦 Retrieve comprehensive user profiles, including details like username, avatar, and other.

## Installation
npm:
```bash
$ npm install @mgalacyber/github-oauth2
```
yarn:
```bash
$ yarn add @mgalacyber/github-oauth2
```

## Simple to Use
### CommonJs (CJS) syntax
```js
const { GithubOAuth2 } = require("@mgalacyber/github-oauth2");
```
### ECMAScript Modules (ESM) syntax
```ts
import { GithubOAuth2 } from "@mgalacyber/github-oauth2";
```

# Get Started

## CREATE CLIENT
1. Create a new application on the [Github Developer](https://github.com/settings/applications/new)
2. Follow guide from official [Github Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps)

### Create OAuth2
```js
const { GithubOAuth2 } = require("@mgalacyber/github-oauth2");

const oauth2 = new GithubOAuth2({
    clientId: "123456789012345678", // Required
    clientSecret: "1234567890ABCDEFGHIJ1234567890", // Required
    redirectUri: "https://example.com/callback" // Required
});
```
### Generate OAuth2 URL
```js
const { Scopes } = require("@mgalacyber/github-oauth2");

oauth2.GenerateOAuth2Url({
    scope: [ // Required
        Scopes.User,
        Scopes.UserEmail,
        Scopes.UserFollow,
        Scopes.ReadUser,
        Scopes.Repo,
    ],
    loginAccount: "Username", // Optional
    allowSignUp: true // Optional

}).then((result) => {
    console.log(result);
    // Response {
    //     state: string,
    //     url: string,
    // }
});
```
### Get Access Token
```js
oauth2.GetAccessToken(callbackCode).then((result) => {
    console.log(result);
    // Response {
    //     accessToken: string,
    //     tokenType: string,
    //     scope: string,
    // }
});
```

## USER OAUTH2
2. Follow guide from official [Github Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes)

### Get User Profile
> [!TIP]
> Require scope for this function:
> - Use the `user` scope to retrieve the user profile.
> - Use the `repo` scope to retrieve the user's `public repository` and `private repository` status.
```js
oauth2.UserSchemas.GetUserProfile({
    accessToken: "1234567890ABCDEFGHIJ1234567890", // Required
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0", // Required

}).then((result) => {
    console.log(result);
    // Response {
    //     login: string;
    //     id: number;
    //     nodeId: string;
    //     avatarUrl: string;
    //     gravatarId: string;
    //     url: string;
    //     htmlUrl: string;
    //     followersUrl: string;
    //     followingUrl: string;
    //     gistsUrl: string;
    //     starredUrl: string;
    //     subscriptionsUrl: string;
    //     organizationsUrl: string;
    //     reposUrl: string;
    //     eventsUrl: string;
    //     receivedEventsUrl: string;
    //     type: string;
    //     siteAdmin: boolean;
    //     name: string;
    //     company: string;
    //     blog: string;
    //     location: string;
    //     email: string;
    //     hireable: boolean;
    //     bio: string;
    //     twitterUsername: string;
    //     publicRepos: number;
    //     publicGists: number;
    //     followers: number;
    //     following: number;
    //     createdAt: string;
    //     updatedAt: string;
    //     privateGists: string;
    //     totalPrivateRepos: number;
    //     ownedPrivateRepos: number;
    //     diskUsage: number;
    //     collaborators: number;
    //     twoFactorAuthentication: boolean;
    //     plan: {
    //         name: string;
    //         space: number;
    //         collaborators: number;
    //         privateRepos: number;
    //     }
    // }
});
```

### Get User Emails
> [!TIP]
> Require scope for this function:
> - Use the `user:email` scope to retrieve the user emails.
```js
oauth2.UserSchemas.EmailSchemas.GetEmails({
    accessToken: "1234567890ABCDEFGHIJ1234567890", // Required
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0", // Required

}).then((result) => {
    console.log(result);
    // Response [
    //     {
    //         email: string;
    //         primary: boolean;
    //         verified: boolean;
    //         visibility: string;
    //     },
    // ]
});
```

### Get User Repositories
> [!TIP]
> Require scope for this function:
> - Use the `repo` scope to retrieve the user's `public repository` and `private repository` status.
```js
oauth2.UserSchemas.GetUserRepositories({
    accessToken: "1234567890ABCDEFGHIJ1234567890", // Required
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0", // Required

}).then((result) => {
    console.log(result);
    // Response [
    //     {
    //         id: number;
    //         nodeId: string;
    //         name: string;
    //         fullName: string;
    //         private: boolean;
    //         owner: {
    //             login: string;
    //             id: number;
    //             nodeId: string;
    //             avatarUrl: string;
    //             gravatarId: string;
    //             url: string;
    //             htmlUrl: string;
    //             followersUrl: string;
    //             followingUrl: string;
    //             gistsUrl: string;
    //             starredUrl: string;
    //             subscriptionsUrl: string;
    //             organizationsUrl: string;
    //             reposUrl: string;
    //             eventsUrl: string;
    //             receivedEventsUrl: string;
    //             type: string;
    //             siteAdmin: boolean;
    //         };
    //         htmlUrl: string;
    //         description: string;
    //         fork: boolean;
    //         url: string;
    //         forksUrl: string;
    //         keysUrl: string;
    //         collaboratorsUrl: string;
    //         teamsUrl: string;
    //         hooksUrl: string;
    //         issueEventsUrl: string;
    //         eventsUrl: string;
    //         assigneesUrl: string;
    //         branchesUrl: string;
    //         tagsUrl: string;
    //         blobsUrl: string;
    //         gitTagsUrl: string;
    //         gitRefsUrl: string;
    //         treesUrl: string;
    //         statusesUrl: string;
    //         languagesUrl: string;
    //         stargazersUrl: string;
    //         contributorsUrl: string;
    //         subscribersUrl: string;
    //         subscriptionUrl: string;
    //         commitsUrl: string;
    //         gitCommitsUrl: string;
    //         commentsUrl: string;
    //         issueCommentUrl: string;
    //         contentsUrl: string;
    //         compareUrl: string;
    //         mergesUrl: string;
    //         archiveUrl: string;
    //         downloadsUrl: string;
    //         issuesUrl: string;
    //         pullsUrl: string;
    //         milestonesUrl: string;
    //         notificationsUrl: string;
    //         labelsUrl: string;
    //         releasesUrl: string;
    //         deploymentsUrl: string;
    //         createdAt: string;
    //         updatedAt: string;
    //         pushedAt: string;
    //         gitUrl: string;
    //         sshUrl: string;
    //         cloneUrl: string;
    //         svnUrl: string;
    //         homepage: string;
    //         size: number;
    //         stargazersCount: number;
    //         watchersCount: number;
    //         language: string;
    //         hasIssues: boolean;
    //         hasProjects: boolean;
    //         hasDownloads: boolean;
    //         hasWiki: boolean;
    //         hasPages: boolean;
    //         hasDiscussions: boolean;
    //         forksCount: number;
    //         mirrorUrl: string;
    //         archived: boolean;
    //         disabled: boolean;
    //         openIssuesCount: number;
    //         license: {
    //             key: string;
    //             name: string;
    //             spdxId: string;
    //             url: string;
    //             nodeId: string;
    //         };
    //         allowForking: boolean;
    //         isTemplate: boolean;
    //         webCommitSignoffRequired: boolean;
    //         topics: string[];
    //         visibility: string;
    //         forks: number;
    //         openIssues: number;
    //         watchers: number;
    //         defaultBranch: string;
    //         permissions: {
    //             admin: boolean;
    //             maintain: boolean;
    //             push: boolean;
    //             triage: boolean;
    //             pull: boolean;
    //         };
    //     },
    // ]
});
```

### Clone Github Repositories
> [!TIP]
> Require scope for this function:
> - Use the `repo` scope to retrieve the user's `public repository` and `private repository` permission.
```js
oauth2.RespositorySchemas.CloneRepository({
    accessToken: "1234567890ABCDEFGHIJ1234567890", // Required
    repoName: "example", // Required
    repoOwner: "username", // Required
    localPath: "./folderPath" // Required

}).then((result) => {
    console.log(result);
    // Response: { any }
});
```


## How It Works
**Github OAuth2** simplifies user authentication and profile management for Github-integrated applications. It offers a straightforward OAuth2 workflow, enabling developers to seamlessly integrate Github features into their projects.

## Bugs, glitches and issues
If you encounter any problems feel free to open an issue in our
- [GitHub Repository](https://github.com/MGalaCyber/Github-OAuth2/issues)
- [Telegram Group](https://t.me/GalaxyUniverseOfficial)
- [Discord Server](https://discord.gg/uESnRWjEwv)