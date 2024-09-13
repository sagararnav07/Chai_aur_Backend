# Project Overview

Link to the model: [Eraser Workspace](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share)

The **Video Model** and **User Model** in the above link are interconnected. Therefore, all media will be stored on a third-party service, and only a reference string will be stored in the database.

---

## 1. bcrypt: Secure Password Hashing

**bcrypt** is a popular library used for securely hashing and salting passwords in Node.js applications. It ensures that even if the database is compromised, attackers cannot easily retrieve the original passwords.

### Key Concepts:

- **Hashing**: Converts a password into a fixed-length string (hash) that is not reversible.
- **Salting**: Adds random data (a "salt") to the password before hashing to ensure that identical passwords do not result in identical hashes. This helps protect against dictionary and rainbow table attacks.

### How bcrypt Works:

1. **Salting**: bcrypt generates a salt and appends it to the password.
2. **Hashing**: The password + salt combination is hashed multiple times to produce the final hashed password.
3. **Comparison**: To validate a password, bcrypt compares the stored hashed password with a new hash of the provided password using the same salt.

### Common bcrypt Methods:

- `bcrypt.hash()`: Hashes a password with a salt.
- `bcrypt.compare()`: Compares a plain text password with a hashed password (used when a user logs in).

---

## 2. jsonwebtoken: JWT (JSON Web Token) Authentication

**jsonwebtoken (JWT)** is a library for generating, signing, and verifying tokens. It is commonly used for authentication and authorization in web applications. JWT tokens are secure and **stateless**, meaning they don’t require server-side sessions.

### Key Concepts:

- **JWT Structure**: A JWT consists of three parts:
  1. **Header**: Contains metadata like the token type and hashing algorithm.
  2. **Payload**: Contains actual data (claims) such as the user’s ID or roles.
  3. **Signature**: A cryptographic signature verifying the token has not been tampered with.

### How JWT Works:

1. **Token Generation**: When a user logs in, a JWT is created containing user information (payload) and is signed using a secret key.
2. **Token Usage**: The JWT is sent to the client (usually stored in local storage or cookies) and included in the `Authorization` header for subsequent requests.
3. **Token Verification**: The server verifies the JWT's signature to ensure validity. If valid, it extracts the payload (e.g., user ID) to authorize access to resources.

### Common jsonwebtoken Methods:

- `jwt.sign()`: Generates a new token.
- `jwt.verify()`: Verifies the token’s validity and extracts its payload.

### JWT Advantages:

- **Stateless**: No need for server-side sessions, as the token is self-contained.
- **Efficient**: JWTs are compact, making them ideal for use in HTTP headers.
- **Secure**: Signed and optionally encrypted, preventing tampering and ensuring data integrity.

### JWT in Authentication Flow:

1. **Login**: The user logs in and gets a JWT containing user data.
2. **Store JWT**: The client stores the JWT (in local storage or cookies).
3. **Send JWT**: The client sends the token in the `Authorization` header of each request.
4. **Verify JWT**: The server verifies the JWT and grants access to protected resources.

---

This markdown document explains the interconnected models, storage strategy, and important libraries like **bcrypt** and **jsonwebtoken** for securing your application.
