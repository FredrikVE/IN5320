// useEffect = React Hook som sier til React GJØR NOE KODE NÅR (velg ett):
//       Denne komponenten re-renderes
//       Denne komponenten mountes
//       En verdi i state endres

// useEffect(funksjon, [avhengigheter])

// 1. useEffect(() => {})          // Kjører etter hver re-render
// 2. useEffect(() => {}, [])      // Kjører bare når komponenten mountes
// 3. useEffect(() => {}, [verdi1, verdi2]) // Kjører når komponenten mountes + når "verdi1" eller "verdi2" endres

// BRUKSOMRÅDER
// #1 Legge til Event Listeners
// #2 Manipulere DOM
// #3 Subscriptions (sanntids-oppdateringer)
// #4 Hente data fra et API
// #5 Rydde opp når en komponent unmountes


import { useState, useEffect } from "react";