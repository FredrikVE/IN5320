//src/datasource/dataElementsQuery.js
export const metaDataElementsQuery = {
    dataSet: {
        resource: "dataSets",
        id: ({ id }) => id,
        params: {
            //paging: true,
            //order: "asc:displayName",
            fields: [
                //"id",
                //'displayName',
                //'created',
                "dataSetElements[dataElement[id,displayName,created]]"
            ],
        },
    },
}
