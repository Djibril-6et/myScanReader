import axios from "axios";

const serverUrl = `http://localhost:7001/scans`;

export default {
  getMangas() {
    return axios.get(serverUrl);
  },

  getChapters(manga) {
    return axios.get(`${serverUrl}/${manga}`);
  },
};
