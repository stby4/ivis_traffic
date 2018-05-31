# Interactive Information Visualization Project (iVisPro)
zum Thema Strassenverkehrsunfälle in der Schweiz

von Sandra Amport und Hinrich Kaestner

## Software deployement
Unsere Visualisierung ist unter folgendem Link zu finden

[https://stby4.github.io/ivis_traffic/](https://stby4.github.io/ivis_traffic/)

## Links to Sources

__Visualisierung "Entwicklung der Unfallzahlen"__
- https://www.pxweb.bfs.admin.ch/pxweb/de/px-x-1103020100_101/-/px-x-1103020100_101.px
- https://opendata.swiss/de/dataset/strassenverkehrsunfalle-unfalle-mit-personenschaden-nach-kanton-unfallschwere-und-unfallort1

__Visualisierung "Art der Unfälle"__
- https://www.pxweb.bfs.admin.ch/pxweb/de/px-x-1106010100_106/px-x-1106010100_106/px-x-1106010100_106.px

## Wie wir unser Ziel erreicht haben
Bei der Suche nach Daten erregte ein sehr detaillierter und umfangreicher Datensatz unsere Aufmerksamkeit: Eine Statistik des BFS, die Strassenverkehrsunfälle nach mutmasslichen Mängel und Einflüssen, also Unfallursachen, aufführt.
Die Daten reichen zurück bis in das Jahr 1992 und waren deswegen gut geeignet, um zu Zeigen, wie sich die Unfallzahlen seither entwickelt haben. Dabei wollten wir gleichzeitig den allgemeinen Trend darstellen, aber die Daten auch weiterhin detailliert durchsuchbar machen, um z.B. Aussreisser zu finden, oder einfach, um die Hauptunfallursachen zu finden. So zeigt unsere Visualisierung klar, dass die Unfallzahlen insgesamt zurück gehen, aber unter anderem Unfälle von Fahrradfahrern stark zunehmen. Erreicht haben wir das über ein "Time Series Chart", in der für die gewählte Objektart alle Daten (verschiedene Unfallschweren, Strassenarten und Unfalltypen) geplottet werden. Einzelne Reihen können hervorgehoben werden.

Um die absoluten Zahlen etwas besser einordnen zu können, haben wir eine zweite Visualisierung erstellt und der oben genannten Visualisierung vorangestellt, die die Unfallzahlen pro Kanton und 1000 zugelassen Fahrzeugen darstellt. Der Verlauf von 1992 bis 2016 zeigt schnell und eindrücklich, in wie viel weniger Unfälle ein Fahrzeug heute verwickelt ist, als noch vor 26 Jahren. In den absoluten Zahlen (Unfälle insgesamt und zugelassene Fahrzeuge) erkennt man auch den Grund dafür: Während selbst die absoluten Unfallzahlen zurück gegangen sind, ist die Anzahl an Fahrzeugen gestiegen.
