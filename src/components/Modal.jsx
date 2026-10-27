import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";
import { FaStar } from "react-icons/fa";
import winAudioEffect from "../assets/audios/win-effect.mp3";
import loseAudioEffect from "../assets/audios/lose-effect.mp3";

const Modal = () => {
    const { isUserWon, isUserLost, fetchedWord } = useContext(AppContext);
    const winAudioRef = useRef("");
    const loseAudioRef = useRef("");
    const isInitalRender_isUserWon = useRef(true);
    const isInitalRender_isUserLost = useRef(true);

    useEffect(() => {
        if (isInitalRender_isUserWon.current) {
            isInitalRender_isUserWon.current = false;
            return;
        }
        winAudioRef.current.play();
    }, [isUserWon]);

    useEffect(() => {
        if (isInitalRender_isUserLost.current) {
            isInitalRender_isUserLost.current = false;
            return;
        }
        loseAudioRef.current.play();
    }, [isUserLost]);

    return (
        <div
            className={
                isUserWon || isUserLost ? "modal display-modal" : "modal"
            }
        >
            <section className="modal-content">
                {isUserWon ? (
                    <div className="winner-info">
                        <p>correct</p>
                        <ul className="stars">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </ul>
                        <audio ref={winAudioRef}>
                            <source src={winAudioEffect} />
                        </audio>
                    </div>
                ) : (
                    ""
                )}
                {isUserLost ? (
                    <div className="loser-info">
                        <p>
                            you lost. the correct answer was <br />{" "}
                            <span>{fetchedWord}</span>
                        </p>
                        <audio ref={loseAudioRef}>
                            <source src={loseAudioEffect} />
                        </audio>
                    </div>
                ) : (
                    ""
                )}
            </section>
        </div>
    );
};

export default Modal;
