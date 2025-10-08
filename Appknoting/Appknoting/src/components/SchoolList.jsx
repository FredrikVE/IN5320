import { Card, Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell, Button, CircularLoader, NoticeBox } from "@dhis2/ui";

export default function SchoolList({ loading, error, schools, onInspect, lastMap }) {
  if (loading) return <CircularLoader />;
  if (error) return <NoticeBox error title="Kunne ikke hente skoler">{error.message}</NoticeBox>;

  if (!schools?.length) return <NoticeBox title="Ingen skoler">Fant ingen skoler under valgt enhet.</NoticeBox>;

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>Skole</TableCellHead>
            <TableCellHead>Sist besøkt</TableCellHead>
            <TableCellHead>Handling</TableCellHead>
          </TableRowHead>
        </TableHead>
        <TableBody>
          {schools.map(s => {
            const last = lastMap[s.id];
            const lastDate = last?.eventDate ? new Date(last.eventDate).toLocaleDateString() : "—";
            return (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{lastDate}</TableCell>
                <TableCell>
                  <Button small onClick={() => onInspect?.(s)}>Inspeksjon</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
