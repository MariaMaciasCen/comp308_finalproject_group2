const mongoose = require('mongoose');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const Player = require('./models/Player');  // 플레이어 모델 임포트
const Video = require('./models/Video');
const cors = require('cors');

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/videolink', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

// GraphQL 스키마
const schema = buildSchema(`
  type Video {
    id: ID!
    title: String
    description: String
    videoUrl: String
    videoTime: Int
  }
  input VideoInput {
    title: String
    description: String
    videoUrl: String
    videoTime: Int
  }
  type Player {
    id: ID!
    playername: String
    playerxp: String
  }
  input PlayerInput {
    playername: String
    playerxp: String
  }
  type Query {
    videos: [Video]
    getPlayer(id: ID!): Player
  }
  type Mutation {
    createVideo(input: VideoInput): Video
    createPlayer(input: PlayerInput): Player
    updatePlayerXp(id: ID!, playerxp: String): Player
  }
`);

// 리졸버
const root = {
  videos: () => Video.find({}),
  getPlayer: ({ id }) => Player.findById(id),
  createVideo: ({ input }) => {
    const newVideo = new Video({
      title: input.title,
      description: input.description,
      videoUrl: input.videoUrl,
      videoTime: input.videoTime
    });
    return newVideo.save();
  },
  createPlayer: ({ input }) => {
    const newPlayer = new Player({
      playername: input.playername,
      playerxp: input.playerxp
    });
    return newPlayer.save();
  },
  updatePlayerXp: ({ id, playerxp }) => {
    return Player.findByIdAndUpdate(id, { playerxp: playerxp }, { new: true });
  }
};

// Express 설정
const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
