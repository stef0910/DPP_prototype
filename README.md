# Digitaler Produktpass (DPP) - Technischer Prototyp

## Überblick

Dieser technische Prototyp stellt einen digitalen Produktpass dar, der auf einer Blockchain-Technologie basiert. Er ermöglicht es, Produktinformationen sicher und transparent zu speichern und zu verwalten.

## Architektur

Die Anwendung besteht aus drei Hauptkomponenten: Smart Contract, Frontend und Backend.

### Smart Contract

Die Smart Contracts sind in Solidity geschrieben und befinden sich im Verzeichnis `blockchain/contracts`. Der Hauptvertrag `DPP.sol` verwaltet alle wesentlichen Funktionen des DPP.

### Frontend

Das Frontend ist mit Vue.js und Vuetify entwickelt. Der Hauptteil der Anwendung befindet sich in `frontend/vuetify-project/src/App.vue`. Es besteht aus den folgenden Komponenten:

- **AASUpload.vue**: Ermöglicht das Hochladen der Asset Administration Shell (AAS) zum Erstellen eines DPP.
- **AuthorizeOperator.vue**: Verwaltet die Berechtigungen für Operatoren (Recycler und Werkstatt).
- **DPPInformation.vue**: Zeigt Informationen zum DPP in Form von Smart Contract Events an.
- **RecycleDPP.vue**: Bietet eine Funktion zum Recyceln des DPP.
- **UpdateDPP.vue**: Ermöglicht das Aktualisieren der Informationen im Produktpass.

### Backend

Das Backend ist in Node.js implementiert und verantwortlich für die Interaktion mit dem Smart Contract.

- **Index.js**: Die Hauptserverdatei, welche die Umgebungsvariablen aus der `.env`-Datei lädt, Express für die Servererstellung verwendet, CORS für das Handling von Cross-Origin Requests konfiguriert und Multer für das Speichern temporärer Dateien nutzt.
- **smartContractInteractions.js**: Enthält Funktionen zur Interaktion mit den Smart Contracts auf der Blockchain, einschließlich Funktionen zum Laden von Umgebungsvariablen und zur Nutzung von Web3.

### Umgebungsvariablen in `.env`

Beinhaltet die Smart Contract Adresse nach dem Deployen und die Ethereum-Adressen, die mit Ganache erstellt wurden: Hersteller, Werkstatt und Recycler sowie den Pinata API-Token für die Interaktion mit IPFS.
