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
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/todo-mdb4-angular-pro /usr/share/nginx/html

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
