root@srv501869:/var/www/dexterdigi# ls
README.md  components  data   jsconfig.json   node_modules       package.json       public  tailwind.config.js
app        content     hooks  next.config.js  package-lock.json  postcss.config.js  scss    utils
root@srv501869:/var/www/dexterdigi#  nano /etc/nginx/sites-available/dexterdigi.com.conf
root@srv501869:/var/www/dexterdigi#  nano /etc/nginx/sites-available/dexterdigi.com.conf
root@srv501869:/var/www/dexterdigi# ln -s /etc/nginx/sites-available/dexterdigi.com.conf /etc/nginx/sites-enabled/
ln: failed to create symbolic link '/etc/nginx/sites-enabled/dexterdigi.com.conf': File exists
root@srv501869:/var/www/dexterdigi# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
root@srv501869:/var/www/dexterdigi# systemctl restart nginx
root@srv501869:/var/www/dexterdigi# ls
README.md  components  data   jsconfig.json   node_modules       package.json       public  tailwind.config.js
app        content     hooks  next.config.js  package-lock.json  postcss.config.js  scss    utils
root@srv501869:/var/www/dexterdigi# npm start

> dexterdigi@0.1.0 start
> next start

  ▲ Next.js 14.2.22
  - Local:        http://localhost:3000

 ✓ Starting...
 ✓ Ready in 894ms
^C
root@srv501869:/var/www/dexterdigi# client_loop: send disconnect: Broken pipe
shubham@Shubhams-MacBook-Air ~ % ssh root@145.223.23.115
root@145.223.23.115's password: 
Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-45-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Wed Jan  1 04:13:44 UTC 2025

  System load:  0.0                Processes:             132
  Usage of /:   11.7% of 95.82GB   Users logged in:       1
  Memory usage: 24%                IPv4 address for eth0: 145.223.23.115
  Swap usage:   0%                 IPv6 address for eth0: 2a02:4780:12:f11a::1

 * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.

   https://ubuntu.com/engage/secure-kubernetes-at-the-edge

Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


*** System restart required ***
Last login: Wed Jan  1 03:59:07 2025 from 152.59.103.215
root@srv501869:~# cd /var/www/dexterdigi
root@srv501869:/var/www/dexterdigi# ls
README.md  components  data   jsconfig.json   node_modules       package.json       public  tailwind.config.js
app        content     hooks  next.config.js  package-lock.json  postcss.config.js  scss    utils
root@srv501869:/var/www/dexterdigi#  nano .env
root@srv501869:/var/www/dexterdigi# cd ..
root@srv501869:/var/www# cd rajdhani
root@srv501869:/var/www/rajdhani# nano .env
root@srv501869:/var/www/rajdhani# 
root@srv501869:/var/www/rajdhani# cd ..
root@srv501869:/var/www# cd dexterdigi
root@srv501869:/var/www/dexterdigi# ls
README.md  components  data   jsconfig.json   node_modules       package.json       public  tailwind.config.js
app        content     hooks  next.config.js  package-lock.json  postcss.config.js  scss    utils
root@srv501869:/var/www/dexterdigi# cd .next
root@srv501869:/var/www/dexterdigi/.next# ls
BUILD_ID                       cache                            next-server.js.nft.json       required-server-files.json  trace
app-build-manifest.json        export-marker.json               package.json                  routes-manifest.json        types
app-path-routes-manifest.json  images-manifest.json             prerender-manifest.json       server
build-manifest.json            next-minimal-server.js.nft.json  react-loadable-manifest.json  static
root@srv501869:/var/www/dexterdigi/.next# cd ..
root@srv501869:/var/www/dexterdigi# npm start

> dexterdigi@0.1.0 start
> next start

  ▲ Next.js 14.2.22
  - Local:        http://localhost:3000

 ✓ Starting...
 ✓ Ready in 432ms
^C
root@srv501869:/var/www/dexterdigi# sudo systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; preset: enabled)
     Active: active (running) since Wed 2025-01-01 04:03:48 UTC; 15min ago
       Docs: man:nginx(8)
    Process: 258340 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
    Process: 258342 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
   Main PID: 258343 (nginx)
      Tasks: 3 (limit: 9488)
     Memory: 3.9M (peak: 4.2M)
        CPU: 44ms
     CGroup: /system.slice/nginx.service
             ├─258343 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             ├─258344 "nginx: worker process"
             └─258345 "nginx: worker process"

Jan 01 04:03:48 srv501869 systemd[1]: Starting nginx.service - A high performance web server and a reverse proxy server...
Jan 01 04:03:48 srv501869 systemd[1]: Started nginx.service - A high performance web server and a reverse proxy server.
root@srv501869:/var/www/dexterdigi# sudo nano /etc/nginx/sites-available/default

  GNU nano 7.2                                        /etc/nginx/sites-available/default                                                 
        #
        #location ~ \.php$ {
        #       include snippets/fastcgi-php.conf;
        #
        #       # With php-fpm (or other unix sockets):
        #       fastcgi_pass unix:/run/php/php7.4-fpm.sock;
        #       # With php-cgi (or other tcp sockets):
        #       fastcgi_pass 127.0.0.1:9000;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #       deny all;
        #}
}


# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#       listen 80;
#       listen [::]:80;
#
#       server_name example.com;
#
#       root /var/www/example.com;
#       index index.html;
#
#       location / {
#               try_files $uri $uri/ =404;
#       }
#}


^G Help          ^O Write Out     ^W Where Is      ^K Cut           ^T Execute       ^C Location      M-U Undo         M-A Set Mark
^X Exit          ^R Read File     ^\ Replace       ^U Paste         ^J Justify       ^/ Go To Line    M-E Redo         M-6 Copy
