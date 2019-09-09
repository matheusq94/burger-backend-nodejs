import axios from 'axios';

class AdressController {
  async store(req, res) {
    // api key: AIzaSyDMQcjcdpn_rU0mt1_OKMXzki4B10sIeJE

    // https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters

    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=-22.947490,-43.603899&key=AIzaSyDMQcjcdpn_rU0mt1_OKMXzki4B10sIeJE'
    );

    return res.json(response.data);
  }
}

export default new AdressController();
