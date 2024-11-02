//! неизменяемые величины
const FORM_BTN_IMAGE = `
		<svg width="31" height="31" viewBox="0 0 31 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<path d="M14.7277 29.9367C14.3745 29.5737 14.1896 29.1116 14.1729 28.5506C14.1562 27.9895 14.3251 27.5275 14.6795 27.1644L24.1177 17.4615H2.59285C2.04711 17.4615 1.58933 17.2714 1.2195 16.8912C0.849679 16.511 0.66541 16.041 0.666694 15.4813C0.666694 14.9202 0.851605 14.4496 1.22143 14.0694C1.59125 13.6892 2.04839 13.4997 2.59285 13.5011H24.1177L14.6795 3.79809C14.3264 3.43506 14.1575 2.97301 14.1729 2.41195C14.1883 1.8509 14.3733 1.38885 14.7277 1.02582C15.0808 0.66278 15.5302 0.481262 16.076 0.481262C16.6217 0.481262 17.0712 0.66278 17.4243 1.02582L30.137 14.0951C30.3296 14.2601 30.4663 14.4667 30.5472 14.7149C30.6281 14.9631 30.6679 15.2186 30.6667 15.4813C30.6667 15.7453 30.6269 15.9928 30.5472 16.2238C30.4676 16.4549 30.3309 16.6694 30.137 16.8674L17.4243 29.9367C17.0712 30.2997 16.6217 30.4813 16.076 30.4813C15.5302 30.4813 15.0808 30.2997 14.7277 29.9367Z"  />
		</svg>
		`,
	FILM_ITEM_REMOVE_BTN = `
			<svg width="23" height="23" viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path opacity="0.3" d="M22.3575 3.74463L14.6021 11.5L22.3575 19.2554C22.7689 19.6667 23 20.2247 23 20.8064C23 21.3882 22.7689 21.9462 22.3575 22.3575C21.9462 22.7689 21.3882 23 20.8064 23C20.2247 23 19.6667 22.7689 19.2554 22.3575L11.5 14.6022L3.74463 22.3575C3.33326 22.7689 2.77532 23 2.19355 23C1.61179 23 1.05385 22.7689 0.642476 22.3575C0.231106 21.9462 7.3961e-07 21.3882 7.3961e-07 20.8064C7.3961e-07 20.2247 0.231106 19.6667 0.642476 19.2554L8.39785 11.5L0.642476 3.74463C0.231106 3.33326 0 2.77532 0 2.19355C0 1.61179 0.231106 1.05385 0.642476 0.642477C1.05385 0.231106 1.61178 7.3961e-07 2.19355 7.3961e-07C2.77532 7.3961e-07 3.33326 0.231106 3.74463 0.642477L11.5 8.39785L19.2554 0.642477C19.6667 0.231106 20.2247 0 20.8064 0C21.3882 0 21.9462 0.231106 22.3575 0.642477C22.7689 1.05385 23 1.61178 23 2.19355C23 2.77532 22.7689 3.33326 22.3575 3.74463Z" />
			</svg>
			`,
	FILM_STORAGE_KEY = 'film';

//! получаем контейнер из HTML
const containerNode = document.getElementById('js-container');

//! функции создания
const createBox = className => {
	const div = document.createElement('div');
	div.classList.add(className);

	return div;
};
const createTitle = (tag, className, text) => {
	const title = document.createElement(tag);
	title.classList.add(className);
	title.textContent = text;

	return title;
};
const createParagraph = (className, text) => {
	const p = document.createElement('p');
	p.classList.add(className);
	p.textContent = text;

	return p;
};
const createForm = (className, classNameModification) => {
	const form = document.createElement('form');
	form.classList.add(className);
	form.classList.add(classNameModification);

	return form;
};
const createLabel = className => {
	const label = document.createElement('label');
	label.classList.add(className);

	return label;
};
const createInput = (className, placeholder, type) => {
	const input = document.createElement('input');
	input.classList.add(className);
	input.placeholder = placeholder;
	input.type = type;

	return input;
};
const createButton = (className, text, type = 'button') => {
	const button = document.createElement('button');
	button.classList.add(className);
	button.innerHTML = text;
	button.type = type;

	return button;
};
const createList = className => {
	const list = document.createElement('ul');
	list.classList.add(className);

	return list;
};
const createItem = (array, index) => {
	const item = document.createElement('li'),
		itemLabel = createLabel('films-app__item-label'),
		itemCheckbox = createInput('films-app__item-check', 'чекбокс', 'checkbox'),
		itemText = createParagraph('films-app__item-name', array.name),
		itemButton = createButton('films-app__item-button', FILM_ITEM_REMOVE_BTN);

	item.classList.add('films-app__item');

	const changeCheckboxHandler = () => {
		array.done = !array.done;
		toggleClassInFilmsItem(array.done, item, itemCheckbox);
		setFilmsToLocalStorage();
	};
	const removeItemHandler = () => {
		filmsArray.splice(index, 1);
		item.remove();
		setFilmsToLocalStorage();
		render(filmsArray);
	};

	itemCheckbox.addEventListener('click', changeCheckboxHandler);
	itemButton.addEventListener('click', removeItemHandler);

	itemLabel.append(itemCheckbox, itemText);
	item.append(itemLabel, itemButton);

	return { item, itemCheckbox };
};

