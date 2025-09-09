// Prints any Date objects in a returned document in local time
function logWithDate(document) {
  if (!document) return;
  for (const key in document) {
    let val = document[key];
    if (val instanceof Date) {
      val = val.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }
    console.log(key, ":", val);
  }
}

// Sort by ObjectId strings in a locale-sensitive format
function sortByObjectIds(objectIdA, objectIdB) {
  const [A, B] = [objectIdA, objectIdB].sort((a, b) =>
    a.toString().localeCompare(b.toString())
  );
  return [A, B];
}

export { logWithDate, sortByObjectIds };
