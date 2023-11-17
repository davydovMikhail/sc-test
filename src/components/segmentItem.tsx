import { formatEther } from '@ethersproject/units'
import lost from "../img/lost.svg";
import won from "../img/won.svg";
import copyIcon from "../img/copy.svg";
import copy from 'copy-to-clipboard';
import { toast } from "react-toastify";
import { Currency } from '../types/main';

type ISegment = any;

const SegmentItem = (props: ISegment, index: number) => {

    function copyToClipboard() {
        copy(props.player);
        toast.info('COPIED', {
            position: "bottom-center",
            autoClose: 100,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
        });
        return;
    }

    function payout() {
        return props.native ? Number(formatEther(props.payout)).toFixed(4) : Number(formatEther(props.payout)).toFixed(2);
    }

    return (
        <div 
            className="table__item" 
            key={index}
            style={{
                background: (index + 1) % 2 === 1 ? '#1A1A1A' : 'transparent'
            }}
        >
            { props.result ? 
                <div className="table__cell">
                    <img src={won} className="table__icon" alt='won' />
                    <div className="table__text">
                        Won
                    </div>
                </div>
                :  
                <div className="table__cell">
                    <img src={lost} className="table__icon" alt='lose' />
                    <div className="table__text">
                        Lose
                    </div>
                </div>
            }
            <div className="table__cell">
                <img onClick={() => copyToClipboard()} src={copyIcon} className="table__icon table__copy" alt="copy" />
                <div className="table__text table__address">
                    {props.player.slice(0, 5)}....{props.player.slice(-4)} {index}
                </div>
            </div>
            <div className="table__cell">
                <div className="table__text">
                {props.from} - {props.to}
                </div>
            </div>
            <div className="table__cell">
                <div className="table__text">
                {`${payout()} $${ props.native ? Currency.Ether : Currency.Split}`}
                </div>
            </div>
            <div className="table__cell">
                <div className="table__text">
                {Number(props.randomNumber)}
                </div>
            </div>
        </div>        
    )
}

export default SegmentItem;