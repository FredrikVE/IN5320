//src/data/dataValuesQuery.js
export const DEFAULT_OU = "ImspTQPwCqd" // Sierra Leone
export const DEFAULT_PE = "2020"         // Hele 2020

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
