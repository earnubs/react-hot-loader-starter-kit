FROM node:carbon

WORKDIR /app
ADD . /app

RUN npm install
RUN make build

EXPOSE 3000

CMD [ "make", "start" ]
