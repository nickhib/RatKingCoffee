# name the first stage build then reference it in second
FROM node:alpine AS build

WORKDIR /app

COPY package*.json ./

# Install Angular
RUN npm install -g @angular/cli
RUN npm install

COPY . .
EXPOSE 4200
RUN npm run build -- --configuration=production

FROM nginx:alpine 
COPY --from=build /app/dist/ratkingcaffeine /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
