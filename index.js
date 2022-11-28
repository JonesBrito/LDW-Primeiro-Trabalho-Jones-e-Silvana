import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import routeAuth from "./routes/authRoutes.js";
import connectDatabase from "./config/db.js";
import routeAlunos from "./routes/routesAlunos.js";
import routeGrupoMusuculares from "./routes/routesGrupoMusuculares.js";
import routeTipoExercicio from "./routes/routesTipoExercicio.js";
import routeExercicio from "./routes/routesExercicio.js";
import routeInstrutor from "./routes/routesInstrutor.js";
import routeFicha from "./routes/routesFicha.js";
import { verificarToken } from './utils/verificarToken.js';
import { errorHandling } from "./utils/error.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandling);
app.use(cookieParser());

app.use("/api/auth", routeAuth);
app.use("/api/alunos", verificarToken, routeAlunos);
app.use("/api/instrutores", verificarToken, routeInstrutor);
app.use("/api/fichas", verificarToken, routeFicha);
app.use("/api/gruposmusculares", verificarToken, routeGrupoMusuculares);
app.use("/api/tiposexercicios", verificarToken, routeTipoExercicio);
app.use("/api/exercicio", verificarToken, routeExercicio);


app.listen(8080, () => {
    connectDatabase();
    console.log("Servidor rodando na porta 8080.");
});