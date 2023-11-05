import React from 'react';
import Logo from "./img/logo.svg";
import Girl from "./img/girl.png";
import wallet from "./img/wallet.svg";
import win from "./img/win.svg";
import ethcur from "./img/ethcur.svg";
import splitcur from "./img/splitcur.svg";


function App() {
  return (
    <main>
      <div className="header-wrapper">
        <div className="header">
          <div className="header__left">
            <img src={Logo} className="header__logo" />
            <div className="switcher">
              <div className="toggle-pill-dark">
                <input type="checkbox" id="pill4" name="check" />
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
          <div className="info">
            <div className="info__girl">
              <img className="info__pic" src={Girl} alt="" />
            </div>
            <div className="info__max">
              <div className="info__maxtitle">
                Maximum payout:
              </div>
              <div className="info__maxinfo">
                40,000 $SPLIT
              </div>
            </div>
            <div className="info__text">
              <img style={{marginRight: "12px"}} src={wallet} alt="" />
              <div>
                balance: 100,000 $SPLIT
              </div>
            </div>
            <div className="info__text">
              <img style={{marginRight: "12px"}} src={win} alt="" />
              <div>
                Guess the split!
              </div>
            </div>
          </div>
          {/* <div className="game">
            <div className="chance">
              <div className="chance__text">
                <div>PAYOUT</div>
                <div>CHANCE OF WIN</div>
              </div>
              <div className="chance__amount">
                <div className="chance__amount_left">20.00</div>
                <div className="chance__amountpercent">20.95%</div>
              </div>
              <div className="line">
                <div style={{width: "15%"}} className="line__left_dark"></div>
                <div style={{width: "35%"}} className="line__middle"></div>
                <div style={{width: "50%"}} className="line__right_dark"></div>
              </div>
              <div className="range">
                <div style={{marginLeft: "15%", marginRight: "auto"}} className="range__item range__left">
                  0
                </div>
                <div style={{marginLeft: "auto", marginRight: "50%"}} className="range__item range__right">
                  500
                </div>
              </div>
              <button className="decision__play">
                play
              </button>
            </div>
            <div className="segment">
              <div className="segment__from">
                <div className="segment__title">
                  FROM
                </div>
                <input placeholder='FROM' className="segment__input" />
                <div className="segment__buttons">
                  <button className="segment__setter">
                    -50
                  </button>
                  <button className="segment__setter">
                    +50
                  </button>
                  <button className="segment__setter">
                    -500
                  </button>
                  <button className="segment__setter">
                    +500
                  </button>
                </div>
              </div>
              <div className="segment__to">
                <div className="segment__title">
                  TO
                </div>
                <input placeholder='TO' className="segment__input" />
                <div className="segment__buttons">
                  <button className="segment__setter">
                    -50
                  </button>
                  <button className="segment__setter">
                    +50
                  </button>
                  <button className="segment__setter">
                    -500
                  </button>
                  <button className="segment__setter">
                    +500
                  </button>
                </div>
              </div>
              <div className="segment__amount">
                <div className="segment__title">
                  BID AMOUNT ($SPLIT)
                </div>
                <div className="segment__bid">
                  <input placeholder='AMOUNT' className="bid__input" />
                  <div className="bid__switch">
                    <button className="bid__eth">
                      <img src={ethcur} alt="" />
                      <div>ETH</div>
                    </button>
                    <button className="bid__split">
                      <img src={splitcur} alt="" />
                      <div>SPLIT</div>
                    </button>
                  </div>
                </div>
                <div className="segment__buttons">
                  <button className="segment__setter">
                    Double
                  </button>
                  <button className="segment__setter">
                    Half
                  </button>
                  <button className="segment__setter">
                    Max
                  </button>
                  <button className="segment__setter">
                    Min
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="game">
            <div className="chance">
              <div className="chance__text">
                <div>payout by left</div>
                <div>payout by right</div>
              </div>
              <div className="chance__amount">
                <div className="chance__amount_left">20.00</div>
                <div className="chance__amount_right">20.00</div>
              </div>
              <div className="chance__percent">
                <div>20%</div>
                <div>20%</div>
              </div>
              <div className="line">
                <div style={{width: "20%"}} className="line__left"></div>
                <div style={{width: "80%"}} className="line__right"></div>
              </div>
              <div className="range">
                <div className="range__item range__left">
                  0 - 199
                </div>
                <div className="range__item range__right">
                  200 - 999
                </div>
              </div>
              <div className="decision">
                <button className="decision__left">
                  left
                </button>
                <button className="decision__right">
                  right
                </button>
              </div>
            </div>

            <div className="split">
              <div className="split__point">
                <div className="segment__title">
                  TO
                </div>
                <input placeholder='TO' className="segment__input" />
                <div className="segment__buttons">
                  <button className="segment__setter">
                    -50
                  </button>
                  <button className="segment__setter">
                    +50
                  </button>
                  <button className="segment__setter">
                    -500
                  </button>
                  <button className="segment__setter">
                    +500
                  </button>
                </div>
              </div>
              <div className="split__amount">
                <div className="segment__title">
                  BID AMOUNT ($SPLIT)
                </div>
                <div className="segment__bid">
                  <input placeholder='AMOUNT' className="bid__input" />
                  <div className="bid__switch">
                    <button className="bid__eth">
                      <img src={ethcur} alt="" />
                      <div>ETH</div>
                    </button>
                    <button className="bid__split">
                      <img src={splitcur} alt="" />
                      <div>SPLIT</div>
                    </button>
                  </div>
                </div>
                <div className="segment__buttons">
                  <button className="segment__setter">
                    Double
                  </button>
                  <button className="segment__setter">
                    Half
                  </button>
                  <button className="segment__setter">
                    Max
                  </button>
                  <button className="segment__setter">
                    Min
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
