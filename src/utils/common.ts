export function parse(val) {
  try {
    let res = JSON.parse(val);
    return res;
  } catch {
    return val;
  }
}
