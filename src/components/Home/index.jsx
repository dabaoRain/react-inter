import React, { Component } from 'react'

import { withTranslation  } from "react-i18next";

//类式组件

//  class Home extends Component {
//   render() {
//     const {t} = this.props

//     return (
//       <div>
//            <h3>{t("home.content")}</h3>
//       </div>
//     )
//   }
// }

//函数式组件
const Home = ({t})=>{
  return (
    <div>
         <h3>{t("home.content")}</h3>
    </div>
  )
}

export default withTranslation()(Home)
