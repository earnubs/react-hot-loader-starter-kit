FROM node:carbon

WORKDIR /app
ADD . /app


ENV NODE_ENV "production"
RUN npm install
RUN make build

EXPOSE 3000

CMD [ "make", "start-with-migrations" ]
