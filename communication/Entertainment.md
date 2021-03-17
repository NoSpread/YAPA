Beschreibung vom Entertainment-Usecase

# Benötigte Nutzerinformationen:
- Witzqualität

# Start der Kommunikation:
## Proaktiv:
- nicht Proaktiv, gibt keine Stelle, wo das sinnvoll ist
- (optional 17 Uhr, das wäre das einfachste)

## Passiv
- Nutzer erwähnt die Worte: Langeweile, Was soll ich ..?

# Verwertung:
- Aus joke, Quiz, Activity, Fortune zufällig eines Auswählen
- API abfragen, (Witzqualität übergeben, Quiz muss yesno sein)

# Antwort:
- activity: "Ich habe dir eine Aktivität ausgesucht, die du ausprobieren kannst: $Activity" 
- quiz: "Hier ein Quiz: $quiz"
- fortune: "Ich wünsche dir: $Fortune"
- joke: "Ich habe ein Witz für dich: $joke"
- die Antworten können recht unsauber sein

# Re für quiz
## Kommunikation
- Auf Ja / Nein hören

## Verwertung
- Trivial, einfach vergleichen

## Antwort
- ["Das war leider nicht korrekt"|"Super gemacht!"]
