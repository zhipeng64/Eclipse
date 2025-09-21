// Base64 encode and decode functions for strings
const encodeBase64 = (str, fromType = "binary") => {
  return Buffer.from(str, fromType).toString("base64");
};

const decodeBase64 = (b64Str, toType = "binary") => {
  return Buffer.from(b64Str, "base64").toString(toType);
};

export { encodeBase64, decodeBase64 };
