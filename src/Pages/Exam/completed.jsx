import React from 'react';
import { useAuth } from "../../Zustand/auth"
import smiley from '../../assets/smiley2.jpg';
export default function ExamCompleted() {
     const { auth } = useAuth();
     const { user } = auth;

     return(
          <div className="text-center page-center-2 box-shadow">
               <p className="display-2"> <img src={smiley} alt="smiley" width='300px' /><br />Hello {user.firstName}, you just successfully submitted your exam, you can leave the exam hall quietly now. <br /> Remember to sign out please, check the button at the top right corner of the screen</p>
          </div>
     )
}