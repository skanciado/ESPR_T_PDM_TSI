import PdmApi from '../api/PdmApi/PdmApi';
import AuthService from '../../services/auth/AuthService';

class QueriesService {
     async getQuery( token, query, param ) {
        const authService = new AuthService();
         if( authService.isAuthenticated() ) {
            let pdmApi = PdmApi.getInstance();  
            const getResponse = await pdmApi.getData( token, query, param );  
             if( getResponse.status === 200 ) {
                 localStorage.setItem("get", true);
             }
            return getResponse;    
         }
         return null;
    };
    async deleteQuery( token, query, param ) {
        const authService = new AuthService();
         if( authService.isAuthenticated() ) {
            let pdmApi = PdmApi.getInstance();    
            const getResponse = await pdmApi.deleteData( token, query, param );  
             if( getResponse.status === 200 ) {
                 localStorage.setItem("delete", true);
             }
            return getResponse;    
         }
         return null;
    };
    async postQuery( token, query, param ) {
        const authService = new AuthService();
         if( authService.isAuthenticated() ) {
            let pdmApi = PdmApi.getInstance();    
            const getResponse = await pdmApi.postData( token, query, param );  
             if( getResponse.status === 200 ) {
                 localStorage.setItem("post", true);
             }
            return getResponse;    
         }
         return null;
    };
    async putQuery( token, query, param ) {
        const authService = new AuthService();
         if( authService.isAuthenticated() ) {
            let pdmApi = PdmApi.getInstance();    
            const getResponse = await pdmApi.putData( token, query, param );  
             if( getResponse.status === 200 ) {
                 localStorage.setItem("put", true);
             }
            return getResponse;    
         }
         return null;
    };
}
export default QueriesService;