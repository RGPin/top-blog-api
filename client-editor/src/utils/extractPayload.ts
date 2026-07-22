type TokenPayload = {
  userId: number;
};

export const extractPayload = (token: string): TokenPayload | null => {
  try {
    // 1. Split the token and get the payload (index 1)
    const payloadBase64Url = token.split(".")[1];

    // 2. Convert Base64Url to standard Base64
    const payloadBase64 = payloadBase64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    // 3. Decode the Base64 string
    const decodedString = atob(payloadBase64);

    // 4. Parse the JSON
    return JSON.parse(decodedString) as TokenPayload;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};
