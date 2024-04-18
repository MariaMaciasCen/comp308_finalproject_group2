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
  const [timer, setTimer] = useState('0');  // 타이머를 문자열로 초기화합니다.

  useEffect(() => {
    let interval;

    if (selectedVideo && Number(timer) < videoTime) {
      interval = setInterval(() => {
        setTimer(prev => {
          const nextTime = Number(prev) + 1;  // prev 값을 숫자로 변환하여 1 증가시킵니다.
          if (nextTime < videoTime) {
            return nextTime.toString();  // 숫자를 문자열로 변환하여 상태를 업데이트합니다.
          } else {
            clearInterval(interval);
            return 'Done';  // 시간이 끝나면 "Done"으로 상태를 업데이트합니다.
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
              setTimer('0');  // 타이머를 0으로 리셋합니다.
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
            Your browser does not support the video tag.
          </video>
        )
      )}
      <div>Timer: {timer}</div>  // 타이머 상태를 화면에 표시합니다.
    </div>
  );
};

export default GameVideo;