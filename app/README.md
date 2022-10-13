# 项目准备
    1.本项目为Vue2项目，涉及知识包括vue-cli、axios、router、Less等
    2.通过vue-cli创建项目，vue create app
    3.打开vue2的浏览器扩展程序
# 项目配置
    1.启动项目时自动在浏览器中打开
        在package.json文件中"serve": "vue-cli-service serve"改为"serve": "vue-cli-service serve --open"
        注意：
        vue-cli@5.x.x版本默认打开http://0.0.0.0:8080/，错误，需要在vue.config.js文件中配置：
            devServer: {
                open: true,
                host: 'localhost',
                port: 8080
            }
        如果自动打开的不是谷歌浏览器，可以在自己电脑设置中修改谷歌浏览器为默认浏览器即可
    2.关闭eslint语法检查
        在vue.config.js文件中配置：lintOnSave: false
    3.给src文件夹设置别名为@，方便使用
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
# 组件分析
    1.非路由组件----放置在components文件夹中(全局共用) 
        header
        footer
    2.路由组件----放置在pages或者views文件夹中
        home
        search
        login
        register
# 配置路由
    1.创建router文件夹，文件夹下创建inde.js文件
    2.在index.js中引入vue和vue-router
    3.使用路由组件，Vue.use()
    4.引入组件，创建路由对象并暴露
    5.在入口文件main.js中引入index.js路由文件，注册路由
    6.在组件中通过router-view注意
    注意：
    注册完路由，所有的组件身上都有了$route和$router
        $route----路由组件信息(路径、query、params等)
        $router----用于编程式路由导航(push、replace)
    路由的跳转有两种形式，声明式路由导航和编程式路由导航
        声明式路由导航能做的(跳转)，编程式路由导航都可以做，编程式导航还可以写其他业务逻辑(提交数据)
    路由重定向，当项目运行时，我们访问http://localhost:8080自动跳转到home页面(放在最后，前面的匹配上了后面就不会匹配)
        {
            path: '*',  //*或者/都可以
            redirect: '/home'
        }
    控制路由组件显隐
        在index.js的路由配置中，用mate: {xxx: true}设置一个属性来控制布尔值，用v-show="$route.xxx"来控制显隐
    路由传参
        有query参数和params参数两种
        都有对象写法和字符串写法，对象写法指定路由可以name或path，但是注意params只能配合name使用
    指定params参数传与不传，在path中params参数占位后添加问号?
        path: '/search/:keyWord?' //index.js文件
    指定params参数传与不传，如果传的是空串""，在params参数中，给参数如果是空串时设置undefined
        params: {keyWord: '' || undefined}  //组件中
    路由可以传递props参数，有3种形式，在组件中通过props：['xxx', 'xx', 'xx']接收，方便组件读取数据(不用带$route前缀)
        props: true; ----将params参数转为props参数  //index.js文件
        props: {xxx: '???', xx: '??'}; ----对象形式传递props参数，写死的数据不灵活  //index.js文件
        props: ($route) => ({xxx: '$route.xxx'})----函数形式传递props参数(常用)  //index.js文件
    编程式路由跳转到当前路由(参数不变)，多次执行会抛出NavigationDuplicated的警告错误
        方法一：vue-router引入了promise，this.$router.push和this.$router.replace第二、第三参数写promise回调就可以解决
            this.$router.push({name: 'xxx', params: {'key': 'value'} }, () => {}, (err) => {console.log(err.message)})
        方法二：在入口文件中缓存VueRouter原型的push、repalce方法，重写VueRouter.prototype.push和VueRouter.prototype.replace方法，我们重写的方法依然使用原本的push和replace方法，不过在重写的方法内部进行判断，如果参数中有成功和失败的回调，则直接传入参数执行原本的push、replace方法，否则，手动传入成功和失败的回调作为push和repalce的第二、三参数再执行(从根本上解决问题)
            let originPush = VueRouter.prototype.push;
            VueRouter.prototype.push = function(location, reslove, reject) {
                if (reslove && reject) {
                    originPush.call(this, reslove, reject);
                } else {
                    originPush.call(this, () => {}, () => {});
                }
            }
