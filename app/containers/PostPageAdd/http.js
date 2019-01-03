import { API_URL } from 'utils/constants';

export default function post(data) {
    const requestURL = `${API_URL}/posts`;
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    return fetch(requestURL, options);
};