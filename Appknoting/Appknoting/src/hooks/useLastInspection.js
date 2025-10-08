import { useDataQuery } from "@dhis2/app-runtime";
import { PROGRAM_UID, STAGE_UID } from "../constants";

// Query siste event for en gitt skole
const lastEventQuery = {
  events: {
    resource: "events",
    params: ({ ou }) => ({
      program: PROGRAM_UID,
      programStage: STAGE_UID,
      orgUnit: ou,
      order: "eventDate:desc,created:desc",
      pageSize: 1,
      fields: "event,eventDate,created,orgUnit,orgUnitName,status,dataValues[dataElement,value]",
    }),
  },
};

export function useLastInspection(orgUnitId) {
  const { data, loading, error, refetch } = useDataQuery(lastEventQuery, {
    variables: { ou: orgUnitId },
    lazy: !orgUnitId,
  });

  const last =
    data?.events?.events?.length ? data.events.events[0] : null;

  return { loading, error, last, refetch };
}
