import { useDataQuery } from "@dhis2/app-runtime";

const childrenQuery = {
  ou: {
    resource: "organisationUnits",
    id: ({ id }) => id,
    params: ({ level }) => ({
      fields: "id,name,level,openingDate,geometry",
      includeChildren: true,
      // Filtrer gjerne ved level hvis dere vil kun ha skoler på et bestemt nivå
      // level: 4 (eksempel), men vi tar alt og lar UI filtrere
    }),
  },
};

export function useOrgUnitChildren(rootOuId, level = null) {
  const { data, loading, error } = useDataQuery(childrenQuery, { variables: { id: rootOuId, level } });
  const all = data?.ou?.children ?? data?.ou?.organisationUnits ?? []; // fallback avhengig av DHIS2 versjon
  return { loading, error, list: all };
}
