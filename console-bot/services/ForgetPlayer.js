const forgetPlayer = async () => {
  await fetch(`${process.env.API_BASE}/player/forget`, {
    method: 'DELETE',
    headers: {
      Authorization: process.env.TOKEN,
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
    .then((res) => {
      console.log(res.status);
      if (res.status === 202) {
        return `User was forgotten with ${res.statusText}`;
      }
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

module.exports = forgetPlayer;
