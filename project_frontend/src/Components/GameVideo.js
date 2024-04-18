import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// GraphQL 쿼리 및 뮤테이션 정의
const GET_VIDEOS = gql`
  query GetVideos {
    videos {
      id
      title
      videoUrl
      videoTime
    }
  }
`;

const GET_PLAYER = gql`
  query GetPlayerByName($playername: String!) {
    getPlayerByName(playername: $playername) {
      id
      playerxp
    }
  }
`;

const UPDATE_PLAYER_XP = gql`
  mutation UpdatePlayerXpByName($playername: String!, $playerxp: Int!) {
    updatePlayerXpByName(playername: $playername, playerxp: $playerxp) {
      playerxp
    }
  }
`;

// Apollo 클라이언트 설정
const client4000 = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const GameVideo = () => {
  const { loading, data, error } = useQuery(GET_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoTime, setVideoTime] = useState(0);
  const [timer, setTimer] = useState('0');
  const [playerName, setPlayerName] = useState('');
  const [playerXP, setPlayerXP] = useState('');

  const { data: playerData, refetch } = useQuery(GET_PLAYER, {
    variables: { playername: playerName },
    skip: !playerName,
    onCompleted: data => {
      if (data && data.getPlayerByName) {
        setPlayerXP(data.getPlayerByName.playerxp);
      }
    }
  });

  const [updatePlayerXp] = useMutation(UPDATE_PLAYER_XP, {
    onCompleted: data => {
      if (data && data.updatePlayerXpByName) {
        setPlayerXP(data.updatePlayerXpByName.playerxp);
      }
    }
  });
  const [bgcolor, setColor] = useState(0);
  const [completeded, setCompleted] = useState(0);
  const [Level,levelup]= useState(0);
  const Leveling= () =>{
    if (completeded+Number(timer) >= 100) {
        levelup(()=> {
          const nextLevel = Level + 1; 
           setCompleted(completeded+Number(timer)-100);
            return nextLevel;  
        });
      }
  };
 

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50
  }

  const fillerStyles = {
    height: '100%',
    width: `${completeded}%`,
    backgroundColor: bgcolor,
    transition: 'width 1s ease-in-out',
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'blue',
    fontWeight: 'bold'
  }

  useEffect(() => {
    let interval;

    if (selectedVideo && Number(timer) < videoTime) {
      interval = setInterval(() => {
        setTimer(prev => {
          const nextTime = Number(prev) + 1;
          if (nextTime < videoTime) {
            return nextTime.toString();
          } else {
            clearInterval(interval);
            updatePlayerXp({ variables: { playername: playerName, playerxp: parseInt(playerXP, 10) + 100 } });
            return '20';
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [selectedVideo, timer, videoTime, playerXP, playerName, updatePlayerXp]);

  if (loading) return <p>Loading videos...</p>;
  else if (error) return <p>Error loading videos!</p>;

  return (
    
      <div className="App">
        <h1>Video Player</h1>
        <input 
          type="text" 
          value={playerName} 
          onChange={e => {
            setPlayerName(e.target.value);
            setPlayerXP('');
            refetch();
          }}
          placeholder="Enter player name"
        /> 
       <div>
        <div style={containerStyles}>
          <div style={fillerStyles}>
         <span style={labelStyles} >XP{`${playerXP%100}%`}</span>
        </div>
        </div>
       </div>
        {playerXP && <p>XP: {playerXP}</p>}
        <ul>
          {data.videos.map(video => (
            <li key={video.id}>
              <button onClick={() => {
                setSelectedVideo(video.videoUrl);
                setVideoTime(video.videoTime);
                setTimer('0');
              }}>
                {video.title}
              </button>
            </li>
          ))}
        </ul>
        {selectedVideo && (
          selectedVideo.includes("youtube.com") ? (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${selectedVideo.split("v=")[1]}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video controls autoPlay onEnded={() => {const randomColor = Math.floor(Math.random()*16777215).toString(16);
              setColor("#" +randomColor);
              Leveling(completeded+( Number(timer)*0.5));
              setCompleted(completeded+( Number(timer)));setTimer('Done')}}>
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag. </video>
          )
        )}
        <div>Timer: {timer}</div>
      </div>
   
  
    
      
     
     
      
    
  );
};

export default GameVideo;

