import ethcur from "../img/ethcur.svg";
import splitcur from "../img/splitcur.svg";

const Split = () => {
    
    return (
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
                  SPLIT POINT
                </div>
                <input placeholder='POINT' className="segment__input" />
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
    );
  };
  
export default Split;