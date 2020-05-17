var express = require('express');
var router = express.Router();


require('dotenv').config();

const OpenTok = require('opentok');
const opentok = new OpenTok(process.env.API_KEY, process.env.API_SECRET);

var sessionId;

const createSession = onSessionCreated => {
  opentok.createSession({ mediaMode: "routed" }, (err, session) => {
    if (err) {
      console.error("Failure to create session", err);
      sessionId = "Failure to create session: " + err;
    } else {
      console.log("Session created", session);
      sessionId = session.sessionId;
    }
    onSessionCreated();
  });
};

router.post('/session', function(req, res, next) {
  var onSessionCreated = () => {
    res.json({ sessionId: sessionId });
  };

  if (!sessionId) {
    createSession(onSessionCreated);
  } else {
    onSessionCreated();
  }
});

router.post('/user', function(req, res, next) {
  const token = opentok.generateToken(
    sessionId, {
      role: 'moderator',
      expireTime: (new Date().getTime() / 1000)+(7 * 24 * 60 * 60), // in one week
      data: 'name=Johnny',
      initialLayoutClassList: ['focus']
    });
  res.json({ token: token });
});

module.exports = router;
