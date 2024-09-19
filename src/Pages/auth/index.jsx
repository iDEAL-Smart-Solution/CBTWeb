import LoginForm from "../../Component/auth/loginForm"
import AppWrapper from "../firstScreen";
import logo from '../../assets/ideal_logo.png';


export default function Auth() {
     return (
          <div>
               <AppWrapper logo={logo} appName="Ideal Solutions" duration={7500}>
                    <LoginForm />
               </AppWrapper>

          </div>
     )
}