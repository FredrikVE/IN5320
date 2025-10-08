import { useDataQuery } from "@dhis2/app-runtime";

// dx: liste av indikatorer/dataelementer, ou: OU(ene), pe: periode
const analyticsQuery = {
  a: {
    resource: "analytics",
    params: ({ dx, ou, pe, displayProperty }) => ({
      dimension: [`dx:${dx}`, `ou:${ou}`, `pe:${pe}`],
      displayProperty: displayProperty ?? "NAME",
      skipMeta: false,
    }),
  },
};

export function useAnalytics({ dx, ou, pe, displayProperty }) {
  const { data, loading, error } = useDataQuery(analyticsQuery, {
    variables: { dx, ou, pe, displayProperty },
    lazy: !(dx && ou && pe),
  });

  // Returner rows i et lett konsumérbart format
  const headers = data?.a?.headers ?? [];
  const rows = data?.a?.rows ?? [];
  return { loading, error, headers, rows, meta: data?.a?.metaData ?? {} };
}
