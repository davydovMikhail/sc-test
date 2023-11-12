export enum Status {
    Connect,
    Loader,
    Guess,
    Won,
    Fail
}

export enum Currency {
    Split = "SPLIT",
    Ether = "ETH"
}

export interface MainState {
    notification: string;
    status: Status;
    currency: Currency;
    segmentGames: any[];
    splitGames: any[];
    ethBalance: number;
    splitBalance: number;
    maxEthPayout: number;
    maxSplitPayout: number;
}

export enum MainActionTypes {
    SET_NOTIFICATION = 'SET_NOTIFICATION',
    SET_STATUS = 'SET_STATUS',
    SET_CURRENCY = 'SET_CURRENCY',
    PUSH_SEGMENT = 'PUSH_SEGMENT',
    PUSH_SPLIT = 'PUSH_SPLIT',
    CLEAR_SEGMENTS = 'CLEAR_SEGMENTS',
    CLEAR_SPLITS = 'CLEAR_SPLITS',
    SET_ETH_BAL = 'SET_ETH_BAL',
    SET_SPLIT_BAL = 'SET_SPLIT_BAL',
    SET_ETH_PAYOUT = 'SET_ETH_PAYOUT',
    SET_SPLIT_PAYOUT = 'SET_SPLIT_PAYOUT',
} 


interface SetNotificationAction {
    type: MainActionTypes.SET_NOTIFICATION;
    payload: string;
}
interface SetStatusAction {
    type: MainActionTypes.SET_STATUS;
    payload: Status;
}
interface SetCurrencyAction {
    type: MainActionTypes.SET_CURRENCY;
    payload: Currency;
}
interface PushSegmentAction {
    type: MainActionTypes.PUSH_SEGMENT;
    payload: any;
}
interface PushSplitAction {
    type: MainActionTypes.PUSH_SPLIT;
    payload: any;
}
interface ClearSegmentsAction {
    type: MainActionTypes.CLEAR_SEGMENTS;
}
interface ClearSplitsAction {
    type: MainActionTypes.CLEAR_SPLITS;
}
interface SetEthBalAction {
    type: MainActionTypes.SET_ETH_BAL;
    payload: number;
}
interface SetSplitBalAction {
    type: MainActionTypes.SET_SPLIT_BAL;
    payload: number;
}
interface SetEthPayoutAction {
    type: MainActionTypes.SET_ETH_PAYOUT;
    payload: number;
}
interface SetSplitPayoutAction {
    type: MainActionTypes.SET_SPLIT_PAYOUT;
    payload: number;
}

export type MainAction = 
    SetNotificationAction |
    SetStatusAction |
    SetCurrencyAction |
    PushSegmentAction |
    PushSplitAction |
    ClearSegmentsAction |
    ClearSplitsAction |
    SetEthBalAction |
    SetSplitBalAction |
    SetEthPayoutAction |
    SetSplitPayoutAction;
