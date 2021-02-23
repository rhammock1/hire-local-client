import config from '../config';
import TokenService from './token-service';

// All methods for accessing hire-local server
const RestApiService = {
  // Resume endpoint's methods
  getResume(userId) {
    return fetch(`${config.API_ENDPOINT}/resume/${userId}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.blob()
      );
  },
  postResume(resume, userId) {
    return fetch(`${config.API_ENDPOINT}/resume/${userId}`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: resume,
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },
  deleteResume(userId) {
    return fetch(`${config.API_ENDPOINT}/resume/${userId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res
      );
  },
  patchResume(resume, userId) {
    return fetch(`${config.API_ENDPOINT}/resume/${userId}`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: resume,
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res
      );
  },
  // jobs endpoint's methods
  getAllJobs() {
    return fetch(`${config.API_ENDPOINT}/jobs`)
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        );
  },
  getJobById(job_id) {
      return fetch(`${config.API_ENDPOINT}/jobs/${job_id}`)
          .then(res =>
              (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          );
  },
  addNewJob(job, reqs) {
    const newJob = { ...job, reqs}
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
          );
  },
// save endpoint's methods
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
          );
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
          );
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
              : res
          );
  },
// apply endpoint's methods
  getUserApplied(user_id) {
    return fetch(`${config.API_ENDPOINT}/apply/${user_id}`, {
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
        );
  },
  postApplyJob(formData, userId) {
    
    return fetch(`${config.API_ENDPOINT}/apply/${userId}`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
      body: formData,
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },
}

export default RestApiService;