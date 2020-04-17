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
    videos: ["https://youtu.be/Ef9QnZVpVd8"],
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
    videos: ["https://youtu.be/C_CSjcm-z1w"],
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
    videos: ["https://youtu.be/nhIKa1g5L6M"],
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
    videos: ["https://youtu.be/N6O9DaIGy9M"],
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
    videos: ["https://youtu.be/8FcWW-fMt90"],
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
    videos: ["https://youtu.be/enIfdOl83Pw"],
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
    videos: ["https://youtu.be/JNua1lFDuDI"],
    priceRange: [1000000, 10000000],
    genres: ["Hip-Hop", "Rap"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  },
  {
    name: "Duran Duran",
    leader: "simonlebon",
    description: "Delivering the 80's classics.  No event to large or small.",
    images: ["https://i.pinimg.com/736x/83/eb/7a/83eb7a1f45f8232f67b21bf54b9674fd.jpg"],
    videos: ["https://youtu.be/5JlbqWTlN2E"],
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
    videos: ["https://youtu.be/jJ-ueetuZOk"],
    priceRange: [1000000, 10000000],
    genres: ["90's"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  },
  {
    name: "Backstreet Boys",
    leader: "loupearlman",
    description: "Does not get much worse than this.",
    images: ["https://static.billboard.com/files/media/Backstreet-Boys-1997-portrait-billboard-1548-768x433.jpg"],
    videos: ["https://youtu.be/jJ-ueetuZOk"],
    priceRange: [1000000, 10000000],
    genres: ["90's"],
    reviews: [],
    upcomingEvents: [],
    pastEvents: []
  }
];

db.Band
  .remove({})
  .then(() => db.Band.collection.insertMany(bandSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });