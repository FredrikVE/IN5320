// src/data/dataSetsQuery.js
export const dataSetsQuery = {
  dataSets: {
    resource: "dataSets",
    params: {
      fields: ["id", "displayName", "created", "periodType"],
      pageSize: 500, // unngå deprecated paging=false
    },
  },
}
