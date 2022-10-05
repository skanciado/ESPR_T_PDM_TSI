FROM node:14.15.4-alpine3.12

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH 
# install app dependencies
COPY package.json ./ 
COPY package-lock.json ./ 
RUN npm install 
# add app
COPY . ./ 
# start app
CMD ["npm", "start"]

#  Development Dockerfile
# FROM node:12.2.0-alpine
# WORKDIR /app
# ENV env_name John
# RUN echo env_name
# COPY package.json /app
# RUN npm install 
# RUN REACT_APP_DOMAIN=${DOMAIN} \ 
#     REACT_APP_API_KEY=${API_KEY} \ 
#     npm run build
# COPY . /app
# CMD npm start

# FROM node:14.15.4-alpine3.12 as build
# WORKDIR /app 
# COPY ./package.json . 
# COPY ./package-lock.json . 
# RUN npm install 
# COPY ./public ./public/ 
# COPY ./src ./src/ 
#RUN REACT_APP_DOMAIN=${DOMAIN} \ 
#    REACT_APP_API_KEY=${API_KEY} \ 
# ENV REACT_APP_DASHBOARD_TIMER_SECONDS 10
# ENV REACT_APP_API_URL 10
# ENV REACT_APP_CONSOLE_LOG_VISUALIZE_LEVEL debug,warn
# ENV REACT_APP_TOKEN_SECRET avsdf95sfoxejifas0
# ENV REACT_APP_LNG es
# RUN npm run build 
# RUN REACT_APP_VERSION=1 \
#     REACT_APP_DASHBOARD_TIMER_SECONDS=10 \ 
#    REACT_APP_NAME=incrementalapi \
# #    REACT_APP_API_URL=http://localhost:5200 \ 
#    REACT_APP_CONSOLE_LOG_VISUALIZE_LEVEL=debug,warn \ 
#    REACT_APP_TOKEN_SECRET=avsdf95sfoxejifas0 \ 
#    REACT_APP_LNG=es \ 
#    npm run build 
# FROM nginx:1.17-alpine 
# COPY --from=build /app/build /usr/share/nginx/html 
# EXPOSE 80
#  CMD ["nginx", "-g", "daemon off;"]
# https://medium.com/swlh/reactjs-docker-environment-variables-f35eb591683e 



