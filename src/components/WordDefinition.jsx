import { useContext } from "react";
import { AppContext } from "../App";

const WordDefinition = () => {
    const { definition } = useContext(AppContext);

    return <p className="word-definition">{definition}</p>;
};

export default WordDefinition;
