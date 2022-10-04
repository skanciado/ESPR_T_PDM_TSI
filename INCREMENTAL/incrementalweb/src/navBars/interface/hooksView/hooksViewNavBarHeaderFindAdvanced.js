import {useTranslation} from "react-i18next";
import {useState} from "react";
export default function HookViewNavBarHeaderFindAdvanced(props) {
  const {t} = useTranslation();
  let defaultValuesModal = {
    idDocument: undefined,
    name: undefined,
    owner: undefined,
    description: undefined,
    proyect: undefined,
  };
  if (props.initialModalValuesBody !== undefined) {
    defaultValuesModal = props.initialModalValuesBody;
  }
  const [state, setState] = useState(defaultValuesModal);
  const handleChange = (e) => {
    if (e.target !== undefined) {
      e = e.target;
    }
    const {name, value} = e;
    //setState del body
    setState({
      ...state,
      [name]: value,
    });
    //setState del modal
    props.setStateModalBody({
      ...state,
      [name]: value,
    });
  };
  return (
    <div>
      <form>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="flex">
          <div>
            <label htmlFor="idDocument">{t("_03_idDcument")}</label>
            <input id="idDocument" name="idDocument" type="text" value={state.idDocument} onChange={handleChange} autoComplete={t("_03_idDcument")} placeholder={t("_03_idDcument")} required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="name">{t("_03_name")}</label>
            <input id="name" name="name" type="text" value={state.name} onChange={handleChange} autoComplete={t("_03_name")} placeholder={t("_03_name")} required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="owner">{t("_03_owner")}</label>
            <input id="owner" name="owner" type="text" value={state.owner} onChange={handleChange} autoComplete={t("_03_owner")} placeholder={t("_03_owner")} required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
        </div>
        <div className="flex">
          <div>
            <label htmlFor="description">{t("_03_description")}</label>
            <textarea id="description" name="description" type="text" value={state.description} onChange={handleChange} autoComplete="on" placeholder={t("_03_description")} required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
        </div>
        <div className="flex">
          <div>
            <label htmlFor="proyect">{t("_03_proyect")}</label>
            <input id="proyect" name="proyect" type="text" value={state.proyect} onChange={handleChange} autoComplete="on" placeholder={t("_03_proyect")} required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
        </div>
      </form>
    </div>
  );
}
