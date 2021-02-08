import config from '../config'

const RestApiService = {
    getAllJobs() {
        return fetch(`${config.API_ENDPOINT}/jobs`)
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
}

export default RestApiService;