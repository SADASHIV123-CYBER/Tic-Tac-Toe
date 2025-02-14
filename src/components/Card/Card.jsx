import React from 'react';
import Icon from '../Icon/Icon';
import './Card.css';

const Card = React.memo(({ gameEnd, player, onPlay, index }) => {
    const icon = player === 'X' ? <Icon name="cross" /> : player === 'O' ? <Icon name="circle" /> : null;

    return (
        <div className="card" onClick={() => !gameEnd && player === "" && onPlay(index)}>
            {icon}
        </div>
    );
});

export default Card;
