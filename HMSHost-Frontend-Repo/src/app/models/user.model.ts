
export interface ApiFormat {
  status: string;
  message: string;
  data: any;
}

export interface User {
  email: string;
  fullName: string;
  lanId: string;
  dateOfJoining: string;
  department: string;
  designation: string;
  isHr: boolean;
  isManager: boolean;
  isSuperUser: boolean;
  location: string;
  manager: string;
  managerEmail: string;
  roles: string[];
  token: string;
}

export interface UserInfo {
  designation: string;
  dob: any;
  email: string;
  firstName: string;
  image: string;
  lanId: string;
  lastName: string;
  leadEmail: string;
  leadFirstName: string;
  marriageAnniversary: string;
  towerLeadEmail: string;
  towerLeadFirstName: string;
  towerLeadLastName: string;
  workAnniversary: string;
}

export interface anniversaries extends UserInfo{
  yearsOfExperience : number
}

export interface LoginModel {
  userId: string;
  password: string;
}
export interface Countries {
  message?: any;
  Country_ID?: number;
  Country_Name: string;
  Country_Short_Name: string;
  Currency: string;
  Currency_Symbol: string
}
export interface ConceptMasters {
  message?: any;
  Concept_ID?: number;
  Concept_Name: string;
  Concept_Description: string;
  createdAt?:Date;
  ipAddres?: string;
  status?:string;
  updatedAt?:Date;
}

export interface RevenueMasters {
  message?: any;
  Revenue_Type_ID?: number;
  Revenue_Type_Description: string;
  Revenue_Type_Value?: number;
  createdAt?:Date;
  ipAddres?: string;
  status?:string;
  updatedAt?:Date;
}
export interface SequenceMasters {
  message?: any;
  Def_Sequence_ID?: number;
  Def_Sequence_Description: string;
  Def_Sequence_Value?: number;
  createdAt?:Date;
  ipAddres?: string;
  status?:string;
  updatedAt?:Date;
}

export interface MajorGroupMasters {
  message?:string;
  Major_Group_ID?: number;
  Major_Group_Name: string;
  createdAt?:Date;
  ipAddres?: string;
  status?:string;
  updatedAt?:Date;
}

export interface Pricelevelmasters {
  message?: any;
  Price_Level_ID?: number;
  Price_Level_Description: string;
  Price_Level_Value?: number;
  createdAt?:Date;
  ipAddres?: string;
  status?:string;
  updatedAt?:Date;
}

export interface PriceNumbermasters {
  message?: any;
  Price_Number_ID?: number;
  Price_Number_Description: string;
  Price_Number_Value?: number;
  createdAt?:Date;
  ipAddres?: string;
  status?:string;
  updatedAt?:Date;
}


