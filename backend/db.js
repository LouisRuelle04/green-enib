const mysql = require('mysql2');

const dbUrl = process.env.DATABASE_URL;

// Vérifiez que la variable d'environnement est définie
if (!dbUrl) {
    console.error('DATABASE_URL n\'est pas défini');
    process.exit(1); // Quitter l'application si l'URL n'est pas définie
}

const connection = mysql.createConnection(dbUrl);

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
    return;
  }
  console.log('Connecté à MySQL avec succès.');
});

module.exports = connection;