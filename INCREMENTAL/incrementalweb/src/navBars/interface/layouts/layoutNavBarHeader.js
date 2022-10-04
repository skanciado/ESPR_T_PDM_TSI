import {useTranslation} from "react-i18next";
import {useState, useContext, useMemo} from "react";
import Context from "../../../transversal/context/context";
import {HookViewModal} from "../../../utilities/interface/hookViewModal";
import HookViewNavBarHeaderFindAdvanced from "../hooksView/hooksViewNavBarHeaderFindAdvanced";
import {cbItemsRolesUser} from "../../../roles/interface/hooksView/hooksViewRole";
import {BtnAdministration, CbRole} from "../../application/controllers/controllerNavBarHeader";
import {useNavigate} from "react-router-dom";
export default function LayoutNavBarHeader(props) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const context = useContext(Context);
  const [modal, setModal] = useState({openModal: false, valuesModal: undefined});
  const testValIni = {
    idDocument: undefined,
    name: "fran",
    owner: "yo",
    description: undefined,
    proyect: undefined,
  };
  const [modalProjects, setModalProjects] = useState({openModal: false, valuesModal: undefined});
  const handleClick = async (e) => {
    e.preventDefault();
    await BtnAdministration({navigate: navigate});
    //const res = await BtnLogin({context: context, state: state});
    //handleChange(setState, state, res);
  };
  //props.history.push("/Administration");
  const cbItemsRoles = useMemo(() => cbItemsRolesUser(context?.user?.roles, context?.cache?.roleLast), [context?.user?.roles]);
  return (
    <>
      {modal.openModal && <HookViewModal lblTitle="Busqueda avanzada" twoButtons={true} lblCancel="Cancelar" lblOk="Buscar" ctrlBody={HookViewNavBarHeaderFindAdvanced} idFormBody={undefined} setModal={setModal} initialModalValues={testValIni} />}
      <div>
        <nav className="text-white shadow bg-incremental dark:bg-gray-800">
          <div className="px-8 mx-auto">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => {
                  setModalProjects({openModal: true, valuesModal: undefined});
                }}
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white border rounded-lg shadow-md bg-incremental border-white-300 focus:outline-none"
                type="submit"
              >
                <svg className="inline-block" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 14V16H6.5V14H0.5ZM0.5 2V4H10.5V2H0.5ZM10.5 18V16H18.5V14H10.5V12H8.5V18H10.5ZM4.5 6V8H0.5V10H4.5V12H6.5V6H4.5ZM18.5 10V8H8.5V10H18.5ZM12.5 6H14.5V4H18.5V2H14.5V0H12.5V6Z" fill="white" />
                </svg>
                <div className="inline-block px-2">Projects</div>
              </button>
              <div className="flex items-center ">
                <a className="flex-shrink-0" href="/#">
                  <svg width="168" height="44" viewBox="0 0 168 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.49824 23.1978V4.88889H3.56641V23.1978H6.49824ZM21.1574 17.7467H21.0108L13.4125 4.88889H10.4562V23.1978H13.3636V10.2911H13.5347L21.133 23.1978H24.0893V4.88889H21.1819L21.1574 17.7467ZM27.2166 14.0067C27.2166 19.8978 29.9774 23.5889 34.7905 23.5889C36.4734 23.6082 38.1018 22.9926 39.3515 21.8646C40.6011 20.7366 41.3803 19.1791 41.5337 17.5022H38.553C38.4441 18.4115 38.0012 19.2479 37.3103 19.8487C36.6195 20.4495 35.7301 20.772 34.8149 20.7533C31.9319 20.7533 30.295 18.3089 30.295 14.0067C30.295 9.70445 31.9319 7.33333 34.8149 7.33333C35.7176 7.3179 36.595 7.63199 37.283 8.21686C37.971 8.80173 38.4225 9.61733 38.553 10.5111H41.5337C41.3792 8.82358 40.5888 7.25806 39.3229 6.13223C38.0569 5.0064 36.4103 4.40458 34.7172 4.44889C30.0018 4.44889 27.241 8.09111 27.241 14.0067H27.2166ZM52.7236 15.9133C53.9421 15.6417 55.0233 14.9428 55.7716 13.9431C56.52 12.9433 56.8861 11.7086 56.8037 10.4622C56.8272 9.69653 56.6885 8.93452 56.3965 8.22633C56.1046 7.51814 55.6661 6.87981 55.1099 6.35334C54.5537 5.82687 53.8924 5.42419 53.1695 5.17178C52.4466 4.91938 51.6784 4.82296 50.9156 4.88889H44.4167V23.1978H47.3485V16.1333H49.7917L53.7497 23.1978H57.0236L52.7236 15.9133ZM50.7201 7.55333C51.1173 7.51379 51.5183 7.56087 51.8955 7.69133C52.2727 7.82179 52.6172 8.03253 52.9052 8.30903C53.1931 8.58552 53.4177 8.9212 53.5635 9.29292C53.7093 9.66464 53.7729 10.0636 53.7497 10.4622C53.776 10.8638 53.7151 11.2663 53.5711 11.6421C53.4271 12.0179 53.2035 12.358 52.9156 12.6391C52.6277 12.9201 52.2824 13.1355 51.9034 13.2703C51.5244 13.4051 51.1207 13.4562 50.7201 13.42H47.3485V7.55333H50.7201ZM70.4123 4.88889H59.931V23.1978H70.4123V20.4844H62.8384V15.2044H70.168V12.4667H62.8384V7.57778H70.4123V4.88889ZM82.6283 15.7667H82.3351L76.4226 4.88889H73.7351V23.1978H76.6425V11.2444H76.8135L81.9442 20.4356H82.9215L87.9545 11.2444H88.1255V23.1978H91.0329V4.88889H88.3454L82.6283 15.7667ZM105.57 4.88889H95.0886V23.1978H105.57V20.4844H97.996V15.2044H105.326V12.4667H97.996V7.57778H105.57V4.88889ZM119.716 17.7467H119.545L111.849 4.88889H108.893V23.1978H111.8V10.2911H111.971L119.545 23.1978H122.526V4.88889H119.716V17.7467ZM130.1 7.55333V23.1978H132.909V7.55333H137.918V4.88889H124.993V7.55333H130.1ZM152.308 23.1978L145.858 4.88889H142.951L136.599 23.2711H139.555L140.874 19.3356H147.911L149.23 23.2711L152.308 23.1978ZM144.319 9.11778H144.49L146.933 16.4511H141.827L144.319 9.11778ZM164.427 23.1978V20.4844H157.39V4.88889H154.458V23.1978H164.427Z"
                      fill="white"
                    />
                    <path d="M35.6966 30.9956H7.59981C5.23847 30.9956 3.32422 32.9108 3.32422 35.2733C3.32422 37.6359 5.23847 39.5511 7.59981 39.5511H35.6966C38.0579 39.5511 39.9722 37.6359 39.9722 35.2733C39.9722 32.9108 38.0579 30.9956 35.6966 30.9956Z" fill="white" />
                    <path d="M77.181 30.9956H49.0842C46.7228 30.9956 44.8086 32.9108 44.8086 35.2733C44.8086 37.6359 46.7228 39.5511 49.0842 39.5511H77.181C79.5423 39.5511 81.4566 37.6359 81.4566 35.2733C81.4566 32.9108 79.5423 30.9956 77.181 30.9956Z" fill="white" />
                    <path
                      d="M159.539 30.9956H132.664C131.45 30.9216 130.257 31.3293 129.342 32.1301C128.427 32.9309 127.865 34.0604 127.777 35.2733C127.859 36.4887 128.419 37.622 129.336 38.4241C130.252 39.2262 131.449 39.6316 132.664 39.5511H159.539C160.752 39.6251 161.946 39.2174 162.861 38.4166C163.775 37.6157 164.338 36.4863 164.425 35.2733C164.338 34.0604 163.775 32.9309 162.861 32.1301C161.946 31.3293 160.752 30.9216 159.539 30.9956ZM159.686 37.4733H132.493C132.186 37.5058 131.876 37.4734 131.583 37.3783C131.29 37.2831 131.02 37.1273 130.791 36.921C130.561 36.7147 130.378 36.4625 130.253 36.1807C130.127 35.899 130.062 35.594 130.062 35.2856C130.062 34.9771 130.127 34.6721 130.253 34.3904C130.378 34.1086 130.561 33.8564 130.791 33.6501C131.02 33.4438 131.29 33.288 131.583 33.1929C131.876 33.0977 132.186 33.0653 132.493 33.0978H159.686C159.992 33.0653 160.302 33.0977 160.595 33.1929C160.889 33.288 161.159 33.4438 161.388 33.6501C161.617 33.8564 161.8 34.1086 161.926 34.3904C162.051 34.6721 162.116 34.9771 162.116 35.2856C162.116 35.594 162.051 35.899 161.926 36.1807C161.8 36.4625 161.617 36.7147 161.388 36.921C161.159 37.1273 160.889 37.2831 160.595 37.3783C160.302 37.4734 159.992 37.5058 159.686 37.4733Z"
                      fill="white"
                    />
                    <path
                      d="M118.055 30.9956H91.1794C89.9661 30.9216 88.7726 31.3293 87.8578 32.1301C86.943 32.9309 86.3808 34.0604 86.293 35.2733C86.3745 36.4887 86.935 37.622 87.8512 38.4241C88.7675 39.2262 89.9645 39.6316 91.1794 39.5511H118.055C119.268 39.6251 120.461 39.2174 121.376 38.4166C122.291 37.6157 122.853 36.4863 122.941 35.2733C122.853 34.0604 122.291 32.9309 121.376 32.1301C120.461 31.3293 119.268 30.9216 118.055 30.9956ZM118.226 37.4733H105.203C105.51 37.5058 105.82 37.4734 106.113 37.3783C106.406 37.2831 106.676 37.1273 106.906 36.921C107.135 36.7147 107.318 36.4625 107.443 36.1807C107.569 35.899 107.634 35.594 107.634 35.2856C107.634 34.9771 107.569 34.6721 107.443 34.3904C107.318 34.1086 107.135 33.8564 106.906 33.6501C106.676 33.4438 106.406 33.288 106.113 33.1929C105.82 33.0977 105.51 33.0653 105.203 33.0978H118.226C118.532 33.0653 118.842 33.0977 119.135 33.1929C119.429 33.288 119.699 33.4438 119.928 33.6501C120.157 33.8564 120.34 34.1086 120.466 34.3904C120.591 34.6721 120.656 34.9771 120.656 35.2856C120.656 35.594 120.591 35.899 120.466 36.1807C120.34 36.4625 120.157 36.7147 119.928 36.921C119.699 37.1273 119.429 37.2831 119.135 37.3783C118.842 37.4734 118.532 37.5058 118.226 37.4733Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4">
                    <div className="flex -mr-2 md:block">
                      <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                        <div className="relative ">
                          <input type="text" id='"form-subscribe-Search' className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent rounded-lg shadow-sm appearance-none " placeholder={t("_01_search")} />
                        </div>
                        <button
                          onClick={() => {
                            setModal({openModal: true, valuesModal: undefined});
                          }}
                          className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white border rounded-lg shadow-md bg-incremental border-white-300 focus:outline-none"
                          type="submit"
                        >
                          <svg className="inline-block" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 14V16H6.5V14H0.5ZM0.5 2V4H10.5V2H0.5ZM10.5 18V16H18.5V14H10.5V12H8.5V18H10.5ZM4.5 6V8H0.5V10H4.5V12H6.5V6H4.5ZM18.5 10V8H8.5V10H18.5ZM12.5 6H14.5V4H18.5V2H14.5V0H12.5V6Z" fill="white" />
                          </svg>
                          <div className="inline-block px-2">{t("_01_advancedSearch")}</div>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center ml-4 md:ml-6"></div>
                  </div>
                </div>
              </div>
              <div className="block">
                <a className="px-3 py-2 font-medium rounded-md text-white-300 hover:text-gray-800 dark:hover:text-white text-md" href="/#">
                  <svg className="inline-block pr-2" width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 17H16.927C17.3665 17 17.7545 16.713 17.8832 16.2927L19.7709 10.126C19.9677 9.48329 19.4869 8.83333 18.8147 8.83333H5.08763C4.64115 8.83333 4.24877 9.12931 4.12611 9.55861L2 17ZM2 17H1.5V17C1.22386 17 1 16.7761 1 16.5V6.16667" stroke="white" strokeWidth="1.2" />
                    <path d="M1 6.5V6C1 5.44772 1.44772 5 2 5H3.33333M17.6667 9V6C17.6667 5.44772 17.219 5 16.6667 5H14.6667" stroke="white" strokeWidth="1.2" />
                    <path d="M3 13.5V2C3 1.44772 3.44771 1 4 1H13.2C13.7523 1 14.2 1.44772 14.2 2V8.96429" stroke="white" strokeWidth="1.2" />
                    <line x1="6.6" y1="3.4" x2="11.4" y2="3.4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="6.6" y1="6.4" x2="11.4" y2="6.4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <div className="inline-block px-2">{t("_01_documentManager")}</div>
                </a>
                <a className="px-3 py-2 font-medium rounded-md text-white-300 dark:text-white hover:text-gray-800 dark:hover:text-white text-md" href="/#">
                  <svg className="inline-block pr-2" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.641121 0.12092C0.475341 0.138264 0.321745 0.2167 0.210481 0.34092C0.0992329 0.464984 0.0381371 0.626076 0.0390731 0.7928V16.0244C0.0390731 16.2025 0.109853 16.3735 0.235949 16.4996C0.361885 16.6255 0.532825 16.6963 0.711109 16.6963H6.76631C7.64663 18.7968 9.72115 20.2802 12.1355 20.2802C15.3441 20.2802 17.9595 17.6649 17.9595 14.4566C17.9595 11.5538 15.8161 9.1366 13.0315 8.703V5.72112H13.0314C13.0346 5.52753 12.9542 5.3419 12.8107 5.21192C12.6673 5.08192 12.4746 5.02004 12.2823 5.04223C12.1165 5.06129 11.9639 5.14145 11.8538 5.26692C11.7438 5.39239 11.6845 5.55426 11.6873 5.72112V8.64704C11.0584 8.69501 10.4529 8.84813 9.89525 9.08096H2.95125H2.9514C2.92812 9.07971 2.90468 9.07971 2.8814 9.08096C2.64124 9.09346 2.42608 9.23315 2.31688 9.44737C2.20766 9.66143 2.2211 9.91769 2.35188 10.1192C2.48282 10.321 2.71126 10.4375 2.9514 10.4249H7.9422C6.93532 11.4719 6.31128 12.8938 6.31128 14.4569C6.31128 14.7623 6.33566 15.0597 6.38128 15.3528H1.38328V1.46559H11.6873V3.48151H11.6871C11.6846 3.66136 11.7543 3.83479 11.8806 3.96275C12.0068 4.09088 12.1793 4.16306 12.3592 4.16306C12.539 4.16306 12.7115 4.09088 12.8378 3.96275C12.964 3.83478 13.0337 3.66134 13.0312 3.48151V0.793552C13.0312 0.615428 12.9604 0.444488 12.8343 0.318552C12.7082 0.19246 12.5374 0.121676 12.3592 0.121676H0.711161C0.68788 0.120426 0.664441 0.120426 0.641161 0.121676L0.641121 0.12092ZM2.88112 2.36076C2.64097 2.37326 2.4258 2.51295 2.3166 2.72701C2.20738 2.94123 2.22082 3.19733 2.3516 3.39905C2.48254 3.60077 2.71098 3.71717 2.95112 3.70467H7.43112C7.61096 3.70733 7.7844 3.63764 7.91236 3.51124C8.04048 3.38499 8.11267 3.21264 8.11267 3.0328C8.11267 2.85295 8.04048 2.68045 7.91236 2.5542C7.78439 2.42795 7.61095 2.35826 7.43112 2.36076H2.95112C2.92784 2.35951 2.9044 2.35951 2.88112 2.36076ZM2.88112 4.6006V4.60076C2.64097 4.61326 2.4258 4.75279 2.3166 4.967C2.20738 5.18107 2.22082 5.43732 2.3516 5.63888C2.48254 5.8406 2.71098 5.95716 2.95112 5.94466H10.1191C10.299 5.94716 10.4724 5.87748 10.6005 5.75123C10.7285 5.62498 10.8007 5.45248 10.8007 5.27263C10.8007 5.09278 10.7285 4.92044 10.6005 4.79403C10.4724 4.66778 10.299 4.59809 10.1191 4.60075H2.95112C2.92784 4.5995 2.9044 4.5995 2.88112 4.60075V4.6006ZM2.88112 6.84044V6.8406C2.64097 6.8531 2.4258 6.99278 2.3166 7.20684C2.20738 7.42106 2.22082 7.67716 2.3516 7.87888C2.48254 8.08045 2.71098 8.19701 2.95112 8.18451H7.43112C7.61096 8.18701 7.7844 8.11732 7.91236 7.99107C8.04048 7.86482 8.11267 7.69248 8.11267 7.51247C8.11267 7.33263 8.04048 7.16028 7.91236 7.03403C7.78439 6.90778 7.61095 6.8381 7.43112 6.8406H2.95112C2.92784 6.83935 2.9044 6.83935 2.88112 6.8406V6.84044ZM12.1351 9.97636C14.6173 9.97636 16.6151 11.974 16.6151 14.4564C16.6151 16.9384 14.6173 18.9364 12.1351 18.9364C9.65292 18.9364 7.65512 16.9387 7.65512 14.4564C7.65512 11.9743 9.65292 9.97636 12.1351 9.97636ZM12.1281 10.8584H12.1282C11.9487 10.8603 11.7775 10.9337 11.6526 11.0626C11.5276 11.1915 11.4595 11.365 11.4632 11.5443V14.4562C11.464 14.6187 11.5237 14.7753 11.6312 14.8971L13.1992 16.689V16.6892C13.3163 16.8254 13.4832 16.9092 13.6624 16.9215C13.8418 16.934 14.0187 16.874 14.1534 16.7551C14.2882 16.6362 14.3698 16.4684 14.3799 16.2889C14.3899 16.1095 14.3277 15.9334 14.2071 15.8001L12.8071 14.1972V11.5442V11.5443C12.8109 11.3625 12.7409 11.1868 12.6129 11.0576C12.4849 10.9284 12.3101 10.8565 12.1282 10.8584L12.1281 10.8584Z"
                      fill="white"
                    />
                  </svg>
                  <div className="inline-block px-2">{t("_01_projectManager")}</div>
                </a>
                <a onClick={handleClick} className="px-3 py-2 font-medium rounded-md text-white-300 hover:text-gray-800 dark:hover:text-white text-md" href="/#">
                  <svg className="inline-block pr-2" width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.01816 1.69797e-07C8.24341 1.69797e-07 7.58392 0.480022 7.32433 1.20987L7.08236 1.87222C6.69229 1.98914 6.31155 2.14282 5.94886 2.33072L5.32477 2.03782C4.49502 1.64246 3.45645 1.95359 2.9686 2.72547C2.63652 3.25116 2.5972 3.88049 2.85393 4.4193L3.15964 5.14521C3.12137 5.28428 3.01349 5.48813 2.91767 5.66743C2.82516 5.841 2.7322 6.02482 2.65023 6.22776L2.06441 6.44427C1.33803 6.70237 0.867188 7.36713 0.867188 8.13825C0.867188 8.91585 1.34223 9.58364 2.07706 9.84473L2.63739 10.0486C2.76621 10.4882 2.94114 10.9166 3.15961 11.3222L2.90482 11.8443C2.63301 12.4161 2.67219 13.0469 3.00682 13.5764C3.48565 14.3341 4.49152 14.6427 5.31193 14.2514L5.8468 13.9967C6.25076 14.2139 6.67698 14.3892 7.12043 14.5188L7.32429 15.0793C7.5839 15.8084 8.24337 16.2892 9.01812 16.2892C9.79287 16.2892 10.4656 15.8084 10.7248 15.0793L10.9285 14.4933C11.3479 14.363 11.7632 14.1967 12.1511 13.9839L12.7243 14.2514C12.9748 14.3709 13.2458 14.4293 13.5139 14.4298C14.1231 14.4298 14.6964 14.1025 15.0294 13.5764C15.364 13.0469 15.4035 12.417 15.1314 11.8443L14.8383 11.2202C15.0283 10.8551 15.1791 10.4813 15.2968 10.0867L15.9592 9.84472C16.6887 9.58512 17.169 8.91253 17.169 8.13824C17.169 7.36381 16.6887 6.70358 15.9592 6.44426L15.2714 6.18963C15.1532 5.81838 14.9955 5.46537 14.8129 5.11973L15.1314 4.44473C15.4035 3.87264 15.364 3.24254 15.0294 2.7128C14.5501 1.95506 13.543 1.64772 12.7243 2.0378L12.0493 2.35616C11.7044 2.1743 11.3503 2.0277 10.9794 1.91031L10.7247 1.20986C10.4656 0.480315 9.79285 -1.52588e-05 9.01811 -1.52588e-05L9.01816 1.69797e-07ZM9.01816 1.22268C9.11519 1.22268 9.45059 1.25718 9.57849 1.61742L9.89685 2.53438C9.91162 2.57431 9.92789 2.60459 9.94793 2.64904C10.0228 2.81899 10.176 2.94556 10.3555 2.99287C10.831 3.11807 11.2803 3.31455 11.7055 3.566C11.8643 3.66047 12.0552 3.68096 12.2275 3.61693C12.2741 3.59945 12.3311 3.5761 12.3805 3.5532L13.2464 3.13296C13.5253 2.99962 13.8389 3.11081 13.9979 3.36213C14.0606 3.46082 14.1567 3.66874 14.036 3.92261L13.6158 4.80131C13.5954 4.8453 13.5688 4.88342 13.552 4.92862C13.4865 5.10235 13.5085 5.29143 13.603 5.45084C13.8561 5.8771 14.0506 6.33799 14.1761 6.81365C14.2237 6.99249 14.3635 7.14573 14.5327 7.2212C14.5706 7.23777 14.6011 7.26112 14.6346 7.27212L15.5515 7.59049C15.9123 7.71841 15.9463 8.04158 15.9463 8.13816C15.9463 8.23504 15.9122 8.57012 15.5515 8.69849L14.6474 9.01686C14.6168 9.0274 14.5813 9.03915 14.5454 9.05513C14.3699 9.13091 14.2468 9.28957 14.2016 9.47536C14.0794 9.97467 13.8877 10.4452 13.6284 10.8891C13.5352 11.0495 13.5239 11.2635 13.5903 11.4366C13.596 11.4514 13.6091 11.486 13.6158 11.5003L14.036 12.3664C14.1567 12.6207 14.0606 12.8285 13.9979 12.9267C13.8874 13.1019 13.7074 13.207 13.5139 13.207C13.4287 13.207 13.3319 13.1967 13.2463 13.156L12.3805 12.7357C12.1938 12.646 11.9714 12.6652 11.7945 12.7739C11.3312 13.0604 10.8384 13.2647 10.3172 13.398C10.1195 13.4481 9.95227 13.6008 9.88414 13.7928L9.57843 14.6716C9.45052 15.0322 9.11511 15.0664 9.01811 15.0664C8.92108 15.0664 8.5988 15.0322 8.47043 14.6716L8.16487 13.8056C8.09556 13.6103 7.93314 13.4711 7.73183 13.4235C7.18446 13.293 6.66552 13.0748 6.19078 12.7866C6.09375 12.728 5.98286 12.6975 5.87242 12.6975C5.78262 12.6975 5.70081 12.7217 5.61763 12.7611L4.78985 13.156C4.50946 13.2897 4.1977 13.1791 4.03832 12.9267C3.9761 12.8285 3.89187 12.6211 4.01286 12.3664L4.40776 11.5512C4.49575 11.3658 4.47541 11.1535 4.36949 10.9781C4.079 10.4988 3.87303 9.97706 3.7454 9.43706C3.69688 9.23502 3.54667 9.07305 3.35066 9.00418L2.48461 8.69847C2.11864 8.56799 2.08987 8.23623 2.08987 8.13814C2.08987 8.04276 2.11202 7.71883 2.47182 7.59046L3.33786 7.2721C3.52695 7.20279 3.66994 7.047 3.71996 6.85175C3.76772 6.66507 3.88284 6.46136 4.00021 6.24046C4.19623 5.87358 4.39495 5.49283 4.39495 5.05605C4.39495 4.97409 4.38892 4.88941 4.35683 4.81408L3.97473 3.92257C3.86595 3.69311 3.92607 3.4927 4.00019 3.3749C4.16683 3.11198 4.50209 2.99642 4.78987 3.13292L5.65591 3.55316C5.67987 3.56506 5.70157 3.57214 5.71949 3.57862C5.89804 3.65697 6.11154 3.63784 6.27982 3.5405C6.72324 3.28286 7.19802 3.1016 7.69354 2.98018C7.87736 2.93528 8.03722 2.78401 8.1139 2.61074C8.1261 2.58392 8.14147 2.55182 8.15202 2.52169L8.47038 1.61738C8.59875 1.25713 8.92105 1.22264 9.01806 1.22264L9.01816 1.22268ZM9.0055 4.39383C6.87158 4.39383 5.1337 6.12021 5.1337 8.25291C5.1337 10.3861 6.87154 12.1247 9.0055 12.1247C11.139 12.1247 12.8773 10.3861 12.8773 8.25291C12.8773 6.12033 11.1392 4.39383 9.0055 4.39383V4.39383ZM9.0055 5.6037C10.4649 5.6037 11.6544 6.79413 11.6544 8.25279C11.6544 9.71187 10.4649 10.9019 9.0055 10.9019C7.54596 10.9019 6.35642 9.71187 6.35642 8.25279C6.35642 6.79417 7.54596 5.6037 9.0055 5.6037V5.6037ZM20.4678 9.81918C19.8597 9.81918 19.3343 10.1891 19.1306 10.7616L19.0031 11.1311C18.7937 11.1987 18.5903 11.2756 18.3918 11.373L18.048 11.2075C17.3722 10.8867 16.4667 11.1776 16.0611 11.8187C15.8276 12.1885 15.7822 12.6256 15.9338 13.016L16.0102 13.4745C15.9996 13.5976 15.9441 13.7631 15.8829 13.9456C15.8669 13.9934 15.8478 14.0372 15.832 14.0857L15.6281 14.1749C15.0694 14.3738 14.6984 14.8929 14.6984 15.4867C14.6984 16.1079 15.0845 16.6379 15.679 16.8495L15.9847 16.9513C16.0622 17.1898 16.1566 17.4323 16.2776 17.6646L16.163 17.932C15.9528 18.3738 15.9802 18.8724 16.2395 19.282C16.6156 19.8766 17.4098 20.1214 18.048 19.8169L18.3154 19.6896C18.5436 19.8061 18.7837 19.905 19.0286 19.9825L19.1306 20.2627C19.3343 20.8353 19.8596 21.2052 20.4677 21.2052C21.0759 21.2052 21.6013 20.8353 21.8049 20.2627L21.9069 19.957C22.1367 19.8803 22.3654 19.7893 22.5819 19.6768L22.8749 19.8169C23.0704 19.9099 23.2878 19.9566 23.4989 19.957C23.977 19.957 24.4356 19.7068 24.696 19.2947C24.9556 18.8852 24.9827 18.375 24.7725 17.932L24.607 17.6009C24.7052 17.4008 24.7932 17.1883 24.8616 16.9768L25.2182 16.8494C25.7908 16.646 26.1607 16.1198 26.1607 15.5121C26.1607 14.9044 25.7908 14.3783 25.2182 14.1749L24.8361 14.0476C24.7685 13.8507 24.6876 13.6607 24.5942 13.4745L24.7726 13.1052C24.9824 12.6625 24.9556 12.1523 24.696 11.7424C24.3211 11.149 23.5179 10.9027 22.8749 11.2075L22.5056 11.3857C22.3196 11.2932 22.1289 11.2106 21.9324 11.1438L21.805 10.7617C21.6013 10.1891 21.0754 9.8192 20.4678 9.8192L20.4678 9.81918ZM20.4678 11.0419C20.5302 11.0419 20.6078 11.0744 20.646 11.182L20.8625 11.7933C20.8732 11.8231 20.8972 11.8457 20.9135 11.8825C20.9868 12.0565 21.1258 12.1906 21.3084 12.2391C21.6115 12.3189 21.9038 12.4351 22.1744 12.5956C22.3346 12.6897 22.5357 12.7117 22.7093 12.6466C22.7444 12.6335 22.7705 12.6144 22.8111 12.5956L23.4098 12.3155C23.5104 12.2674 23.6094 12.3051 23.6645 12.3919C23.7186 12.4775 23.6758 12.5593 23.6645 12.5829L23.3843 13.1687C23.3697 13.1998 23.3616 13.2304 23.346 13.2706C23.2788 13.4451 23.2885 13.645 23.3843 13.8056C23.5457 14.077 23.6737 14.3688 23.7536 14.6717C23.8014 14.851 23.9284 14.9911 24.0976 15.0664C24.1285 15.0803 24.1517 15.1047 24.1866 15.1173L24.8107 15.3338C24.9183 15.3721 24.938 15.4494 24.938 15.5121C24.938 15.5749 24.918 15.6649 24.8107 15.7031L24.1866 15.9196C24.1789 15.9225 24.1431 15.9419 24.1357 15.9451C23.9528 16.0182 23.8133 16.174 23.7664 16.3655C23.689 16.6834 23.5625 16.9856 23.397 17.2696C23.3032 17.4307 23.2912 17.6314 23.3588 17.8046C23.3641 17.8188 23.3778 17.8548 23.3843 17.8682L23.6645 18.4542C23.6763 18.4786 23.7186 18.5473 23.6645 18.6324C23.6266 18.6924 23.5609 18.7343 23.499 18.7343C23.4708 18.7343 23.4416 18.7239 23.4098 18.7088L22.8239 18.4285C22.6368 18.3401 22.4149 18.3585 22.238 18.4668C21.9418 18.6494 21.615 18.7896 21.2829 18.8744C21.086 18.9245 20.9306 19.0648 20.8625 19.2565L20.646 19.8551C20.6078 19.9627 20.5306 19.9824 20.4678 19.9824C20.405 19.9824 20.3147 19.9627 20.2767 19.8551L20.073 19.2692C20.0033 19.0743 19.8418 18.9353 19.64 18.8871C19.2915 18.8043 18.9629 18.6633 18.6593 18.4797C18.5622 18.4209 18.4509 18.3905 18.3409 18.3905C18.2516 18.3905 18.1562 18.4146 18.0735 18.4542L17.5258 18.7088C17.4242 18.7569 17.3265 18.7209 17.271 18.6324C17.2172 18.5476 17.2449 18.4831 17.2584 18.4542L17.5258 17.8937C17.6118 17.7087 17.5936 17.495 17.4875 17.3206C17.292 16.9987 17.1574 16.6668 17.08 16.34C17.0316 16.1354 16.8841 15.9751 16.6852 15.907L16.074 15.7031C15.9313 15.6522 15.921 15.5246 15.921 15.4866C15.921 15.3718 15.9976 15.3447 16.0612 15.3212L16.5706 15.1047C16.7471 15.0308 16.8796 14.8821 16.9272 14.6971C16.9585 14.5748 17.0027 14.4574 17.0419 14.3405C17.138 14.0544 17.2329 13.7471 17.2329 13.4235C17.2329 13.3908 17.2377 13.3661 17.2329 13.3343L17.1311 12.7485C17.1216 12.6909 17.1053 12.635 17.08 12.5829C17.0711 12.5629 17.0557 12.5394 17.0928 12.4811C17.1776 12.3465 17.3958 12.2526 17.5258 12.3155L18.1117 12.5956C18.1255 12.6025 18.1611 12.6155 18.1754 12.6212C18.3511 12.6929 18.546 12.6783 18.7103 12.5829C18.9935 12.4178 19.2991 12.3037 19.6146 12.2263C19.7987 12.1811 19.9581 12.0434 20.0348 11.8696C20.041 11.8558 20.0554 11.8071 20.0603 11.7932L20.2768 11.182C20.3147 11.0744 20.4047 11.0418 20.4678 11.0418L20.4678 11.0419ZM20.455 12.9905C19.0214 12.9905 17.857 14.1549 17.857 15.5886C17.857 17.0222 19.0214 18.1866 20.455 18.1866C21.8892 18.1866 23.0531 17.0222 23.0531 15.5886C23.0531 14.1548 21.8892 12.9905 20.455 12.9905ZM20.455 14.2132C21.2151 14.2132 21.8306 14.8285 21.8306 15.5886C21.8306 16.3483 21.2151 16.9641 20.455 16.9641C19.695 16.9641 19.0795 16.3483 19.0795 15.5886C19.0795 14.8285 19.695 14.2132 20.455 14.2132Z"
                      fill="white"
                    />
                  </svg>
                  <div className="inline-block px-2">{t("_01_administration")}</div>
                </a>
              </div>
              <div className="block">
                <select
                  id="role"
                  name="role"
                  onChange={async (e) => {
                    e.preventDefault();
                    await CbRole({context: context, role: e.target.value});
                  }}
                  className="relative block w-full text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                  {cbItemsRoles}
                </select>
              </div>
              <div className="block">
                <div className="flex items-center ml-4 md:ml-6">
                  <div className="relative ml-3">
                    <div className="relative inline-block text-left">
                      <div>
                        <button type="button" className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none" id="options-menu">
                          <svg width="20" fill="currentColor" height="20" className="text-gray-800" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                          </svg>
                        </button>
                      </div>
                      {/* <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <a href="#" className="block px-4 py-2 text-gray-700 text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                            <span className="flex flex-col">
                              <span>Settings</span>
                            </span>
                          </a>
                          <a href="#" className="block px-4 py-2 text-gray-700 text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                            <span className="flex flex-col">
                              <span>Account</span>
                            </span>
                          </a>
                          <a href="#" className="block px-4 py-2 text-gray-700 text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600" role="menuitem">
                            <span className="flex flex-col">
                              <span>Logout</span>
                            </span>
                          </a>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
