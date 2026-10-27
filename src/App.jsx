import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import MessedupWord from "./components/MessedupWord";
import WordDefinition from "./components/WordDefinition";
import buildScrambledWord from "./components/buildScrambledWord";
import { ToastContainer } from "react-toastify";
import calculateNumberOfLetters from "./components/calculateNumberOfLetters";
import Modal from "./components/Modal";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Timer from "./components/Timer";

const randomWordAPI =
    "https://randomapi.dev/api/words?type=noun&maxLength=8&count=1";
const WordDefinitionAPI = "https://freedictionaryapi.com/api/v1/entries/en/";

export const AppContext = createContext();

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [fetchedWord, setFetchedWord] = useState("");
    const [definition, setDefinition] = useState("");
    const [scrambledWordArray, setScrambledWordArray] = useState([]);
    const [typedWord, setTypedWord] = useState("");
    const [wordCountObject, setWordCountObject] = useState({});
    const [isUserWon, setIsUserWon] = useState(null);
    const [isUserLost, setIsUserLost] = useState(null);
    const [stopwatch, setStopwatch] = useState(30);
    const [stopwatchIntervalID, setStopwatchIntervalID] = useState("");

    const fetchDefinition = async (word) => {
        try {
            const response = await fetch(`${WordDefinitionAPI}${word}`);
            const data = await response.json();
            const definitionsArraySize = data.entries[0].senses.length;
            const randomIndex = Math.floor(
                Math.random() * definitionsArraySize,
            );
            const definitionStr =
                data.entries[0].senses[randomIndex].definition;
            setFetchedWord(word);
            setDefinition(definitionStr);
            setScrambledWordArray(buildScrambledWord(word));
            setWordCountObject(calculateNumberOfLetters(word));
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError(error);
        }
    };

    const fetchWord = async () => {
        try {
            const response = await fetch(randomWordAPI);
            const data = await response.json();
            fetchDefinition(data.data[0].word);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setIsError(error);
        }
    };

    useEffect(() => {
        fetchWord();
    }, []);

    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        const stopwatchID = setInterval(() => {
            setStopwatch((oldState) => {
                const newState = oldState - 1;
                if (newState === 0) {
                    setIsUserLost(true);
                    clearInterval(stopwatchID);
                }
                return newState;
            });
        }, 1000);
        setStopwatchIntervalID(stopwatchID);
    }, [isLoading]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error error={isError} />;
    }

    return (
        <AppContext.Provider
            value={{
                definition,
                setDefinition,
                scrambledWordArray,
                setScrambledWordArray,
                typedWord,
                setTypedWord,
                fetchedWord,
                wordCountObject,
                setIsUserWon,
                isUserWon,
                isUserLost,
                stopwatch,
                stopwatchIntervalID,
            }}
        >
            <Modal />
            <ToastContainer position="top-center" />
            <div className="game">
                <section className="game-center section-cneter">
                    <MessedupWord />
                    <WordDefinition />
                    <Timer />
                    <Form />
                </section>
            </div>
        </AppContext.Provider>
    );
};

export default App;
