// src/data/queries.js
// ÉN tydelig query for alle datasett – fields + paging=false som oppgaven krever
export const dataSetsQuery = {
  dataSets: {
    resource: "dataSets",
    params: {
      fields: ["id", "displayName", "created"],
      paging: false,
    },
  },
}
