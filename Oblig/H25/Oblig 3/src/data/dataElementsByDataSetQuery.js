//src/data/dataElementsByDataSetQuery.js
export const dataElementsByDataSetQuery = {
  dataSet: {
    resource: "dataSets",
    id: ({ id }) => id,
    params: {
      fields: ["dataSetElements[dataElement[id,displayName,created]]"],
      paging: false,
    },
  },
}