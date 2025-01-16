// import LoginForm from "../../Component/auth/loginForm"
// import AppWrapper from "../firstScreen";
// import logo1 from '../../assets/iDEAL_SOLUTIONS_2.gif';
// import { useEffect } from "react";
// import { useAcad } from "../../Zustand/acad_session";
// import { BASE_URL } from "../../Constant";

// export default function Auth() {
//      const { getNameAndLogo, acad } = useAcad();
//      const { nameAndLogo } = acad;
//      const { logo } = nameAndLogo || {};
//      const logo2 = `${BASE_URL}/ProfilePictures/${logo}`
//      const schoolLogo = logo2 || logo1
//      useEffect(() => {
//           getNameAndLogo();
//      },[])
//      return (
//           <div>
//                <AppWrapper logo={schoolLogo} duration={14500}>
//                     <LoginForm />
//                </AppWrapper>  

//           </div>
//      )
// }
















import LoginForm from "../../Component/auth/loginForm";
import AppWrapper from "../firstScreen";
import logo1 from '../../assets/iDEAL_SOLUTIONS_2.gif';
import { useEffect } from "react";
import { useAcad } from "../../Zustand/acad_session";
import { BASE_URL } from "../../Constant";

export default function Auth() {
     return (
          <div>
               <AppWrapper logo={logo1} duration={14500}>
                    <LoginForm />
               </AppWrapper>  
          </div>
     );
}
