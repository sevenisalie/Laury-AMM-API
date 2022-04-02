const generateApiKey = require('generate-api-key');
const express = require("express")
const router = express.Router()


const apiKey = generateApiKey()



router.get("/", async (req, res) => {

    const _email = req.query.email
    const _ethAddress = req.query.ethAddress
    const _apiKey = generateApiKey()

    const data = {
        email: _email,
        ethAddress: _ethAddress,
        apiKey: _apiKey,
    }

    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.json(data)
    } catch (err) {
        res.status(500).json({ message: `${err}` })
    }
})

module.exports = [
    router
]