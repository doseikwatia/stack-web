import firebase from 'firebase'

function initFirebase() {
    let config = {
        apiKey: 'AIzaSyA1bsbtp1O9kNlYjUAgA0WSGoNVjOdfzpY',
        authDomain: 'stackweb-44411.firebaseapp.com',
        databaseURL: 'https://stackweb-44411.firebaseio.com',
    };
    let app = firebase.initializeApp(config)
    return app
}
export var FirebaseApp = initFirebase()
export var GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()
export var Auth = FirebaseApp.auth()
export var DB = Auth.app.database()