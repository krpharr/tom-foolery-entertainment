const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/tom-foolery"
);

const bandSeed = [{
    name: "The Rolling Stones",
    leader: "mickjagger",
    description: "Engaging, high energy classic rock and blues band perfect for weddings, parties, and concerts.",
    images: ["https://www.rollingstone.com/wp-content/uploads/2018/06/rs-6094-rectangle.jpg"],
    videos: ["https://youtube.com/embed/Ef9QnZVpVd8"],
    priceRange: [1000000, 10000000],
    genres: ["Classic Rock", "Blues"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  },
  {
    name: "The Temptations",
    leader: "paulwilliams",
    description: "Classic Mowtown vocal group to bring all the love to your event.",
    images: ["https://d1dxs113ar9ebd.cloudfront.net/225batonrouge/2018/08/91I-h96o4L._SL1500_-e1533848976771.jpg"],
    videos: ["https://youtube.com/embed/C_CSjcm-z1w"],
    priceRange: [1000000, 10000000],
    genres: ["Motown"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  },
  {
    name: "George Jones and Tammy Wynette",
    leader: "georgejones",
    description: "Country with all the drama and life stories you will ever need.",
    images: ["https://cdn.mobsocmedia.com/uploads/sites/49/20180328195815/tammy-wynette-george-jones.jpg"],
    videos: ["https://youtube.com/embed/nhIKa1g5L6M"],
    priceRange: [1000000, 10000000],
    genres: ["Country"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  },
  {
    name: "Buddy Guy",
    leader: "buddyguy",
    description: "Down home blues beyond compare.",
    images: ["https://media1.fdncms.com/ntslo/imager/u/original/8700551/musicartsculture_music1-1-81aa3c26bec2bb61.jpg"],
    videos: ["https://youtube.com/embed/N6O9DaIGy9M"],
    priceRange: [1000000, 10000000],
    genres: ["Blues"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  },
  {
    name: "Count Basie Orcrestra",
    leader: "countbasie",
    description: "Big band that swings like nobody's business.",
    images: ["https://www.wmky.org/sites/wmky/files/styles/medium/public/201506/count.jpg"],
    videos: ["https://youtube.com/embed/8FcWW-fMt90"],
    priceRange: [1000000, 10000000],
    genres: ["Jazz", "Big Band", "Swing"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  },
  {
    name: "Peter Tosh",
    leader: "petertosh",
    description: "Stand up for your rights and bring the deep bass groove to your event to take everyone to another level.",
    images: ["https://direct.rhapsody.com/imageserver/images/Art.56762/633x422.jpg"],
    videos: ["https://youtube.com/embed/enIfdOl83Pw"],
    priceRange: [1000000, 10000000],
    genres: ["Reggae"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  },
  {
    name: "Run-D.M.C.",
    leader: "josephsimmons",
    description: "Bring down the house with our most popular hip-hop group.",
    images: ["https://www.morrisonhotelgallery.com/images/big/09%20Run%20DMC.jpg"],
    videos: ["https://youtube.com/embed/JNua1lFDuDI"],
    priceRange: [1000000, 10000000],
    genres: ["Hip-Hop", "Rap"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  },
  {
    name: "Duran Duran",
    leader: "simonlebon",
    description: "Delivering the 80's classics.  No event too large or small.",
    images: ["https://i.pinimg.com/736x/83/eb/7a/83eb7a1f45f8232f67b21bf54b9674fd.jpg"],
    videos: ["https://youtube.com/embed/5JlbqWTlN2E"],
    priceRange: [1000000, 10000000],
    genres: ["80's"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  },
  {
    name: "Backstreet Boys",
    leader: "loupearlman",
    description: "Does not get much worse than this.",
    images: ["https://static.billboard.com/files/media/Backstreet-Boys-1997-portrait-billboard-1548-768x433.jpg"],
    videos: ["https://youtube.com/embed/jJ-ueetuZOk"],
    priceRange: [1000000, 10000000],
    genres: ["90's"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  }
];

const agentSeed = [
  { firstName: "Honey", lastName: "Cassam", email: "hcassam0@google.it", phone: "722-518-7455", avatar: "https://robohash.org/voluptasrecusandaead.png?size=150x150&set=set1" },
  { firstName: "Westley", lastName: "Dougary", email: "wdougary1@state.tx.us", phone: "903-666-6887", avatar: "https://robohash.org/totamitaquedoloremque.png?size=150x150&set=set1" },
  { firstName: "Joane", lastName: "Dever", email: "jdever2@biglobe.ne.jp", phone: "413-957-5444", avatar: "https://robohash.org/inciduntexnecessitatibus.png?size=150x150&set=set1" },
  { firstName: "Gail", lastName: "Dalrymple", email: "gdalrymple3@buzzfeed.com", phone: "270-363-6260", avatar: "https://robohash.org/voluptasiddolores.png?size=150x150&set=set1" }
];



const inquirySeed = [{ firstName: "Vinni", lastName: "Guarin", email: "vguarin0@bandcamp.com", phone: "1997282197", eventType: "Private", band: "The Rolling Stones", numHours: 4, date: "05/09/2018", startTime: "2:11", location: "02276 Buhler Street", read: false, deleted: false, createdAt: Date.now() },
  { firstName: "Marmaduke", lastName: "Sturch", email: "msturch1@patch.com", phone: "1601271710", eventType: "Corporate", band: "The Temptations", numHours: 6, date: "07/08/2021", startTime: "21:35", location: "17 Corben Plaza", read: false, deleted: false, createdAt: Date.now() },
  { firstName: "Marmaduke", lastName: "Sturch", email: "msturch1@patch.com", phone: "1601271710", eventType: "Corporate", band: "The Temptations", numHours: 6, date: "07/08/2020", startTime: "21:35", location: "17 Corben Plaza", read: false, deleted: false, createdAt: Date.now() },
  { firstName: "Marmaduke", lastName: "Sturch", email: "msturch1@patch.com", phone: "1601271710", eventType: "Corporate", band: "The Temptations", numHours: 6, date: "07/08/2019", startTime: "21:35", location: "17 Corben Plaza", read: false, deleted: false, createdAt: Date.now() },
  { firstName: "Marmaduke", lastName: "Sturch", email: "msturch1@patch.com", phone: "1601271710", eventType: "Corporate", band: "The Temptations", numHours: 6, date: "07/08/2018", startTime: "21:35", location: "17 Corben Plaza", read: false, deleted: false, createdAt: Date.now() },
  { firstName: "Shaylyn", lastName: "O' Scallan", email: "soscallan3@pinterest.com", phone: "3292691578", eventType: "Concert", band: "George Jones and Tammy Wynette", numHours: 1.5, date: "09/24/2019", startTime: "6:23", location: "096 Valley Edge Lane", read: false, deleted: false, createdAt: Date.now() },
  { firstName: "Chrotoem", lastName: "Antoniewski", email: "cantoniewski4@live.com", phone: "7461700805", eventType: "Wedding", band: "Buddy Guy", numHours: 4, date: "04/19/2018", startTime: "11:26", location: "9 Mayfield Crossing", read: false, deleted: false, createdAt: Date.now() },
  { firstName: "Gwynne", lastName: "Crighton", email: "gcrighton5@ifeng.com", phone: "5329219507", eventType: "Corporate", band: "Count Basie Orcrestra", numHours: 4.5, date: "10/05/2020", startTime: "20:38", location: "192 Arkansas Road", read: false, deleted: false, createdAt: Date.now() },
  { firstName: "Valeria", lastName: "Hindhaugh", email: "vhindhaugh6@mapy.cz", phone: "3932408398", eventType: "Concert", band: "Peter Tosh", numHours: 5, date: "12/04/2021", startTime: "22:42", location: "68153 Marquette Court", read: false, deleted: false, createdAt: Date.now() },
  { firstName: "Mordecai", lastName: "Huffey", email: "mhuffey7@time.com", phone: "3934598656", eventType: "Private", band: "Peter Tosh", numHours: 6, date: "08/15/2021", startTime: "19:58", location: "47694 Waxwing Junction", read: false, deleted: false, createdAt: Date.now() },
  { firstName: "Darrell", lastName: "Bolderson", email: "dbolderson8@goo.ne.jp", phone: "2928482665", eventType: "Concert", band: "Duran Duran", numHours: 6, date: "08/14/2020", startTime: "14:14", location: "27008 Evergreen Plaza", read: false, deleted: false, createdAt: Date.now() }
];

// db.Band
//   .remove({})
//   .then(() => db.Band.collection.insertMany(bandSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

// db.Agent
//   .remove({})
//   .then(() => db.Agent.collection.insertMany(agentSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

db.Inquiry
  .remove({})
  .then(() => db.Inquiry.collection.insertMany(inquirySeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });