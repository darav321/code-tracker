import puppeteer from "puppeteer";
import client from "../../Redis/client.js";
import User from "../models/user.model.js";

export const setUsername = async (req, res) => {
    try {
        const {username, id} = req.body
        if(!username) {
            return res.status(404).json({message : "Username not Found"})
        }
        if(!id) {
            return res.status(404).json({message : "User not found"})
        }
        const user = await User.updateOne(
            {_id : id},
            {$set : {gfg_username : username}}
        )
    } catch (error) {
        console.log("Error while setting gfg username")
        return res.status(500).json({message : "Internal server error"})
    }
}

export const gfgUserDetails = async (req, res) => {
    try {
        const { username } = req.params;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }

        // const cacheData = await client.get(`gfg:${username}`);
        // if (cacheData) {
        //     return res.status(200).json(JSON.parse(cacheData));
        // }

        await client.del(`gfg:${username}`);

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const profileUrl = `https://auth.geeksforgeeks.org/user/${username}`;

        await page.goto(profileUrl, { waitUntil: "networkidle2" });

        const scoreElements = await page.$$(".scoreCard_head_left--score__oSi_x");
        const languageElement = await page.waitForSelector(".educationDetails_head_right--text__lLOHI");
        const problemStatusElement = await page.$$(".problemNavbar_head_nav--text__UaGCx")
        const contestElement = await page.$$(".contestDetailsCard_head_detail--text__NG_ae")

        let codingScore = "N/A";
        let problemsSolved = "N/A";
        let schoolLevel = "N/A";
        let basicLevel = "N/A";
        let easyLevel = "N/A";
        let mediumLevel = "N/A";
        let hardLevel = "N/A";
        let contestRating = "N/A";
        let contestLevel = "N/A";
        let contestRank = "N/A";
        let contestAtt = "N/A";

        if (scoreElements.length > 0) {
            codingScore = await scoreElements[0].evaluate(el => el.textContent.trim());
        }
        if (scoreElements.length > 1) {
            problemsSolved = await scoreElements[1].evaluate(el => el.textContent.trim());
        }

        schoolLevel = await problemStatusElement[0].evaluate(el => el.textContent.trim())
        const schoolLevelNumber = schoolLevel.match(/\d+/)[0];
        const school = parseInt(schoolLevelNumber, 10);
        basicLevel = await problemStatusElement[1].evaluate(el => el.textContent.trim())
        const basicLevelNumber = basicLevel.match(/\d+/)[0];
        const basic = parseInt(basicLevelNumber, 10);
        easyLevel = await problemStatusElement[2].evaluate(el => el.textContent.trim())
        const easyLevelNumber = easyLevel.match(/\d+/)[0];
        const easy = parseInt(easyLevelNumber, 10);
        mediumLevel = await problemStatusElement[3].evaluate(el => el.textContent.trim())
        const mediumLevelNumber = mediumLevel.match(/\d+/)[0];
        const medium = parseInt(mediumLevelNumber, 10);
        hardLevel = await problemStatusElement[4].evaluate(el => el.textContent.trim())
        const hardLevelNumber = hardLevel.match(/\d+/)[0];
        const hard = parseInt(hardLevelNumber, 10);

        contestRating = await contestElement[0].evaluate(el => el.textContent.trim())
        contestLevel = await contestElement[1].evaluate(el => el.textContent.trim())    
        contestRank = await contestElement[2].evaluate(el => el.textContent.trim())
        contestAtt = await contestElement[3].evaluate(el => el.textContent.trim())
        

        const languageUsed = await languageElement.evaluate(el => el.textContent.trim());


        await browser.close();

        const responseData = {
            mage: "GFG Data Fetched",
            codingScore,
            problemsSolved,
            languageUsed,
            school,
            basic,
            easy,
            medium,
            hard,
            contestRating,
            contestLevel,
            contestRank,
            contestAtt
        };

        await client.set(`gfg:${username}`, JSON.stringify(responseData), "EX", 600);

        res.status(200).json(responseData);

    } catch (error) {
        console.error("Scraping Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
