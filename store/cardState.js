import {makeAutoObservable} from "mobx";

class CardState {
  card = [
    {
      id: 1,
      title: 'Название проекта',
      author: 'Никита Топольсков-Дердяй',
      listener: 'Иванов Иван Иванович',
    },
    {
      id: 2,
      title: 'Тестовый проект',
      author: 'Иванов Иван Иванович',
      listener: 'Никита Топольсков-Дердяй',
    },
    {
      id: 3,
      title: 'Математическое моделирование',
      author: 'Шестакова Ольга Николаевна',
      listener: 'Никита Топольсков-Дердяй',
    },
    {
      id: 4,
      title: 'Что-то так',
      author: 'Васильев Арнольд Ахмедович',
      listener: 'Никита Топольсков-Дердяй',
    },
    {
      id: 5,
      title: 'Тест',
      author: 'Никита Топольсков-Дердяй',
      listener: 'Иванов Иван Иванович',
    },
  ];
  cardResult = [];
  filterCard = [
    {
      id: 1,
      title: 'Название проекта',
      author: 'Никита Топольсков-Дердяй',
      listener: 'Иванов Иван Иванович',
    },
    {
      id: 2,
      title: 'Тестовый проект',
      author: 'Иванов Иван Иванович',
      listener: 'Никита Топольсков-Дердяй',
    },
    {
      id: 3,
      title: 'Математическое моделирование',
      author: 'Шестакова Ольга Николаевна',
      listener: 'Никита Топольсков-Дердяй',
    },
    {
      id: 4,
      title: 'Что-то так',
      author: 'Васильев Арнольд Ахмедович',
      listener: 'Никита Топольсков-Дердяй',
    },
    {
      id: 5,
      title: 'Тест',
      author: 'Никита Топольсков-Дердяй',
      listener: 'Иванов Иван Иванович',
    },
  ];

  constructor() {
    makeAutoObservable(this);
  };
}

export default new CardState();