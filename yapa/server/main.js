import { Meteor } from 'meteor/meteor';
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
import { IamAuthenticator } from 'ibm-watson/auth';
import * as fs from 'fs';
import { resolve } from 'path';

//const fs = Npm.require('fs');
__ROOT_APP_PATH__ = fs.realpathSync('.');

Meteor.startup(() => {
    console.log("ROOT:", __ROOT_APP_PATH__)
});

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: '***REMOVED***',
    }),
    serviceUrl: '***REMOVED***',
    disableSslVerification: true,
});

const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: '***REMOVED***',
    }),
    serviceUrl: '***REMOVED***',
    disableSslVerification: true,
});

Meteor.methods({
    async synthesiseText(text) {

        const synthesizeParams = {
            text: text,
            accept: 'audio/wav',
            voice: 'de-DE_BirgitV2Voice',
        };

        try {
            const response = await textToSpeech.synthesize(synthesizeParams)
            const buffer = await textToSpeech.repairWavHeaderStream(response.result)
            
            return buffer
        } catch (e) {
            console.log(e)
            throw e
        }

    },

    speechToText(audiofilePath) {
        const params = {
            objectMode: true,
            contentType: 'audio/mpeg',
            model: 'de-DE_BroadbandModel',
            keywords: ['aktivität', 'glückskeks', 'witz', 'route', 'quiz', 'aktien'],
            keywordsThreshold: 0.5,
            maxAlternatives: 3,
        };
        
        // Create the stream.
        const recognizeStream = speechToText.recognizeUsingWebSocket(params);
        
        // Pipe in the audio.
        fs.createReadStream(audiofilePath).pipe(recognizeStream);

        // Listen for events.
        recognizeStream.on('data', function(event) { onEvent('Data:', event); });
        recognizeStream.on('error', function(event) { onEvent('Error:', event); });
        recognizeStream.on('close', function(event) { onEvent('Close:', event); });

        // Display events on the console.
        function onEvent(name, event) {
            console.log(name, JSON.stringify(event, null, 2));
        };
    }
});
