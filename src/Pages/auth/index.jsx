import LoginForm from "../../Component/auth/loginForm"
import AppWrapper from "../firstScreen";
import logo from '../../assets/iDEAL_SOLUTIONS_2.gif';

export default function Auth() {
     return (
          <div>
               {/* <AppWrapper logo={logo} duration={14500}> */}
                    <LoginForm />
               {/* </AppWrapper> */}

          </div>
     )
}