Titel: Ausgaben Tracker für Haushalte

Projektteam: Michael Mertl (Wirtschaftsinformatik)

Beschreibung: Mit dem Ausgaben Tracker haben Haushalte die Möglichkeiten sehr leicht ihre Ausgaben zu pflegen und diese sich schön übersichtlich für die vergangenen Monate/Jahre anzuzeigen. Außerdem besteht die Möglichkeit, dass man zu den einzelnen Monaten seine "Flüssigen Mittel" hinzufügt. So wird auf einen Blick ersichtlich, ob man in einem Monat mehr ausgegeben hat, als man zur Verfügung hatte.

Technologien:

- Frontend: Vue 3.2 mit Pinia und vue-chart.js
- Datenbank: .json Dateien im Frontend (File-System)

Namenskonventionen:

- prefix AT (=Ausgaben Tracker) vor jeder Komponente/Klasse/Interface/Seite
- commits beginnen mit ATF:... (für Ausgaben Tracker Frontend:...)
- CSS/SCSS Klassen: kebab-case
- methoden/variablen: camelCase
- Komponente/Klasse/Interface/Seite/Dateien (.vue): ATUpperCase
- andere Dateien (.css / .scss / .ts): lowerCase

Um das Ganze auszuführen, befolge folgende Schritte:
- clone das repo
  `git clone https://github.com/Murtl/ausgaben-tracker.git`
- geh in den frontend ordner
  `cd frontend`
- führe npm install aus
  `npm install`
- führe npm run dev aus (startet den lokalen Server)
  `npm run dev`
- öffne http://localhost:5173/ausgaben-tracker/ im Browser
