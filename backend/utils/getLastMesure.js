const getLastMesure = async (db) => {
    try {
        const query = ` SELECT m.*, c.name, c.ip
                        FROM mesure m
                        INNER JOIN (
                            SELECT ipcapteur, MAX(dateMesure) AS lastDate
                            FROM mesure
                            GROUP BY ipcapteur
                        ) latest ON m.ipcapteur = latest.ipcapteur AND m.dateMesure = latest.lastDate
                        INNER JOIN capteurIp c ON m.ipcapteur = c.id;`

        const [results] = await db.query(query);
        const tableData = results.map(row => row);
        return tableData;
    } catch (error) {
        console.error('Erreur lors de la récupération des données de mesures:', error);
        throw error;
    }
};

module.exports = { getLastMesure };