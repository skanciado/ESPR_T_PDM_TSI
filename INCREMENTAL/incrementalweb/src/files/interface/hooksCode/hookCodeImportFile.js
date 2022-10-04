export function readJson(attributes, valuesModal) {
  const jsonFile = JSON.parse(valuesModal);
  let tableName = undefined;
  jsonFile.forEach((row) => {
    tableName = row?.name;
  });
  Object.entries(jsonFile).forEach(([key, value]) => {
    tableName = value?.name;
  });
  console.log();
}
