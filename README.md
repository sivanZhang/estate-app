## 项目结构
> 所有开发的源代码都保存在src文件夹下

``` bash
│
├── dist
│   └── ...        # 打包后的放到生产环境的文件
├── src
│   ├── main.js    # 入口JS文件
    ├── theme.css  # 公共样式
    ├── App.vue    # 根组件
    ├── api
    │   └── ...    # 抽取出API请求
    ├── assets
    │   └── ...    # 静态文件
    ├── axios
    │   └── ...    # 封装AXIOS
    ├── components
    │   └── ...    # 基础组件（它们会在各个组件中被频繁的用到）
    ├── plugins
    │   └── ...    # 插件
    ├── router
    │   └── ...    # 路由封装
    ├── views
    │   └── ...    # 页面组件
    └── store
        └── ...    # 状态管理
```

## 常用命令

``` bash
# install dependencies based on package.json
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
