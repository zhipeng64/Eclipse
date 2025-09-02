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

export { logWithDate };
