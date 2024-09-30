import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginApp from './LoginApp';
import MainApp from './MainApp';


function RootApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Routes>
        <Route path="/main" element={<MainApp setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="*" element={<LoginApp setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
};

export default RootApp;