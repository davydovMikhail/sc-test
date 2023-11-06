import win from "../img/win.svg";
import wallet from "../img/wallet.svg";
import Girl from "../img/girl.png";

const Info = () => {
    
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
    );
  };
  
export default Info;