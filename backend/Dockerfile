FROM arm64v8/node:14-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm run compile
EXPOSE 5000
CMD [ "npm", "start"]