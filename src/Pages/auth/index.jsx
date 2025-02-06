import LoginForm from "../../Component/auth/loginForm";
import AppWrapper from "../firstScreen";
import logo1 from '../../assets/iDEAL-Animation.mp4';
import logo from '../../assets/iDEAL-logo.jpg';

export default function Auth() {
     return (
          <div className="position-relative min-vh-100 d-flex flex-column">
               <AppWrapper logo={logo1} duration={7000}>
                    <LoginForm />
               </AppWrapper>

                        </div>
     );
}
