export function formatViews(num) {
  if (num == null) return "0";

  return num >= 1_000_000
    ? (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M"
    : num >= 1_000
    ? (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k"
    : num.toString();
}
