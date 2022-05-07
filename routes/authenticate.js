const generateApiKey = require('generate-api-key');
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const {createUser, getUser, getUserByKey} = require("../models/User")

const apiKey = generateApiKey()
const users = []

const usernameExists = async (_username) => {
    const user = await getUser(_username)
    if (user === null) {
        return false
    } else {
        return true
    }
}

const verifyUserKey = async (_apiKey) => {
    const user = await getUserByKey(_apiKey)
    if (user === null) {
        return false
    } else {
        return true
    }
}

const findUser = (_username) => {
    const results = users.filter((user) => {
        return user.username.toLowerCase() === _username.toLowerCase()
    })

    if (results.length > 0) {
        return results[0]
    } else {
        return []
    }
}

router.post("/createUser", async (req, res) => {
    const userExists = await usernameExists(req.body.username)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    if (userExists) {
        return res.status(500).json({
            message: "User Exists"
           })
    } else {
        try {

            if (req.body.username !== "" && req.body.password !== "") {
    
                    const _apikey = generateApiKey()
                    const hashed = await bcrypt.hash(req.body.password, 10)
                    const _user = {username: req.body.username, password: hashed, apikey: _apikey}
                    await createUser(_user)
                    res.status(201).json({
                        message: _user
                    })
        
     
            } else {
                res.status(500).json({
                    message: "error"
                   })            }
        } catch (err) {
            console.log(err)
        }
    }
    

    

})

router.post("/login", async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");

        const user = await getUser(req.body.username)
        console.log(user)
        console.log(await usernameExists(req.body.username))


        if (user !== undefined) {
            const auth = await bcrypt.compare(req.body.password, user.password)
            if (auth === true) {
                res.status(201).json({
                    message:`Logged in ${user.username}`
                    })
            } 
        } else {
            res.status(500).json({
                message: "Couldn't find User"
               })
        } 
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Couldn't login"
           })
    }

})



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

module.exports = {
    authRouter: router,
    verifyKey: verifyUserKey
}