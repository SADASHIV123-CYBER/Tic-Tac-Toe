import { useState, useCallback } from "react";
import confetti from "canvas-confetti";
import Card from "../Card/Card";
import checkWinner from "../../helpers/checkWinner"; 
import "./Grid.css";

import xMoveSoundFile from "./x-sound.mp3";
import oMoveSoundFile from "./o-sound.mp3";
import winSoundFile from "./win-sound.mp3";
import drawSoundFile from "./draw-sound.mp3"; 

const xMoveSound = new Audio(xMoveSoundFile);
const oMoveSound = new Audio(oMoveSoundFile);
const winSound = new Audio(winSoundFile);
const drawSound = new Audio(drawSoundFile); 

const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
};

const Grid = () => {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [turn, setTurn] = useState(true);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false);

    const play = useCallback((index) => {
        if (board[index] !== "" || winner || isDraw) return;

        const symbol = turn ? "O" : "X";
        const newBoard = [...board];
        newBoard[index] = symbol;

        setBoard(newBoard);
        playSound(symbol === "X" ? xMoveSound : oMoveSound);

        setTimeout(() => {
            const win = checkWinner(newBoard);
            if (win) {
                setWinner(win);
                playSound(winSound);
                confetti();
                return;
            }

            if (!newBoard.includes("")) {
                setIsDraw(true);
                playSound(drawSound);
                return;
            }

            setTurn(!turn);
        }, 100);
    }, [board, turn, winner, isDraw]);

    const resetGame = () => {
        setBoard(Array(9).fill(""));
        setTurn(true);
        setWinner(null);
        setIsDraw(false);
    };

    return (
        <div className="grid-wrapper">
            {winner ? (
                <>
                    <h1 className="turn-highlight">🎉 Winner: {winner} 🎉</h1>
                    <button className="reset" onClick={resetGame}>Restart Game</button>
                </>
            ) : isDraw ? (
                <>
                    <h1 className="turn-highlight">🤝 It's a Draw! 🤝</h1>
                    <button className="reset" onClick={resetGame}>Restart Game</button>
                </>
            ) : (
                <h1 className="turn-highlight">Turn: {turn ? "O" : "X"}</h1>
            )}

            <div className="grid">
                {board.map((el, idx) => (
                    <Card key={idx} player={el} index={idx} gameEnd={Boolean(winner || isDraw)} onPlay={play} />
                ))}
            </div>
        </div>
    );
};

export default Grid;
