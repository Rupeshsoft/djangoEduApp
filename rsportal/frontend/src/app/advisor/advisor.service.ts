import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AdvisorInquiry {
  name: string;
  email: string;
  phone: string;
  job_title: string;
  program: string;
  graduation_year: number;
  company: string;
}

@Injectable({ providedIn: 'root' })
export class AdvisorService {
  private readonly apiUrl = 'http://localhost:8000/api/advisor-inquiries/';

  constructor(private readonly http: HttpClient) {}

  requestCall(inquiry: AdvisorInquiry): Observable<AdvisorInquiry> {
    return this.http.post<AdvisorInquiry>(this.apiUrl, inquiry);
  }
}
