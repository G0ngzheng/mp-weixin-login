import Router from 'koa-router'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { writeFile } from 'fs'
import { PRIVATE_KEY, app_id, app_secret } from "../private/index.js";


const router = new Router({ prefix: '/login' })

let current_token = ''

// 获取 session_key 和 open_id
router.get('/check', async (ctx, next) => {
    console.log(ctx.query.code)
    const { code } = ctx.query
    console.log(code)
    const result = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
            appid: app_id,
            secret: app_secret,
            js_code: code,
            grant_type: 'authorization_code'
        }
    })

    const token = jwt.sign(result.data, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 1000
    })
    console.log('111', token)
    writeFile('./token.txt', token, {
        encoding: "utf-8"
    }, (err) => {
        if (!err) {
            console.log('token.txt 写入成功')
        }
    })
    ctx.body = {
        token: token
    }
})


router.get('/phone', async(ctx) => {
    const { code } = ctx.query
    console.log(code)
    const result = await axios.get('https://api.weixin.qq.com/cgi-bin/token', {
        params: {
            appid: app_id,
            secret: app_secret,
            grant_type: 'client_credential'
        }
    })

    console.log('result', result)

    const res = await axios.post(`https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${result.data.access_token}`, {
        code,
    })
    console.log(res)
    ctx.body = 'hello world'
})



export  default  router
