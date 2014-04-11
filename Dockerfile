FROM kyma/docker-nginx
ADD public/ /var/www
CMD 'nginx'
