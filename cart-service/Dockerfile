FROM node:14 as builder
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install --only=prod

COPY --from=builder /app/dist/ /app/dist/

EXPOSE 4000

CMD ["npm", "run", "start:prod"]

