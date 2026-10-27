import { useContext } from "react";
import { AppContext } from "../App";

const Timer = () => {
    const { stopwatch } = useContext(AppContext);

    return <p className="timer">Time left : {stopwatch} seconds</p>;
};

export default Timer;
