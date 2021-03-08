# Beschreibung von APIs

## Text to Speech

- <https://www.hongkiat.com/blog/text-to-speech/>  -> halt keine API
- <http://www.voicerss.org/pricing/> -> API, bis zu 350 reqs frei
- <https://www.getwoord.com/pages/api_docs> -> keine Informationen zur Bezahlung

## Speech to Text

- Web Speech API                                    (Chrome based)
- Google Web Speech API                             geht bis 50 reqs pro Tag, aufwändige Anmeldung nötig w/ kontodaten
- IBM Speech to Text                                500 Min pro Monat
                                                    man muss sehr klar sprechen!
                                                    codecs... müssen gesetzt werden
                                                    Man kann Keywords festlegen, nach dene gesucht wird -> vllt für uns eine Idee?
                                                    <https://cloud.ibm.com/apidocs/speech-to-text>

        curl -X POST -u "apikey:Sq42G8xewCoVtjcH2PvE9yWBhijzKm8_0-LeBJ61fQyD" \
        --header "Content-Type: audio/flac" \
        --data-binary @deutsch1.flac "https://api.eu-de.speech-to-text.watson.cloud.ibm.com/instances/7d949378-062d-4967-9246-1383480dfb4c/v1/recognize?model=de-DE_BroadbandModel"

        curl -X POST -u "apikey:Sq42G8xewCoVtjcH2PvE9yWBhijzKm8_0-LeBJ61fQyD" \
        --header "Content-Type: audio/flac" \
        --data-binary @audio-file.flac \
        "https://api.eu-de.speech-to-text.watson.cloud.ibm.com/instances/7d949378-062d-4967-9246-1383480dfb4c/v1/recognize"

## Hiking

- <https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example#Hiking_routes>
- Unter Umständen
  - <https://www.osmand.net/build_it>
    - Aber zum Selber bauen -> nt ok

### Alternative

    Bing Maps -> Landmarks
    Key: AicITn8rKwdChJArzWOOd1AJWMOU0_LUoAIAHwgLGBFwf34V5I48LiibB6EEEe0b
    
    Tripadvisor -> Restaurant :) / Attraction
    -> nein, ist nicht ok / man kriegt keinen Link, die sind überfordert
    
    https://opentripmap.io/docs
    5ae2e3f221c38a28845f05b66fc1c602a1fee2fd14271f689b2cd55d
    -> sehr ausführlich
    -> nur en
    http://api.opentripmap.com/0.1/en/places/bbox?lon_min=8&lat_min=46&lon_max=10&lat_max=48&format=geojson&apikey=5ae2e3f221c38a28845f05b66fc1c602a1fee2fd14271f689b2cd55d

## Wetter

        <https://www.weatherapi.com/my/>
        API Key: 890909db8d5b4424a0f165631210603
        <https://api.weatherapi.com/v1/forecast.json>
        Parameter:
        q -> Ort oder Koordinaten Kommasepariert als String
        days -> 1 wahrscheinlich
        ?aqi=no&alerts=no -> weniger unwichtige Daten

   Antwort ist recht komplex, einfach die teile raussuchen, die gut sind:
   (maxtemp_c, mintemp_c, daily_chance_of_rain, condition->text)
   Sonnenstunden hab ich nicht gefunden.

   Beispiele: <https://www.weatherapi.com/api-explorer.aspx>

   weatherapi hat auch eine Sportsapi mit Events eine Idee

## Quiz

   am besten nur Ja/Nein Fragen -> weniger stress für Spracherkennung
   <https://opentdb.com/api_config.php>

   <https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=boolean>
   Parameter:
     amount -> 1
     category -> 9 oder nicht (General Knowledge / any category)
     difficulty -> 1-3
     type -> boolean / multiple (müssen wir mal überlegen, Multiple wäre auch eine Option)

## Aktivitäten

- <https://www.boredapi.com/documentation>
- <http://www.boredapi.com/api/activity>
- Mb accessibility hochsetzen, damit einfachere Vorschläge herauskommen:
  - <http://www.boredapi.com/api/activity?minaccessibility=0.6&maxaccessibility=1>

## Routing

```
https://docs.microsoft.com/en-us/bingmaps/rest-services/routes/calculate-a-route

KEY: AicITn8rKwdChJArzWOOd1AJWMOU0_LUoAIAHwgLGBFwf34V5I48LiibB6EEEe0b

http://dev.virtualearth.net/REST/v1/Routes/Driving?wayPoint.1=48.785,9.163&wayPoint.2=48.948,8.904&key=AicITn8rKwdChJArzWOOd1AJWMOU0_LUoAIAHwgLGBFwf34V5I48LiibB6EEEe0b

wichtig ist wohl die travelDuration in Sekunden zur Alternativenfindung:
http://dev.virtualearth.net/REST/v1/Routes/Transit?wayPoint.1=48.785,9.163&wayPoint.2=48.948,8.904&dateTime=08/03/2021 08:00:00&key=AicITn8rKwdChJArzWOOd1AJWMOU0_LUoAIAHwgLGBFwf34V5I48LiibB6EEEe0b
```

(das habe ich nicht zum laufen bekommen, aber vllt ist das auch egal)

## News

    http://newsapi.org/docs/get-started#search
    8d5b2620c5dc44b3a8cb6957646d5d31

    http://newsapi.org/v2/everything?q=stocks&from=2021-03-07&sortBy=relevance&apiKey=8d5b2620c5dc44b3a8cb6957646d5d31
    da muss man ein paar mehr Parameter anpassen?
