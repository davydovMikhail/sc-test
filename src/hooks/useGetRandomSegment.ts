import { provider } from "../utils/provider";
import { useCallback } from "react"; 
import { Contract } from "ethers";
import GameAbi from '../abi/Game.json';
const addressGame = process.env.REACT_APP_GAME_CONTRACT as string;
const contractGame = new Contract(addressGame, GameAbi, provider);

export const useGetRandomSegment = () => {

    return useCallback(
        async (blockNumber: string, account: string) => {  
            try {
                const randomNumber = await contractGame.getRandomForSegment(blockNumber, account);
                return randomNumber;
            } catch(error: any) {
                const errorMessage =
                    error?.error?.message ||
                    error?.message ||
                    "Check console logs for error";
                console.error(error);
                console.error(errorMessage);
            } 
        }
        ,[]
    );
}