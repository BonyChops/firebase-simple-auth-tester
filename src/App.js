import logo from './logo.svg';
import './App.css';
import app from "./firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';

function App() {
  const [token, setToken] = useState(false)
  const auth = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        auth.currentUser.getIdToken(true).then(function (idToken) {
          setToken(idToken);
        }).catch(function (error) {
          // Handle error
        });
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <div className="App">
      <button onClick={auth} >Login</button>
      <p>{token === false ? "Not Logged in." : `Your token: ${token}`}</p>
    </div>
  );
}

export default App;
