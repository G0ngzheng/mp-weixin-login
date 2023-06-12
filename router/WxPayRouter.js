import Router from 'koa-router'
import WxPay from 'wechatpay-node-v3'
import fs from 'node:fs'

const router = new Router({ prefix: '/pay' })

const randomNumber = () => {
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString();
    return orderCode;
}

const pay = new WxPay({
    appid: '111111111', // 小程序 appId
    mchid: '222222222', // 微信商户号
    // 公私钥的内容需要替换一下
    publicKey: fs.readFileSync('./pay_key/PUBLIC_KEY.pem'),
    privateKey: fs.readFileSync("./pay_key/PRIVATE_KEY.pem")
})


router.get('/', async (ctx, next) => {
    const {openid} = ctx.params
    const params = {
        description: '支付测试', // 订单描述
        out_trade_no: randomNumber(), // 订单号
        // 这个需要在真实服务器上开启一个路由监听
        // 并已经安装过 ssl 证书
        // 我在下面写了一个 callback 的post 请求就是用于在支付成功发起时
        notify_url: 'https://xxx/callback',
        amount: {
            total: 1, // 支付金额，单位为分
        },
        payer: {
            openid, // 小程序传递
        },
        scene_info: {
            payer_client_ip: 'ip', // 支付者ip，这个不用理会
        },
    }

    const result = await pay.transactions_jsapi(params)
    console.log('result', result)
    ctx.body = result
})


router.post('/callback', (ctx, next) => {
    // 申请的APIv3
    // https://pay.weixin.qq.com/index.php/core/cert/api_cert#/ 最下方
    let key = 'xxxxx';
    let { ciphertext, associated_data, nonce } = ctx.request.body.resource;
    // // 解密回调信息
    const result = pay.decipher_gcm(ciphertext, associated_data, nonce, key);
    // 拿到订单号
    let { out_trade_no } = result;
    if (result.trade_state == 'SUCCESS') {
        // 支付成功之后需要进行的业务逻辑
        console.log('支付成功', out_trade_no)
    }
    ctx.body = 'ok'
})




export default router
