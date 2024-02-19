FROM alpine:3.18

RUN echo "America/Sao_Paulo" > /etc/timezone

WORKDIR /app

COPY . /app/

RUN npm install -g @nestjs/cli

RUN npm install --only=prod

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]