const { Router } = require("express");
const authRouter = require("./auth.route");

const routes = Router()

routes.use('/auth', authRouter)

module.exports  = routes