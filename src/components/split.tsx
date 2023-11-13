import { useState, useEffect, useRef } from "react";
import Currswitcher from "./currswitcher";
import { useTypedSelector } from "../storeHooks/useTypedSelector";
import { Currency } from "../types/main";
import { useEthers } from "@usedapp/core";
import { toast } from "react-toastify";
import { useActions } from '../storeHooks/useActions';
import { Status } from "../types/main";
import { useGetAllowance } from "../hooks/useGetAllowance";
import { useApproveToGame } from "../hooks/useApproveToGame";
import { useGetLastSplitID } from "../hooks/useGetLastSplitID";
import { useGetEtherBal } from "../hooks/useGetEtherBal";
import { useGetTokenBal } from "../hooks/useGetTokenBal";
import { useBidSplit } from "../hooks/useBidSplit";
import { useGetCurrentBlockNumber } from "../hooks/useGetBlockNumber";
import { usePlaySplit } from "../hooks/usePlaySplit";
import { useGetRandomSplit } from "../hooks/useGetRandomSplit";
import { useGetMaxEtherPayout } from "../hooks/useGetMaxEtherPayout";
import { useGetMaxTokenPayout } from "../hooks/useGetMaxTokenPayout"; 
import SetInterval from 'set-interval'

const Split = () => {
    const { currency, ethBalance, splitBalance, maxEthPayout, maxSplitPayout, status } = useTypedSelector(state => state.main);
    const { SetStatus, SetNotification, SetEthBal, SetSplitBal, SetEthPayout, SetSplitPayout } = useActions();
    const { account } = useEthers();

    const [point, setPoint] = useState(500); 
    const [amount, setAmount] = useState(1);
    const firstUpdate = useRef(true);
    const firstIteration = useRef(true);
    const minBidEther = 0.00001;
    const allowanceHook = useGetAllowance();
    const approveHook = useApproveToGame();
    const lastSplitIDHook = useGetLastSplitID();
    const etherBalHook = useGetEtherBal();
    const tokenBalHook = useGetTokenBal();
    const bidHook = useBidSplit();
    const blockHook = useGetCurrentBlockNumber();
    const playHook = usePlaySplit();
    const randomHook = useGetRandomSplit();
    const maxPayoutEtherHook = useGetMaxEtherPayout();
    const maxPayoutTokenHook = useGetMaxTokenPayout();

    useEffect(() => {
      if(!firstUpdate.current) {
        handleValidateAmount(amount);
      }
      firstUpdate.current = false;
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
      } else if (_amount < minBidEther && currency === Currency.Ether) {
          setAmount(minBidEther);
      } else if (_amount > splitBalance && currency === Currency.Split) {
          setAmount(Number((splitBalance - 0.01).toFixed(2)));
      } else if (_amount > ethBalance && currency === Currency.Ether) {
          setAmount(Number((ethBalance - minBidEther).toFixed(5)));
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
        setAmount(Number((ethBalance - minBidEther).toFixed(5)));
      } else if (doubleAmount > splitBalance && currency === Currency.Split) {
        setAmount(Number((splitBalance - 0.01).toFixed(2)));
      } else {
          setAmount(doubleAmount);
      }
    }
    function handleMaxAmount() {
      if(currency === Currency.Ether) {
        setAmount(Number((ethBalance - minBidEther).toFixed(5)));
      } else if (currency === Currency.Split) {
        setAmount(Number((splitBalance - 0.01).toFixed(2)));
      }  
    }
    function handleHalfAmount() {
        const halfAmount = amount / 2;
        if(halfAmount < 1 && currency === Currency.Split) {
          setAmount(1);
        } else if (halfAmount < minBidEther && currency === Currency.Ether) {
          setAmount(minBidEther);
        } else {
          setAmount(Number(halfAmount.toFixed(currency === Currency.Ether? 6 : 2)));
        }
    }
    function handleMinAmount() {
        if(currency === Currency.Ether) {
          setAmount(minBidEther);
        } else if(currency === Currency.Split) {
          setAmount(1);  
        }
    }

    async function handlePlay(_right: boolean) {
      const _point = point; 
      if (!account) {
        toast.info('FIRST CONNECT YOUR WALLET', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
        });
        return;
      }
      if (
        (splitBalance < amount && currency === Currency.Split) || 
        (ethBalance < amount && currency === Currency.Ether)
      ) {
        toast.info('NOT ENOUGH BALANCE', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
        });
        return;
      }
      if (
        (amount < 1 && currency === Currency.Split) || 
        (amount < minBidEther && currency === Currency.Ether)
      ) {
        toast.info(`MINIMUM BET IS ${currency === Currency.Ether ? minBidEther : 1} $${currency}`, {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
        });
        return;
      }
      const payout = _right ? getRightPayout() : getLeftPayout();
      if (
        (maxEthPayout < (payout as number) && currency === Currency.Ether) ||
        (maxSplitPayout < (payout as number) && currency === Currency.Split)
      ) {
        toast.info('PAYOUT EXCEED THE MAX PAYOUT', {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
        });
        return;
      }
      firstIteration.current = true;
      SetStatus(Status.Loader);
      if(currency === Currency.Split) {
        if((await allowanceHook(account) as number) < amount) {
          SetNotification('APPROVE YOUR $SPLIT TOKENS');
          await approveHook();
        }
      }
      SetNotification('CREATING A BID');
      const idBefore = await lastSplitIDHook(account);
      const targetBlock = (await bidHook(amount, point, _right, currency === Currency.Ether))?.blockNumber.toString() as string;
      SetInterval.start(async () => {
        const currentBlock = (await blockHook()) as number;
        const idAfter = await lastSplitIDHook(account);
        if(idBefore !== idAfter && currentBlock > Number(targetBlock) && firstIteration.current) {
          firstIteration.current = false;
          SetInterval.clear('checkHash');
          SetNotification('CONFIRM THE FUNCTION TO FIND OUT THE RESULT');
          await playHook();
          const randomNumber = await randomHook(targetBlock, account);
          let balAfter: number;
          if(currency === Currency.Split) {
            balAfter = (await tokenBalHook(account as string)) as number;
          } else {
            balAfter = (await etherBalHook(account as string)) as number;
          }
          if((!_right && randomNumber < _point) || (_right && randomNumber >= _point)) {
              SetNotification(`WIN. RANDOM: ${randomNumber}`);
              SetStatus(Status.Won);
          } else {
              SetNotification(`LOST. RANDOM: ${randomNumber}`);
              SetStatus(Status.Fail);
          }
          if(currency === Currency.Split) {
            SetSplitBal(balAfter);
          } else {
            SetEthBal(balAfter);
          }
          const maxEther = await maxPayoutEtherHook(); 
          const maxToken = await maxPayoutTokenHook(); 
          SetEthPayout(maxEther as number);
          SetSplitPayout(maxToken as number);
        }
      }, 500, "checkHash")
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
                <button 
                  onClick={() => handlePlay(false)} 
                  className="decision__left"
                  disabled={status === Status.Loader}
                >
                  left
                </button>
                <button 
                  onClick={() => handlePlay(true)} 
                  className="decision__right"
                  disabled={status === Status.Loader}
                >
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