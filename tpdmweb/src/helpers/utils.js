import { store } from "../stores/store";
import { typeRol } from "../components/types/typePDM";

export const generateRandomId = () => {
    const iMin = 100;
    const iMax = 9999999999;
    return Math.floor(Math.random() * (iMax - iMin ) + iMin );
}

export const isCommercial = () => store.login.rol === typeRol.Commercial;

export const isManager = () => store.login.rol === typeRol.Manager;
export const isRolManager = ( rol ) => rol === typeRol.Manager;

export const isDesigner = () => store.login.rol === typeRol.Designer;

export const roleToString = ( rol ) => {
	//const { login } = store.getState();
	if (rol === typeRol.Commercial) return "Commercial";
	if (rol === typeRol.Manager) return "Manager";
	if (rol === typeRol.Designer) return "Designer";
	return "";
}

export const isRolCorrect = ( oUser, selectedRolName) => {
    var bRet = false;
	if ( oUser ) {    
        if( selectedRolName !== "" ) {
            const aUserRoles = oUser.application_roles;
            
            // Look for the selected Role inside the user's assigned roles list
            bRet = aUserRoles.some( oRol => {
                return ( oRol.name === selectedRolName );
            } )
        }   
        
	}
	return bRet;
}

export const getFolderForDocAndProj = ( oProj, oDoc) => {
    if( oDoc.application){
        return oProj.folders.find( oDir => oDir.cadDocuments.some( oDocDir => oDocDir.id === oDoc.id));
    }else{
        return oProj.folders.find( oDir => oDir.documents.some( oDocDir => oDocDir.id === oDoc.id));
    }
}