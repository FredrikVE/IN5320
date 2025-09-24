// src/data/dataElementsByDataSetQuery.js
export const dataElementsByDataSetQuery = {
  dataSet: {
    resource: "dataSets",
    id: ({ dataSetId }) => dataSetId,
    params: {
      fields: ["dataSetElements[dataElement[id,displayName,created]]"],
    },
  },
}
