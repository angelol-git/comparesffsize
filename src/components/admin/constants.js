export const CASE_TYPES = ["ITX", "mATX", "ATX"];

export const EMPTY_CASE = {
  name: "",
  type: "ITX",
  measurements: {
    length: "",
    width: "",
    height: "",
    volume: "",
  },
};

export function calculateVolume(length, width, height) {
  if (length && width && height) {
    return ((Number(length) * Number(width) * Number(height)) / 1_000_000).toFixed(2);
  }
  return "";
}
