export const createKeyword = (text) => {
  const arrayKeywords = [];
  const arrayWords = text.match(/("[^"]+"|[^"\s]+)/g);
  arrayWords.forEach((word) => {
    let wordSmall = "";

    word.split("").forEach((letter) => {
      wordSmall += letter;
      arrayKeywords.push(wordSmall.toLowerCase());
    });
  });

  let letterSmall = "";
  text.split("").forEach((letter) => {
    letterSmall += letter;
    arrayKeywords.push(letterSmall);
  });

  return arrayKeywords;
};
