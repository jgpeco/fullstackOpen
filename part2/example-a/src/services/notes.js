import axios from 'axios'

const baseUrl = '/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    // const nonExisting = {
    //     id: 100000,
    //     content: 'This note is not saved to server',
    //     date: '2020-10-30T17:30:31.0.98Z',
    //     important: true,
    // }
    return request.then(response => response.data)
}

const create = newObj => {
    const request = axios.post(baseUrl, newObj)
    return request.then(response => response.data)
}

const update = (id, newObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newObj)
    return request.then(response => response.data)
}

export default { getAll, create, update }