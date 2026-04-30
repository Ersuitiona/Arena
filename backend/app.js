const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://santhanu:<db_password>@arena.ufpvwcn.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());

// Models
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['admin', 'club'], default: 'club' },
  clubName: String,
  clubLogo: String,
  balance: { type: Number, default: 1500000000 }, // 150 Cr
  slots: { type: Number, default: 0 },
});
const User = mongoose.model('User', UserSchema);

// Authentication routes
app.post('/api/register', async (req, res) => {
  const { username, password, clubName } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ msg: 'Username taken' });
  const newUser = new User({ username, password, role: 'club', clubName });
  await newUser.save();
  res.json({ msg: 'Club registered' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }
  res.json({ msg: 'Login successful', role: user.role, userId: user._id });
});

// Example protected route (e.g., get club info)
app.get('/api/club/:id', async (req, res) => {
  const club = await User.findById(req.params.id);
  res.json(club);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
