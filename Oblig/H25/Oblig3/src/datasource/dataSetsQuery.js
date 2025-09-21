//src/datasource/dataSetsQuery.js
export const dataSetsQuery = {
    dataSets: {
        resource: "dataSets",
        params: {
            fields: ["id", "displayName", "created"],
            paging: true,
            order: 'asc:displayName',   // stabil rekkefølge
        },
    },
}