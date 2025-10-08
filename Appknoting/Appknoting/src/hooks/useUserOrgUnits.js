import { useDataQuery } from "@dhis2/app-runtime";

const query = {
  me: {
    resource: "me",
    params: {
      fields: [
        "organisationUnits[id,name,level]",
        "dataViewOrganisationUnits[id,name,level]"
      ],
    },
  },
};

export function useUserOrgUnits() {
  const { data, loading, error } = useDataQuery(query);
  const capture = data?.me?.organisationUnits ?? [];
  const view = data?.me?.dataViewOrganisationUnits ?? [];
  return { loading, error, capture, view };
}
