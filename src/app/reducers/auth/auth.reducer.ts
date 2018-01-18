// import ui util
import { UIUtils } from '../../utils/UIUtils';

// import auth actions
import { Actions } from '../../actions/auth.action';

// import auth action type
import { AuthActionTypes } from '../../shared/constants/AuthActionTypes';

// import models
import { Auth, State, initialState } from '../../models/auth.model';
import { User } from '../../models/user.model';


export interface AuthState {
    auth: State;
}

/**
 * Reducer function
 * 
 * @function reducer
 * @param {State} state current state
 * @param {Actions} action incoming action
 */
export function reducer(state: any = initialState, action: Actions): State {
    switch (action.type) {
        case AuthActionTypes.SIGN_IN: {
            return {
                ...state,
                error: null,
                loading: true
            };
        }

        case AuthActionTypes.SIGN_IN_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                user: action.payload.user,
                error: null,
                loading: false
            };
        }

        case AuthActionTypes.SIGN_IN_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        }

        default: {
            return state;
        }
    }
}

export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
