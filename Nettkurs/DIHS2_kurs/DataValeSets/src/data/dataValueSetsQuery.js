// Henter dataverdier for et gitt datasett
//src/data/dataValueSetsQuery.js
export const dataValueSetsQuery = {
    dataValueSets: {
        resource: 'dataValueSets',
        params: ({ dataSetId, orgUnitId, period }) => ({
            dataSet: dataSetId,
            orgUnit: orgUnitId,
            period: period,
        }),
    },
}
