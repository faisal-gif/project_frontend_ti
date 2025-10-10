import { formatInTimeZone } from 'date-fns-tz';
import { id } from 'date-fns/locale'; // Impor locale Bahasa Indonesia

export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

    return formatInTimeZone(
      date,
      'Asia/Jakarta',
      "d MMMM yyyy, HH:mm 'WIB'",
      { locale: id }
    );
}