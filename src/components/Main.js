import React from 'react';
import editAvatar from '../images/profile-avatar-edit.svg';

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {

    return (
        <main className="content">
            <section className="profile content__section">
                <div className="profile__bio">
                    <div className="profile__avatar-container">
                        <img src="#" className="profile__avatar"
                            alt="Аватар профиля" />
                        <img src={editAvatar} className="profile__avatar-edit"
                            onClick={onEditAvatar} alt="Смена аватара профиля" />
                    </div>
                    <div className="profile__info">
                        <div className="profile__name">
                            <h1 className="profile__title">Жак-Ив Кусто</h1>
                            <button className="profile__edit-button" type="button"
                                onClick={onEditProfile} aria-label="изменить информацию о себе в профиле"></button>
                        </div>
                        <p className="profile__subtitle">Исследователь океана</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace} aria-label="добавить изображение"></button>
            </section>

            <section className="elements content__section">
                <ul className="elements__items"></ul>
            </section>
        </main>
    );
}

export default Main;
