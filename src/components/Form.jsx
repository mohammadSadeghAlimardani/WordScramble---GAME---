import { useContext } from "react";
import { AppContext } from "../App";
import { toast } from "react-toastify";
import calculateNumberOfLetters from "./calculateNumberOfLetters";

const Form = () => {
    const {
        fetchedWord,
        scrambledWordArray,
        setScrambledWordArray,
        typedWord,
        setTypedWord,
        wordCountObject,
        setIsUserWon,
        stopwatchIntervalID,
    } = useContext(AppContext);

    const handleInput = (event) => {
        const typedValueArray = [...event.target.value];
        const allowedLetters = [...fetchedWord];
        let isPermitted = true;
        typedValueArray.map((typedLetter) => {
            if (!allowedLetters.includes(typedLetter)) {
                isPermitted = false;
            }
        });
        if (!isPermitted) {
            toast.error("this letter is not allowed to type");
            return;
        }

        const typedCountObject = calculateNumberOfLetters(event.target.value);
        isPermitted = true;
        for (const key in typedCountObject) {
            if (typedCountObject[key] > wordCountObject[key]) {
                isPermitted = false;
            }
        }
        if (!isPermitted) {
            toast.error("you can not enter more of this letter");
            return;
        }

        let updatedScrambledWordArray = [...scrambledWordArray];

        updatedScrambledWordArray = updatedScrambledWordArray.map(
            ({ letter, isTyped }) => {
                if (typedCountObject[letter] > 0) {
                    const newWordObject = { letter: letter, isTyped: true };
                    typedCountObject[letter]--;
                    return newWordObject;
                } else {
                    return { letter, isTyped: false };
                }
            },
        );
        setScrambledWordArray(updatedScrambledWordArray);
        setTypedWord(event.target.value);
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (typedWord.length < fetchedWord.length) {
            toast.error(`you must enter exactly ${fetchedWord.length} letters`);
            return;
        }
        if (typedWord !== fetchedWord) {
            toast.error("your answer was not correct");
            return;
        }
        if (typedWord === fetchedWord) {
            setIsUserWon(true);
            clearInterval(stopwatchIntervalID);
        }
    };

    return (
        <form className="form" onSubmit={submitForm}>
            <input type="text" onChange={handleInput} value={typedWord} />
            <button className="btn btn-primary">check word</button>
        </form>
    );
};

export default Form;
