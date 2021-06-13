import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
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

            {currentUser && 
                <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser} 
                />
            }

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