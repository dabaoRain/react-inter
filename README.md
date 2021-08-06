## 如何理解多语言国际化？

![44444444444.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c07553a5d75a4a45bdaf5b302c91ea60~tplv-k3u1fbpfcp-watermark.image)

图片中下拉部分已经清楚的说明了多语言国际化是什么了。

个人理解：它就是我们在网站上可以通过切换语言类型来实现同一功能的不同展示效果。

## react-i18next介绍

   react-i18next 是一个强大的React / React Native国际化框架，它基于i18next的React插件。
   
## 安装依赖

     npm install react-i18next i18next --save
     
     既然是要学习使用react-i18next，为什么还需要安装i18next包？
     
     i18next才是提供所有翻译功能的核心,react-i18next是为了与 react一起使用提供了一些额外的功能。
     
## 项目文件结构
   
![11111111.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bb218ffda8c4ee5a6fd74cab6621f69~tplv-k3u1fbpfcp-watermark.image)

## 项目配置

   ### 1.本地json数据初始化(新建简体、繁体、英文三个json文件)
     大家看下zh-cn.json文件的数据结构，繁体和英文结构是一样的，只是内容不同。  
```
{
  "home":{
    "title":"首页",
    "content":"我是首页",
  },
  "about":{
    "title":"关于我们",
    "content":"我是关于我们"
  }
}
```

   ### 2.创建配置react-i18next的react-i18next-config.js文件
      
```
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//i18next-browser-languagedetector插件 这是一个 i18next 语言检测插件，用于检测浏览器中的用户语言，
//详情请访问：https://github.com/i18next/i18next-browser-languageDetector
import LanguageDetector from 'i18next-browser-languagedetector';
//引入需要实现国际化的简体、繁体、英文三种数据的json文件
import cn from './locales/zh-cn.json'
import hk from './locales/zh-HK.json'
import en from './locales/en-us.json'
const resources = {
  cn: {
    translation: cn
  },
  hk: {
    translation: hk
  },
  en: {
    translation: en
  },
};
i18n.use(LanguageDetector) //嗅探当前浏览器语言 zh-CN
.use(initReactI18next) // 将 i18n 向下传递给 react-i18next
  .init({ //初始化
    resources, //本地多语言数据
    fallbackLng: "cn", //默认当前环境的语言
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie'],
    }
  })

export default i18n
```
      
   ### 3.然后将react-i18next-config.js 引入到App.js组件
      
`import i18n from './react-i18next-config'`
      
    这样的话react-i18next和i18next 就可以作用到App组件以及它的所有子组件上了。

   ### 4.默认语言和默认数据
     项目初始化后，用户浏览器的默认语言为zh-CN
     根据react-i18next-config.js文件中关于resources的配置：
     
```
"zh-CN": {
    translation: './locales/zh-cn.json'
  },
  "zh-HK": {
    translation: './locales/zh-HK.json'
  },
  "en-US": {
    translation: './locales/en-us.json'
  },
```
     根据上述配置我们可以判断出默认请求的数据为./locales/zh-cn.json


   ### 4.开发选择切换语言组件
       <div>
           <label>语言切换</label>
           <select value={language} onChange={(e)=>changeLanguage(e)}>
             <option value="zh-CN">简</option>
             <option value="zh-HK">繁</option>
             <option value="en-US">英</option>
           </select>
        </div>       

    当我们进行语言切换时，将调用组件中的changeLanguage方法。

    这个方法的调用会做下面几件事：
    
    1、对当前选择的语言类型进行更新操作 
      const [language,setLanguage] = useState('zh-CN')
      setLanguage(当前选中的语言类型)，更新页面中选中的语言类型对应的文字
      
    2.执行由react-i18next-config.js导出的i18n上面的changeLanguage
      (当前选中的语言类型)方法。
      
      执行了i18n.changeLanguage后：
      
      a.更新数据源
        "zh-CN": {
            translation: './locales/zh-cn.json'
          },
          "zh-HK": {
            translation: './locales/zh-HK.json'
          },
          "en-US": {
            translation: './locales/en-us.json'
          },
        根据选中的语言类型去获取对应的json数据
        
      b.更新语言类型
        localStorage中i18nextLng的值
       
   ### 5. i18next-browser-languagedetector插件引入
   
       安装i18next-browser-languagedetector插件后，可以探测出当前浏览器的用户语言为zh-CN。
       此时会在localStorage中设置i18nextLng为zh-CN。

       那么这里为什么会在localStorage中存储呢？键值为什么是i18nextLng呢?
![22222222.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/886f26669dce4341956a769ad47001b8~tplv-k3u1fbpfcp-watermark.image)

`上述代码就是i18next-browser-languagedetector插件的源码，我们可以清楚的看到是插件默认将浏览器的用户语言（zh-CN）存储到localStorage中去的，并设置键名为 i18nextLng`

   #### 自定义配置
    如果我们需要自定义的话 可以通过官方文档中的Detector Options进行配置,例如：
    初始化项目后，我们不仅希望localStorage中存储了i18nextLng，
    同时希望在sessionStorage、cookie中也存储i18nextLng。
    可以进行如下配置：
    detection: {
        caches: ['localStorage', 'sessionStorage', 'cookie'],
    }
    将上述配置放到i18n初始化init的配置对象中去就可以了。

  #### localStorage存储i18nextLng的作用
  
    众所周知，localStorage是不会随着页面刷新、标签关闭造成数据丢失的，
    也就是说当我们刷新页面时，我们仍然可以拿到上一次用户选择的语言类型，
    并且按照这个语言类型去加载对应的json文件数据。
    
  更多配置，请访问 i18next-browser-languageDetector官方文档： 
  https://github.com/i18next/i18next-browser-languageDetector
  
## 如何使用react-i18next进行渲染，进而实现页面多语言切换呢？
   
   1. useTranslation (hook)

     注意：useTranslation()必须是函数组件中使用否则会报，hooks错误。  
```
 const { t } = useTranslation()
 <NavLink to="/home">{t('home.title')}</NavLink>
```

   2. Translation (render prop)
```
import {Translation} from 'react-i18next'

<Translation>
  {(t) => <h3>{t("about.content")}</h3>}
</Translation>
```

   3. withTranslation (HOC) 高阶组件方式

     react-i18next 内部封装了一个高阶组件withTranslation,
     我们需要利用这个高阶组件把我们自己的组件包装一次
```
import { withTranslation } from 'react-i18next'; 
//类组件
class Home extends Component {
  render() {
    const {t} = this.props

    return (
      <div>
          <h3>{t("home.content")}</h3>
      </div>
    )
  }
}
//函数组件
const Home = ({t})=>{
  return (
    <div>
        <h3>{t("home.content")}</h3>
    </div>
  )
}
//组件导出：
export default withTranslation()(Home)
```

## 参考文档
   https://react.i18next.com/

   https://www.i18next.com/

   https://github.com/i18next/react-i18next
   
   https://github.com/i18next/i18next

   
