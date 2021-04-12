import { Injectable } from '@angular/core';
import { JUser } from '@trungk18/interface/user';
import { FeatureStore } from 'mini-rx-store';

export interface AuthState extends JUser {
  token: string;
  isLoading: boolean;
  error: string;
}

export function createInitialAuthState(): AuthState {
  return { token: `${new Date().getTime()}` } as AuthState;
}

@Injectable({ providedIn: 'root' })
export class AuthStore extends FeatureStore<AuthState> {
  constructor() {
    super('auth', createInitialAuthState());
  }

  setLoading(isLoading: boolean) {
    this.setState({isLoading});
  }

  setError(error: string) {
    this.setState({error});
  }
}
