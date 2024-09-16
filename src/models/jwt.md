A JWT (JSON Web Token) consists of **three parts**:

1. **Header**
2. **Payload**
3. **Signature**

Each part is **Base64Url-encoded** and separated by a period (`.`). Here's a breakdown of each part:

---

### 1. **Header**

The **header** typically consists of two parts:
- **`alg`**: The algorithm used to sign the token (e.g., HMAC SHA256, RSA).
- **`typ`**: The token type, which is usually `"JWT"`.

#### Example:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Once encoded, this might look like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

---

### 2. **Payload**

The **payload** contains the **claims**, which are pieces of information (or data) about the user or entity that the token is about. There are three types of claims:
- **Registered claims**: Predefined claims like `iss` (issuer), `exp` (expiration time), `sub` (subject), and `aud` (audience).
- **Public claims**: Custom claims defined by the user (e.g., `userId`, `email`).
- **Private claims**: Custom claims agreed upon by both the issuer and the consumer.

#### Example Payload:
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
```
- `sub`: Subject of the token, often the user ID.
- `name`: Custom claim containing the user's name.
- `admin`: Another custom claim indicating user privileges.
- `iat`: Issued At time (in Unix timestamp).

Encoded, this could look like:
```
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0
```

---

### 3. **Signature**

The **signature** is used to verify the token’s integrity and ensure that it hasn't been tampered with. It is created by combining:
- The encoded header
- The encoded payload
- A **secret** or a **private key** (depending on the algorithm)

The signature is created using the algorithm specified in the header, such as `HMAC SHA256` (HS256).

**Formula**:
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

#### Example Signature:
```
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

---

### Full Example of a JWT:

A complete JWT looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- **First part**: The header (`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)
- **Second part**: The payload (`eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0`)
- **Third part**: The signature (`SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`)

---

### JWT Token Flow:

1. **Token Creation**: The server creates the JWT using a secret key and sends it to the client after the user logs in.
2. **Client Storage**: The client stores the token (often in localStorage, sessionStorage, or cookies).
3. **Token Usage**: For each subsequent request, the client sends the JWT (usually in the `Authorization` header).
4. **Token Verification**: The server verifies the token's signature using the secret key to authenticate the user or entity.

### Key Characteristics:
- **Stateless**: JWTs contain all the information the server needs to verify the user (no session storage needed).
- **Self-contained**: JWTs contain both the claims and signature, making them easy to transport between client and server.
- **Secure**: The signature ensures the token hasn’t been tampered with, though it’s important to keep the signing secret or private key safe.

-------------------------------------------------------------------------------------------------
## Sample 

//access_token_secret is same as refresh_token_secret but the expiry duration is different

ACCESS_TOKEN_SECRET = 769a8f1e0cbfbe345567cf9e8ef907b2c1426347d8e7ad4a82ab6892f9205dfc518462935f3bc4af48a5d257d5eb9e2a90a042fdb79e10e9c31ebcf5641b1d4b

ACCESS_TOKEN_EXPIRY = 1d

REFRESH_TOKEN_SECRET = b61413f6dafe038be8a4821633cfa4f9089ac5e724343dbd8f8f95e3fc4421f68c889ac86fe582cd8e3a8191a7453798aa61a8e48511ff693afe28407c46f10d

REFRESH_TOKEN_EXPIRY = 10d 
