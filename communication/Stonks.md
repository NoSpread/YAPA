Beschreibung vom Stonks-Usecase

# Benötigte Nutzerinformationen:
- Aktiennamen

# Start der Kommunikation:
## Proaktiv:
- 18 Uhr (?) -> Tagesüberblick

## Passiv
- Nutzer erwähnt die Worte: Stock, Aktien, <seine Aktiennamen>

# Antwort:
- Abfrage der Aktien, die durch den Nutzer definiert wurden
- Optional News zu Aktienname abfragen

- Anworttext:
  - eine Aktie: "Deine Aktie $Aktie steht zurzeit auf $Stand, das Tagesmaximum war $High und durchschnittlich $Durchschnitt"
  - mehrere Aktien: jede Aktie einzeln aufzählen
  - News: "Es gibt $count Nachrichten zu deiner Aktie $Aktie, [es ist also nicht viel passiert| du solltest sie dir vielleicht anschauen]"
