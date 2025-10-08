import { useState, useMemo } from "react";
import { SingleSelect, SingleSelectOption, Card, CircularLoader, NoticeBox } from "@dhis2/ui";
import { useOrgUnitChildren } from "../hooks/useOrgUnitChildren";
import { useAnalytics } from "../hooks/useAnalytics";
import { ROOT_OU, IND, STANDARDS } from "../constants";
import IndicatorCard from "../components/IndicatorCard";

// Hjelper for å hente verdi fra analytics rows:
function pickValue(rows, headers, dxId, ouId, peId) {
  if (!rows?.length || !headers?.length) return null;
  const idxDx = headers.findIndex(h => h.name === "dx");
  const idxOu = headers.findIndex(h => h.name === "ou");
  const idxPe = headers.findIndex(h => h.name === "pe");
  const idxVal = headers.findIndex(h => h.name === "value");
  return rows.find(r => r[idxDx] === dxId && r[idxOu] === ouId && r[idxPe] === peId)?.[idxVal] ?? null;
}

export default function Analytics() {
  const { loading: ouLoading, error: ouError, list: schools } = useOrgUnitChildren(ROOT_OU);
  const [selectedOU, setSelectedOU] = useState(null);

  // Tidsserie for én indikator (PTR) – eksempel:
  const { loading: tsLoading, error: tsError, headers: tsH, rows: tsR } = useAnalytics({
    dx: IND.PTR,
    ou: selectedOU || ROOT_OU,
    pe: "LAST_6_MONTHS",
  });

  // Snapshot for flere indikatorer – ett år (2025) – eksempel:
  const ALL_IND = [IND.PTR, IND.PSR, IND.PBR, IND.PTR_TOILET, IND.GPI_STUDENTS, IND.GPI_TEACHERS].filter(Boolean);
  const { loading: snapLoading, error: snapError, headers: sH, rows: sR } = useAnalytics({
    dx: ALL_IND.join(";"),
    ou: selectedOU || ROOT_OU,
    pe: "2025",
  });

  const ptr = pickValue(sR, sH, IND.PTR, selectedOU || ROOT_OU, "2025");
  const psr = pickValue(sR, sH, IND.PSR, selectedOU || ROOT_OU, "2025");
  const pbr = pickValue(sR, sH, IND.PBR, selectedOU || ROOT_OU, "2025");
  const pt  = pickValue(sR, sH, IND.PTR_TOILET, selectedOU || ROOT_OU, "2025");
  const gpiS = pickValue(sR, sH, IND.GPI_STUDENTS, selectedOU || ROOT_OU, "2025");
  const gpiT = pickValue(sR, sH, IND.GPI_TEACHERS, selectedOU || ROOT_OU, "2025");

  if (ouLoading) return <CircularLoader />;
  if (ouError) return <NoticeBox error title="Feil">{ouError.message}</NoticeBox>;

  return (
    <div>
      <h1>Analyse</h1>

      <SingleSelect
        selected={selectedOU ?? ""}
        onChange={({ selected }) => setSelectedOU(selected)}
        filterable
        placeholder="Velg skole (eller la stå tomt for distrikt)"
        noMatchText="Ingen treff"
      >
        <SingleSelectOption label="(Distrikt)" value="" />
        {schools?.map(s => (
          <SingleSelectOption key={s.id} label={s.name} value={s.id} />
        ))}
      </SingleSelect>

      {(snapLoading || tsLoading) && <CircularLoader />}

      {snapError && <NoticeBox error title="Analysefeil">{snapError.message}</NoticeBox>}
      {tsError && <NoticeBox error title="Tidsserier-feil">{tsError.message}</NoticeBox>}

      {/* Indikatorkort */}
      <div className="analytics-grid">
        <IndicatorCard title="Elever per lærer" value={toNum(ptr)} target={STANDARDS.PUPIL_TEACHER} />
        <IndicatorCard title="Elever per klasserom" value={toNum(psr)} target={STANDARDS.PUPIL_CLASSROOM} />
        <IndicatorCard title="Elever per stol" value={toNum(pbr)} target={STANDARDS.PUPIL_SEAT} />
        <IndicatorCard title="Elever per toalett" value={toNum(pt)} target={STANDARDS.PUPIL_TOILET} />
        <IndicatorCard title="GPI elever" value={toNum(gpiS)} target={1 - STANDARDS.GPI_TOLERANCE} invert={true} help="1 er perfekt balanse (kvinner/menn)"/>
        <IndicatorCard title="GPI lærere" value={toNum(gpiT)} target={1 - STANDARDS.GPI_TOLERANCE} invert={true} />
      </div>

      {/* Valgfritt: tegn en enkel tidsserie-tabell for PTR */}
      {tsR?.length ? (
        <Card className="ts-card">
          <h3>Utvikling siste 6 mnd – Elever per lærer</h3>
          <ul>
            {tsR.map((r, i) => {
              const pe = r[tsH.findIndex(h => h.name === "pe")];
              const val = r[tsH.findIndex(h => h.name === "value")];
              return <li key={i}>{pe}: {Number(val).toLocaleString()}</li>;
            })}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}

function toNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
