
import { getBarbers, getWorks } from "@/lib/actions";
import { HomePageClient } from "@/components/home-page-client";

export default async function Home() {
  const barbers = await getBarbers();
  const works = await getWorks();

  return <HomePageClient barbers={barbers} works={works} />;
}
