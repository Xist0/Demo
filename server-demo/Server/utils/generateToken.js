import jwt from "jsonwebtoken";

export const generateAccesToken = (id, role, name) => {
    const payload = {
        id,
        role,
        name
    }

    return jwt.sign(payload, 'ебатьсекретики', { expiresIn: '12h' })
}