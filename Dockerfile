# ---- Base Node ----
FROM node:alpine AS base
COPY . .
RUN rm -rf node_modules
RUN npm install
RUN npm run build

# ---- Prod ----
FROM nginx
# Copy needed files
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=base index.html /usr/share/nginx/html
COPY --from=base assets /usr/share/nginx/html/assets