import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo1 from '../../src/assets/iDEAL_SOLUTIONS_2.gif';
import { useAcad } from '../Zustand/acad_session';
import { BASE_URL } from '../Constant';


const FirstScreen = ({ logo }) => {
     return (
          <div style={{
               position: 'fixed',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
          }}>
               <motion.div
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3.0, ease: "easeInOut" }}
               >
                    <div className="text-center">
                         <motion.span>
                              <img src={logo} alt='ideal' style={{ width: '700px', height: '500px' }} />
                         </motion.span>
                    </div>
               </motion.div>
          </div>
     );
};

const AppWrapper = ({ appName, duration, children }) => {
     const [showSplash, setShowSplash] = useState(true);
     const { getNameAndLogo, acad } = useAcad();
     useEffect(() => {
          getNameAndLogo();
     }, [])
     const { nameAndLogo, loading } = acad;
     const { logo } = nameAndLogo || {};
     const logo2 = `${BASE_URL}/ProfilePictures/${logo}`
     const schoolLogo = logo ? logo2 : logo1


     useEffect(() => {
          const timer = setTimeout(() => {
               setShowSplash(false);
          }, duration);

          return () => clearTimeout(timer);
     }, [duration]);

     return showSplash ? (
          loading ? <div className="loader-cell">
               <div className="loader"></div>
          </div> 
          : 
          <FirstScreen logo={schoolLogo} appName={appName} />
     ) : (
          children
     );
};

export default AppWrapper;