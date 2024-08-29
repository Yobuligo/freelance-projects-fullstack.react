FROM --platform=arm64 arm64v8/node:alpine3.19
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run compile
EXPOSE 5000
# Start backend server delayed to ensure that the database is already running
CMD ['/bin/sh' '-c' 'sleep 10 && npm start']