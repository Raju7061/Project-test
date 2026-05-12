const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    // =========================================================================
    // ELASTICSEARCH URL CONFIGURATION:
    // LOCAL TEST: 'http://localhost:9200/...' (Port-forwarding zaroori hai)
    // K8S DEPLOY: 'http://portfolio-elasticsearch:9200/...' (Internal Service name)
    // =========================================================================
    const ES_URL = 'http://localhost:9200/portfolio-db.public.contact_messages/_search';

    const response = await axios.post(ES_URL, {
      size: 50,
      // Sort key change: after.created_at use karein kyunki data nested hai
      sort: [{ "after.created_at": { order: "desc" } }], 
      query: { match_all: {} }
    });

    const hits = response.data.hits.hits;

    // Mapping logic: Debezium/Kafka data 'after' field ke andar hota hai
    const messages = hits.map(hit => {
      const source = hit._source;
      return {
        // Local aur K8s dono ke liye same logic:
        name: source.after ? source.after.name : (source.name || "N/A"),
        email: source.after ? source.after.email : (source.email || "N/A"),
        message: source.after ? source.after.message : (source.message || "No Message"),
        created_at: source.after ? source.after.created_at : (source.created_at || Date.now())
      };
    });

    res.json(messages);
  } catch (err) {
    console.error("ES Error:", err.message);
    res.status(500).json({ error: "Failed to fetch from Elasticsearch" });
  }
});

module.exports = router;