import axios from 'axios';

class DevelopmentManager {
  static async getLastUpdate() {
    return (await axios.get(`/update`)).data;
  }
}

export default DevelopmentManager;
