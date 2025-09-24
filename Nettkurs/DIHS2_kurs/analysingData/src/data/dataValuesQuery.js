// src/data/dataValuesQuery.js
// Query for å hente råverdier for valgt dataSet + orgUnit + period (+ ev. descendants)
export const dataValuesQuery = {
  dvs: {
    resource: "dataValueSets",
    params: ({ dataSet, orgUnit, period, children }) => ({
      dataSet,
      orgUnit,
      period,
      children, // inkluder verdier fra underenheter
    }),
  },
}
