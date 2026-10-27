const buildScrambledWord = (word) => {
    const scrambledIndexes = [];
    if (word.length !== 0) {
        let isBuilding = true;
        while (isBuilding) {
            const randomIndex = Math.floor(Math.random() * word.length);
            if (!scrambledIndexes.includes(randomIndex)) {
                scrambledIndexes.push(randomIndex);
            }
            if (scrambledIndexes.length === word.length) {
                isBuilding = false;
            }
        }
    }

    let wordArray = [...word];

    for (let index = 0; index < word.length; index++) {
        [wordArray[index], wordArray[scrambledIndexes[index]]] = [
            wordArray[scrambledIndexes[index]],
            wordArray[index],
        ];
    }

    wordArray = wordArray.map((letter) => {
        return {
            letter: letter,
            isTyped: false,
        };
    });
    return wordArray;
};

export default buildScrambledWord;
