let limit = 10;
let api_url = `https://cataas.com/api/cats?limit=${limit}`

export async function getCats() {
  let response = await fetch(api_url);
  let data = await response.json();
  console.log(data);
}