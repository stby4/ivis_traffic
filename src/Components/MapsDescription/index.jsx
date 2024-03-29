import React from 'react'

const MapsDescription = () => <div className="description">
    <p>
        Die Visualisierung zeigt mit Hilfe von Karten der Schweiz die Entwicklung der Unfälle im Verlauf der letzten 24 Jahre (bis 2016) aufgesplittet nach Kantonen.
        Dabei kann im Dropdown Menu gewechselt werden zwischen den relativen Werten "Unfälle pro 1000 Fahrzeuge" und den absoluten Werten "Unfälle insgesamt".
        Zudem lässt die dritte Auswahlmöglichkeit "Zugelassene Fahrzeuge" einen Vergleich der Unfallsentwicklung zur Anzahl Fahrzeugen zu.
        Beim hovern über die Schweizerkarten werden die Daten für den jeweiligen Kanton angezeigt.
    </p>
    <h4>Quellen</h4>
    <ul className="sources">
        <li><a href="https://www.bfs.admin.ch/bfs/de/home/statistiken/kataloge-datenbanken/tabellen.assetdetail.4402685.html" target="_blank" rel="noopener noreferrer">Strassenfahrzeugbestand: Motorfahrzeuge ab 1990</a>, Bundesamt für Statistik, abgerufen am 29. Mai 2018</li>
        <li><a href="https://www.bfs.admin.ch/asset/de/px-x-1106010100_101" target="_blank" rel="noopener noreferrer">Strassenverkehrsunfälle: Unfälle mit Personenschaden nach Kanton, Unfallschwere und Unfallort</a>, Bundesamt für Statistik, abgerufen am 22. Mai 2018</li>
    </ul>
</div>


export default MapsDescription