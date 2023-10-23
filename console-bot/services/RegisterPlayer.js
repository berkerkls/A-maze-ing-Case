const prompt = require('prompt-sync')();

const registerPlayer = async () => {
  // getting name from user to register
  let playerName = prompt('Please enter your name'.yellow);

  await fetch(`${process.env.API_BASE}/player/register?name=${playerName}`, {
    method: 'POST',
    headers: {
      Authorization: process.env.TOKEN,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
    .then((res) => {
      if (res.status === 202) {
        return `Registration successfull - ${res.statusText}`.green;
      }
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

module.exports = registerPlayer;
