# Sammenligning: ManualCounter vs AutoCounter

## ManualCounter()
ManualCounter: kun useState
Brukes når state oppdateres direkte via brukerhandlinger
Enklest, minst kode, mest effektivt

## AutoCounter()
AutoCounter: useState + useEffect
Brukes når du trenger å gjøre noe EKSTRA når state endres
(logge, oppdatere document.title, starte timer, hente data osv.)


<table>
  <thead>
    <tr>
      <th>Komponent</th>
      <th>Brukstilfelle</th>
      <th>Fordeler</th>
      <th>Ulemper</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>ManualCounter</b></td>
      <td>Når du bare trenger å oppdatere state via knapper/brukerhandlinger.</td>
      <td>Enkelt, rent, lett å lese, mest effektivt.</td>
      <td>Kan ikke reagere på state-endringer med sideeffekter.</td>
    </tr>
    <tr>
      <td><b>AutoCounter</b></td>
      <td>Når du vil gjøre noe hver gang state endres (f.eks. logge, oppdatere document.title, hente data).</td>
      <td>Kraftig – kan håndtere sideeffekter og eksterne ressurser.</td>
      <td>Mer kompleks, mer kode, unødvendig hvis du ikke faktisk har en sideeffekt.</td>
    </tr>
  </tbody>
</table>
