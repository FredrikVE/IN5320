// src/data/dataSetOrgUnitsQuery.js
export const dataSetOrgUnitsQuery = {
  dataSet: {
    resource: "dataSets",
    id: ({ dataSetId }) => dataSetId,
    params: {
      fields: ["organisationUnits[id,displayName]"],
    },
  },
}
