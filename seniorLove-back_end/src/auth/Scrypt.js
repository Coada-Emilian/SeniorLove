// Purpose: Hash and compare passwords with scrypt.

// Import
import { scryptSync, timingSafeEqual, randomBytes } from 'node:crypto';

export class Scrypt {
  static hash(password) {
    // Salt creation : 16 bytes recommended
    const salt = randomBytes(16).toString('hex');
    // Doc <https://nodejs.org/api/buffer.html>
    // The settings recommended by OWASP do work out to a rather high maxmem:
    // Use scrypt with a minimum CPU/memory cost parameter of (2^17)
    // a minimum block size of 8 (1024 bytes), and a parallelization parameter of 1"
    // That works out to 134220800, around 134MB.
    // We use 64 bytes because we want a 512 bit hash
    const buf = scryptSync(password, salt, 64, {
      N: 131072,
      maxmem: 134220800,
    });
    // We convert the Buffer to a hex string and concatenate the string obtained (the hash) and the salt
    // That's what we put in the database.
    return `${buf.toString('hex')}.${salt}`;
  }

  // Compare the password received from the req.body with the hash in the database
  static compare(plainTextpassword, hash) {
    // split() returns an array that we destructure to get the hash and the salt
    const [hashedPassword, salt] = hash.split('.');
    // We create a buffer: a kind of character array that the scrypt algorithm can analyze
    const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');

    // We hash the password received from the req.body with the salt of the password we have in the database
    // The settings recommended by OWASP do work out to a rather high maxmem:
    // Use scrypt with a minimum CPU/memory cost parameter of (2^17)
    // a minimum block size of 8 (1024 bytes), and a parallelization parameter of 1"
    // That works out to 134220800, around 134MB.
    const clearPasswordBuffer = scryptSync(plainTextpassword, salt, 64, {
      N: 131072,
      maxmem: 134220800,
    });
    // We compare the two passwords with timingSafeEqual (see the doc, link above)
    return timingSafeEqual(hashedPasswordBuf, clearPasswordBuffer);
  }
}
