import { useRef, useState } from 'react';
import styles from './../Game.module.scss'
import Draggable from 'react-draggable';


export const WordCircle = ({ word, wordPlayedHandler }: {
    word: string, wordPlayedHandler: (result: boolean) => void
}) => {
    const nodeRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const resetPosition = () => setPosition({ x: 0, y: 0 });

    const handleDrag = (_, { y }) => {
        setPosition({ x: 0, y: y });
        if (Math.abs(y) > 150) {
            wordPlayedHandler(y < 0)
            resetPosition()
        }
    };

    const handleStop = () => {
        setPosition({ x: 0, y: 0 });

    }


    return <Draggable nodeRef={nodeRef} position={position} onDrag={handleDrag} onStop={handleStop}>
        <div ref={nodeRef}>
            <div style={{ transform: `scale(${1 - Math.abs(position.y / 500)})` }} className={styles.word_circle} >
                <span>{word}</span>
            </div>
        </div>
    </Draggable>
}