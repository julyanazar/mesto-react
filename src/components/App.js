import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const [currentUser, setCurrentUser] = React.useState({});

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {

        api.getUserInfo()
            .then((cardList) => {
                setCurrentUser(cardList);
            })
            .catch(err => { console.log(err) });
    }, []);

    React.useEffect(() => {

        api.getInitialCards()
            .then((cardList) => {
                setCards(cardList);
            })
            .catch(err => { console.log(err) });
    }, []);

    function handleCardLike(card) {
        // Проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        const changeLike = isLiked ? api.deleteLikeCard(card._id) : api.likeCard(card._id)
        changeLike.then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch(err => { console.log(err) });
    }

    function handleCardDelete(card) {
        api.removeCard(card._id).then(() => {
            const newCards = cards.filter((c) => c._id !== card._id);
            setCards(newCards);
        })
            .catch(err => { console.log(err) });
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }

    function handleUpdateUser({ name, about }) {
        api.editUserInfo(name, about)
            .then(() => {

                const updatedUser = { ...currentUser };
                updatedUser.name = name;
                updatedUser.about = about;

                setCurrentUser({ ...updatedUser });
                setIsEditProfilePopupOpen(false);

            })
            .catch(err => { console.log(err) });
    }

    function handleUpdateAvatar({ avatar }) {
        api.editUserAvatar(avatar)
            .then((updatedUser) => {

                setCurrentUser(updatedUser);
                setIsEditAvatarPopupOpen(false);

            })
            .catch(err => { console.log(err) });
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.addCard(name, link)
            .then((card) => {

                setCards([card, ...cards]);
                setIsAddPlacePopupOpen(false);

            })
            .catch(err => { console.log(err) });
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Header />
                {currentUser &&
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete} />
                }
                <Footer />
            </div>

            {currentUser &&
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
            }

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />

            {currentUser &&
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
            }

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups} />

        </CurrentUserContext.Provider>
    );
}

export default App;