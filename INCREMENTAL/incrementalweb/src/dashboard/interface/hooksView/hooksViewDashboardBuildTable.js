// import {useTranslation} from "react-i18next";
export default function HookViewDashboardBuildTable(props) {
  //   const {t} = useTranslation();
  return (
    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
      <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
        <table className="min-w-full leading-normal">
          <thead>
            {/* BUILD THEAD TABLE */}
            <tr>
              <th scope="col" className="px-5 py-3 text-base border-b border-gray-200">
                <input type="checkbox" />
              </th>
              {/* <th scope="col" className="px-5 py-3 text-base font-semibold text-left border-b border-gray-200">
                {t("state")}
              </th>
              <th scope="col" className="px-5 py-3 text-base font-semibold text-left border-b border-gray-200">
                {t("project_name")}
              </th>
              <th scope="col" className="px-5 py-3 text-base font-semibold text-left border-b border-gray-200">
                {t("date_ini")}
              </th>
              <th scope="col" className="px-5 py-3 text-base font-semibold text-left border-b border-gray-200">
                {t("date_end")}
              </th> */}
              <th scope="col" className="px-5 py-3 text-base text-left text-white border-b border-gray-200"></th>
            </tr>
          </thead>
          <tbody>
            {/* BUILD BODY TABLE */}
            {/* <tr>
                    <td className="px-5 py-3 text-base font-semibold text-white border-b border-gray-200">
                      <input type="checkbox" />
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div className="flex items-center">
                        <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5V8L12 4L8 0V3C3.58 3 0 6.58 0 11C0 12.57 0.46 14.03 1.24 15.26L2.7 13.8C2.25 12.97 2 12.01 2 11C2 7.69 4.69 5 8 5ZM14.76 6.74L13.3 8.2C13.74 9.04 14 9.99 14 11C14 14.31 11.31 17 8 17V14L4 18L8 22V19C12.42 19 16 15.42 16 11C16 9.43 15.54 7.97 14.76 6.74Z" fill="#1063AD" />
                        </svg>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">Proyecto 1</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">23/09/2010</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">23/09/2010</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <button
                        onClick={() => {
                          setModalOpen({openModal: true, valuesModal: undefined});
                        }}
                        classNameName="flex-shrink-0 px-4 py-2"
                        type="submit"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M6.41422 13.4142C7.19527 12.6332 7.19527 11.3668 6.41422 10.5858C5.63317 9.80474 4.36684 9.80474 3.58579 10.5858C2.80474 11.3668 2.80474 12.6332 3.58579 13.4142C4.36684 14.1953 5.63317 14.1953 6.41422 13.4142ZM13.4142 10.5858C14.1953 11.3668 14.1953 12.6332 13.4142 13.4142C12.6332 14.1953 11.3668 14.1953 10.5858 13.4142C9.80473 12.6332 9.80473 11.3668 10.5858 10.5858C11.3668 9.80474 12.6332 9.80474 13.4142 10.5858ZM20.4142 10.5858C21.1953 11.3668 21.1953 12.6332 20.4142 13.4142C19.6332 14.1953 18.3668 14.1953 17.5858 13.4142C16.8047 12.6332 16.8047 11.3668 17.5858 10.5858C18.3668 9.80474 19.6332 9.80474 20.4142 10.5858Z" fill="#E20074" />
                        </svg>
                      </button>
                    </td>
                  </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
