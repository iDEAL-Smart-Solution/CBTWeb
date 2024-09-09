import { useAuth } from "../../Zustand/auth"


export default function ExamCompleted() {
     const { auth } = useAuth();
     const { user } = auth;

     return(
          <div className="text-center page-center-2 box-shadow">
               <p className="display-2">😉😉😉<br />Hello {user.firstName}, you just successfully submitted your exam, you can leave the exam hall quietly now. <br /> Remember to sign out please, check the button at the top right corner of the screen</p>
          </div>
     )
}