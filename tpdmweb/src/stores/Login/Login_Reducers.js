import {    initLoggedUser,
            initIsUserLogged,
            initLoginFailed,
            initRedirectToReferrer,
            initToken,
            initRol, 
            initLoginValid           } from './Login_InitialState';


const initialState = {   loggedUser:         initLoggedUser,
                         isUserLogged:       initIsUserLogged,
                         loginFailed:        initLoginFailed,
                         redirectToReferrer: initRedirectToReferrer,
                         token:              initToken,
                         rol:                initRol, 
                         loginValid:         initLoginValid                
                     }

function loginReducer(state = initialState , action) 
{
	switch (action.type) {
		case 'LOGIN_USER':
			return {
				...state,
				isUserLogged: true,
				loggedUser: action.payload.userInfo,
				token: action.payload.token,
				loginFailed: false,
				rol: action.payload.rol,
                loginValid: true
			};
		case 'LOGIN_FAILED':
			return {
				...state,
				isUserLogged: false,
				loggedUser: '',
				token: '',
				loginFailed: true,
				rol: "0",
                loginValid: false
			};
		case 'LOGOUT_USER':
			return initialState;
		case 'REDIRECT_TO_REFERRER':
			return {
				...state,
				redirectToReferrer: action.payload
			};
		default:
			return state;
	}
}

export default loginReducer;
