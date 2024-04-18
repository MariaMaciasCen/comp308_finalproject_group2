// App.js
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

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

const GameVideo = () => {
  const { loading, data, error } = useQuery(GET_VIDEOS);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoTime, setVideoTime] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;

    if (selectedVideo && timer < videoTime) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev < videoTime) {
            return prev + 1;
          } else {
            clearInterval(interval);
            console.log('Done');
            return prev;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [selectedVideo, timer, videoTime]);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error loading videos!</p>;

  return (
    <div className="App">
      <h1>Video Player</h1>
      <ul>
        {data.videos.map(video => (
          <li key={video.id}>
            <button onClick={() => {
              setSelectedVideo(video.videoUrl);
              setVideoTime(video.videoTime);
              setTimer(0);
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
          <video controls autoPlay onEnded={() => console.log('Video ended')}>
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      )}
      <div>Timer: {timer} seconds</div>
    </div>
  );
};

export default GameVideo;
