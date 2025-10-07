import { formatInTimeZone } from 'date-fns-tz';
import { formatDistanceToNowStrict, isBefore, subDays } from 'date-fns';
import { id } from 'date-fns/locale'; // Impor locale Bahasa Indonesia

export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const sevenDaysAgo = subDays(new Date(), 7); // Dapatkan tanggal 7 hari yang lalu

  if (isBefore(date, sevenDaysAgo)) {
    return formatInTimeZone(
      date,
      'Asia/Jakarta',
      'd MMMM yyyy',
      { locale: id }
    );
  } else {
    return formatDistanceToNowStrict(date, {
      addSuffix: true,
      locale: id,
    });
  }
}