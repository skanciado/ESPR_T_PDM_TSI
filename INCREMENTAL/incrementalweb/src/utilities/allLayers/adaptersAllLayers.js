export function adapJoinItemsForIn(items) {
  if (items.length > 0) {
    return items.join("', '");
  }
  return items;
}
