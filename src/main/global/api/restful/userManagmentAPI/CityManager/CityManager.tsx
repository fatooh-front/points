import _ from "lodash";
import { GetCity } from "./CityTypes";
import axios from "axios";

class CityModelsManager {
  static async getAllCity() {
    return (await axios.get(`/api/city/findall`)).data;
  }

  static async addCity(body: GetCity) {
    return (await axios.post(`/api/city/save`, body)).data;
  }

  static async deleteCity(id: string) {
    return (await axios.delete(`/api/city/delete/${id}`)).data;
  }
}

export default CityModelsManager;
