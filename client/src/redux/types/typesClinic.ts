export enum TypesClinic {
    GET_CLINIC = 'GET_CLINIC',
    GET_DOCS = 'GET_DOCS',
}

export interface IClinic {
    id: number;
    name: string;
    phone: string;
    email: string;
    generalInfo: string;
}
export interface IAdressClinic {
    country: string;
     city: string;
     street: string; 
}
export interface IDoctor {
    country: string;
     city: string;
     street: string; 
}
export interface IClinicState {
    clinicInfo: IClinic | null;
    addressClinic: IAdressClinic | null
}


 
