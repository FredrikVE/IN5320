import { useState, useMemo } from "react";
import { SingleSelect, SingleSelectOption, Button, Field, Input, NoticeBox, Center, CircularLoader } from "@dhis2/ui";
import { useDataMutation } from "@dhis2/app-runtime";
import { useUserOrgUnits } from "../hooks/useUserOrgUnits";
import { useOrgUnitChildren } from "../hooks/useOrgUnitChildren";
import { PROGRAM_UID, STAGE_UID, DE, STANDARDS, ROOT_OU } from "../constants";

// Post event mutation
const createEventMutation = {
  type: "create",
  resource: "events",
  data: ({ payload }) => payload,
};

export default function Inspect() {
  const { loading: meLoading, error: meError } = useUserOrgUnits();
  const { loading: ouLoading, error: ouError, list: schools } = useOrgUnitChildren(ROOT_OU);
  const [selectedOU, setSelectedOU] = useState(null);

  const [form, setForm] = useState({
    [DE.NUM_STUDENTS]: "",
    [DE.NUM_TEACHERS]: "",
    [DE.NUM_TOILETS]: "",
    [DE.NUM_SEATS]: "",
    [DE.NUM_TEXTBOOKS]: "",
    [DE.NUM_FEMALE_STUDENTS]: "",
    [DE.NUM_MALE_STUDENTS]: "",
    [DE.NUM_FEMALE_TEACHERS]: "",
    [DE.NUM_MALE_TEACHERS]: "",
    [DE.COMMENTS]: "",
  });

  const [mutate, { loading: saving, error: saveError, data: saveData }] = useDataMutation(createEventMutation);

  const onChange = (de, val) => setForm(prev => ({ ...prev, [de]: val }));

  // Grunnleggende validering: tall ≥ 0, samt GPI input logikk etc.
  const errors = useMemo(() => {
    const errs = {};
    const intFields = [
      DE.NUM_STUDENTS, DE.NUM_TEACHERS, DE.NUM_TOILETS, DE.NUM_SEATS, DE.NUM_TEXTBOOKS,
      DE.NUM_FEMALE_STUDENTS, DE.NUM_MALE_STUDENTS, DE.NUM_FEMALE_TEACHERS, DE.NUM_MALE_TEACHERS
    ];
    intFields.forEach(f => {
      const v = form[f];
      if (v === "" || v === null || v === undefined) return;
      if (!/^\d+$/.test(String(v))) errs[f] = "Må være et ikke-negativt heltall";
    });

    // Sum logikk (valgfritt – viser advarsel om totalsummer)
    const totStudents = (+form[DE.NUM_FEMALE_STUDENTS] || 0) + (+form[DE.NUM_MALE_STUDENTS] || 0);
    if ((+form[DE.NUM_STUDENTS] || 0) && totStudents && totStudents !== (+form[DE.NUM_STUDENTS] || 0)) {
      errs["_studentsMismatch"] = "Antall elever stemmer ikke med summen av gutter + jenter";
    }

    const totTeachers = (+form[DE.NUM_FEMALE_TEACHERS] || 0) + (+form[DE.NUM_MALE_TEACHERS] || 0);
    if ((+form[DE.NUM_TEACHERS] || 0) && totTeachers && totTeachers !== (+form[DE.NUM_TEACHERS] || 0)) {
      errs["_teachersMismatch"] = "Antall lærere stemmer ikke med summen av kvinner + menn";
    }

    return errs;
  }, [form]);

  const canSave = selectedOU && Object.keys(errors).length === 0;

  const handleSubmit = async () => {
    const eventDate = new Date().toISOString().split("T")[0];
    const dataValues = Object.entries(form)
      .filter(([_, v]) => v !== "" && v !== null && v !== undefined)
      .map(([dataElement, value]) => ({ dataElement, value: String(value) }));

    const payload = {
      program: PROGRAM_UID,
      programStage: STAGE_UID,
      orgUnit: selectedOU,
      eventDate,
      status: "COMPLETED",
      dataValues,
    };

    await mutate({ payload });
  };

  if (meLoading || ouLoading) return <Center><CircularLoader /></Center>;
  if (meError) return <NoticeBox error title="Feil">{meError.message}</NoticeBox>;
  if (ouError) return <NoticeBox error title="Feil">{ouError.message}</NoticeBox>;

  return (
    <div>
      <h1>Ny skoleinspeksjon</h1>

      <Field label="Velg skole (orgunit)">
        <SingleSelect
          selected={selectedOU ?? ""}
          onChange={({ selected }) => setSelectedOU(selected)}
          filterable
          noMatchText="Ingen treff"
          placeholder="Velg skole…"
        >
          {schools?.map(s => (
            <SingleSelectOption key={s.id} label={s.name} value={s.id} />
          ))}
        </SingleSelect>
      </Field>

      <div className="grid">
        <NumberField
          label="Antall elever (totalt)"
          value={form[DE.NUM_STUDENTS]}
          error={errors[DE.NUM_STUDENTS]}
          onChange={v => onChange(DE.NUM_STUDENTS, v)}
        />
        <NumberField
          label="Antall lærere (totalt)"
          value={form[DE.NUM_TEACHERS]}
          error={errors[DE.NUM_TEACHERS]}
          onChange={v => onChange(DE.NUM_TEACHERS, v)}
        />
        <NumberField
          label="Antall toaletter"
          value={form[DE.NUM_TOILETS]}
          error={errors[DE.NUM_TOILETS]}
          onChange={v => onChange(DE.NUM_TOILETS, v)}
        />
        <NumberField
          label="Antall seter (stoler/plasser)"
          value={form[DE.NUM_SEATS]}
          error={errors[DE.NUM_SEATS]}
          onChange={v => onChange(DE.NUM_SEATS, v)}
        />
        <NumberField
          label="Antall lærebøker (totalt)"
          value={form[DE.NUM_TEXTBOOKS]}
          error={errors[DE.NUM_TEXTBOOKS]}
          onChange={v => onChange(DE.NUM_TEXTBOOKS, v)}
        />
        <NumberField
          label="Antall jenter"
          value={form[DE.NUM_FEMALE_STUDENTS]}
          error={errors[DE.NUM_FEMALE_STUDENTS]}
          onChange={v => onChange(DE.NUM_FEMALE_STUDENTS, v)}
        />
        <NumberField
          label="Antall gutter"
          value={form[DE.NUM_MALE_STUDENTS]}
          error={errors[DE.NUM_MALE_STUDENTS]}
          onChange={v => onChange(DE.NUM_MALE_STUDENTS, v)}
        />
        <NumberField
          label="Antall kvinnelige lærere"
          value={form[DE.NUM_FEMALE_TEACHERS]}
          error={errors[DE.NUM_FEMALE_TEACHERS]}
          onChange={v => onChange(DE.NUM_FEMALE_TEACHERS, v)}
        />
        <NumberField
          label="Antall mannlige lærere"
          value={form[DE.NUM_MALE_TEACHERS]}
          error={errors[DE.NUM_MALE_TEACHERS]}
          onChange={v => onChange(DE.NUM_MALE_TEACHERS, v)}
        />
      </div>

      {errors._studentsMismatch && <NoticeBox warning title="Sjekk elever">{errors._studentsMismatch}</NoticeBox>}
      {errors._teachersMismatch && <NoticeBox warning title="Sjekk lærere">{errors._teachersMismatch}</NoticeBox>}

      <Field label="Kommentar / observasjoner">
        <Input
          value={form[DE.COMMENTS]}
          onChange={({ value }) => onChange(DE.COMMENTS, value)}
          multiline
        />
      </Field>

      {saveError && <NoticeBox error title="Kunne ikke lagre">{saveError.message}</NoticeBox>}
      {saveData && <NoticeBox success title="Lagret!">Inspeksjon registrert.</NoticeBox>}

      <Button primary disabled={!canSave || saving} onClick={handleSubmit}>
        {saving ? "Lagrer…" : "Lagre inspeksjon"}
      </Button>
    </div>
  );
}

function NumberField({ label, value, onChange, error }) {
  return (
    <Field label={label} validationText={error} error={!!error}>
      <Input
        type="number"
        min="0"
        value={value}
        onChange={({ value }) => onChange(value)}
      />
    </Field>
  );
}
