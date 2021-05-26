import React from 'react';
import Card from './Card';
import editAvatar from '../images/profile-avatar-edit.svg';
import api from '../utils/api.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {

        api.getInitialData()
            .then((arg) => {
                const [dataUserInfo, dataCards] = arg;
                setUserName(dataUserInfo.name);
                setUserDescription(dataUserInfo.about);
                setUserAvatar(dataUserInfo.avatar)
                setCards(dataCards);
            })
            .catch(err => { console.log(err) });
    }, []);

    return (
        <main className="content">
            <section className="profile content__section">
                <div className="profile__bio">
                    <div className="profile__avatar-container" onClick={onEditAvatar}>
                        <img src={`${userAvatar}`} className="profile__avatar"
                            alt="Аватар профиля" />
                        <img src={editAvatar} className="profile__avatar-edit"
                            alt="Смена аватара профиля" />
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
                <ul className="elements__items">
                    {cards.map((card) =>
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick} />)}
                </ul>
            </section>
        </main>
    );
}

export default Main;
