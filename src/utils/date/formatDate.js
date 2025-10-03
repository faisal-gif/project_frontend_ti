export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} menit ${diffMinutes > 1 ? "" : ""} lalu`;
  if (diffHours < 24) return `${diffHours} jam ${diffHours > 1 ? "" : ""} lalu`;
  if (diffDays < 7) return `${diffDays} hari ${diffDays > 1 ? "" : ""} lalu`;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}