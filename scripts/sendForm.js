export default function sendForm(formID, body) {
  const baseURL = `https://flatland-forms-api-auevpolm5q-uc.a.run.app/forms/${formID}`;
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((d) => d.json());
}
