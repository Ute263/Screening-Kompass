# Screening-Kompass

Der Screening-Kompass ist ein lokales, digitales Auswertungstool für den modularen pädagogischen Screening-Baukasten Grundschule. Er übernimmt die Förderbereiche und Unterbereiche des FörderKompass, verändert die bestehende Förderplan-App aber nicht.

## Direkt starten

1. Den Ordner `dist` öffnen.
2. `Screening-Kompass.html` doppelt anklicken.
3. Den Fall anlegen, Module auswählen und Beobachtungen dokumentieren.

Für diese Ein-Datei-Version ist keine Installation nötig. Die Daten werden nur im verwendeten Browser gespeichert. Über **Sicherung exportieren** sollte für jeden Fall regelmäßig eine JSON-Sicherung abgelegt werden.

## Arbeitsablauf

1. Fall und Fragestellung knapp erfassen.
2. Nur passende Module auswählen.
3. Unter **Aufgaben** die dazu passenden Originalseiten aus dem Screening-PDF auswählen und gemeinsam drucken.
4. Pro Beobachtung eine Hilfecodierung wählen und möglichst einen konkreten Beleg ergänzen.
5. Unter **Kompetenzen** die Abdeckung aller 290 FörderKompass-Kompetenzen prüfen. Nicht geprüfte Kompetenzen bleiben `n. b.`.
6. Vorschläge nur für die tatsächlich mit einer Aufgabe verknüpften Einzelkompetenzen fachlich prüfen oder eine gezielte Zusatzprüfung mit Beleg dokumentieren.
7. Höchstens drei belegte Einzelkompetenzen als Förderprioritäten auswählen.
8. Ist-Stand, nächstes Ziel, Maßnahmen und Evaluation bearbeiten und als PDF drucken oder in den FörderKompass übertragen.

Die App enthält 45 einzeln auswählbare Aufgaben-, Material-, Lese- und Auswertungsseiten aus dem Screening-Baukasten. Zu den gewählten Modulen werden automatisch die passenden Seiten vorgeschlagen; Material- und Lösungsseiten können einzeln an- oder abgewählt werden.

Die 153 Beobachtungsaspekte sind bewusst eng mit 170 der 290 Einzelkompetenzen verknüpft. Die übrigen Kompetenzen werden nicht künstlich aus ähnlichen Aufgaben abgeleitet, sondern bleiben sichtbar `n. b.` und können bei Bedarf gezielt geprüft werden.

Eine spätere lokale Übergabe an den FörderKompass ist technisch vorbereitet, aber noch nicht in der Oberfläche aktiviert. Das versionierte Format nutzt dieselben Kompetenz-IDs und schreibt verbindlich vor, vorhandene Einträge nur nach Prüfung zu ergänzen und niemals automatisch zu überschreiben. Details stehen in `INTEGRATION-FOERDERKOMPASS.md`.

## Beobachtungscodes

- `S`: selbstständig und sicher
- `H`: nach kurzem Hinweis
- `V`: nach Vormachen oder visuellem Modell
- `G`: gemeinsam oder deutlich geführt
- `N`: noch nicht gezeigt
- `?`: nicht beurteilbar

Die App erzeugt keine Gesamtnote und keine Diagnose. Einordnungsvorschläge beruhen ausschließlich auf den dokumentierten Beobachtungen und Hilfebedingungen.

## Web-App / PWA bereitstellen

Der Stammordner kann unverändert auf einem statischen Webserver veröffentlicht werden. Für einen lokalen Test genügt im Projektordner beispielsweise:

```bash
python3 -m http.server 4173
```

Danach `http://localhost:4173` im Browser öffnen. Über eine HTTPS-Adresse kann die App als PWA installiert und nach dem ersten Laden offline verwendet werden.

## Technische Prüfung

```bash
node scripts/build.mjs
node scripts/validate.mjs
```
