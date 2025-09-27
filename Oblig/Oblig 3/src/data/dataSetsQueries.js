// ordinær query for steg 3 - 5
export const dataSetsQuery = {
  dataSets: {
    resource: "dataSets",
    params: {
      fields: ["id", "displayName", "created"],
      paging: false,
    },
  },
}
