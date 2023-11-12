import ethcur from "../img/ethcur.svg";
import splitcur from "../img/splitcur.svg";
import { Currency } from "../types/main";
import { useActions } from "../storeHooks/useActions"; 
import { useTypedSelector } from '../storeHooks/useTypedSelector';
import { Status } from "../types/main";

const Currswitcher = () => {
    const { SetCurrency } = useActions();
    const { status } = useTypedSelector(state => state.main);
    
    return (
        <div className="bid__switch">
            <button
                className="bid__eth"
                onClick={() => {SetCurrency(Currency.Ether)}}
                disabled={status === Status.Loader}
            >
                <img src={ethcur} alt="" />
                <div>ETH</div>
            </button>
            <button 
                className="bid__split"
                onClick={() => {SetCurrency(Currency.Split)}}
                disabled={status === Status.Loader}
            >
                <img src={splitcur} alt="" />
                <div>SPLIT</div>
            </button>
        </div>
    );
  };
  
export default Currswitcher;