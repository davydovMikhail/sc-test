import { useState, useEffect } from "react";
import Currswitcher from "./currswitcher";
import { useTypedSelector } from "../storeHooks/useTypedSelector";
import { Currency } from "../types/main";

const Split = () => {
    const { currency, ethBalance, splitBalance } = useTypedSelector(state => state.main);

    const [point, setPoint] = useState(500); 
    const [amount, setAmount] = useState(1);

    useEffect(() => {
      handleValidateAmount(amount);
    },[currency]);

    function handleValidatePoint(_point: number) {
        if (_point < 50) {
            setPoint(50);
        } else if (_point > 950) {
            setPoint(950);
        } else {
            setPoint(Math.trunc(_point));
        }
    }
    function handleValidateAmount(_amount: number) {
      if (_amount < 1 && currency === Currency.Split) {
          setAmount(1);
      } else if (_amount < 0.000001 && currency === Currency.Ether) {
          setAmount(0.000001);
      } else if (_amount > splitBalance && currency === Currency.Split) {
          setAmount(Number((splitBalance - 0.01).toFixed(2)));
      } else if (_amount > ethBalance && currency === Currency.Ether) {
          setAmount(Number((ethBalance - 0.000001).toFixed(6)));
      } else if (_amount < 0) {
          setAmount(0);  
      } else {
          setAmount(_amount);
      }
    }
    function changePoint(_diff: number) {
        const newPoint = Number(point) + _diff;
        handleValidatePoint(newPoint);
    }
    function getRange() {
        if(point < 50 || point > 950) {
          return NaN
        }
        return point;
    }
    function getPercent() {
        if(point < 50 || point > 950) {
            return NaN
        }
        return point / 10;
    }
    function getLeftPayout() {
        if(point < 50 || point > 950) {
          return NaN
        }
        const numerator = currency === Currency.Ether ? 98 : 99.5;
        const answer = (amount * numerator) / getPercent(); 
        return currency === Currency.Ether ? answer.toFixed(4) : answer.toFixed(2);
    }
    function getRightPayout() {
        if(point < 50 || point > 950) {
          return NaN
        }
        const numerator = currency === Currency.Ether ? 98 : 99.5;
        const answer = (amount * numerator) / (100 - getPercent()); 
        return currency === Currency.Ether ? answer.toFixed(4) : answer.toFixed(2);
    }
    function getWidth() {
        if (!getPercent()) {
            return 50;
        }
        return getPercent();
    }

    function handleDoubleAmount() {
      const doubleAmount = amount * 2;
      if(doubleAmount > ethBalance && currency === Currency.Ether) {
        setAmount(Number((ethBalance - 0.000001).toFixed(6)));
      } else if (doubleAmount > splitBalance && currency === Currency.Split) {
        setAmount(Number((splitBalance - 0.01).toFixed(2)));
      } else {
          setAmount(doubleAmount);
      }
    }
    function handleMaxAmount() {
      if(currency === Currency.Ether) {
        setAmount(Number((ethBalance - 0.000001).toFixed(6)));
      } else if (currency === Currency.Split) {
        setAmount(Number((splitBalance - 0.01).toFixed(2)));
      }  
    }
    function handleHalfAmount() {
        const halfAmount = amount / 2;
        if(halfAmount < 1 && currency === Currency.Split) {
          setAmount(1);
        } else if (halfAmount < 0.000001 && currency === Currency.Ether) {
          setAmount(0.000001);
        } else {
          setAmount(Number(halfAmount.toFixed(currency === Currency.Ether? 6 : 2)));
        }
    }
    function handleMinAmount() {
        if(currency === Currency.Ether) {
          setAmount(0.000001);
        } else if(currency === Currency.Split) {
          setAmount(1);  
        }
    }
    
    return (
        <div className="game">
            <div className="chance">
              <div className="chance__text">
                <div>payout by left(${currency})</div>
                <div style={{textAlign: "right"}}>payout by right(${currency})</div>
              </div>
              <div className="chance__amount">
                <div className="chance__amount_left">{getLeftPayout()}</div>
                <div className="chance__amount_right">{getRightPayout()}</div>
              </div>
              <div className="chance__percent">
                <div>{getPercent()} %</div>
                <div>{(100 - getPercent()).toFixed(1)} %</div>
              </div>
              <div className="line">
                <div style={{width: `${getWidth()}%`}} className="line__left"></div>
                <div style={{width: `${100 - getWidth()}%`}} className="line__right"></div>
              </div>
              <div 
                className="range"
              >
                <div className="range__item range__left">
                  0 - { getRange() - 1 }
                </div>
                <div className="range__item range__right">
                { getRange() } - 999
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
                <input 
                  placeholder='POINT' 
                  className="segment__input"
                  type="number"
                  step="1"
                  value={point || ''}
                  onChange={(e) => setPoint(Number(e.target.value))}  
                  onBlur={(e) => handleValidatePoint(Number(e.target.value))}  
                />
                <div className="segment__buttons">
                  <button 
                    className="segment__setter"
                    onClick={() => changePoint(-25)}
                  >
                    -25
                  </button>
                  <button
                    className="segment__setter"
                    onClick={() => changePoint(25)}
                  >
                    +25
                  </button>
                  <button 
                    className="segment__setter"
                    onClick={() => changePoint(-200)}
                  >
                    -200
                  </button>
                  <button 
                    className="segment__setter"
                    onClick={() => changePoint(200)}
                  >
                    +200
                  </button>
                </div>
              </div>
              <div className="split__amount">
                <div className="segment__title">
                  BID AMOUNT (${currency})
                </div>
                <div className="segment__bid">
                    <input
                      type="number"
                      placeholder='AMOUNT'
                      className="bid__input"
                      value={amount || ''}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      onBlur={(e) => handleValidateAmount(Number(e.target.value))} 
                    />
                    <Currswitcher />
                </div>
                <div className="segment__buttons">
                    <button onClick={() => handleDoubleAmount()} className="segment__setter">
                        Double
                    </button>
                    <button onClick={() => handleHalfAmount()} className="segment__setter">
                        Half
                    </button>
                    <button onClick={() => handleMaxAmount() } className="segment__setter">
                        Max
                    </button>
                    <button onClick={() => handleMinAmount()} className="segment__setter">
                        Min
                    </button>
                </div>
              </div>
            </div>
        </div>
    );
  };
  
export default Split;