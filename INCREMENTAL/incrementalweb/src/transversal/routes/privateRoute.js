import {Suspense} from "react";
import {Navigate} from "react-router-dom";
import {isAuthenticated} from "../isAuthenticated";
import createResource from "../../utilities/allLayers/createResource";
import {persistenceContextDelete} from "../context/contextStatePersistence";
export default function PrivateRoute({children}) {
  const onGetRouter = async (x) => {
    let authed = await isAuthenticated();
    if (authed !== false && authed._id !== undefined) {
      //const user = authed;
      authed = true;
      //dispatch(updateUser(user));
    } else {
      persistenceContextDelete();
    }
    return authed ? (
      children
    ) : (
      <>
        <Navigate to="/login" replace="true" />
      </>
    );
  };
  const routerResource = createResource(onGetRouter);
  const DataRouter = () => {
    return routerResource.read(0);
  };
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <DataRouter />
      </Suspense>
    </>
  );
}
