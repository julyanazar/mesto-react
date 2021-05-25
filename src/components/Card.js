import React from 'react';

function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="element">
            <div className="element__cover">
                <img src={card.link} alt={card.name} className="element__img" onClick={handleClick} />
            </div>
            <button className="element__trash-button" type="button" aria-label="удалить каточку"></button>
            <div className="element__caption">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button className="element__like-button" type="button" aria-label="лайкнуть изображение"></button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
