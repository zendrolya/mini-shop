# Mini-shop

Интернет-магазин товаров, построенный на React и TypeScript.

## Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Линтинг
npm run lint
```

## Стек технологий

- **React 19**
- **TypeScript 6**
- **Vite 8**
- **MUI 9**
- **React Router**
- **DummyJSON** — тестовый API для товаров
- **Eslint** и **Prettier**

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MaterialUI](https://img.shields.io/badge/Material%20UI-%23FFFFFF.svg?style=for-the-badge&logo=MUI&logoColor=#007FFF)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)

## Структура проекта

```
src/
├── components/    # Переиспользуемые компоненты
├── hooks/         # Кастомные хуки
├── pages/         # Страницы
├── services/      # API-сервисы
├── theme/         # Конфигурация темы MUI
└── types/         # TypeScript-интерфейсы
```

## Дизайн-система

- Кастомная тема MUI с определённой палитрой цветов (primary: `#1a1a2e`, secondary: `#e94560`)
- Глобальные стили для компонентов MUI (Button, Card, AppBar, Chip) заданы в теме
- Адаптивная верстка через Grid MUI с breakpoints: `xs`, `sm`, `md`, `lg`

## Ключевые возможности

- Каталог товаров с мобильной адаптацией карточек
- Страницы магазина через React Router: каталог, корзина, детальная информация о товаре
