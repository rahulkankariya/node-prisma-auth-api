import { prisma } from '../config/db';

// Find user by email
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// Create a new user
export const createUser = async (name: string, email: string, password: string) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};

// Verify OTP for a user
export const verifyOTP = async (userId: number, code: string) => {
  const otp = await prisma.oTP.findFirst({
    where: {
      userId,
      code,
      used: false,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!otp) return null;

  // Mark OTP as used
  await prisma.oTP.update({
    where: { id: otp.id },
    data: { used: true },
  });

  return otp;
};

// Create OTP for a user
export const createOTP = async (userId: number, code: string) => {
  return prisma.oTP.upsert({
    where: { userId_type: { userId, type: 'EMAIL' } }, // assumes @@unique([userId, type]) in Prisma model
    update: {
      code,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      used:false
      // 5 minutes from now
    },
    create: {
      userId,
      code,
      type: 'EMAIL',
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });
};


// Update user password
export const updateUserPassword = async (userId: number, hashedPassword: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
};