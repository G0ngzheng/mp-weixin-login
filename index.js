console.log('hello world')

import Koa from 'koa'
import LoginRouter from "./router/LoginRouter.js";
import OrderRouter from "./router/OrderRouter.js";
import WxPayRouter from "./router/WxPayRouter.js";
import BodyParser from 'koa-bodyparser'

const app = new Koa()

app.use(BodyParser())

app.use(LoginRouter.routes())
app.use(LoginRouter.allowedMethods())
app.use(OrderRouter.routes())
app.use(OrderRouter.allowedMethods())
app.use(WxPayRouter.routes())
app.use(WxPayRouter.allowedMethods())

app.listen(9991, () => {
    console.log('serve start at 9991')
})
