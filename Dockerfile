# build and config environment
FROM keymetrics/pm2:14-alpine
WORKDIR /app
COPY . .

# Install dependencies 
RUN yarn global add pm2
RUN pm2 install pm2-logrotate
RUN yarn install --network-timeout 100000
RUN yarn build

ARG PORT

EXPOSE $PORT

CMD pm2-runtime start ecosystem.yml