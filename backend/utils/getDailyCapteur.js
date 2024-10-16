const getDailyCapteur = async (db) => {
    try {
      const [results] = await db.query('SELECT * FROM mesure');
      const tableData = results.map(row => row); 
      console.log([tableData[0],tableData[1]])
      return tableData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données de mesures:', error);
      throw error;  
    }
  };
  
  module.exports = {getDailyCapteur};