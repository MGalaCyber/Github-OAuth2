import {
    GenerateOAuth2UrlParams,
    RepositoryCloneParams,
    GetUserProfileParams,
    GetUserRepositories,
    GetUserEmailsParams,
    FollowUserParams,
    GetUserPublicEmails,
    UnfollowUserParams,
    IsFollowingParams,
    FollowingOtherUserParams,
    FollowersParams,
    FollowingParams,
    FollowersListParams,
    FollowingListParams
} from "../utils/Constants";
import {
    GenerateOAuth2Url,
    AuthorizationToken,
    UserProfile,
    UserRepositories,
    UserEmails,
    Followers,
    Following,
    FollowersList,
    FollowingList
} from "../utils/Results";

export class GithubOAuth2 {
    public constructor({ clientId, clientSecret, redirectUri }: {
        clientId: string;
        clientSecret: string;
        redirectUri: string;
    });

    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;

    /**
     * Generate a oauth2 URL.
     * @param {GenerateOAuth2Url} options - Options for generating OAuth URL.
     * @param {Object} options - Options for generating OAuth URL.
     * @param {string} options.state - The state type.
     * @param {string[]} options.scope - The scope of authorization.
     * @param {string} options.prompt - The prompt type.
     * @param {string} options.responseType - The response type.
     * @param {number} options.integrationType - The installation context. Choose between "GuildInstall" or "UserInstall".
     * @returns {Promise<GenerateOAuth2Url>} - A promise that resolves with the generated OAuth URL.
     */
    public GenerateOAuth2Url(options: GenerateOAuth2UrlParams): Promise<GenerateOAuth2Url>;

    /**
     * Retrieves access token based on provided callback code.
     * @param {string} callbackCode - The callback code.
     * @returns {Promise<AuthorizationToken>} - A promise that resolves with the access token.
     */
    public GetAccessToken(callbackCode: string): Promise<AuthorizationToken>;

    public UserSchemas: {
        /**
         * Retrieves user profile based on provided access token.
         * @param {GetUserProfileParams} options - Options for generating user profile.
         * @param {string} options.accessToken - The access token.
         * @param {string} options.userAgent - The header user agent.
         * @returns {Promise<UserProfile>} - A promise that resolves with the user profile.
         */
        GetUserProfile(options: GetUserProfileParams): Promise<UserProfile>;

        /**
         * Retrieves user repos based on provided access token.
         * @param {GetUserRepositories} options - Options for generating user repos.
         * @param {string} options.accessToken - The access token.
         * @param {string} options.userAgent - The header user agent.
         * @returns {Promise<[UserRepositories]>} - A promise that resolves with the user repos.
         */
        GetUserRepositories(options: GetUserRepositories): Promise<[UserRepositories]>;

        EmailSchemas: {
            /**
             * Retrieves user profile based on provided access token.
             * @param {GetUserEmailsParams} options - Options for generating user profile.
             * @param {string} options.accessToken - The access token.
             * @param {string} options.userAgent - The header user agent.
             * @returns {Promise<[UserEmails]>} - A promise that resolves with the user profile.
             */
            GetEmails(options: GetUserEmailsParams): Promise<[UserEmails]>;

            /**
             * Retrieves user profile based on provided access token.
             * @param {GetUserPublicEmails} options - Options for generating user profile.
             * @param {string} options.accessToken - The access token.
             * @param {string} options.userAgent - The header user agent.
             * @returns {Promise<[UserEmails]>} - A promise that resolves with the user profile.
             */
            GetPublicEmails(options: GetUserPublicEmails): Promise<[UserEmails]>;
        }

        Followers: {
            /**
             * Retrieves follow user based on provided access token.
             * @param {FollowUserParams} options - Options for generating user profile.
             * @param {string} options.accessToken - The access token.
             * @param {string} options.userAgent - The header user agent.
             * @param {string} options.username - The username.
             */
            Follow(options: FollowUserParams): Promise<[any]>;

            /**
             * Retrieves unfollow user based on provided access token.
             * @param {UnfollowUserParams} options - Options for generating user profile.
             * @param {string} options.accessToken - The access token.
             * @param {string} options.userAgent - The header user agent.
             * @param {string} options.username - The username.
             */
            Unfollow(options: UnfollowUserParams): Promise<[any]>;

            /**
             * Retrieves user is following a user based on provided access token.
             * @param {IsFollowingParams} options - Options for generating user profile.
             * @param {string} options.accessToken - The access token.
             * @param {string} options.userAgent - The header user agent.
             * @param {string} options.username - The username.
             */
            IsFollowing(options: IsFollowingParams): Promise<[any]>;

            /**
             * Retrieves user is following other user based on provided access token.
             * @param {FollowingOtherUserParams} options - Options for generating user profile.
             * @param {string} options.accessToken - The access token.
             * @param {string} options.userAgent - The header user agent.
             * @param {string} options.username - The username.
             * @param {string} options.target - The target user.
             */
            FollowingOtherUser(options: FollowingOtherUserParams): Promise<[any]>;

            /**
             * Retrieves user followers based on provided access token.
             * @param {FollowersParams} options - Options for generating user profile.
             * @param {string} options.accessToken - The access token.
             * @param {string} options.userAgent - The header user agent.
             * @returns {Promise<[Followers]>} - A promise that resolves with the user repos.
             */
            Followers(options: FollowersParams): Promise<[Followers]>;

            /**
             * Retrieves user following based on provided access token.
             * @param {FollowingParams} options - Options for generating user profile.
             * @param {string} options.accessToken - The access token.
             * @param {string} options.userAgent - The header user agent.
             * @returns {Promise<[Following]>} - A promise that resolves with the user repos.
             */
            Following(options: FollowingParams): Promise<[Following]>;

            /**
             * Retrieves user followers list based on provided access token.
             * @param {FollowersListParams} options - Options for generating user profile.
             * @param {string} options.accessToken - The access token.
             * @param {string} options.userAgent - The header user agent.
             * @param {string} options.username - The username.
             * @returns {Promise<[FollowersListParams]>} - A promise that resolves with the user repos.
             */
            FollowersList(options: FollowersListParams): Promise<[FollowersList]>;

            /**
             * Retrieves user following list based on provided access token.
             * @param {FollowingListParams} options - Options for generating user profile.
             * @param {string} options.accessToken - The access token.
             * @param {string} options.userAgent - The header user agent.
             * @param {string} options.username - The username.
             * @returns {Promise<[FollowingList]>} - A promise that resolves with the user repos.
             */
            FollowersList(options: FollowingListParams): Promise<[FollowingList]>;
        }
    }
    public RespositorySchemas: {
        /**
         * Clones a repository using an access token.
         * @param {RepositoryCloneParams} options - Parameters for cloning the repository.
         * @param {string} options.accessToken - GitHub access token.
         * @param {string} options.repoOwner - Repository owner.
         * @param {string} options.repoName - Repository name.
         * @param {string} options.localPath - Local path to save the repository.
         * @returns {Promise<any>} - Output from the git clone command.
         */
        Clone(options: RepositoryCloneParams): Promise<any>;
    }
}