# Nginx server statiske filer og fungerer som reverse proxy mot backend
FROM nginx:alpine

# Erstatt standard Nginx-konfig med vår egen
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Kopier statiske filer
COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
