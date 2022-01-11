
<<<<<<< Updated upstream
# Create image based on the official Node 10 image from dockerhub
FROM node:16.13.1

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# Install dependencies
RUN npm install

# Get all the code needed to run the app
COPY . /app/

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "start"]
=======
FROM docker/whalesay:latest
LABEL Name=toDoWebApplication Version=0.0.1
RUN apt-get -y update && apt-get install -y fortunes
CMD ["sh", "-c", "/usr/games/fortune -a | cowsay"]


>>>>>>> Stashed changes



# FROM node:latest as builder

# RUN mkdir -p /app

# WORKDIR /app

# COPY . .

# RUN npm install
# RUN npm run build --prod

# # CMD ["npm", "start"]

# FROM nginx:alpine
# COPY src/nginx/etc/conf.d/default.conf /etc/nginx/conf/default.conf
# COPY --from=builder app/dist/todo-mdb4-angular-pro usr/share/nginx/html

##############
<<<<<<< Updated upstream
# stage 1
# FROM node:latest as node
# FROM node:v16.13.1
=======
# # stage 1
# FROM node:latest as node
>>>>>>> Stashed changes
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod

# # stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/todo-mdb4-angular-pro /usr/share/nginx/html

<<<<<<< Updated upstream
########################
=======
###############
>>>>>>> Stashed changes
# # stage 1
# # FROM node:latest as node
# FROM node:8.9.4
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod

# # stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/ng-uikit-pro-standard-compile-app /usr/share/nginx/html
