# Taro 多端小程序开发大型实战

【已完成】这里是《Taro 多端小程序开发大型实战》系列教程的源代码仓库。

### 项目预览

微信小程序云效果，微信小程序全流程：登录、发帖、展示帖子列表、查看帖子详情：

![1705b4e9b0b79869.2020-03-10 11_01_12](https://imgkr.cn-bj.ufileos.com/3faf1ee5-dbef-4593-9a33-d56453c69485.gif)

LeanCloud 效果，支付宝小程序全流程：登录、发帖、展示帖子列表、查看帖子详情：

![1705b4e9b0b79869.2020-03-10 11_01_12](https://imgkr.cn-bj.ufileos.com/5e84e7f3-c08e-456b-a354-a8fa1c52337e.gif)

### 项目界面说明（以微信小程序为例）

##### 首页

主要是展示帖子列表，每个帖子包含：1）标题 2）描述 3）发帖人用户头像 4）发帖人用户名

![00831rSTgy1gcony1tdh3j30ho0vojt4](https://imgkr.cn-bj.ufileos.com/629e6b4a-57b2-43e7-b217-b05ade7dc1f1.png)



#### 帖子详情页

主要展示帖子详情，是另外一个页面，因为对于帖子列表展示的信息有限，详情页可以展示更多的帖子正文信息

![00831rSTgy1gconz8dq34j30hu0vkta0](https://imgkr.cn-bj.ufileos.com/55df083d-4116-4a21-94c2-45a938df8391.png)



#### 发帖页面

主题用于给登录用户发帖，包含标题和正文，发的帖子会自动带上登录用户的身份信息

![00831rSTgy1gcoo0t75bbj30hq0vwgnk](https://imgkr.cn-bj.ufileos.com/06cc32c1-484f-4148-9f43-0122f83e2cd9.png)

#### 我的页面

已登录：展示用户头像和用户名

![00831rSTgy1gcoo2hl2q3j30hs0vutaw](https://imgkr.cn-bj.ufileos.com/7942c63e-ff72-4ed1-b713-6b5ea08c9c2a.png)

未登录：展示普通登录按钮和微信登录

![00831rSTgy1gcoo2tiuqkj30hm0vwq48](https://imgkr.cn-bj.ufileos.com/2de5d050-0e13-439a-bc91-802e342587e3.png)

未登录，进行登录界面：上传头像和输入昵称，昵称会自动作为用户主键标志

![位图](https://imgkr.cn-bj.ufileos.com/9f1c1d72-b59d-4a10-bb07-d125ae5baaf0.png)

## 体验项目

克隆本仓库，然后进入 ultra-club：

```bash
git clone https://github.com/tuture-dev/ultra-club.git
cd ultra-club
```

安装 npm 包：

```bash
npm install
# yarn
```

开启微信小程序开发服务器：

```bash
npm run dev:weapp
# yarn dev:weapp
```

开启支付宝小程序开发服务器：

```bash
npm run dev:alipay
# yarn dev:alipay
```

## 教程内容概要

1. [熟悉的 React，熟悉的 Hooks](https://tuture.co/2019/12/25/34a473b/)
   - 用脚手架初始化项目
   - 用熟悉的 React 代码编写用户界面
   - 使用 React Hooks 重构状态管理
2. [多页面跳转和 Taro UI 组件库](https://tuture.co/2019/12/25/af69225/)
   - 用自带路由功能搭建多页面应用
   - 用 Taro UI 组件库升级界面
3. [实现微信和支付宝多端登录](https://tuture.co/2019/12/25/5e10118/)
   - 微信登录
   - 支付宝登录
   - 普通登录
   - 退出登录
4. [使用 Hooks 版的 Redux 实现应用状态管理](https://tuture.co/2020/01/15/5e100f7/)
   1. 使用 Hooks 版本的 react-redux 来做绑定库
   2. 将应用全流程接入 redux
   3. 处理关于 loading 相关的加载
5. [尝鲜微信小程序云](https://tuture.co/2020/01/17/b32362b/)
   1. 在 redux-saga 中使用微信小程序云
   2. 接通微信小程序云全流程
6. [LeanCloud，一统江湖]()
   1. 在 redux-saga 中使用微信小程序云
   2. 接通微信小程序云全流程

## 反馈

欢迎对此教程的内容进行反馈（无论是疑问还是改进意见），可以在文章下方留言，也可以在此仓库创建 Issue！

### 联系我们

- [微信公众号](https://tuture.co/images/social/wechat.png)：关注公众号，加图雀酱微信拉你进学习交流群
- [掘金](https://juejin.im/user/5b33414351882574b9694d28)
- [知乎专栏](https://zhuanlan.zhihu.com/tuture)
- 知乎圈子：搜索 图雀社区
- 也可以直接扫码下方的二维码关注微信公众号哦：

![](https://imgkr.cn-bj.ufileos.com/24d1bc26-9cb8-4c50-bf4b-bfee05633e95.png)

## 许可证

MIT。

