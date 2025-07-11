import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type {
  User,
  Broker,
  Konto,
  Position,
  AuthRequest,
  AuthResponse,
  RegisterRequest,
  CreateBrokerRequest,
  CreateKontoRequest,
  CreatePositionRequest
} from '../types/api';

/**
 * API Service Class
 * Centralized HTTP client for all API communications
 * Handles authentication, error handling, and request/response interceptors
 */
class ApiService {
  private api: AxiosInstance;
  private authToken: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:4000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   * Handles automatic token injection and 401 error redirects
   */
  private setupInterceptors(): void {
    // Request interceptor: Add Authorization header automatically
    this.api.interceptors.request.use((config) => {
      const token = this.authToken || localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor: Handle authentication errors globally
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Clear invalid token and redirect to login
          this.clearAuthToken();
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Set authentication token for API requests
   * @param token - JWT token for authentication
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Clear authentication token
   * Removes token from memory and localStorage
   */
  clearAuthToken(): void {
    this.authToken = null;
    localStorage.removeItem('token');
  }

  // ==========================
  // Authentication API Methods
  // ==========================

  /**
   * Authenticate user with email and password
   * @param credentials - User login credentials
   * @returns Promise with authentication response including user data and JWT token
   */
  async login(credentials: AuthRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  /**
   * Register new user account
   * @param userData - New user registration data
   * @returns Promise with authentication response including user data and JWT token
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/register', userData);
    return response.data;
  }

  // ====================
  // User API Methods
  // ====================

  /**
   * Get current user profile
   * @returns Promise with current user data
   */
  async getProfile(): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get('/user/profile');
    return response.data;
  }

  /**
   * Update user profile information
   * @param userData - Partial user data to update
   * @returns Promise with updated user data
   */
  async updateProfile(userData: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.api.put('/user/profile', userData);
    return response.data;
  }

  /**
   * Delete user account
   * @returns Promise indicating the completion of the account deletion
   */
  async deleteAccount(): Promise<void> {
    await this.api.delete('/user/profile');
  }

  // ==================
  // Broker API Methods
  // ==================

  /**
   * Get list of all brokers
   * @returns Promise with an array of brokers
   */
  async getBrokers(): Promise<Broker[]> {
    const response: AxiosResponse<Broker[]> = await this.api.get('/brokers');
    return response.data;
  }

  /**
   * Get detailed information about a specific broker
   * @param id - Broker ID
   * @returns Promise with broker data
   */
  async getBroker(id: number): Promise<Broker> {
    const response: AxiosResponse<Broker> = await this.api.get(`/brokers/${id}`);
    return response.data;
  }

  /**
   * Create a new broker
   * @param brokerData - Data for the new broker
   * @returns Promise with the created broker data
   */
  async createBroker(brokerData: CreateBrokerRequest): Promise<Broker> {
    const response: AxiosResponse<Broker> = await this.api.post('/brokers', brokerData);
    return response.data;
  }

  /**
   * Update existing broker information
   * @param id - Broker ID
   * @param brokerData - Partial data to update the broker
   * @returns Promise with the updated broker data
   */
  async updateBroker(id: number, brokerData: Partial<CreateBrokerRequest>): Promise<Broker> {
    const response: AxiosResponse<Broker> = await this.api.put(`/brokers/${id}`, brokerData);
    return response.data;
  }

  /**
   * Delete a broker
   * @param id - Broker ID
   * @returns Promise indicating the completion of the broker deletion
   */
  async deleteBroker(id: number): Promise<void> {
    await this.api.delete(`/brokers/${id}`);
  }

  // =======================
  // Portfolio API Methods
  // =======================

  /**
   * Get list of all portfolios (Kontos)
   * @returns Promise with an array of portfolios
   */
  async getKontos(): Promise<Konto[]> {
    const response: AxiosResponse<Konto[]> = await this.api.get('/portfolio');
    return response.data;
  }

  /**
   * Get detailed information about a specific portfolio (Konto)
   * @param id - Portfolio ID
   * @returns Promise with portfolio data
   */
  async getKonto(id: number): Promise<Konto> {
    const response: AxiosResponse<Konto> = await this.api.get(`/portfolio/${id}`);
    return response.data;
  }

  /**
   * Create a new portfolio (Konto)
   * @param kontoData - Data for the new portfolio
   * @returns Promise with the created portfolio data
   */
  async createKonto(kontoData: CreateKontoRequest): Promise<Konto> {
    const response: AxiosResponse<Konto> = await this.api.post('/portfolio', kontoData);
    return response.data;
  }

  /**
   * Update existing portfolio (Konto) information
   * @param id - Portfolio ID
   * @param kontoData - Partial data to update the portfolio
   * @returns Promise with the updated portfolio data
   */
  async updateKonto(id: number, kontoData: Partial<CreateKontoRequest>): Promise<Konto> {
    const response: AxiosResponse<Konto> = await this.api.put(`/portfolio/${id}`, kontoData);
    return response.data;
  }

  /**
   * Delete a portfolio (Konto)
   * @param id - Portfolio ID
   * @returns Promise indicating the completion of the portfolio deletion
   */
  async deleteKonto(id: number): Promise<void> {
    await this.api.delete(`/portfolio/${id}`);
  }

  // ====================
  // Position API Methods
  // ====================

  /**
   * Get list of all positions
   * @returns Promise with an array of positions
   */
  async getPositions(): Promise<Position[]> {
    const response: AxiosResponse<Position[]> = await this.api.get('/positions');
    return response.data;
  }

  /**
   * Get detailed information about a specific position
   * @param id - Position ID
   * @returns Promise with position data
   */
  async getPosition(id: number): Promise<Position> {
    const response: AxiosResponse<Position> = await this.api.get(`/positions/${id}`);
    return response.data;
  }

  /**
   * Create a new position
   * @param positionData - Data for the new position
   * @returns Promise with the created position data
   */
  async createPosition(positionData: CreatePositionRequest): Promise<Position> {
    const response: AxiosResponse<Position> = await this.api.post('/positions', positionData);
    return response.data;
  }

  /**
   * Update existing position information
   * @param id - Position ID
   * @param positionData - Partial data to update the position
   * @returns Promise with the updated position data
   */
  async updatePosition(id: number, positionData: Partial<CreatePositionRequest>): Promise<Position> {
    const response: AxiosResponse<Position> = await this.api.put(`/positions/${id}`, positionData);
    return response.data;
  }

  /**
   * Delete a position
   * @param id - Position ID
   * @returns Promise indicating the completion of the position deletion
   */
  async deletePosition(id: number): Promise<void> {
    await this.api.delete(`/positions/${id}`);
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const apiService = new ApiService();
export default apiService;
