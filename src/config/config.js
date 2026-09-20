import dotenv from "dotenv"

dotenv.config()

const Config={

    ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_SECRET:process.env.REFRESH_TOKEN_SECRET,
    MONGO_URI:process.env.MONGO_URI,
}

export default Config