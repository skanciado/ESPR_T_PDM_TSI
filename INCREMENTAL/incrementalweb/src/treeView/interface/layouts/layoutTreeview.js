// import Treeview from "smelte/src/components/Treeview";
import {Treeview} from "smelte";
export default function LayoutTreeView(props) {
  return (
    <>
      <Treeview
        items={[
          {
            text: "Proyecto 1",
            items: [{text: "subtest"}, {text: "subtest2"}, {text: "subtest3"}, {text: "subtest4", items: [{text: "subtest"}, {text: "subtest2"}, {text: "subtest3"}, {text: "subtest4"}]}],
          },
          {
            text: "Proyecto 2",
            items: [{text: "subtest"}, {text: "subtest2"}, {text: "subtest3"}, {text: "subtest4"}],
          },
          {
            text: "Proyecto 3",
            items: [{text: "subtest"}, {text: "subtest2"}, {text: "subtest3"}, {text: "subtest4"}],
          },
        ]}
      />
    </>
  );
}
