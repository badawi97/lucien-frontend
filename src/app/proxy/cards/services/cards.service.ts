import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../api-url';
import { FileResultDto, buildHttpParams } from '../../shared';
import { CardDto, CreateCardDto, UpdateCardDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly apiUrl = `${API_BASE_URL}/Cards`;

  constructor(private readonly http: HttpClient) {}

  getList(): Observable<CardDto[]> {
    return this.http.get<CardDto[]>(this.apiUrl);
  }

  getById(id: string): Observable<CardDto> {
    return this.http.get<CardDto>(`${this.apiUrl}/${id}`);
  }

  create(input: CreateCardDto): Observable<CardDto> {
    return this.http.post<CardDto>(this.apiUrl, input);
  }

  update(id: string, input: UpdateCardDto): Observable<CardDto> {
    return this.http.put<CardDto>(`${this.apiUrl}/${id}`, input);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  export(format = 'csv'): Observable<FileResultDto> {
    return this.http.get<FileResultDto>(`${this.apiUrl}/export`, {
      params: buildHttpParams({ format }),
    });
  }

  import(file: File): Observable<CardDto> {
    return this.http.post<CardDto>(`${this.apiUrl}/import`, this.createFileFormData(file));
  }

  importFromQrCode(file: File): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/import/qr`, this.createFileFormData(file));
  }

  private createFileFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }
}

