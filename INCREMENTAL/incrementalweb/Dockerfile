# FROM node:14.15.4-alpine3.12 
# WORKDIR /app 
# ENV PATH /app/node_modules/.bin:$PATH  
# COPY package.json ./ 
# COPY package-lock.json ./ 
# RUN npm install  
# COPY . ./  
# CMD ["npm", "start"]
# EXPOSE 3000




FROM node:19.0.0 as build
WORKDIR /app 
COPY ./package.json . 
COPY ./package-lock.json . 
RUN npm install 
COPY ./public ./public/ 
COPY ./src ./src/ 
ENV REACT_APP_API_URL 10
ENV REACT_APP_CONSOLE_LOG_VISUALIZE_LEVEL debug,warn
ENV REACT_APP_TOKEN_SECRET avsdf95sfoxejifas0
ENV REACT_APP_LNG es
RUN npm run build 
RUN REACT_APP_VERSION=1 \
    REACT_APP_DASHBOARD_TIMER_SECONDS=10 \ 
    REACT_APP_NAME=incrementalapi \
    REACT_APP_API_URL=http://localhost:5200 \ 
    REACT_APP_CONSOLE_LOG_VISUALIZE_LEVEL=debug,warn \ 
    REACT_APP_TOKEN_SECRET=avsdf95sfoxejifas0 \ 
    REACT_APP_LNG=es \ 
    npm run build 
#FROM nginxinc/nginx-unprivileged 
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
COPY --from=build /app/build . 
# RUN rm /etc/nginx/conf.d/default.conf 
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf  
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
#EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
# https://medium.com/swlh/reactjs-docker-environment-variables-f35eb591683e 



