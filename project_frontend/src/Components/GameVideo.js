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
            return 'Done';
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [selectedVideo, timer, videoTime, playerXP, playerName, updatePlayerXp]);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos!</p>;

  return (
    <ApolloProvider client={client4000}>
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
            <video controls autoPlay onEnded={() => setTimer('Done')}>
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag. </video>
          )
        )}
        <div>Timer: {timer}</div>
      </div>
    </ApolloProvider>
  );
};

export default GameVideo;
           
