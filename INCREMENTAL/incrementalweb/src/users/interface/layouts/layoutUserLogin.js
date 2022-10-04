import {useTranslation} from "react-i18next";
import {useState, useContext} from "react";
import Context from "../../../transversal/context/context";
import {useNavigate, Link} from "react-router-dom";
import {BtnLogin} from "../../application/controllers/controllerUserLogin";
import {CbItemsRoles} from "../../../roles/interface/hooksView/hooksViewRole";
const LayoutUserLogin = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const context = useContext(Context);
  const [state, setState] = useState({
    email: "",
    password: "",
    role: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    state.role = e.target[3].value;
    await BtnLogin({context: context, state: state, navigate: navigate});
    //const res = await BtnLogin({context: context, state: state});
    //handleChange(setState, state, res);
  };
  const handleChange = (e) => {
    const {name, value} = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  return (
    <div className="flex items-center justify-center min-h-full bg-gray-300" style={{backgroundColor: "rgb(209 213 219)"}}>
      <div className="border border-gray-300 rounded-md px-8 py-8 bg-white">
        <div>
          {/* <img className="w-auto h-12 mx-auto" src="../../../../public/logoLogin.png" alt="Workflow" /> */}
          <h2 className="text-3xl font-extrabold text-center text-gray-900">{t("_00_signYourAccount")}</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div>
            <div>
              <label htmlFor="email">{t("_00_email")}</label>
              <input id="email" name="email" type="text" value={state.email} onChange={handleChange} autoComplete="email" placeholder={t("_00_email")} required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="password">{t("_00_password")}</label>
              <input id="password" name="password" type="password" value={state.password} onChange={handleChange} autoComplete="current-password" placeholder={t("_00_password")} required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="role">{t("_00_roles")}</label>
              <select id="role" name="role" value={state.role} onChange={handleChange} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                <CbItemsRoles />
              </select>
            </div>
          </div>
          <div>
            <button type="submit" className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-incremental border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {t("_00_signIn")}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/about" className="block ml-2 text-sm text-gray-900">
                {t("_00_forgetPassword")}
              </Link>
            </div>
            <div className="text-sm">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="font-medium text-incremental">{t("_00_createAccount")}</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LayoutUserLogin;
