'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Image from 'next/image';
import { useState, useEffect } from "react"
import initializeWeb3 from "../utils/web3"

export default function Form() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClicked,setIsClicked] = useState(false);
  const [isVerified,setIsVerified] = useState(false);
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
  const [account, setAccount] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [web3Instance, setWeb3Instance] = useState(null);

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
    await contractInstance.methods.getDiplome(formData.lastName,formData.firstName,
      formData.graduationYear).call({ from: account }).then(result => {
        console.log(result);
        setFormData({
          lastName : result[0],
          firstName : result[1],
          dateOfBirth:result[2],
          phoneNumber:result[3],
          email :result[4],
          graduationYear:result[5],
          institution :result[6],
          degreeTitle:result[7]
        })
        if(result[7] !=''){
          setIsVerified(true);
        }
        else{
          setIsVerified(false);
        }
      })
      .catch(error => {
        console.error(error);
        
      });
   
    setTimeout(() => {
      setIsSubmitted(true);
      setIsClicked(false);
    }, 8000);
  };
  return (
    <>
    <div className="grid grid-cols-2 mt-10">
    <div className="col-span-1 ml-40 ">
    <Image src="/photo.jpg" alt="Image" width={1000} height={1000} className="rounded-2xl" />
    </div>
    <div className="col-span-1 ">    
    <main className="flex flex-col items-center justify-center h-full gap-8 px-4 md:px-6">
    <h1 className="text-4xl font-bold text-center">Les contrats intelligents au service de l'éducation</h1>
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
       <br/>
        <h1 className="text-2xl font-bold text-center">Vérifiez l'authenticité des diplômes en toute confiance</h1>
        <br/>
        <p className="text-gray-400 text-center text-lg">En un simple clic retrouvez la liste des diplômes de la personne souhaitée </p>
        <form className="w-full grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nom</Label>
            <Input id="firstName" placeholder="Entrez le nom" required onChange={handleInputChange}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Prénom</Label>
            <Input id="lastName" placeholder="Entrez le prénom" required onChange={handleInputChange} />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="graduationYear">Année d'obtention</Label>
            <Input id="graduationYear" placeholder="Entrez l'année d'obtention" required onChange={handleInputChange} />
          </div>
          <Button className="col-span-2" type="submit" onClick={handleFormSubmit}>
            Rechercher
          </Button>
        </form>
      </div>
      {isClicked &&(
         <div className="border border-blue-300 shadow rounded-md p-4 max-w-2xl w-full h-52"> 
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
                <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                         En attente...
                </button>
          </div>
        
        </div>
       </div> 
      ) }
      {isSubmitted && !isClicked && isVerified && (
      <Card className="w-full max-w-2xl my-div1">
        <CardHeader className="relative">
          <img
            src="/verified-symbol-icon.png"
            alt="Image"
            className="absolute top-6 right-8 w-8 h-8"
          />
          <CardTitle>{formData.lastName} {formData.firstName}</CardTitle>
          <CardDescription>{formData.degreeTitle}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-gray-400" />
              <span>{formData.lastName} {formData.firstName}</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="w-5 h-5 text-gray-400" />
              <span>{formData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-gray-400" />
              <span>{formData.phoneNumber}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <GraduationCapIcon className="w-5 h-5 text-gray-400" />
              <span>{formData.degreeTitle}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <span>Année d'obtention : {formData.graduationYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <BuildingIcon className="w-5 h-5 text-gray-400" />
              <span>{formData.institution}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      )}
       {isSubmitted && !isClicked && !isVerified && (
      <Card className="w-full max-w-2xl my-div1">
        <CardHeader className="relative">
          <img
            src="/uncheked.png"
            alt="Image"
            className="absolute top-6 right-8 w-8 h-8"
          />
          <CardTitle>{formData.lastName} {formData.firstName}</CardTitle>
          <CardDescription>{formData.degreeTitle}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h1>Pas de résultats obtenus</h1>
          </div>
        </CardContent>
      </Card>
      )}
    </main>
    </div>
    </div>
    </>
  )
}

function BuildingIcon(props) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}


function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function GraduationCapIcon(props) {
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
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  )
}


function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m25 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function PhoneIcon(props) {
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
      <path d="M25 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}