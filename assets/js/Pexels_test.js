
import { createClient } from 'pexels';

const client = createClient('6KR7dMuHoheLrHkuMuBjt6aKsO5jCwMfhReAjQo6DaxyBHpWb7m0THy7');
const query = 'Nature';

client.photos.search({ query, per_page: 1 }).then(photos => {console.log(photos)});
