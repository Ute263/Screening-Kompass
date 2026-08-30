# Vorbereitete Verbindung zum FörderKompass

Die Verbindung ist technisch vorbereitet, aber bewusst noch nicht in der Oberfläche aktiviert. Der FörderKompass selbst bleibt unverändert.

## Stabiler Vertrag

- Formatkennung: `de.foerderkompass.screening-transfer`
- Schemaversion: `1`
- Gemeinsamer Schlüssel: die exakte `competencyId` aus dem FörderKompass-Katalog
- Übertragen werden später nur bereits eingeschätzte Kompetenzen (`+`, `o`, `-`). `n. b.` wird nicht als Ergebnis exportiert.
- Höchstens drei Förderprioritäten werden markiert.
- Beobachtungsbelege, hilfreiche Unterstützungen und Situationen bleiben getrennte Felder.

## Verbindliche Importregeln

Ein späterer Import in den FörderKompass muss:

1. vor jeder Übernahme eine Prüfansicht zeigen,
2. vorhandene Bewertungen und Förderplantexte niemals automatisch überschreiben,
3. unbekannte Kompetenz-IDs ablehnen,
4. nur ausdrücklich bestätigte Einträge ergänzen,
5. die Herkunft „Screening-Kompass“ und den Übertragungszeitpunkt dokumentieren,
6. keine Diagnose oder Gesamtbewertung aus den Screeningdaten erzeugen.

## Vorbereitete Funktionen

`src/foerderkompass-transfer.js` enthält:

- `buildFoerderkompassTransfer(state, profile)` zum Erzeugen der Übergabedaten,
- `validateFoerderkompassTransfer(payload, competencyById)` zur Format- und ID-Prüfung,
- die versionierten Fähigkeiten und Sicherheitsregeln.

Für eine spätere Aktivierung benötigt der Screening-Kompass nur noch einen Exportknopf. Im FörderKompass werden dann Dateiauswahl, Prüfansicht und bestätigtes Ergänzen implementiert.
