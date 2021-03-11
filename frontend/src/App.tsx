import { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Header from './components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [token, setToken] = useState("");
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  // Use this on backend to decode token and see if 
  // user is authorized etc.
  const decodeToken = async (token: string) => {
    const res = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
    const data = await res.json();
    return data;
  }


  function signOut() {
    setIsSignedIn(false);
    setToken("");
    window.location.reload()
  }

  function signIn(token: string): void {
    setIsSignedIn(true);
    setToken(token);
  }

  function playVideo(url: string): void {
    // TODO: Here, we also want to assign
    // VideoPlayer the url prop.
    if(!videoIsPlaying) {
      setVideoIsPlaying(true);
    }
  }

  function closeVideo(): void {
    if(videoIsPlaying) {
      setVideoIsPlaying(false);
    }
  }

  return (
    <Router>
      <div>
        {
          videoIsPlaying &&
          <VideoPlayer
            closeVideo={closeVideo}
          />
        }
        <Header
          signedIn={isSignedIn}
          signIn={signIn}
          signOut={signOut}
        />
        {
          isSignedIn && 
          <Grid
          token={token}
          playVideo={playVideo}
        />
        }
        
      </div>
    </Router>
  )
}

export default App