import LoginForm from "../../Component/auth/loginForm";
import AppWrapper from "../firstScreen";

export default function Auth() {
     return (
          <div className="position-relative min-vh-100 d-flex flex-column">
               <AppWrapper duration={10000}>
                    <LoginForm />
               </AppWrapper>

                        </div>
     );
}
