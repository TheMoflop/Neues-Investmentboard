// API Typen basierend auf dem Backend-Schema

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Broker {
  id: number;
  name: string;
  apiUrl?: string;
  apiKey?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Konto {
  id: number;
  name: string;
  kontoTyp: 'DEPOT' | 'VERRECHNUNGSKONTO' | 'SPARKONTO';
  saldo: number;
  waehrung: string;
  brokerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: number;
  symbol: string;
  name: string;
  anzahl: number;
  kaufpreis: number;
  aktuellerPreis: number;
  kontoId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaktion {
  id: number;
  typ: 'KAUF' | 'VERKAUF' | 'DIVIDENDE' | 'GEBUEHR';
  symbol?: string;
  anzahl?: number;
  preis?: number;
  betrag: number;
  waehrung: string;
  datum: string;
  kontoId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Alarm {
  id: number;
  symbol: string;
  bedingung: 'UEBER' | 'UNTER';
  zielpreis: number;
  aktiv: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface KIBewertung {
  id: number;
  symbol: string;
  empfehlung: 'KAUFEN' | 'HALTEN' | 'VERKAUFEN';
  vertrauen: number;
  begruendung: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// API Request/Response Typen
export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateBrokerRequest {
  name: string;
  apiUrl?: string;
  apiKey?: string;
}

export interface CreateKontoRequest {
  name: string;
  kontoTyp: 'DEPOT' | 'VERRECHNUNGSKONTO' | 'SPARKONTO';
  saldo: number;
  waehrung: string;
  brokerId: number;
}

export interface CreatePositionRequest {
  symbol: string;
  name: string;
  anzahl: number;
  kaufpreis: number;
  aktuellerPreis: number;
  kontoId: number;
}

export interface ApiError {
  message: string;
  status: number;
}
