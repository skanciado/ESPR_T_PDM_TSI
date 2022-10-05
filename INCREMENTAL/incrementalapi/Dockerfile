FROM node:14.15.4-alpine3.12 as build
ARG PORT 
# Create app directory
#RUN mkdir node 
#COPY . ./node
COPY . .
#WORKDIR /node 
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source 
RUN PORT_LISTENER=$PORT 
ENV PORT_LISTENER $PORT
EXPOSE $PORT
CMD  node ./src/index.js