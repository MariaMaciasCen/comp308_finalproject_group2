const mongoose = require('mongoose');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const Player = require('./models/Player');  // 플레이어 모델 임포트
const Video = require('./models/Video');
const cors = require('cors');

// MongoDB 연결
mongoose.connect('mongodb+srv://ChatApptest:1234567890@cluster0.9nevfyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true});
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
    playerxp: Int
  }
  input PlayerInput {
    playername: String
    playerxp: Int
  }
  type Query {
    videos: [Video]
    getPlayer(id: ID!): Player
    getPlayerByName(playername: String!): Player
  }
  type Mutation {
    createVideo(input: VideoInput): Video
    createPlayer(input: PlayerInput): Player
    updatePlayerXp(id: ID!, playerxp: Int): Player
    updatePlayerXpByName(playername: String!, playerxp: Int): Player
  }
`);

// 리졸버
const root = {
  videos: () => Video.find({}),
  getPlayer: ({ id }) => Player.findById(id),
  getPlayerByName: ({ playername }) => Player.findOne({ playername: playername }),
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
  },
  updatePlayerXpByName: ({ playername, playerxp }) => {
    return Player.findOneAndUpdate({ playername: playername }, { playerxp: playerxp }, { new: true });
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

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//////////////////////////



