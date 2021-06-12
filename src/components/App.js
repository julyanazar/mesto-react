import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const [currentUser, setCurrentUser] = React.useState();

    React.useEffect(() => {

        api.getUserInfo()
            .then((cardList) => {
                setCurrentUser(cardList);
            })
            .catch(err => { console.log(err) });
    }, []);

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

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <Header />
                {currentUser &&
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick} />
                }
                <Footer />
            </div>

            <PopupWithForm
                name="edit"
                title="Редактировать профиль"
                buttonText="Сохранить"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}>
                <fieldset className="form__inputs">
                    <input id="form_edit-name" className="form__input form__input-name" type="text" name="name"
                        minLength="2" maxLength="40" required placeholder="Имя" />
                    <span id="form_edit-name-error" className="form__error"></span>
                    <input id="form_edit-about" className="form__input form__input-about" type="text" name="about"
                        minLength="2" maxLength="200" required placeholder="О себе" />
                    <span id="form_edit-about-error" className="form__error"></span>
                </fieldset>
            </PopupWithForm>

            <PopupWithForm
                name="add"
                title="Новое место"
                buttonText="Создать"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}>
                <fieldset className="form__inputs">
                    <input id="form_add-name" className="form__input form__input-card-name" type="text" name="name"
                        minLength="2" maxLength="30" required placeholder="Название" />
                    <span id="form_add-name-error" className="form__error"></span>
                    <input id="form_add-about" className="form__input form__input-src" type="url" name="about" required
                        placeholder="Ссылка на картинку" />
                    <span id="form_add-about-error" className="form__error"></span>
                </fieldset>
            </PopupWithForm>

            <PopupWithForm
                name="avatar"
                title="Обновить аватар"
                buttonText="Сохранить"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}>
                <fieldset className="form__inputs">
                    <input id="form_avatar-edit" className="form__input form__input-link-avatar" type="url"
                        name="avatar-input" placeholder="Ссылка на картинку" required />
                    <span id="form_avatar-edit-error" className="form__error"></span>
                </fieldset>
            </PopupWithForm>

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups} />

        </CurrentUserContext.Provider>
    );
}

export default App;