# mp-weixin-login
mp-weixin

![img.png](image/img.png)

## 使用 mp-weixin 结合 koa 实现小程序登录流程及 token 返回

* 使用 wx.login 获取 code 实现登录
* 使用 button 结合 getPhoneNumber 实现快速授权登录

#### 安装依赖
```shell
npm install
```

#### 启动服务
```shell
npm run serve
```

#### 路由访问
```text
wx.login http://localhost:9991/login/check
```

```text
phone http://localhost:9991/login/check
```

```text
http://localhost:9991/order/list
```
