import React, { Component } from "react";

import { Translation } from "react-i18next";

//  class About extends Component {
//   render() {
//     return (
//       <div>
//           <Translation>
//             {(t) => <h3>{t("about.content")}</h3>}
//          </Translation>
//       </div>
//     )
//   }
// }

const About = () => {
  return (
    <div>
      <Translation>{(t) => <h3>{t("about.content")}</h3>}</Translation>
    </div>
  );
};

export default About;
