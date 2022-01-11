
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
# stage 1
# FROM node:latest as node
# FROM node:v16.13.1
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod

# # stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/todo-mdb4-angular-pro /usr/share/nginx/html

########################
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
