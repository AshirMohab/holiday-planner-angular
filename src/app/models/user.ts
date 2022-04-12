// export default interface User {
//   uid: string;
//   displayName?: string;
//   name?: string;
//   surname?: string;
//   email?: string;
//   password?: string;
// }

export default interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
