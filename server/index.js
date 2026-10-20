import 'dotenv/config';
import express from 'express';
import { prisma } from './db.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/api/health', (req, res) => {
    res.json({message: 'hello'});
});

app.get('/api/recipes', async (req, res) => {
    const recipes = await prisma.recipe.findMany();
    res.json(recipes)
})

app.get('/api/recipes/:id', async (req, res) => {
    const recipe = await prisma.recipe.findUnique({
        where: { id: Number(req.params.id) }
    })

    if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found'});
    }
    
    res.json(recipe);
})

app.post('/api/recipes', async (req, res) => {
    const recipe = await prisma.recipe.create({ data: req.body });
    res.status(201).json(recipe)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});