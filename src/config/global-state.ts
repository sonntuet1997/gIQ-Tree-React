import nameof from 'ts-nameof.macro';
import {User} from 'models/User';

export interface GlobalState {
  language: string;

  accessToken: string | null;

  refreshToken: string | null;

  user?: User;
}

const initialGlobalState: GlobalState = {
  language: 'en',
  accessToken: localStorage.getItem(nameof((this as any).accessToken)),
  refreshToken: localStorage.getItem(nameof((this as any).refreshToken)),
  user: undefined,
};

export default initialGlobalState;
