FROM node:14
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install --only=prod

COPY --from=0 /app/dist/ /app/dist/

EXPOSE 4000

CMD ["npm", "run", "start:prod"]

