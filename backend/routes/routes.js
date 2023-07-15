const { Router } = require("express");
const authRouter = require("./auth.route");
const postRouter = require("./posts.route");
const profileRouter = require("./profile.route");
const categoryRouter = require("./category.route");
const locationRouter = require("./location.route");

const routes = Router()

routes.use('/auth', authRouter)
routes.use('/post', postRouter)
routes.use('/category', categoryRouter)
routes.use('/location', locationRouter)
routes.use('/profile', profileRouter)

module.exports  = routes