// export interface Users {
//     id: string;
//     firstName: string;
//     lastName: string;
//     password: string;
//     address: string;
//     avatar: string;
//     city: string;
//     country: string;
//     email: string;
//     createdAt: string;
//     postalCode: string;
//     role: string;
//     phone: string;
//     name: string;
//   }



interface Users {
  address: string; // Example: "1234 Elm Street, Springfield, USA"
  availableCredits: number; // Example: 630
  avatar: string; // Example: URL to avatar image
  createdAt: Date; // Example: Timestamp when user was created
  dob: string; // Example: "1995-05-15" (Date of Birth as string)
  email: string; // Example: "sadeem12@outlook.com"
  firstName: string; // Example: "Sadeem"
  lastName: string; // Example: "Asim"
  name: string; // Example: "Sadeem Asim"
  phoneNo: string; // Example: "+1 (921) 312-2321"
  profileLink: string; // Example: URL to user profile
  redeemedReferralCode: boolean; // Example: true
  referralCode: string; // Example: "IEGHIU"
  role: string; // Example: "user"
  timeZone: string; // Example: "Asia/Karachi"
}
