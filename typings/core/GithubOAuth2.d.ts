import {
    GenerateOAuth2UrlParams,
    GetUserProfile,
} from "../utils/Constants";
import {
    GenerateOAuth2Url,
    AuthorizationToken,
    UserProfile,
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

    /**
     * Retrieves user profile based on provided access token.
     * @param {GetUserProfile} options - Options for generating user profile.
     * @param {string} options.accessToken - The access token.
     * @param {string} options.userAgent - The header user agent.
     * @returns {Promise<UserProfile>} - A promise that resolves with the user profile.
     */
    public GetUserProfile(options: GetUserProfile): Promise<UserProfile>;
}