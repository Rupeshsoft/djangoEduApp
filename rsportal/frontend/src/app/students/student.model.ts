export interface EducationRecord {
  id?: number;
  education_type: 'SSC' | 'HSC' | 'GRADUATION';
  school_college_name: string;
  total_marks: number;
  gained_marks: number;
  total_cgpa?: number | null;
}

export interface Student {
  id?: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  education?: EducationRecord[];
  created_at?: string;
  updated_at?: string;
}

export interface StudentRegistrationPayload {
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  education: EducationRecord[];
}
