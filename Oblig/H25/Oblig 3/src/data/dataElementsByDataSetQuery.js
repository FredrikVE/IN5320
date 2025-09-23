//src/data/dataElementsByDataSetQuery.js
// utvidet quary for hvert dataelement i datasettet jf step 7
export const dataElementsByDataSetQuery = {
  dataSet: {
    resource: "dataSets",
    id: ({ id }) => id,
    params: {
      fields: ["dataSetElements[dataElement[id,displayName,created]]"],
      paging: false,
      //order: "asc: displayName"
    },
  },
}