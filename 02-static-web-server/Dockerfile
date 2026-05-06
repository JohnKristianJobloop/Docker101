# Nginx er en lettvekts webserver godt egnet til å serve statiske filer
FROM nginx:alpine

# Kopier HTML-siden inn i Nginx sin standardmappe for webinnhold
COPY index.html /usr/share/nginx/html/index.html

# Dokumenter at containeren lytter på port 80
EXPOSE 80
