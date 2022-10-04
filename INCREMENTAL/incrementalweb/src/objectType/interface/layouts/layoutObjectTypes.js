import {useState, useContext} from "react";
import Context from "../../../transversal/context/context";
import {BtnCreateObjectType, BtnParentlistObjectTypes, BtnAttributelistObjectTypes} from "../../application/controllers/controllerObjectType";
const LayoutObjectTypes = () => {
  const context = useContext(Context);
  const [state, setState] = useState({
    name: "",
    parent: undefined,
    attributes: undefined,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const {name, value} = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div>
            <label htmlFor="id">id</label>
            <input id="id" name="id" type="text" onChange={handleChange} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="parent">parent</label>
            <input id="parent" name="parent" type="text" onChange={handleChange} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
        </div>
        <div className="flex">
          <div>
            <label htmlFor="attributes">attributes</label>
            <textarea id="attributes" name="attributes" onChange={handleChange} rows="25" cols="99" className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          </div>
        </div>
      </form>
      <div className="flex">
        <div>
          <button
            type="submit"
            onClick={() => {
              BtnCreateObjectType({context: context, state: state});
            }}
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-incremental border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            CreateObjectType
          </button>
        </div>
        <div>
          <button
            type="submit"
            onClick={() => {
              BtnParentlistObjectTypes({context: context, state: state});
            }}
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-incremental border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ParentlistObjectTypes
          </button>
        </div>
        <div>
          <button
            type="submit"
            onClick={() => {
              BtnAttributelistObjectTypes({context: context, state: state});
            }}
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-incremental border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            AttributelistObjectTypes
          </button>
        </div>
      </div>
    </div>
  );
};
export default LayoutObjectTypes;
