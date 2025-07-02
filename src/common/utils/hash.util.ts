import bcrypt from 'bcrypt';

/**
 * Hash a password safely, explicitly typed to satisfy TypeScript + ESLint.
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(
  plainText: string,
  hashed: string,
): Promise<boolean> {
  return await bcrypt.compare(plainText, hashed);
}
