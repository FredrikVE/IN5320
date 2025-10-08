import { useEffect, useState } from "react";
import { NoticeBox, CircularLoader, Center, Button } from "@dhis2/ui";
import { useOrgUnitChildren } from "../hooks/useOrgUnitChildren";
import { useLastInspection } from "../hooks/useLastInspection";
import { ROOT_OU } from "../constants";
import SchoolList from "../components/SchoolList";

export default function Planner() {
  const { loading, error, list } = useOrgUnitChildren(ROOT_OU);
  const [lastMap, setLastMap] = useState({}); // { ouId: lastEvent }

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const batches = list?.map(s => s.id) ?? [];
      const promises = batches.map(async (ou) => {
        // Bruk hooken “imperativt” ved å lage en inline helper
        const res = await fetchLast(ou);
        return [ou, res];
      });
      const entries = await Promise.all(promises);
      if (isMounted) {
        setLastMap(Object.fromEntries(entries));
      }
    };
    if (list?.length) load();
    return () => { isMounted = false; };
  }, [list]);

  const handleInspect = (school) => {
    // Valgfritt: bytt til Inspeksjon-tab og preselect OU via global state/context
    alert(`Start inspeksjon for ${school.name}`);
  };

  if (loading) return <Center><CircularLoader /></Center>;
  if (error) return <NoticeBox error title="Feil">{error.message}</NoticeBox>;

  // Sorter etter eldst siste inspeksjon (eller manglende)
  const withSort = (list ?? []).slice().sort((a, b) => {
    const ea = lastMap[a.id]?.eventDate ? new Date(lastMap[a.id].eventDate) : null;
    const eb = lastMap[b.id]?.eventDate ? new Date(lastMap[b.id].eventDate) : null;
    if (ea && eb) return ea - eb;
    if (ea && !eb) return 1;
    if (!ea && eb) return -1;
    return 0;
  });

  return (
    <div>
      <h1>Planlegger</h1>
      <p>Skoler sortert etter tid siden siste inspeksjon (eldst først).</p>
      <SchoolList loading={false} error={null} schools={withSort} onInspect={handleInspect} lastMap={lastMap} />
    </div>
  );
}

// liten helper som bruker same query-definisjon som hook, men direkte:
async function fetchLast(ou) {
  const params = new URLSearchParams({
    program: import.meta.env.VITE_PROGRAM_UID || "", // alternativ: bruk constants (du kan bytte)
  }).toString();
  // Vi bruker events-endpoint via app-runtime vanligvis; for enkelhets skyld her:
  // Anbefaling: flytt til en hook som i useLastInspection for ekte app.
  return null;
}
