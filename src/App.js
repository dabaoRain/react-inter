import {useState,useEffect} from 'react'

import { BrowserRouter as Router, Route,NavLink,Redirect} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'

// the hook
import { useTranslation } from "react-i18next"

import i18n from './react-i18next-config'


import './App.css'


function App() {

  const {t} = useTranslation();
   
  const [language,setLanguage] = useState('zh-CN')

  const changeLanguage = (e)=>{
    setLanguage(e.target.value)
    i18n.changeLanguage(e.target.value)
  }

  useEffect(() => {
    let type = localStorage.getItem("i18nextLng");
    if(type) {
      setLanguage(type)
    } else {
      //如果被清空了 那么当前语言会被设置为默认语言 zh-C 
    }
  }, [])
  
  return (
    <div className="App">
      <Router>
        <div>
           <label>语言切换</label>
           <select value={language} onChange={(e)=>changeLanguage(e)}>
             <option value="zh-CN">简</option>
             <option value="zh-HK">繁</option>
             <option value="en-US">英</option>
           </select>
        </div>
        <ul className="nav">
          <li>
              <NavLink to="/home">{t('home.title')}</NavLink>
          </li>
          <li>
            <NavLink to="/about">{t('about.title')}</NavLink>
          </li>
        </ul>
        <div className="routes">
           <Redirect path="/" to="/home" /> 
           <Route path="/home" component={Home}></Route>
           <Route path="/about" component={About}></Route>
           
        </div>
      </Router>
    </div>
  );
}

export default App;
