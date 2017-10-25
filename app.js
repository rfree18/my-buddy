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

  document.getElementById('sign-out').style.display = 'block';
  document.getElementById('firebaseui-container').style.display = 'none';
  document.getElementById('name').textContent = `Sign out (${user.email})`;
  if (user.photoURL){
    document.getElementById('photo').src = user.photoURL;
    document.getElementById('photo').style.display = 'block';
  } else {
    document.getElementById('photo').style.display = 'none';
  }
};

var getCharacter = function(user) {
  var docRef = db.collection("users").doc(user.uid);

  docRef.get().then(function(doc) {
    if (doc.data().creature) {
      const data = JSON.parse(doc.data().creature);
      myChar = new Character(data);
    } else {
      db.collection("users").doc(user.uid).set({
        name: user.displayName,
        creature: JSON.stringify(myChar)
      });
    }
  }).catch(function(error) {
    alert("Network error:", error);
  });
}

/**
* Displays the UI for a signed out user.
*/
var handleSignedOutUser = function() {
  currUser = undefined;

  document.getElementById('sign-out').style.display = 'none';
  document.getElementById('firebaseui-container').style.display = 'block';
  ui.start('#firebaseui-container', getUiConfig());
};

// Listen to change in auth state so it displays the correct UI for when
// the user is signed in or not.
firebase.auth().onAuthStateChanged(function(user) {
  // document.getElementById('loading').style.display = 'none';
  // document.getElementById('loaded').style.display = 'block';
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

var initApp = function() {
  document.getElementById('sign-out').addEventListener('click', function() {
    firebase.auth().signOut();
  });
};

window.addEventListener('load', initApp);
