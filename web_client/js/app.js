const apiKey = '46743202';
const appServerUrl = window.location.href + 'tkbx';

let sessionId;
let token;

createSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function createSession() {
  $.ajax({
    url: appServerUrl + '/session',
    type: 'POST',
    success: result => {
      console.log(result);
      sessionId = result.sessionId;
      getToken();
    },
    error: handleError
  });
}

function getToken() {
  $.ajax({
    url: appServerUrl + '/user',
    type: 'POST',
    success: result => {
      console.log(result);
      token = result.token;
      initializeSession();
    },
    error: handleError
  });
}

// 3. Complete according to the tutorial
function initializeSession() {
  let session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  let publisher = OT.initPublisher(
    'publisher',
    {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    },
    handleError
  );

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
