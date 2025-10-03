import { useMemo } from "react";
import { formatDate } from "./formatDate";

export default function useFormattedDate(dateString) {
  return useMemo(() => formatDate(dateString), [dateString]);
}