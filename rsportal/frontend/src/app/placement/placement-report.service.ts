import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PlacementReportRequest {
  name: string;
  email: string;
  phone: string;
  program: string;
  graduation_year: number;
  company: string;
}

@Injectable({ providedIn: 'root' })
export class PlacementReportService {
  private readonly apiUrl = 'http://localhost:8000/api/placement-report-requests/';

  constructor(private readonly http: HttpClient) {}

  requestReport(request: PlacementReportRequest): Observable<PlacementReportRequest> {
    return this.http.post<PlacementReportRequest>(this.apiUrl, request);
  }
}
