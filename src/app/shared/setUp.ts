import User from '../models/user';

export const setUpUser = (): User => {
  return {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
    emailVerified: false,
  };
};
