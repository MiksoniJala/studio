
import { getBarbers, getWorks, getNonWorkingDays } from "@/lib/actions";
import { HomePageClient } from "@/components/home-page-client";

export default async function Home() {
  const barbers = await getBarbers();
  const works = await getWorks();
  const nonWorkingDays = await getNonWorkingDays();

  // Convert Date objects to string to pass them to client component
  const nonWorkingDayStrings = nonWorkingDays.map(d => d.toISOString());

  return <HomePageClient barbers={barbers} works={works} nonWorkingDays={nonWorkingDayStrings} />;
}
