export default function HookViewTableHeader(props) {
  const headers = props.headers.map((header, h) => (
    <th key={h} scope="col" className="px-5 py-3 text-base font-semibold text-left border-b border-gray-200">
      {header.table_display !== "block" ? "" : header.table_label}
    </th>
  ));
  return (
    <tr id={props.id + "_h"}>
      <th className="px-5 py-3 text-base font-semibold text-left border-b border-gray-200">
        <input id={props.id + "_checkAll"} name={props.id + "_checkAll"} type="checkbox" />
      </th>
      {headers}
    </tr>
  );
}
