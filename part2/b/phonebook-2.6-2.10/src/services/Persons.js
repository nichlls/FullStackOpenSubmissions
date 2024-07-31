import axios from "axios";
const url = "http://localhost:3001/persons";

const get = () => {
  return axios.get(url);
};

const post = (object) => {
  return axios.post(url, object);
};

const deleteID = (id) => {
  return axios.delete(`${url}/${id}`);
};

export default { get, post, deleteID };
