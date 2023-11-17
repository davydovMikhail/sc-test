import { useState, useEffect, useRef } from "react";
import shevron from "../img/chevron.svg";
import { useTypedSelector } from '../storeHooks/useTypedSelector';
import { useActions } from '../storeHooks/useActions';
import { useGetSegment } from "../hooks/useGetSegment";
import { useGetSplit } from "../hooks/useGetSplit"; 
import { useGetSliceSplits } from "../hooks/useGetSliceSplits";
import { useGetSliceSegments } from "../hooks/useGetSliceSegments";

const Pagination = () => {
        const { advanced, totalSplits, totalSegments } = useTypedSelector(state => state.main);
        const { ClearSegments, ClearSplits, PushSegment, PushSplit } = useActions();
        const [pageSplit, setPageSplit] = useState(1);
        const [pageSegment, setPageSegment] = useState(1);

        const sliceSegmentsHook = useGetSliceSegments();
        const sliceSplitsHook = useGetSliceSplits();
        const splitHook = useGetSplit();
        const segmentHook = useGetSegment();
        const breakSplitsFor = useRef(false);
        const breakSegmentsFor = useRef(false);
        const disableButs = useRef(false);

        useEffect(() => {
            const fetchData = async () => {
                if(totalSplits > 0) {
                    changePage(1, false);
                }
            }
            fetchData().catch(console.error);
        }, [totalSplits]);

        useEffect(() => {
            const fetchData = async () => {
                if(totalSegments > 0) {
                    changePage(1, true);
                }
            }
            fetchData().catch(console.error);
        }, [totalSegments]);

        async function changePage(page: number, isAdvanced: boolean) {
            disableButs.current = true;
            if(isAdvanced) {
                breakSegmentsFor.current = true;
                setPageSegment(page);
                ClearSegments();
            } else {
                breakSplitsFor.current = true;
                setPageSplit(page);
                ClearSplits();
            }
            let start;
            let end;
            
            if (page === lastPage(isAdvanced) && page !== 1 && page !== 2) {          
                end = remnant(isAdvanced) || 10;
                start = 0;
            } else {
                end = isAdvanced ? totalSegments : totalSplits;
                end = end - 10 * (page - 1);
                start = end - 10;
                if (start < 0) {
                    start = 0;
                }
            }
            if(isAdvanced) {
                const hashes = await sliceSegmentsHook(start, end) as any[];
                breakSegmentsFor.current = false;
                disableButs.current = false;
                for(let i = 0; i < hashes.length; i++) {
                    if (breakSegmentsFor.current) {
                        breakSegmentsFor.current = false;
                        break;
                    }
                    const game = await segmentHook(hashes[i]);
                    if (breakSegmentsFor.current) {
                        breakSegmentsFor.current = false;
                        break;
                    }
                    PushSegment(game);
                    if (breakSegmentsFor.current) {
                        breakSegmentsFor.current = false;
                        break;
                    }
                }
            } else {
                const hashes = await sliceSplitsHook(start, end) as any[];
                breakSplitsFor.current = false;
                disableButs.current = false;
                for(let i = 0; i < hashes.length; i++) {
                    if (breakSplitsFor.current) {
                        breakSplitsFor.current = false;
                        break;
                    }
                    const game = await splitHook(hashes[i]);
                    if (breakSplitsFor.current) {
                        breakSplitsFor.current = false;
                        break;
                    }
                    PushSplit(game);
                    if (breakSplitsFor.current) {
                        breakSplitsFor.current = false;
                        break;
                    }
                }
            }
        }

        function currentPage() {
            return advanced ? pageSegment : pageSplit;
        }
    
        function lastPage(isAdvanced: boolean) {
            const total = isAdvanced ? totalSegments : totalSplits
            let last = Math.trunc( total / 10 );
            if (remnant(isAdvanced) > 0) {
                return last + 1;
            } else {
                return last;
            }
        }
    
        function remnant(isAdvanced: boolean) {
            return isAdvanced ? totalSegments : totalSplits % 10;
        }
    
        function centralDigit() {
            const page = advanced ? pageSegment : pageSplit;
            if(page === 1) {
                return 2;
            } else if (page === lastPage(advanced)) {
                return lastPage(advanced) - 1;
            } else {
                return advanced ? pageSegment : pageSplit;
            }
        }
    
        return (
            <>
                {   
                    ((totalSplits > 10 && !advanced) || (totalSegments > 10 && advanced)) ?
                    <div className="pagination">
                        <button
                            onClick={() => {changePage(currentPage() - 1, advanced)}} 
                            disabled={currentPage() === 1 || disableButs.current} 
                            style={{borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px"}}
                            className={"pagination__cell " + (currentPage() === 1 ? "" : "pagination__cell_hover") }
                        >
                            <img style={{transform: "rotate(180deg)"}} src={shevron} alt="shev left" />
                        </button>
                        <button
                            className={"pagination__cell " + (currentPage() === 1 ? "pagination__cell_active" : "pagination__cell_hover") }
                            disabled={currentPage() === 1 || disableButs.current} 
                            onClick={() => {changePage(1, advanced)}} 
                        >
                            <div 
                                className={"pagination__text " + (currentPage() === 1 ? "pagination__text_active" : "") } 
                            >
                                1
                            </div>
                        </button>
                        {
                            currentPage() === 1 || currentPage() === 2 ? 
                            "" 
                            :
                            <div className="pagination__cell">
                                <div className="pagination__text">
                                    ...
                                </div>
                            </div>
                        }
                        { lastPage(advanced) === 2 ? 
                            ""    
                            :
                            <button 
                                    className={"pagination__cell " + (currentPage() === centralDigit() ? "pagination__cell_active" : "pagination__cell_hover") }
                                    disabled={currentPage() === centralDigit() || disableButs.current} 
                                    onClick={() => {changePage(centralDigit(), advanced)}} 
                            >
                                <div
                                    className={"pagination__text " + (currentPage() === centralDigit() ? "pagination__text_active" : "") } 
                                >
                                    {centralDigit()}
                                </div>
                            </button>
                        }
                        {
                            currentPage() === lastPage(advanced) || currentPage() === lastPage(advanced) - 1? 
                            "" 
                            :
                            <div className="pagination__cell">
                                <div className="pagination__text">
                                    ...
                                </div>
                            </div>
                        }
                        <button 
                            className={"pagination__cell " + (currentPage() === lastPage(advanced) ? "pagination__cell_active" : "pagination__cell_hover") }
                            onClick={() => changePage(lastPage(advanced), advanced)}
                            disabled={currentPage() === lastPage(advanced) || disableButs.current} 
                        >
                            <div 
                                className={"pagination__text " + (currentPage() === lastPage(advanced) ? "pagination__text_active" : "") }
                            >
                                {lastPage(advanced)}
                            </div>
                        </button>
                        <button
                            disabled={currentPage() === lastPage(advanced) || disableButs.current} 
                            style={{borderTopRightRadius: "8px", borderBottomRightRadius: "8px"}}
                            onClick={() => {changePage(currentPage() + 1, advanced)}} 
                            className={"pagination__cell " + (currentPage() === lastPage(advanced) ? "" : "pagination__cell_hover") } 
                        >
                            <img src={shevron} alt="shev right" />
                        </button>
                    </div>
                : ""
                }
            </>
        ) 
        
          
}
export default Pagination;