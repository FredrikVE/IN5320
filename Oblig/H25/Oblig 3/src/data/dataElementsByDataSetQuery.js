// NY: data elements for ett dataset
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