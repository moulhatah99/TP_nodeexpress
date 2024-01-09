import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Bienvenue sur l\'API !' });
});

app.get('/json-data', async (req: Request, res: Response) => {
    const response1 = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response1.json();
  res.json(data);
});

app.get('/aggregator', async (req: Request, res: Response) => {
    try {
        const response1 = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data1 = await response1.json();
  
        const response2 = await fetch('https://jsonplaceholder.typicode.com/comments');
        const data2 = await response2.json();
  
        const aggregatedData = {
           posts: data1,
           comments: data2
        };
  
        res.json(aggregatedData);
     } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des données' });
     }
});

app.get('/mixed', (req: Request, res: Response) => {
  res.json({ mixedData: 'Données mixtes de différentes API' });
});

app.listen(port, () => {
  console.log(`serveur : http://localhost:${port}`);
});

