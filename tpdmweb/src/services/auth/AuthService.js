//import axios from 'axios'
import PdmApi from '../api/PdmApi/PdmApi';
import { isRolCorrect } from "../../helpers/utils";

class AuthService {

	async loginUser(userNameVal, passwordVal, selectedRolName ) {
		let pdmApi = PdmApi.getInstance();

		const loginResponse = await pdmApi.login(userNameVal, passwordVal);
			
		if (loginResponse.status === 200) {
			const UserData = loginResponse.data.user;
			if (!isRolCorrect( UserData, selectedRolName )) {
				localStorage.removeItem("auth");
                localStorage.removeItem("token");
				return false;
			}
			else {
				localStorage.setItem("auth", true);
                localStorage.setItem("token", loginResponse.data.jwt);
				// TODO: Instead of localstorage:
				//     - integrate in Redux and use dispatch
				//     - generate a Cookie HttpOnly
			}
		}

		return loginResponse;
	};


	isAuthenticated() {
		if (localStorage.getItem("auth") === null) {
			console.log('user NOT authenticated');
			return false;
		} else {
			console.log('user authenticated');
			return true;
		}
	};

	logout = () => {
		if (localStorage.getItem("auth") !== null) {
			localStorage.removeItem("auth");
            localStorage.removeItem("token");
			// TODO: use dispatch
		}
	}

}


// export const login = async () => {
//     //let pdmApi = PdmApi.getInstance();

//     //try {
//         //const result = await pdmApi.login( 'admin', 'Ab123456' );

//         const response = await axios.post( 'http://localhost:1337/auth/local', {
//                                         identifier: 'admin',
//                                         password: 'Ab123456',
//                                     });

//         console.log( 'after pdmApi.login: ' + response.data );

//         return response;
//                 // .then( result => {
//                 //     console.log( 'after pdmApi.login' );
//                 //     console.log( result );

//                 //     window.localStorage.setItem("auth", true);
//                 // } )
//                 // .catch( err => {
//                 //     console.log( err );
//                 // });
//     //} catch (e) {
//      //   console.log( e );
//    // }


//     //  if( loginResult ) {
//     //      window.localStorage.setItem("auth", true);
//     //  }
//     //window.localStorage.setItem("auth", true);

//     // TODO: use dispatch
// };

// export const isAuthenticated = () => {
//     if( window.localStorage.getItem( "auth" ) === null ) {
//         return false;
//     } else {
//         return true;
//     }
// };

// export const logout = ()  => {
//     if( window.localStorage.getItem( "auth" ) !== null ) {
//         window.localStorage.removeItem( "auth" );
//         // TODO: use dispatch
//     }
// }

export default AuthService;