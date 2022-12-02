import replicate from '../config/replicate'

async function sendRequest(prompt_start, prompt_end) {
  const response = await fetch(
    'https://api.replicate.com/v1/predictions',
    {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + replicate.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version:
          'ca1f5e306e5721e19c473e0d094e6603f0456fe759c10715fcd6c1b79242d4a5',
        input: {
          prompt_start: prompt_start,
          prompt_end: prompt_end,
        },
      }),
    }
  );
  return response.json();
}

async function getGIF(id) {
  let response = await fetch('https://api.replicate.com/v1/predictions/' + id, {
    method: 'GET',
    headers: {
      Authorization: 'Token ' + replicate.token,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}


export {
  sendRequest,
  getGIF
}