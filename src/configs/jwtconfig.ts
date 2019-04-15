export const jwtconfig = {
    algorithm: process.env.JWT_ALGORITHM || "RS256",
    publicKey:
        process.env.JWT_PUBLIC_KEY ||
        `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJni92kdfGk0qQSohBnUGWZNN4
g/Rb3M+wlxTHkK8M2TxDsU2l/PlzsMgIa/jMqjG8nAcoZ3cG4LoYInQYIlZGRLV/
e8zL6ntUg1TCKX8qQ4lCn8K6rgTRFqZl9m6zoLvOB7lVgq+uVnI/m80AUqdDmht0
P7fEAvLZlPl7Fm7fIQIDAQAB
-----END PUBLIC KEY-----`,
};
