import {useTranslation} from "react-i18next";
import {useState} from "react";
//import Context from "../../../transversal/context/context";
//import {BtnSaveGroup, BtnDeleteGroup} from "../../application/controllers/controllerGroup";
const LayoutGroup = () => {
  const {t} = useTranslation();
  //const context = useContext(Context);
  const [state, setState] = useState({
    name: "",
    users: [],
  });
  const handleSubmit = async (e) => {
    // await BtnSaveGroup({context: context, state: state, navigate: navigate});
    //const res = await BtnSaveGroup({context: context, state: state});
    //handleChange(setState, state, res);
  };
  // const handleChange = (e) => {
  //   const {name, value} = e.target;
  //   setState({
  //     ...state,
  //     [name]: value,
  //   });
  // };
  return (
    <div className="w-14">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap mx-auto -mb-px">
          <li className="mr-2">
            <button href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
              {t("_04_general")}
            </button>
          </li>
          <li className="mr-2">
            <button href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">
              {t("_04_attachments")}
            </button>
          </li>
          <li className="mr-2">
            <button href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
              {t("_04_permissions")}
            </button>
          </li>
          <li className="mr-2">
            <button href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
              {t("_04_groups")}
            </button>
          </li>
        </ul>
      </div>

      <input type="hidden" name="remember" defaultValue="true" />
      <div>
        <div>
          <label htmlFor="general">General</label>
          <input id="general" name="general" type="text" placeholder="General" required className="relative block px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="Adjuntos">Adjuntos</label>
          <input id="adjuntos" name="adjuntos" type="text" placeholder="Adjuntos" required className="relative block px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="Permisos">Permisos</label>
          <input id="permisos" name="permisos" type="text" placeholder="Permisos" required className="relative block px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="Grupos">Grupos</label>
          <input id="grupos" name="grupos" type="text" placeholder="Grupos" required className="relative block px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
        </div>
        <button className="flex-shrink-0 px-4 py-2 mt-2 text-base font-semibold text-white border rounded-lg shadow-md bg-incremental border-white-300 focus:outline-none" type="submit">
          <svg className="inline-block" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.3327 5.33331H6.66602V3.99998C6.66602 3.2636 7.26297 2.66665 7.99935 2.66665C8.73573 2.66665 9.33268 3.2636 9.33268 3.99998C9.33268 4.36817 9.63116 4.66665 9.99935 4.66665C10.3675 4.66665 10.666 4.36817 10.666 3.99998C10.666 2.52722 9.47211 1.33331 7.99935 1.33331C6.52659 1.33331 5.33268 2.52722 5.33268 3.99998V5.33331H4.66602C3.56145 5.33331 2.66602 6.22875 2.66602 7.33331V12.6666C2.66602 13.7712 3.56145 14.6666 4.66602 14.6666H11.3327C12.4372 14.6666 13.3327 13.7712 13.3327 12.6666V7.33331C13.3327 6.22875 12.4372 5.33331 11.3327 5.33331ZM11.9993 12.6666C11.9993 13.0348 11.7009 13.3333 11.3327 13.3333H4.66602C4.29783 13.3333 3.99935 13.0348 3.99935 12.6666V7.33331C3.99935 6.96512 4.29783 6.66665 4.66602 6.66665H11.3327C11.7009 6.66665 11.9993 6.96512 11.9993 7.33331V12.6666ZM7.99935 7.99998C6.89478 7.99998 5.99935 8.89541 5.99935 9.99998C5.99935 11.1045 6.89478 12 7.99935 12C9.10392 12 9.99935 11.1045 9.99935 9.99998C9.99935 8.89541 9.10392 7.99998 7.99935 7.99998ZM7.99935 10.6666C7.63116 10.6666 7.33268 10.3682 7.33268 9.99998C7.33268 9.63179 7.63116 9.33331 7.99935 9.33331C8.36754 9.33331 8.66602 9.63179 8.66602 9.99998C8.66602 10.3682 8.36754 10.6666 7.99935 10.6666Z"
              fill="white"
            />
          </svg>
          <div className="inline-block px-2">Checkout</div>
        </button>
      </div>
    </div>
  );
};
export default LayoutGroup;
