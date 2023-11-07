export enum Status {
    Connect,
    Loader,
    Guess,
    Won,
    Fail
}

export enum Currency {
    Split,
    Ether
}

export interface MainState {
    notification: string;
    status: Status;
    currency: Currency;
    segmentGames: any[];
    splitGames: any[];
}

export enum MainActionTypes {
    SET_NOTIFICATION = 'SET_NOTIFICATION',
    SET_STATUS = 'SET_STATUS',
    SET_CURRENCY = 'SET_CURRENCY',
    PUSH_SEGMENT = 'PUSH_SEGMENT',
    PUSH_SPLIT = 'PUSH_SPLIT',
    CLEAR_SEGMENTS = 'CLEAR_SEGMENTS',
    CLEAR_SPLITS = 'CLEAR_SPLITS'
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

export type MainAction = 
    SetNotificationAction |
    SetStatusAction |
    SetCurrencyAction |
    PushSegmentAction |
    PushSplitAction |
    ClearSegmentsAction |
    ClearSplitsAction;
