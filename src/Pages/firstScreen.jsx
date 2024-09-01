import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const FirstScreen = ({ logo, appName }) => {
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
               backgroundColor: '#f0f0f0',
          }}>
               <motion.div
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="fixed inset-0 flex items-center justify-center bg-gray-900"
               >
                    <div className="text-center">
                         <img src={logo} alt="App Logo" className="w-24 h-24 mx-auto mb-4" />
                         <h1 className="text-2xl font-bold text-white">{appName}</h1>
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
