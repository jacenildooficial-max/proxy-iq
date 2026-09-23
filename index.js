const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); 
app.use(express.json());

const IQ_OPTION_API = 'https://iqoption.com'; 

app.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${IQ_OPTION_API}/v1.0/login`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Erro no proxy' });
    }
});

app.post('/buy', async (req, res) => {
    try {
        const response = await axios.post(`${IQ_OPTION_API}/v1.0/buy`, req.body, {
            headers: { 'Authorization': req.headers['authorization'] }
        });
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: 'Erro no proxy' });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Proxy rodando com sucesso!');
});
