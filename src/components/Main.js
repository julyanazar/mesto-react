import React from 'react';
import editAvatar from '../images/profile-avatar-edit.svg';
import api from '../utils/api.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {

    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();

    React.useEffect(() => {
        api.getUserInfo().then((data) => {
          setUserName(data.name);
          setUserDescription(data.about);
          setUserAvatar(data.avatar)
        });

      }, []);

    return (
        <main className="content">
            <section className="profile content__section">
                <div className="profile__bio">
                    <div className="profile__avatar-container">
                        <img src={`${userAvatar}`} className="profile__avatar"
                            alt="Аватар профиля" />
                        <img src={editAvatar} className="profile__avatar-edit"
                            onClick={onEditAvatar} alt="Смена аватара профиля" />
                    </div>
                    <div className="profile__info">
                        <div className="profile__name">
                            <h1 className="profile__title">{userName}</h1>
                            <button className="profile__edit-button" type="button"
                                onClick={onEditProfile} aria-label="изменить информацию о себе в профиле"></button>
                        </div>
                        <p className="profile__subtitle">{userDescription}</p>
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
