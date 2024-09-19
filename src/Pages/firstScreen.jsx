import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

const AppWrapper = ({ logo, appName, duration, children }) => {
     const [showSplash, setShowSplash] = useState(true);

     useEffect(() => {
          const timer = setTimeout(() => {
               setShowSplash(false);
          }, duration);

          return () => clearTimeout(timer);
     }, [duration]);

     return showSplash ? (
          <FirstScreen logo={logo} appName={appName} />
     ) : (
          children
     );
};

export default AppWrapper;





{/* <motion.span
key={index}
initial={{ opacity: 0 }}
animate={{ opacity: 2 }}
transition={{
  duration: 1.0,
  delay: index * 0.4,
}}
> */}

// return (
//      <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: '#f0f0f0',
//      }}>
//           <motion.div
//                initial={{ opacity: 0, rotate: 0 }}
//                animate={{ opacity: 1, rotate: 360 }}
//                exit={{ opacity: 0 }}
//                transition={{ duration: 1.0, ease: "easeInOut" }}
//                className=""
//           >
//                <div className="text-center">
//                     {/* <img src={logo} alt="App Logo" className="w-24 h-24 mx-auto mb-4" /> */}
//                     <h1 className="bold display-1">{appName}</h1>
//                </div>
//           </motion.div>
//      </div>
// );









     // // const letters = appName.split("");
     // return (
     //      <div style={{
     //           position: 'fixed',
     //           top: 0,
     //           left: 0,
     //           right: 0,
     //           bottom: 0,
     //           display: 'flex',
     //           flexDirection: 'column',
     //           justifyContent: 'center',
     //           alignItems: 'center',
     //           backgroundColor: 'var(--secondary-color)',
     //      }}>
     //           <motion.div
     //                initial={{ opacity: 0 }}
     //                animate={{ opacity: 1 }}
     //                exit={{ opacity: 0 }}
     //                transition={{ duration: 1.0, ease: "easeInOut" }}
     //                className=""
     //           >
     //                <div className="text-center">
     //                     {/* <h1 className="bold color-primary display-1">
     //                          {letters.map((letter, index) => (
     //                               <motion.span
     //                                    key={index}
     //                                    initial={{ y: -200, opacity: 0 }}
     //                                    animate={{ y: 0, opacity: 1 }}
     //                                    transition={{
     //                                         duration: 0.6,
     //                                         delay: index * 0.4,
     //                                         ease: "easeOut"
     //                                    }}
     //                                    style={{ display: 'inline-block' }}
     //                               >
     //                                    {letter}
     //                               </motion.span>
     //                          ))}
     //                     </h1> */}
     //                     <motion.span>
     //                          <img src={logo} alt='ideal' />
     //                     </motion.span>

     //                </div>
     //           </motion.div >
     //      </div >
     // );
