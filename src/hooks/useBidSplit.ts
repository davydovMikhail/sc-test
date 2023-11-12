import { useEthers } from "@usedapp/core";
import { useCallback } from "react";
import { useContracts } from "./useContracts";
import { utils } from 'ethers';
import { toast } from "react-toastify";
const chain = process.env.REACT_APP_CHAIN as string;

export const useBidSplit = () => {
  const { GameContract } = useContracts();
  const { switchNetwork, account, activateBrowserWallet } = useEthers();

  return useCallback(
    async (bid: string, point: string, right: boolean, eth: boolean) => {
      if (!GameContract) return;
      await switchNetwork(Number(chain));
      activateBrowserWallet();
      try {
        let txPromise;
        if(eth) {
            txPromise = await GameContract.bidSplit("0", point, right, {value: utils.parseEther(bid)});
        } else {
            txPromise = await GameContract.bidSplit(utils.parseEther(bid), point, right);
        }   
        const tx = await txPromise.wait();
        toast.success('BID DONE', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
        });
        return tx;
      } catch (error: any) {
        const errorMessage =
          error?.error?.message ||
          error?.message ||
          "Check console logs for error";
        console.error(error);
        console.error(errorMessage);
        toast.error('Err! See console', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
        });
      }
    },
    [GameContract, switchNetwork, account]
  );
};