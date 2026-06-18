import { FileResultDto } from '../../shared';

export interface CardDto {
  id?: string;
  name?: string | null;
  gender?: number;
  dateOfBirth?: string;
  email?: string | null;
  phone?: string | null;
  photo?: string | null;
  address?: string | null;
}

export interface CreateCardDto {
  name?: string | null;
  gender?: number;
  dateOfBirth?: string;
  email?: string | null;
  phone?: string | null;
  photo?: string | null;
  address?: string | null;
}

export interface UpdateCardDto {
  name?: string | null;
  gender?: number;
  dateOfBirth?: string;
  email?: string | null;
  phone?: string | null;
  photo?: string | null;
  address?: string | null;
}

export type { FileResultDto };

