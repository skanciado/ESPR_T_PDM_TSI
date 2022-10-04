import React from "react";
import "./treeView.css";
export function TreeView({areaKey, data, toggled = true, name = null, isLast = true, isChildElement = false, isParentToggled = true}) {
  const [isToggled, setIsToggled] = React.useState(toggled);
  const handleToggle = (e) => {
    console.log(e.target);
    if ((e.type === "keydown" && e.key === "Enter") || e.type === "click") {
      setIsToggled(!isToggled);
    }
  };
  const getNameOrSpace = () => {
    return name ? <strong>&nbsp;&nbsp;{name}: </strong> : <span>&nbsp;&nbsp;</span>;
  };
  return (
    <div style={{marginLeft: isChildElement ? 16 : 4 + "px"}} className={isParentToggled ? "tree-element" : "tree-element collapsed"}>
      <span className={isToggled ? "toggler" : "toggler closed"} onClick={handleToggle} onKeyDown={handleToggle} tabIndex="0" />
      {getNameOrSpace()}
      {Array.isArray(data) ? "[" : "{"}
      {!isToggled && "..."}
      {Object.keys(data).map((v, i, a) =>
        typeof data[v] === "object" ? (
          <TreeView data={data[v]} isLast={i === a.length - 1} name={Array.isArray(data) ? null : v} isChildElement isParentToggled={isParentToggled && isToggled} key={i} />
        ) : (
          <p style={{marginLeft: 16 + "px"}} className={isToggled ? "tree-element" : "tree-element collapsed"} key={i}>
            {Array.isArray(data) ? "" : <strong>{v}: </strong>}
            {data[v]}
            {i === a.length - 1 ? "" : ","}
          </p>
        )
      )}
      {Array.isArray(data) ? "]" : "}"}
      {!isLast ? "," : ""}
    </div>
  );
}
