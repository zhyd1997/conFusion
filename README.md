[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

> Coursera [course](https://www.coursera.org/learn/front-end-react/home/welcome) 
>public repo: https://github.com/jmuppala/conFusion-React

## Development

- UI 框架: Bootstrap
- JS 库：React (hooks)
- 服务端开发：Node + Express + MongoDB

![Three Tier Architecture](https://i.imgur.com/BoSbHOA.png)

## Code Lint

采用了 [Airbnb 的 ESLint 配置](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb),
前端 `eslint-config-airbnb`，后端为 `eslint-config-airbnb-base`

## Cloud Provider

最新项目由阿里云 ECS 迁移到 [Heroku](https://www.heroku.com/) 平台

### 部署流程简化

1. 自动化脚本部署：

```json
{
  "scripts": {
      "build:ui": "cd path/to/front-end && yarn build --prod && cp -r build path/to/back-end",
      "deploy": "git push heroku master",
      "deploy:full": "yarn build:ui && git add . && git commit -m uibuild && yarn deploy",
      "logs:prod": "heroku logs --tail"
    }
}
```

2. github 同步部署

![github 同步部署](https://i.imgur.com/dZoqnI3.jpg)

### 配置路由
前端路由是虚拟的，阿里云服务器上可以用 Nginx 配置，使用 Heroku 平台时需要在 `app.js` 中加入以下代码：

```js
const path = require('path')
// ...
// 其他路由写在前面，注意执行顺序
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})
```

## Optimization

- lazy load
    - [react-lazy-load](https://github.com/loktar00/react-lazy-load)

- compression
    - [compression](https://github.com/expressjs/compression)