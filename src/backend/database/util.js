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

/* 
  Backtracking algorithm that converts any ObjectId 
  instances in a document to hex strings
*/
function convertObjectIds(obj, ObjectIdClass) {
  if (!obj || !ObjectIdClass) return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => convertObjectIds(item, ObjectIdClass));
  }
  if (typeof obj === "object") {
    // If it's an ObjectId instance, convert to hex string
    if (obj instanceof ObjectIdClass) {
      return obj.toHexString();
    }
    // Check if object is not an object literal {} (its __proto__ is not the same as Object.prototype)
    else if (Object.getPrototypeOf(obj) !== Object.prototype) {
      return obj;
    }

    // If it is an object literal, recurse on its properties
    const out = {};
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (val instanceof ObjectIdClass) {
        out[key] = val.toHexString();
      } else if (Array.isArray(val)) {
        out[key] = val.map((v) => convertObjectIds(v, ObjectIdClass));
      } else if (val && typeof val === "object") {
        out[key] = convertObjectIds(val, ObjectIdClass);
      } else {
        out[key] = val;
      }
    }
    return out;
  }
  return obj;
}

export { logWithDate, sortByObjectIds, convertObjectIds };
