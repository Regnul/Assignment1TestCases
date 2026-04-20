const express = require('express');
const app = express();
app.use(express.json());

// 1. IDENTITY (AUTH)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "test@game.com" && password === "password123") {
    return res.status(200).send({ message: "Login Successful" });
  } 
  if (email === "nobody@game.com") {
    return res.status(404).send({ error: "User does not exist" });
  }
  if (!email || email === "") {
    return res.status(400).send({ error: "Email is required" });
  }
  res.status(401).send({ error: "Invalid credentials" });
});

// 2. SESSION (PROFILES)
app.get('/profile/:id', (req, res) => {
  if (req.params.id === "1") {
    return res.json({ id: 1, name: "Warrior_Slot", x: 0, y: 0, z: 0 });
  }
  if (req.params.id === "99") {
    return res.status(404).send({ error: "Profile index out of bounds" });
  }
  if (isNaN(req.params.id)) {
    return res.status(400).send({ error: "Invalid Profile ID format" });
  }
  res.status(404).send({ error: "Not Found" });
});

// 3. ACTIVE STATE (MOVEMENT & COLLISION)
app.post('/move', (req, res) => {
  const { x, y, z } = req.body;
  
  /**
   * OBJECT COLLISION LOGIC:
   * We assume a static object (e.g., a pillar) exists at coordinate (50, 50).
   * Two tests are required to validate this interaction:
   * 1. Direct Collision: Ensures the object occupies space and blocks movement (403).
   * 2. Adjacent Success: Ensures the collision box is precise and does not prevent 
   * movement in valid space immediately surrounding the object (200).
   */
  if (x === 50 && y === 50) {
    return res.status(403).send({ error: "Collision Detected: Static Object" });
  }

  if (x === 150) {
    return res.status(400).send({ error: "Out of bounds" });
  }
  if (z === 5) {
    return res.json({ x: 10, y: 10, z: 4, status: "Valid move (Gravity Applied)" });
  }
  if (x === 0 && y === 0 && z === 0) {
    return res.json({ x: 0, y: 0, z: 0, status: "At Map Origin" });
  }
  if (z === 0) {
    return res.json({ x, y, z: 0, status: "Grounded (No Gravity)" });
  }

  res.json({ x, y, z, status: "Valid move" });
});

app.listen(3000, () => console.log('Mock RPG API running on port 3000'));