//! создание HTML-элементов
const appTitlesBox = createBox('films-app__titles-inner'),
	appTitle = createTitle('h1', 'films-app__title', 'список фильмов'),
	appSubtitle = createTitle('h2', 'films-app__title', '2023'),
	appDesc = createParagraph('films-app__desc', 'Хочу посмотреть'),
	appListBox = createBox('films-app__list-inner');
const appForm = createForm('films-app__form', 'form'),
	appFormLabel = createLabel('form__label'),
	appFormInput = createInput('form__input', 'Добавить фильм', 'text'),
	appFormButton = createButton('form__button', FORM_BTN_IMAGE);
const appList = createList('films-app__list');

//! массив
let filmsArray = [];

//! функция записи в localStorage
const setFilmsToLocalStorage = () => {
	const filmsString = JSON.stringify(filmsArray);
	localStorage.setItem(FILM_STORAGE_KEY, filmsString);
};

//! получаем массив из localStorage
const getFilmStorageString = localStorage.getItem(FILM_STORAGE_KEY);
const getFilmStorage = JSON.parse(getFilmStorageString);

//! функция инициализации приложения
const init = () => {
	//! отрисовка HTML-элементов
	appFormLabel.append(appFormInput);
	appForm.append(appFormLabel, appFormButton);
	appListBox.append(appForm, appList);
	appTitlesBox.append(appTitle, appSubtitle, appDesc);
	containerNode.append(appTitlesBox, appListBox);

	//! проверка на массив
	if (Array.isArray(getFilmStorage)) {
		filmsArray = getFilmStorage;
	}

	//! отрисовка данных
	render(filmsArray);
};
//! функция получения данных из поля ввода
const getFilmFromUser = () => {
	const newNameFilm = appFormInput.value;
	return newNameFilm;
};
//! функция добавления данных в массив
const trackFilm = newFilm => {
	const newFilmObj = {
		done: false,
		name: newFilm,
	};
	filmsArray.push(newFilmObj);
};
//! очистка поля ввода
const clearInput = () => {
	appFormInput.value = '';
};
const toggleClassInFilmsItem = (done, item, itemCheckbox) => {
	if (done === true) {
		item.classList.add('films-app__item_done');
		itemCheckbox.checked = true;
	} else {
		item.classList.remove('films-app__item_done');
		itemCheckbox.checked = false;
	}
};
//! функция перерисовки элементов в списке(рендер)
const render = filmsArray => {
	appList.innerHTML = '';
	if (filmsArray.length === 0) {
		const emptyItem = document.createElement('li');
		emptyItem.textContent =
			'Здесь пока нету ни одного фильма, добавьте же скорее...';
		appList.append(emptyItem);
	}
	filmsArray.forEach((film, index) => {
		const newFilmItem = createItem(film, index);
		toggleClassInFilmsItem(
			film.done,
			newFilmItem.item,
			newFilmItem.itemCheckbox
		);
		appList.append(newFilmItem.item);
	});
};

//! функция обработчиков
const addFilmHandler = () => {
	if (!appFormInput.value) return;
	const newNameFilmFromUser = getFilmFromUser();
	trackFilm(newNameFilmFromUser);
	clearInput();
	setFilmsToLocalStorage();
	render(filmsArray);
};

init();

//! кнопка добавления
appFormButton.addEventListener('click', addFilmHandler);
