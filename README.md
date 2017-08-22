nchat
===============

nchat是基于Node.js+Express+Websocket+Promies实现的简单聊天室系统，其主要特性包括：

 + node.js实现异步回调
 + 使用mongodb持久化存储聊天记录
 + 使用Promies串行回调mongoskin操作数据库结果
 + 基于Express框架，部署简单

> nchat的运行环境最好在8.3.0及以上（其实6.0.0也是行的）。

### 运行DEMO效果

线上运行环境DEMO： http://nchat.lusion-blog.cn

![nchat](http://7xqb58.com1.z0.glb.clouddn.com/snipaste_20170822_110601.png)

### 部署和本地运行

 + 安装部署启动mongodb服务（持久化存储聊天记录）
 + git clone https://github.com/lufeng501/nchat.git
 + npm install
 + npm start
 
 > 访问 http://localhost:3000

感谢vue-qq启发：https://github.com/lensh/vue-qq