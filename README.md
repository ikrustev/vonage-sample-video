# Vonage TokBox Video Sample

#### Overview

The sample implements:
  * simple app server handling single session and multiple client tokens for it
  * web client that calls the server to obtain session id and token and the opentok SDK to actually participate in
    audio/video session

#### Install dependencies
```
cd application_server
npm install
```

#### Prepare config file
Copy provided template and fill in:
```
cd application_server
cp env-template .env
```

#### Webhook setup.

Start ngrok:
```
ngrok http 3000
```

Use external URL provided by ngrok to setup session monitor event URL in TokBox dashboard. The URL should look like this:

```
https://a6e7bd37.ngrok.io/event
```

#### Start
```
cd application_server
npm run start
```

#### Try

Open the ngrok URL (say https://a6e7bd37.ngrok.io) in several browser tabs (potentially on different computers) to join participants in the session.
