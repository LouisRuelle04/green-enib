#include <EEPROM.h>

void setup() {
  // Initialiser la communication série
  Serial.begin(9600);

  // Initialiser l'EEPROM avec une taille suffisante pour vos données
  EEPROM.begin(512);

  // Boucle pour effacer les données dans l'EEPROM
  for (int i = 0; i < 512; i++) {
    EEPROM.write(i, 0);  // Écrire 0 dans chaque byte de l'EEPROM
  }

  // Appliquer les changements
  EEPROM.commit();

  // Indiquer que l'EEPROM a été effacée
  Serial.println("EEPROM effacée !");
}

void loop() {
  // Pas besoin de boucle continue ici
}