import { db } from "../database/database.connection.js";

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const sessions = await db.collection("sessions").findOne({ token });
        if (!sessions) return res.sendStatus(401);
        res.locals = sessions.userId;
        console.log(sessions.userId)

        next();

    } catch (err) {
        res.status(500).send(err.message);
    }
}