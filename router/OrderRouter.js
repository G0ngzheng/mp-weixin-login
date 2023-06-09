import Router from "koa-router";
import jwt from 'jsonwebtoken'
import {PRIVATE_KEY} from "../private/index.js";

const router = new Router({ prefix: '/order' })
// const user_token = fs.readFileSync('./token.txt', {
//     encoding: 'utf-8'
// })


router.get('/list',(ctx) => {
    console.log(ctx.header)
    const { token } = ctx.header
    // console.log('user_token', user_token === token)
    jwt.verify(token, PRIVATE_KEY, (err, data) => {
        if (!err) {
            console.log('data', data)
        }
    })

    ctx.body = 'order list'

})


export  default  router
