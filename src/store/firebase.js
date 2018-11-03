import firebase from 'firebase'

function initFirebase() {
    let config = {
        apiKey: 'FIREBASE_API_KEY',
        authDomain: 'FIREBASE_AUTH_DOMAIN',
        databaseURL: 'FIREBASE_BASE_URL',
    };
    let app = firebase.initializeApp(config)
    return app
}
export var FirebaseApp = initFirebase()
export var GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()
export var Auth = FirebaseApp.auth()
export var DB = Auth.app.database()