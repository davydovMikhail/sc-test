import React, { useState } from 'react';
import Logo from "./img/logo.svg";
import Info from './components/info';
import Split from './components/split';
import Segment from './components/segment';

function App() {
  const [advanced, setAdvanced] = useState(false);
  
  const advancedHandler = () => {
    setAdvanced(!advanced)
  }


  return (
    <main>
      <div className="header-wrapper">
        <div className="header">
          <div className="header__left">
            <img src={Logo} className="header__logo" />
            <div className="switcher">
              <div className="toggle-pill-dark">
                <input 
                  type="checkbox" 
                  id="pill4"
                  name="check"
                  checked={advanced}
                  onChange={advancedHandler}
                />
                <label htmlFor="pill4"></label>
              </div>
              <div className="switcher__title">
                advanced mode
              </div>
            </div>
          </div>
          <div className="header__right">
            <a style={{marginRight: "8px"}} href="" className="button__size button__transparent">CLAIM TEST</a>
            <a href="" className="button__size button__style">CONNECT WALLET</a>
          </div>
        </div>
      </div>

      <div className="bg-wrapper">
        <div className="base">
          <Info />
          { advanced ?
            <Segment/> :
            <Split/>
          }          
        </div>
      </div>
    </main>
  );
}

export default App;
