import Aluno from "../models/AlunoModel.js";
import Instrutor from '../models/Instrutor.js';
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const login = async (req, res, next) => {
try {
const aluno = await Aluno.findOne({ email: req.body.email });
if (!aluno) { return next(createError(404, "Aluno não encontrado."));
}
const senhaValida =
await bcrypt.compare(req.body.senha, aluno.senha);
if (!senhaValida) { return next(createError(401, "Senha inválida."))
}
const { senha, ...dados } = aluno._doc;
const accessToken = jwt.sign({ id: aluno._id, admin: aluno.ativo },
process.env.JWT_SECRET, { expiresIn: "1h" });
res.cookie("accessToken", accessToken,
{ httpOnly: true }).status(200).json(dados);
} catch (error) {
next(error);
}
};

export const loginInstrutor = async (req, res, next) => {
    try {
        const instrutor = await Instrutor.findOne({ email: req.body.email });
        if (!instrutor) {
            return next(createError(404, 'Instrutor não encontrado.'));
        }
        const senhaValida = await bcrypt.compare(req.body.senha, instrutor.senha);
        if (!senhaValida) {
            return next(createError(401, 'Senha inválida.'));
        }
        const { senha, ...dados } = instrutor._doc;
        const accessToken = jwt.sign(
            { id: instrutor._id, admin: instrutor.ativo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
        );
        res.cookie(
            'accessToken',
            accessToken,
            { httpOnly: true },
        ).status(200).json(dados);

        res.status(200).json(dados);
    } catch (error) {
        next(error);
    }
};
