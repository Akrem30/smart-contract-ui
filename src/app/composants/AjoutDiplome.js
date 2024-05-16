'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState,useEffect } from "react"
import initializeWeb3 from "../utils/web3"
import 'animate.css';
import Confetti from "./Confetti"

export default function AjoutDiplome() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        degreeTitle: '',
        graduationYear: '',
        institution: ''
      });
      const [isSubmitted, setIsSubmitted] = useState(false);
      const [account, setAccount] = useState(null);
      const [contractInstance, setContractInstance] = useState(null);
      const [web3Instance, setWeb3Instance] = useState(null);
      const [isClicked,setIsClicked] = useState(false)
      useEffect(() => {
        initializeWeb3().then(data => {
          setAccount(data.account);
          setContractInstance(data.contractInstance);
          setWeb3Instance(data.web3);
        });
      }, []);
    
      const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.id]: event.target.value,
        });
      };
    
      const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsClicked(true);
       console.log(formData);
       await contractInstance.methods.addDiplome(formData.lastName,formData.firstName,formData.dateOfBirth,
           formData.phoneNumber,formData.email,
           formData.graduationYear,formData.institution,
           formData.degreeTitle).send({ from: account })
        
        setTimeout(() => {
            setIsSubmitted(true);
            setIsClicked(false);
          }, 4000);
      };
     const closeDiploma = () =>{
        setIsSubmitted(false);
        setFormData({
            ...formData,
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
            degreeTitle: '',
            graduationYear: '',
            institution: ''
        });
        console.log(formData);
     }
  return (
    <>
    <div className="grid grid-cols-2">
    <div className="col-span-1 ">
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md  ">
          <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un diplôme</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Nom</Label>
                <Input id="firstName" placeholder="Entrez le nom" required onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="lastName">Prénom</Label>
                <Input id="lastName" placeholder="Entrez le prénom" required onChange={handleInputChange}/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date de naissance</Label>
                <Input id="dateOfBirth" required type="date" onChange={handleInputChange}/>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="john.doe@example.com" required type="email" onChange={handleInputChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                <Input id="phoneNumber" placeholder="+1 (888) 888-8888" required onChange={handleInputChange}/>
              </div>
              <div>
                <Label htmlFor="degreeTitle">Titre du diplôme</Label>
                 <Input id="degreeTitle" placeholder="Entrez le titre" required onChange={handleInputChange}/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="graduationYear">Année d'obtention</Label>
                <Input id="graduationYear" max="2100" min="1900" placeholder="2020" required type="number" onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" placeholder="Entrez le nom de l'institution" required onChange={handleInputChange}  />
              </div>
            </div>
         
            <Button className="w-full" type="submit" onClick={handleFormSubmit}>
              { !isClicked ?  "Ajouter" :
                              <> 
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                 Chargement
                              </>                              
              }
            </Button>
            
          </form>
        </div>
      </div>
     </div>
     <div className="col-span-1 bg-black ">  
      {isSubmitted && (
        <div className="flex flex-col items-center justify-center h-screen bg-black">
        <div className="bg-slate-100 p-10 rounded-lg shadow-lg w-[800px] mr-40 my-div">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-[#333] mb-4">Félicitations !</h1>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-[#f2c94c] rounded-full p-4 mr-4">
                <MedalIcon className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#333]">Diplôme Ajouté</h2>
            </div>
            <h3 className="text-2xl font-bold text-[#333] mb-4">Au nom de :</h3>
            <h4 className="text-3xl font-bold text-[#333] mb-6">{formData.lastName} {formData.firstName}</h4>
            <p className="text-xl font-bold text-[#333] mb-6">{formData.degreeTitle}</p>
            <p className="text-xl font-bold text-[#333] mb-10">Année : {formData.graduationYear} </p>
            {/* <Button className="bg-blue-800 text-xl font-bold text-[#333] mb-10" type="submit" onClick={closeDiploma}>
             X Fermer
           </Button> */}
            <div className="flex items-center justify-end w-full">
              <div className="flex flex-col items-end">
                <p className="text-lg font-bold text-[#333]">John Doe</p>
                <p className="text-lg font-bold text-[#333]">Président</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      </div>
     </div>
     {isSubmitted &&(
      <Confetti/>
     )}
    </>
  )
}

function MedalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" />
      <path d="M12 18v-2h-.5" />
    </svg>
  )
}
