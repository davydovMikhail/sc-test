import { useEffect } from "react"
import win from "../img/win.svg";
import wallet from "../img/wallet.svg";
import Girl from "../img/girl.png";
import { useTypedSelector } from '../storeHooks/useTypedSelector';
import { Currency } from "../types/main";
import { useActions } from '../storeHooks/useActions';
import { useGetMaxEtherPayout } from "../hooks/useGetMaxEtherPayout";
import { useGetMaxTokenPayout } from "../hooks/useGetMaxTokenPayout"; 
import { useGetEtherBal } from "../hooks/useGetEtherBal";
import { useGetTokenBal } from "../hooks/useGetTokenBal"; 
import { useEthers } from "@usedapp/core";

const Info = () => {
    const { currency, notification, maxEthPayout, maxSplitPayout, ethBalance, splitBalance } = useTypedSelector(state => state.main);
    const { SetEthPayout, SetSplitPayout, SetEthBal, SetSplitBal } = useActions();
    const { account } = useEthers();

    function maxPayout() {
        return Currency.Ether === currency ? maxEthPayout.toFixed(6) : maxSplitPayout.toFixed(2);
    }

    function balance() {
        return Currency.Ether === currency ? ethBalance.toFixed(6) : splitBalance.toFixed(2);
    }

    const maxPayoutEtherHook = useGetMaxEtherPayout();
    const maxPayoutTokenHook = useGetMaxTokenPayout();
    const balSplitHook = useGetTokenBal();
    const balEtherHook = useGetEtherBal();
    useEffect(() => {
        const fetchData = async () => {
            const maxEther = await maxPayoutEtherHook(); 
            const maxToken = await maxPayoutTokenHook(); 
            SetEthPayout(maxEther as number);
            SetSplitPayout(maxToken as number);
        }
        fetchData().catch(console.error);
    },[]);

    useEffect(() => {
        const fetchData = async () => {
            if(account) {
                const balanceSplit = await balSplitHook(account as string);   
                const balanceEther = await balEtherHook(account as string);   
                SetEthBal(balanceEther as number);
                SetSplitBal(balanceSplit as number);
            }
        }
        fetchData().catch(console.error);
    }, [account]);

    return (
        <div className="info">
            <div className="info__girl">
                <img className="info__pic" src={Girl} alt="" />
            </div>
            <div className="info__max">
                <div className="info__maxtitle">
                    Maximum payout:
                </div>
                <div className="info__maxinfo">
                    {maxPayout()} ${currency}
                </div>
            </div>
            <div className="info__text">
                <img style={{marginRight: "12px"}} src={wallet} alt="" />
                <div>
                    balance: {balance()} ${currency}
                </div>
            </div>
            <div className="info__text">
                <img style={{marginRight: "12px"}} src={win} alt="" />
                <div>
                    {notification}
                </div>
            </div>
        </div>
    );
  };
  
export default Info;