# Config build image
FROM node:13.10-alpine as build
WORKDIR /src/
USER root
# Copy source code
COPY . .
# Bundle the app
RUN yarn install --development && yarn build

FROM nginx:1.17-alpine
WORKDIR /var/www/html
EXPOSE 80
COPY --from=build /src/build/ .
