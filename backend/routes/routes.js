const { Router } = require("express");
const authRouter = require("./auth.route");
const profileRouter = require("./profile.route");

const routes = Router()

routes.use('/auth', authRouter)
routes.use('/post', postRouter)
routes.use('/profile', profileRouter)

module.exports  = routes