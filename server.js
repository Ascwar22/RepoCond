const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

//DEBUG: stampa le variabili ambiente
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY ? "✓ presente" : "✗ mancante");

// Inizializza Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// TEST: verifica connessione
app.get('/test', async (req, res) => {
  const { data, error } = await supabase.from('ToDo').select('*').limit(1);
  if (error) {
    console.error('Test errore:', error);
    return res.send('Errore nella connessione al DB');
  }
  res.send('Connesso correttamente a Supabase!');
});

// Form handler per inserire un nuovo "Da_fare"
app.post('/invia', async (req, res) => {
  const { Da_fare } = req.body;

  const { data, error } = await supabase
    .from('ToDo')
    .insert([{ Da_fare }]); // Assumiamo che la colonna si chiami esattamente Da_fare

  if (error) {
    console.error('Errore Supabase:', error);
    return res.status(500).send('Errore nel salvataggio.');
  }

  console.log('Dati salvati con successo:', data);
  res.send('Dati salvati con successo!');
});

// Avvio server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
