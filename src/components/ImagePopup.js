import React from 'react';

function ImagePopup() {
    return (
        <div className="popup popup_type_img">
            <div className="popup__container">
                <img src="#" className="popup__img" alt="#" />
                <h3 className="popup__caption">Новое место</h3>
                <button className="popup__close-button" type="button"
                    aria-label="закрыть окно приближения изображения карточки"></button>
            </div>
        </div>
    );
}

export default ImagePopup;