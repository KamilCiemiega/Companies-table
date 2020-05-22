import axios from 'axios';

const getDataFromApi = () => {
    return axios.get("https://api.tvmaze.com/search/shows?q=snow")
      .then(resp => {
        console.log(resp.data)
        return resp.data
      })
      .catch(err => {
        throw new Error('Something went wrong')
      })
}

export default getDataFromApi;