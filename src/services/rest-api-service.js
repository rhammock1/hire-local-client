import config from '../config';
import TokenService from './token-service';

const RestApiService = {
    getAllJobs() {
        return fetch(`${config.API_ENDPOINT}/jobs`)
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    getJobById(job_id) {
        return fetch(`${config.API_ENDPOINT}/jobs/${job_id}`)
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    addNewJob(newJob) {
        return fetch(`${config.API_ENDPOINT}/jobs`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(newJob),
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },

    getUserSaves(user_id) {
        return fetch(`${config.API_ENDPOINT}/saves/${user_id}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },

    saveJob(user_id, job_id) {
        return fetch(`${config.API_ENDPOINT}/saves/${user_id}`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({ job_id }),
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    
    deleteSave(user_id, save_id) {
        return fetch(`${config.API_ENDPOINT}/saves/${user_id}`, {
            method: 'DELETE',
            headers: {
                'save_id': save_id,
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    }

}

export default RestApiService;