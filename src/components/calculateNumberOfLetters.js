const calculateNumberOfLetters = (word) => {
    let countObject = {};
    [...word].map((letter) => {
        if (!countObject[letter]) {
            countObject[letter] = 1;
        } else {
            countObject[letter]++;
        }
    });
    return countObject;
};

export default calculateNumberOfLetters;
