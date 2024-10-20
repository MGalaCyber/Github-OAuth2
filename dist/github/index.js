module.exports = {
    OAuth2Url: require("./genOAuth2Url"),
    AccessToken: require("./genAccessToken"),

    User: {
        Profile: require("./User/profile"),
        Email: require("./User/email"),
        Followers: require("./User/followers"),
        Repositories: require("./User/repositories")
    },

    Respository: {
        Clone: require("./Repository/clone")
    }
};