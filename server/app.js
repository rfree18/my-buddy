function getUiConfig() {
  return {
    'callbacks': {
      // Called when the user has been successfully signed in.
      'signInSuccess': function(user, credential, redirectUrl) {
        handleSignedInUser(user);
        // Do not redirect.
        return false;
      }
    },
    signInSuccessUrl: '#',
    signInFlow: 'popup',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  }
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var handleSignedInUser = function(user) {
  console.log(user);
  currUser = user;

  getCharacter(user);

  // Hide login button and display signout button
  document.getElementById('sign-out').style.display = 'block';
  document.getElementById('firebaseui-container').style.display = 'none';
  document.getElementById('name').textContent = `Sign out (${user.email})`;
  if (user.photoURL) {
    document.getElementById('photo').src = user.photoURL;
    document.getElementById('photo').style.display = 'block';
  } else {
    document.getElementById('photo').style.display = 'none';
  }
};

var getCharacter = function(user) {
  // Characters are stored in uid valued objects
  var docRef = db.collection("users").doc(user.uid);

  docRef.get().then(function(doc) {
    if (doc.data().creature) {
      myChar = new Character(doc.data().creature);
    } else {
      // If for whatever reason the character was manually wiped
      myChar = new Character();
      sendCharacter(user);
    }
  }).catch(function(error) {
    // New user, needs to setup new character
    myChar = new Character();
  });
}

var saveGame = function(callback) {
  // Attach latest timestamp before sending
  myChar.properties.date = Date.now();
  sendCharacter(currUser, callback);
}

var sendCharacter = function(user, callback) {
  db.collection("users").doc(user.uid).set({
    name: user.displayName,
    creature: myChar.properties
  }).then(callback);
}

/**
 * Displays the UI for a signed out user.
 */
var handleSignedOutUser = function() {
  currUser = undefined;

  // Revert button to signed out state
  document.getElementById('sign-out').style.display = 'none';
  document.getElementById('firebaseui-container').style.display = 'block';
  ui.start('#firebaseui-container', getUiConfig());
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function(user) {
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

var initApp = function() {
  // Add sign out action for button
  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });
};

// Only load once page finishes rendering
window.addEventListener('load', initApp);
