import { formatInTimeZone } from 'date-fns-tz';
import { formatDistanceToNowStrict, isBefore, subDays } from 'date-fns';
import { id } from 'date-fns/locale'; // Impor locale Bahasa Indonesia
import { useEffect, useState } from 'react';

export function formatDate(dateString) {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    const sevenDaysAgo = subDays(new Date(), 7);

    if (isNaN(date.getTime())) {
      return ""; 
    }
    
    if (isBefore(date, sevenDaysAgo)) {
      return formatInTimeZone(date, 'Asia/Jakarta', 'd MMMM yyyy', { locale: id });
    } 
 
    else {
      return <ClientOnlyRelativeTime date={date} />;
    }
  } catch (error) {
    console.error("Invalid date string:", dateString, error);
    return ""; // Tangani jika dateString tidak valid
  }
}

// Buat komponen terpisah untuk me-render waktu relatif HANYA di client
function ClientOnlyRelativeTime({ date }) {
  const [relativeTime, setRelativeTime] = useState('');

  useEffect(() => {
    const time = formatDistanceToNowStrict(date, {
      addSuffix: true,
      locale: id,
    });
    setRelativeTime(time);
  }, [date]);

  // Saat render di server, atau sebelum effect jalan, jangan render apa-apa.
  // GSC akan melihat konten dari formatInTimeZone untuk postingan lama,
  // dan kosong untuk postingan baru (lebih baik daripada error).
  return <>{relativeTime}</>; 
}