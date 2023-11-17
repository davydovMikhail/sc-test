
import { useTypedSelector } from '../storeHooks/useTypedSelector';
import SplitItem from './splitItem';
import SegmentItem from './segmentItem';

const Table = () => {
    const { advanced, segmentGames, splitGames } = useTypedSelector(state => state.main);
    
    return (
        <div className="table">
            <div className="table__top">
                <div className="table__title">
                    Status
                </div>
                <div className="table__title">
                  Address
                </div>
                <div className="table__title">
                  { advanced ? "From-To" : "Split Point" }
                </div>
                <div className="table__title">
                  Payout
                </div>
                <div className="table__title">
                  Random number
                </div>
            </div>
            {   
                advanced ? 
                segmentGames.map((block, index) => SegmentItem(block, index)) 
                :
                splitGames.map((block, index) => SplitItem(block, index))
            }
        </div>
    );
  };
  
export default Table;