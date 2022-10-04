// import {useTranslation} from "react-i18next";
import {useState} from "react";
export default function HookViewDashboardDetails(props) {
  //   const {t} = useTranslation();
  let defaultValuesModal = {
    state: undefined,
    project_name: undefined,
    date_ini: undefined,
    date_end: undefined,
  };
  if (props.stateValuesModal !== undefined) {
    defaultValuesModal = props.stateValuesModal;
  }
  const [state] = useState(defaultValuesModal);
  //   const handleChange = (e) => {
  //     if (e.target !== undefined) {
  //       e = e.target;
  //     }
  //     const {name, value} = e;
  //     setState({
  //       ...state,
  //       [name]: value,
  //     });
  //     props.setValuesModal({
  //       ...state,
  //       [name]: value,
  //     });
  //   };
  return (
    <div>
      <form>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="flex">
          <div>
            <label htmlFor="state">Status</label>
            <input id="state" name="state" type="text" disabled="true" placeholder={state.state} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="project_name">Project Name</label>
            <input id="project_name" name="project_name" type="text" disabled="true" placeholder={state.project_name} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
        </div>
        <div className="flex">
          <div>
            <label htmlFor="date_ini">Date Ini</label>
            <input id="date_ini" name="date_ini" type="text" disabled="true" placeholder={state.date_ini} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="date_end">Date End</label>
            <input id="date_end" name="date_end" type="text" disabled="true" placeholder={state.date_end} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
        </div>
      </form>
    </div>
  );
}
