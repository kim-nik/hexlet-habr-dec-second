const fs = require("fs");

const generateReviewsFile = (count, fileName) => {
  const reviews = generateMockReviews(count);
  const jsonContent = JSON.stringify(reviews, null, 2);

  fs.writeFileSync(fileName, jsonContent, "utf8");
  console.log(`File '${fileName}' with ${count} reviews has been generated.`);
};

const platforms = ["Google", "Яндекс", "2ГИС"];
const texts = [
  "Отличный сервис!",
  "Хорошо, но есть недочеты.",
  "Прекрасно!",
  "Очень плохо, не рекомендую.",
  "Удобно и быстро.",
  "Качество на высоте!",
];

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = () => {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date().getTime();
  return new Date(getRandomInt(start, end)).toISOString();
};

const generateMockReviews = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    platform: platforms[getRandomInt(0, platforms.length - 1)],
    rating: getRandomInt(1, 5),
    date: getRandomDate(),
    text: texts[getRandomInt(0, texts.length - 1)],
  }));
};

// generateReviewsFile(500, "reviews.json");
