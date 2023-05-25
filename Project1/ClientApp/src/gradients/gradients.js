export const gradients = [
  'linear-gradient(90deg, #cce6ff,#7abfff,#52abff)',
  'linear-gradient(90.55deg,#7068c1 -2.67%,rgba(4, 190, 0, 0.74) 153.82%)',
  'linear-gradient(135deg, rgba(64,170,233,1) 57%, rgba(113,72,214,1) 100%)',
  'linear-gradient(45deg, #d13881,#ed8f6b,#e8dca4)',
  'linear-gradient(190deg, #ffffff,#b46bef,#ac88c8)',
  'linear-gradient(90deg, #ff5cf1,#b38ade,#66ebff)',
  'linear-gradient(45deg, #fab699,#ffa5bd,#eea8fb)',
  'linear-gradient(0deg, #696eff,#f6a9ff)',
  'linear-gradient(90deg, #8773e8,#cc95e1)',
  'linear-gradient(90deg, #f5abd7,#59c4cd)',
  'linear-gradient(90deg, #b976ff,#f38ccc)',
  'linear-gradient(90deg, #fa7ed1,#8886fc)',
  'linear-gradient(to right, #373b44, #4286f4)',
  'linear-gradient(to right, #009fff, #ec2f4b)',
  'linear-gradient(to right, #a8c0ff, #3f2b96)',
  'linear-gradient(to right, #4e54c8, #8f94fb)',
];

export const getRandomGradient = () => {
  return gradients[getRandomValue(1, gradients.length)];
};

const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
