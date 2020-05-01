npm run build
scp -r ./build/* /www/data
nginx -s reload