import axios from "axios";
const url = "http://localhost:3001/persons";

const get = () => {
  return axios.get(url);
};

const post = (object) => {
  return axios.post(url, object);
};

export default { get, post };
