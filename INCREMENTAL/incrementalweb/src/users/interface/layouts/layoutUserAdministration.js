import t from "../../../transversal/language/i18n";
import {useContext} from "react";
import Context from "../../../transversal/context/context";
//import LayoutGroup from "../../../groups/interface/layouts/layoutGroup";
import "../css/userAdministration.css";
import {useNavigate} from "react-router-dom";
export default function LayoutUserAdministration(props) {
  const context = useContext(Context);
  const navigate = useNavigate();
  //const context = useContext(Context);
  // const [modal, setModalOpen] = useState({openModal: false, valuesModal: undefined});
  return (
    <>
      {/* LISTADO DE USUARIOS CON BOTÓN DE GESTÓN DE GRUPOS QUE HARÁ VISIBLE EL COMPONENTE DE LAYOUT GROUP */}
      {/* <LayoutGroup className="" /> */}
      {/* <LayoutGroup /> */}
      <div className="grupo">
        <div className="item">
          <button
            className="h-100 w-full"
            onClick={() => {
              context.extendedModeDispatch.handleExtendedModeReplace({value: ""});
              navigate("/home/organization", {replace: true});
            }}
          >
            <svg className="icon" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M15 18H5V4H6V2.5C6 1.11929 7.11929 0 8.5 0H11.5C12.8807 0 14 1.11929 14 2.5V4H15V18ZM8.5 2C8.22386 2 8 2.22386 8 2.5V4H12V2.5C12 2.22386 11.7761 2 11.5 2H8.5ZM17 4V18C18.6569 18 20 16.6568 20 15V7C20 5.34315 18.6569 4 17 4ZM0 7C0 5.34315 1.34315 4 3 4L3 18C1.34315 18 0 16.6568 0 15V7Z" fill="#E20074" />
            </svg>
            <h1 className="item-title">{t("_05_organization")}</h1>
          </button>
        </div>
        <div className="item">
          <button
            className="h-100 w-full"
            onClick={() => {
              context.extendedModeDispatch.handleExtendedModeReplace({value: ""});
              navigate("/home/business", {replace: true});
            }}
          >
            <svg className="icon" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M13 6.00035H12V4.11035C12 1.90121 10.2091 0.110352 8 0.110352C5.79086 0.110352 4 1.90121 4 4.11035V6.00035H3H3C1.34315 6.00035 0 7.3435 0 9.00035V17.0004V17.0004C2.50178e-07 18.6572 1.34315 20.0004 3 20.0004H13C14.6568 20.0004 16 18.6572 16 17.0004V9.00035C16 7.3435 14.6568 6.00035 13 6.00035V6.00035ZM6 4.11035V4.11035C5.972 2.97631 6.86609 2.03305 8 2.00035C9.13391 2.03304 10.028 2.97632 10 4.11035V6.00035H6V4.11035ZM8 16.0004C6.34315 16.0004 5 14.6572 5 13.0004C5 11.3435 6.34315 10.0004 8 10.0004C9.65685 10.0004 11 11.3435 11 13.0004C11 14.6572 9.65685 16.0004 8 16.0004Z" fill="#E20074" />
            </svg>
            <h1 className="item-title">{t("_05_business")}</h1>
          </button>
        </div>
        <div className="item">
          <button
            className="h-100 w-full"
            onClick={() => {
              context.extendedModeDispatch.handleExtendedModeReplace({value: ""});
              navigate("/home/project", {replace: true});
            }}
          >
            <svg className="icon" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.74 5.33018L11.3 0.330184C11.1109 0.120705 10.8422 0.000850743 10.56 0.000183743H2.56V0.000183742C1.16282 -0.0164819 0.0166743 1.10264 4.28259e-06 2.49982C2.86823e-06 2.49994 1.46221e-06 2.50006 6.45268e-08 2.50018V17.5002L0 17.5002C0.0164662 18.8974 1.16246 20.0167 2.55964 20.0002C2.55976 20.0002 2.55988 20.0002 2.56 20.0002H13.44C14.8372 20.0168 15.9833 18.8977 16 17.5005C16 17.5004 16 17.5003 16 17.5002V6.00018V6.00018C15.9994 5.75235 15.9067 5.51358 15.74 5.33018L15.74 5.33018ZM9.99851 2.00024L13.7385 6.00024H10.7385C10.303 5.97395 9.97126 5.59958 9.99755 5.16407C9.99783 5.15946 9.99815 5.15485 9.99851 5.15024V2.00024Z" fill="#E20074" />
            </svg>
            <h1 className="item-title">{t("_05_projects")}</h1>
          </button>
        </div>
        <div className="item">
          <button
            className="h-100 w-full"
            onClick={() => {
              context.extendedModeDispatch.handleExtendedModeReplace({value: ""});
              navigate("/home/security", {replace: true});
            }}
          >
            <svg className="icon" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.33 15.9998H12.12C11.2514 15.9136 10.539 15.274 10.36 14.4198L7.68 1.99975L4.92 8.39975C4.76045 8.76534 4.39889 9.00114 4 8.99975H1C0.447715 8.99975 0 8.55204 0 7.99975C2.41411e-08 7.44747 0.447715 6.99975 1 6.99975H3.34L5.85 1.20975C6.2905 0.196824 7.46873 -0.267236 8.48167 0.173264C9.0738 0.430763 9.50518 0.958293 9.64 1.58975L12.32 13.9998L15.08 7.61975C15.2334 7.24633 15.5963 7.00177 16 6.99975H19C19.5523 6.99975 20 7.44747 20 7.99975C20 8.55204 19.5523 8.99975 19 8.99975H16.66L14.15 14.7898C13.8368 15.5182 13.1229 15.9929 12.33 15.9998Z" fill="#E20074" />
            </svg>
            <h1 className="item-title">{t("_05_lifeCycles")}</h1>
          </button>
        </div>
        <div className="item">
          <button
            className="h-100 w-full"
            onClick={() => {
              context.extendedModeDispatch.handleExtendedModeReplace({value: ""});
              navigate("/home/workflow", {replace: true});
            }}
          >
            <svg className="icon" width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M18.4083 1.89L14.4083 0.09H13.5883L9.9983 1.7L6.4083 0.09H6.3583L6.2383 0H5.6383L1.6383 1.8H1.6383C1.22876 1.95692 0.969268 2.36239 0.998303 2.8V15L0.998303 15C0.998866 15.34 1.17214 15.6564 1.45829 15.84C1.61925 15.944 1.80669 15.9995 1.9983 16C2.1398 15.9993 2.27954 15.9687 2.4083 15.91L5.9983 14.3L9.5883 15.91H9.6383C9.86645 16.0167 10.1302 16.0167 10.3583 15.91H10.4083L13.9983 14.3L17.5883 15.91C17.7171 15.9687 17.8568 15.9993 17.9983 16C18.1899 15.9995 18.3773 15.944 18.5383 15.84C18.8245 15.6564 18.9977 15.34 18.9983 15V2.8V2.80001C18.9975 2.40712 18.7667 2.0511 18.4083 1.89001L18.4083 1.89ZM7 2.55005L9 3.44005V13.44L7 12.55V2.55005ZM17 13.4501L15 12.5601V2.56006L17 3.45006V13.4501Z" fill="#E20074" />
            </svg>
            <h1 className="item-title">{t("_05_workFlows")}</h1>
          </button>
        </div>
        <div className="item">
          <svg className="icon" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9998 3.99963V3.99964C11.9962 5.2679 11.1955 6.39689 9.99976 6.81964V19.9996C9.99976 20.5519 9.55205 20.9996 8.99976 20.9996C8.44748 20.9996 7.99976 20.5519 7.99976 19.9996V6.81964C6.79822 6.39483 5.99621 5.25724 5.99978 3.98281C6.00442 2.32597 7.35133 0.986588 9.00818 0.991235C10.665 0.995875 12.0044 2.34279 11.9998 3.99963ZM17.9998 11.9996C17.9962 10.7314 17.1955 9.6024 15.9998 9.17965V1.99964C15.9998 1.44735 15.5521 0.999639 14.9998 0.999639C14.4475 0.999639 13.9998 1.44735 13.9998 1.99964V9.17964C12.4423 9.74492 11.638 11.4657 12.2033 13.0232C12.5065 13.8585 13.1644 14.5164 13.9998 14.8196V19.9996C13.9998 20.5519 14.4475 20.9996 14.9998 20.9996C15.5521 20.9996 15.9998 20.5519 15.9998 19.9996V14.8196C17.1955 14.3969 17.9962 13.2679 17.9998 11.9996ZM3.99975 13.1796V1.99964C3.99975 1.44736 3.55204 0.999643 2.99975 0.999643C2.44747 0.999643 1.99975 1.44736 1.99975 1.99964V13.1796C0.442314 13.7449 -0.361996 15.4657 0.203274 17.0232C0.506464 17.8585 1.1644 18.5165 1.99975 18.8196V19.9996C1.99975 20.5519 2.44747 20.9996 2.99975 20.9996C3.55204 20.9996 3.99975 20.5519 3.99975 19.9996V18.8196C5.55719 18.2544 6.3615 16.5336 5.79623 14.9761C5.49304 14.1408 4.8351 13.4828 3.99975 13.1796Z"
              fill="#E20074"
            />
          </svg>
          <h1 className="item-title">{t("_05_preferences")}</h1>
        </div>
      </div>
    </>
  );
}
