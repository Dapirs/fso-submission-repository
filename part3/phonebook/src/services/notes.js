import axios from 'axios';

const baseURL = "http://localhost:3001/persons";

const getAll = () =>{
    const request = axios.get(baseURL);
    return request.then(response => response.data)
}

const create = (contactObject) => {
    const request = axios.post(baseURL, contactObject);
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`);
}

const update = (id, contactObject) => {
    const request = axios.put(`${baseURL}/${id}`, contactObject);
    return request.then(response => response.data)
}
export default { getAll, create, remove, update }