const getAllCapteurIp = async (db) => {
    try {
      const [results] = await db.query('SELECT ip FROM capteurIp');
      const ipList = results.map(row => row.ip); 
      console.log(ipList)
      return ipList;
    } catch (error) {
      console.error('Erreur lors de la récupération des IPs:', error);
      throw error;  
    }
  };
  
  module.exports = {getAllCapteurIp};