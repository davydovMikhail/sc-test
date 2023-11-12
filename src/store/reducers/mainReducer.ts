import { MainState, MainAction, MainActionTypes, Status, Currency } from "../../types/main";

const initialState: MainState = {
    notification: "try your luck!",
    status: Status.Guess,
    currency: Currency.Split,
    segmentGames: [],
    splitGames: [],
    ethBalance: 0,
    splitBalance: 0, 
    maxEthPayout: 0,
    maxSplitPayout: 0
}

export const mainReducer = (state: MainState = initialState, action: MainAction): MainState => {
    switch (action.type) {
        case MainActionTypes.SET_NOTIFICATION:
            return {...state, notification: action.payload}
        case MainActionTypes.SET_STATUS:
            return {...state, status: action.payload}
        case MainActionTypes.SET_CURRENCY:
            return {...state, currency: action.payload}
        case MainActionTypes.PUSH_SEGMENT:
            return {...state, segmentGames: [...state.segmentGames, action.payload] }
        case MainActionTypes.PUSH_SPLIT:
            return {...state, splitGames: [...state.splitGames, action.payload] }
        case MainActionTypes.CLEAR_SEGMENTS:
            return {...state, segmentGames: [] }
        case MainActionTypes.CLEAR_SPLITS:
            return {...state, splitGames: [] }
        case MainActionTypes.SET_ETH_BAL:
            return {...state, ethBalance: action.payload}
        case MainActionTypes.SET_SPLIT_BAL:
            return {...state, splitBalance: action.payload}
        case MainActionTypes.SET_ETH_PAYOUT:
            return {...state, maxEthPayout: action.payload}
        case MainActionTypes.SET_SPLIT_PAYOUT:
            return {...state, maxSplitPayout: action.payload}
        default:
            return state
    }
}