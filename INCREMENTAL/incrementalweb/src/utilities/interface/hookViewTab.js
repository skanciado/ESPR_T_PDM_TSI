export function openTab(evt, tabName) {
  let i = 0;
  // Get all elements with className="tabcontent" and hide them
  let tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Get all elements with className="tablinks" and remove the class "active"
  let tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
export default function createHeaderTabs(tabsName,style) {
  const headerTabs = tabsName.map((tabName, t) => (
    <button
      key={t}
      className="tablinks"
      onClick={(e) => {
        openTab(e, tabName);
      }}
    >
      {tabName}
    </button>
  ));
  return <div className={"tab"+style}>{headerTabs}</div>;
}
