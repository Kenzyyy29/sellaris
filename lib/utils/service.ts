import {
 addDoc,
 collection,
 doc,
 getDoc,
 getDocs,
 getFirestore,
 query,
 updateDoc,
 where,
} from "firebase/firestore";
import {app} from "@/lib/firebase/init";
import bcrypt from "bcryptjs";
import {sendVerificationEmail} from "@/lib/actions/email";

const firestore = getFirestore(app);

// Define proper types
interface BaseDocument {
 id: string;
 createdAt?: Date;
 updatedAt?: Date;
 [key: string]: unknown; // For other dynamic properties
}

interface UserDocument extends BaseDocument {
 fullname: string;
 email: string;
 phone: string;
 password: string;
 role: string;
 verified: boolean;
 otp?: string;
 otpExpiry?: Date;
}

export async function retrieveUsers(): Promise<UserDocument[]> {
 const snapshot = await getDocs(collection(firestore, "users"));
 return snapshot.docs.map((doc) => {
  const data = doc.data();
  return {
   id: doc.id,
   fullname: data.fullname,
   email: data.email,
   phone: data.phone,
   password: data.password,
   role: data.role,
   verified: data.verified,
   otp: data.otp,
   otpExpiry: data.otpExpiry?.toDate(),
   createdAt: data.createdAt?.toDate(),
   updatedAt: data.updatedAt?.toDate(),
  } as UserDocument;
 });
}

export async function retrieveData(
 collectionName: string
): Promise<BaseDocument[]> {
 const snapshot = await getDocs(collection(firestore, collectionName));
 return snapshot.docs.map((doc) => {
  const data = doc.data();
  const result: BaseDocument = {
   id: doc.id,
   ...data,
  };

  // Convert Firestore Timestamps to Date objects
  if (data.createdAt) {
   result.createdAt = data.createdAt.toDate();
  }
  if (data.updatedAt) {
   result.updatedAt = data.updatedAt.toDate();
  }
  if (data.otpExpiry) {
   result.otpExpiry = data.otpExpiry.toDate();
  }

  return result;
 });
}

export async function retrieveDataById(
 collectionName: string,
 id: string
): Promise<BaseDocument | undefined> {
 const snapshot = await getDoc(doc(firestore, collectionName, id));
 return snapshot.data() as BaseDocument | undefined;
}

export async function register(data: {
 fullname: string;
 email: string;
 phone: string;
 password: string;
}): Promise<{
 status: boolean;
 statusCode: number;
 message: string;
 userId?: string;
}> {
 const q = query(
  collection(firestore, "users"),
  where("email", "==", data.email)
 );
 const snapshot = await getDocs(q);

 if (!snapshot.empty) {
  return {
   status: false,
   statusCode: 400,
   message: "Email already exists",
  };
 }

 data.password = await bcrypt.hash(data.password, 10);
 const otp = Math.floor(100000 + Math.random() * 900000).toString();

 try {
  const userRef = await addDoc(collection(firestore, "users"), {
   ...data,
   role: "member",
   verified: false,
   otp,
   otpExpiry: new Date(Date.now() + 15 * 60 * 1000),
   createdAt: new Date(),
   updatedAt: new Date(),
  });

  await sendVerificationEmail(data.email, otp, data.fullname);
  return {
   status: true,
   statusCode: 200,
   message: "Verification email sent",
   userId: userRef.id,
  };
 } catch (error) {
  console.error("Registration error:", error);
  return {
   status: false,
   statusCode: 400,
   message: "Registration failed",
  };
 }
}

export async function verifyOTP(
 email: string,
 otp: string
): Promise<{
 status: boolean;
 message: string;
 user?: {
  id: string;
  email: string;
  fullname: string;
  role: string;
 };
}> {
 try {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
   return {status: false, message: "User not found or OTP expired"};
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data() as UserDocument;

  if (userData.otp !== otp) {
   return {status: false, message: "Invalid OTP"};
  }

  await updateDoc(userDoc.ref, {
   verified: true,
   otp: null,
   otpExpiry: null,
   updatedAt: new Date(),
  });

  return {
   status: true,
   message: "Verification successful",
   user: {
    id: userDoc.id,
    email: userData.email,
    fullname: userData.fullname,
    role: userData.role,
   },
  };
 } catch (error) {
  console.error("Verification error:", error);
  return {status: false, message: "Verification failed"};
 }
}

export async function login({email}: {email: string}) {
 const q = query(collection(firestore, "users"), where("email", "==", email));
 const snapshot = await getDocs(q);

 if (snapshot.empty) return null;

 const doc = snapshot.docs[0];
 const data = doc.data();

 return {
  id: doc.id,
  email: data.email,
  fullname: data.fullname,
  role: data.role,
  password: data.password,
  verified: data.verified,
 };
}