ws-client
=========

## Install

```
git clone git@github.com:rhannequin/ws-client.git
cd ws-client
npm install -g gulp
npm install
```

## Launch

If you have Python installed, you can launch a webserver from this singlepage webapp:

```
gulp
cd dist
python -c 'import SimpleHTTPServer; SimpleHTTPServer.test()'
```

Otherwise you can open the file `dist/index.html` in your browser.

You may want to make this webapp work (*duh!*), by launching it's remote API webservice [ws-app](https://github.com/rhannequin/ws-app).
