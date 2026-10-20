import 'dotenv/config';
import express from 'express';
import { prisma } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
    res.json({message: 'hello'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});

app.get('/api/recipes', async (req, res) => {
    const recipes = await prisma.recipe.findMany();
    res.json(recipes)
})