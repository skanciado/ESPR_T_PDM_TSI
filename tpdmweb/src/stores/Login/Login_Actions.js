
export function loginUser(loginUserInfo, rol) {
	return {
		type: "LOGIN_USER",
		payload: {
			userInfo: loginUserInfo.userInfo,
			token: loginUserInfo.userInfo,
			rol: rol 
		}
	}
}

export function loginFailed() {
	return {
		type: "LOGIN_FAILED"
	}
}

export function setRedirectToReferrer(redirectValue) {
	return {
		type: "REDIRECT_TO_REFERRER",
		payload: redirectValue
	}
}

export function logoutUser(logoutUserInfo) {
	return {
		type: "LOGOUT_USER",
		payload: logoutUserInfo
	}
}



