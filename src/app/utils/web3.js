import { Web3 } from 'web3';
import contractABI from '../abi/DiplomaContractABI';
//var provider = 'http://localhost:8545';
//const web3 = new Web3(new Web3.providers.HttpProvider(provider));
 const initializeWeb3 = async () => {
    const web3 = new Web3('http://localhost:8545');
    const accounts = await web3.eth.getAccounts();

    //Si vous déployez le contrat sur votre environnement n'oubliez pas de changer l'adresse du contrat ici
    //avec l'adresse de votre contrat et le contenu de ContractABI dans le fichier abi/DiplomaContractABI.js
    //par l'abi de votre contrat
    const contractAddress = '0x61A84cd025ec5EEbEF2098C9d933A49332BE68B4';
    const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
    return {
        account: accounts[0],
        contractInstance,
        web3Instance: web3
      };
  };
export default initializeWeb3;