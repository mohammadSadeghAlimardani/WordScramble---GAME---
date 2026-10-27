import { nanoid } from "nanoid";
import { useContext } from "react";
import { AppContext } from "../App";

const MessedupWord = (props) => {
    const {
        definition,
        setDefinition,
        scrambledWordArray,
        setScrambledWordArray,
        typedWord,
        setTypedWord,
    } = useContext(AppContext);

    return (
        <h2 className="messedup-word">
            {scrambledWordArray.map(({ letter, isTyped }) => {
                return (
                    <span key={nanoid()} className={isTyped ? "typed" : ""}>
                        {letter}
                    </span>
                );
            })}
        </h2>
    );
};

export default MessedupWord;
