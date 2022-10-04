export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export function getIdForm(objectTabContent) {
  let idForm = "undefined";
  if (objectTabContent?.id !== undefined && objectTabContent.id?.defaultValue !== undefined) {
    idForm = objectTabContent.id?.defaultValue;
  }
  return idForm;
}
