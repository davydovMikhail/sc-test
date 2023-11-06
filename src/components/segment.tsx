import ethcur from "../img/ethcur.svg";
import splitcur from "../img/splitcur.svg";

const Segment = () => {
    
    return (
        <div className="game">
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
          </div> 
    );
  };
  
export default Segment;