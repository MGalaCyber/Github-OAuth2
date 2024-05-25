const axios = require("axios").default;
const termBox = require("@mgalacyber/termbox");

async function packageNotifier(packageFile) {
    try {
        await axios.get(`https://registry.npmjs.com/${packageFile.name}`).then((result) => {
            const getPackageName = result.data._id;
            const getCurrentVersion = packageFile.version;
            const getLatestVersion = result.data["dist-tags"].latest;

            if (getCurrentVersion !== getLatestVersion) {
                console.log("\n\n");
                let Head1 = `\x1b[31m[ ` + `\x1b[1m\x1b[32m${getPackageName.toUpperCase()}` + `\x1b[31m ]`;
                let Body1 = `\x1b[90mThe module is \x1b[1m\x1b[31mout of date!`;
                let Body2 = `\x1b[90mNew version is \x1b[34mavailable!`;
                let Version = `\x1b[31m[ ` + `\x1b[1m\x1b[33m${getCurrentVersion} ` + `\x1b[1m\x1b[32m--> ` + `\x1b[1m\x1b[35m${getLatestVersion} ` + `\x1b[31m]`;
                let Bar1 = `\x1b[1m\x1b[33m------------------------------------------------------------------`;
                let Head2 = `\x1b[31m[ ` + `\x1b[1m\x1b[32mRUN` + `\x1b[31m ]`;
                let Body3 = `\x1b[1m\x1b[31mnpm install ` + `\x1b[1m\x1b[33m${getPackageName}` + `\x1b[1m\x1b[35m@latest`;
                let Body4 = `\x1b[90mto update version`;
                let Bar2 = `\x1b[1m\x1b[33m------------------------------------------------------------------`;
                let Head3 = `\x1b[31m[ ` + `\x1b[1m\x1b[32mCHANGELOGS` + `\x1b[31m ]`;
                let Body5 = `\x1b[34mhttps://www.npmjs.com/package/${getPackageName}`;

                termBox([Head1, Body1, Body2, Version, Bar1, Head2, Body3, Body4, Bar2, Head3, Body5]);
                console.log("\n\n");
            };
        });
    } catch (error) {
        console.error("Error checking for updates:", error.message);
    };
};

module.exports = packageNotifier;