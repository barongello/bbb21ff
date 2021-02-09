'use strict';

const fetch = require('node-fetch');

const getFollowers = async username => {
  const html = await fetch(`https://www.instagram.com/${username}/`).then(response => response.text()).catch(error => null);

  if(html === null) {
    return console.log('Could not get page for:', username);
  }

  const fs = require('fs');
  fs.writeFileSync(`${username}.txt`, html);

  const reFollowers = /<span.*?title="([^"]+)">.*?seguidores/gi;
  const match = html.match(reFollowers);

  if(match === null) {
    return console.log('Could not get followers for:', username);
  }

  console.log(match);
};

getFollowers('karolconka');
