
import { getNonWorkingDays } from "@/lib/actions";
import { SettingsClient } from "@/components/settings-client";

export default async function SettingsAdminPage() {
    const nonWorkingDays = await getNonWorkingDays();
    const nonWorkingDayStrings = nonWorkingDays.map(d => d.toISOString());

    return <SettingsClient nonWorkingDays={nonWorkingDayStrings} />;
}
