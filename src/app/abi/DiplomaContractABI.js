const contractABI =  [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_preNom",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_nom",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_dateNaissance",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_numeroTelephone",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_anneeObtention",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_universite",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_titre",
        "type": "string"
      }
    ],
    "name": "addDiplome",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_preNom",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_nom",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_dateDiplome",
        "type": "string"
      }
    ],
    "name": "getDiplome",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "preNom",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "nom",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "dateNaissance",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "numeroTelephone",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "anneeObtention",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "universite",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "titre",
            "type": "string"
          }
        ],
        "internalType": "struct DiplomeContract.Diplome",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

  export default contractABI;