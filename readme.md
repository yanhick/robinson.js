[![Build Status](https://travis-ci.org/yanhick/robinson.js.svg)](https://travis-ci.org/yanhick/robinson.js)

#Robinson.js

A node.js port of [Robinson](https://github.com/mbrubeck/robinson)

##Install

Clone this repo, then cd in it and:

```
npm install
```

##Usage

```
node index --html file.html --css file.css --output file.png
```

By default, robinson will load test.html and css.html from the ```examples``` directory and
save the rendered page to a file named ```output.png```.

##Test

```
npm test
```