# 接口
    1.用postman工具测试接口，返回code=200即为成功，表明接口正常
    2.接口统一管理
        项目小----在组件的生命周期内发送请求
        项目大----统一管理，将请求封装成一个函数，在组件中直接调用就可以，方便以后修改接口
    3.代理跨域
        在vue.config.js文件中配置devServer，记得重启项目
# axios二次封装
    1.axios二次封装，可以设置请求拦截器(在发送请求之前可以处理一些业务)、响应拦截器(在服务区数据返回之后可以处理一些业务)
        比如接口当中，路径都带有/api，baseURL: "/api"
    2.const requests = axios.create();可以创建一个名为requests的axios实例，对外默认暴露requests，requests就是axios，只不过经过了小小的配置
    3.放在api文件夹中
# nprogress进度条
    1.nprogress进度条----显示加载进度
    2.安装nprogress包，npm i nprogress --save
    3.引入进度条包和进度条样式文件(进度条颜色可以修改)
    4.nprogress.start();----进度条开始
      nprogress.done();----进度条结束    
# vuex模块开发
    1.vuex实现任何组件间通信
    2.使用vuex一定要引入vue和vuex，并且Vue.use(Vuex)使用vuex插件
    3.state----储存数据
      actions----书写业务逻辑、处理异步，commit给mutations
      mutations----操作state里的数据
      getters----相当于计算属性，计算state里的数据，方便读取
    4.vuex模块开发
        将每个模块的state、actions、mutations、getters放在一个文件，并暴露项目仓库
        在 export default new Vuex.Store()中通过modules注册项目仓库
            export default new Vuex.Store({
                modules: {
                    xxx,
                    xx
                }
            })
# 卡顿问题
    1.原因在于操作过快，浏览器反应不过来
    2.解决办法：
        防抖----用户操作很频繁，但是只执行最后一次(取消上次定时器)
            function throttle_event(fn) {
                clearTimeout(fn.__timebar);
                fn.__timebar = setTimeout(fn, 200);
            };
        节流----用户操作很频繁，但是把频繁的操作变成少量的操作(上锁)
            function throttle_time(fn) {
                if (fn.__lock) {
                    return;
                };
                fn.__lock = true;
                fn();
                setTimeout(function() {
                    fn.__lock = false;
                },1000);
            };
# 模拟数据(mock)
    1.安装mockjs插件
    2.在src目录中创建mock文件夹，准备好json格式数据，注意格式化，不能留有空格，会跑不起来
    3.把mock需要的图片资源文件夹放置在public文件夹下
        打包时，public文件夹的资源会原封不动的放在dist文件夹下
    4.创建mockServe.js
    5.在入口文件中引入mockServe.js，至少执行一次才能模拟数据

# swiper(轮播图)
    1.安装swiper插件
    2.在组件中引入swiper
    3.引入swiper模板

# 放大镜
    1.绝对定位
    2.通过display控制遮罩层和放大图片的显示隐藏
    3.获取鼠标位置，通过鼠标位置计算遮罩层的绝对位置top、left
    4.踩坑：
        另外在原本的图片上覆盖一个透明、绝对定位盒子，且z-index：999，将mousemove事件绑定给该盒子
        如果把mousemove事件直接绑定给原本的图片，由于鼠标同时位于遮罩层和图片内，事件受到影响，移动时会卡顿

# 登录
    bug:需要点击2次登录按钮才能登录成功，并且地址栏url出现奇奇怪怪的参数
    原因：from表单的button默认为提交按钮类型，并且提交到action="##"的地址
    解决：删掉from的action="##",阻止按钮默认行为，在点击事件后添加.prevent,如@click.prevent="xxx"
        

