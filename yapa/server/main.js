import { Meteor } from 'meteor/meteor';
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
import { IamAuthenticator } from 'ibm-watson/auth';
import * as fs from 'fs';
import { Readable } from 'stream';

//const fs = Npm.require('fs');
__ROOT_APP_PATH__ = fs.realpathSync('.');

Meteor.startup(() => {
    console.log("ROOT:", __ROOT_APP_PATH__)
});

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: 'xwhMeArxa_9ZlrLYZD7otGzzSsgcM8rn-feIUxy4An_7',
    }),
    serviceUrl: 'https://api.eu-de.text-to-speech.watson.cloud.ibm.com/instances/4f167a7b-15a7-4c35-8df0-55942155fda2',
    disableSslVerification: true,
});

const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: 'VNjRDZ17_3bLdD-0PLk8sipJY1k_EyiAAzF_hnY9ryrU',
    }),
    serviceUrl: 'https://api.eu-de.speech-to-text.watson.cloud.ibm.com/instances/1639309b-f7ea-4d3b-87aa-2ada9050d03f',
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

    async speechToText(base64) {
        return new Promise((resolve, reject) => {
            const params = {
                objectMode: true,
                contentType: 'audio/ogg;codecs=opus',
                model: 'de-DE_BroadbandModel',
                keywords: ['aktivität', 'glückskeks', 'witz', 'route', 'quiz', 'aktien'],
                keywordsThreshold: 0.5,
                maxAlternatives: 1,
            };
            
            // Create the stream.
            const recognizeStream = speechToText.recognizeUsingWebSocket(params);
            
            // Pipe in the audio.
    
            const filename = `${Math.floor(Math.random() * 10000)}.ogg`
    
            fs.writeFileSync(filename, Buffer.from(base64.replace('data:audio/ogg;codecs=opus;base64,', ''), 'base64'));
    
            const stream = fs.createReadStream(filename)
            stream.pipe(recognizeStream);
    
            fs.unlink(filename, err => {
                if (err) throw err;
            }) 
    
            // Listen for events.
            recognizeStream.on('data', function(event) { resolve(event); });
            recognizeStream.on('error', function(event) { reject(event); });
    
        })
    }
});
