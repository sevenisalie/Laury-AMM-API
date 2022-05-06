const mongoose = require("mongoose")
require("dotenv").config()

const URI = process.env.MONGODB_URI
mongoose.connect(URI)

const UserSchema = new mongoose.Schema({
    created: {
        type: Date,
        set: d => new Date(d * 1000)
      },
    username: {type: String},
    password: {type: String},
    apikey: {type: String},
    
})

const Users = mongoose.model("Users", UserSchema)



// CRUD

const createUser = async (data) => {
    try {
        const entry = new Users(
            {
                username: data.username,
                password: data.password,
                apikey: data.apikey
            }
        )

        await entry.save()
        console.log(`${entry} created`)
    } catch (err) {
        console.log(err)
    }
}

const getUser = async (_username) => {
    const user = Users.findOne({ username: _username});
      return user
}

module.exports = {
    createUser,
    getUser
}