# Используем официальный образ Node.js
FROM node:14-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и yarn.lock
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Копируем все файлы
COPY . .

# Сборка приложения
RUN yarn build

# Устанавливаем сервер для статических файлов
RUN yarn global add serve

# Запуск сервера для статических файлов
CMD ["serve", "-s", "build", "-l", "3000"]