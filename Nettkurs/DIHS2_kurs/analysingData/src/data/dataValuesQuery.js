//src/data/dataValuesQuery.js
// Query for å hente råverdier for valgt dataSet + orgUnit + period
export const dataValuesQuery = {
  dvs: {
    resource: "dataValueSets",
    params: ({ dataSet, orgUnit, period }) => ({
      dataSet,
      orgUnit,
      period,
    }),
  },
}
