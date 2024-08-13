import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/search-linkedin', (req, res) => {
  const { profile } = req.body;

  // Simulated search results with realistic profile picture URLs
  const simulatedResults = [
    {
      id: "1",
      name: "John Doe",
      title: "Software Engineer at Tech Co",
      profileUrl: "https://www.linkedin.com/in/johndoe",
      profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      title: "Product Manager at Startup Inc",
      profileUrl: "https://www.linkedin.com/in/janesmith",
      profileImageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      name: "Bob Johnson",
      title: "Data Scientist at AI Solutions",
      profileUrl: "https://www.linkedin.com/in/bobjohnson",
      profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "4",
      name: "Alice Williams",
      title: "UX Designer at Design Studio",
      profileUrl: "https://www.linkedin.com/in/alicewilliams",
      profileImageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: "5",
      name: "Charlie Brown",
      title: "Marketing Manager at Brand Co",
      profileUrl: "https://www.linkedin.com/in/charliebrown",
      profileImageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];

  // Simulate a delay to mimic API call
  setTimeout(() => {
    res.json(simulatedResults);
  }, 1000);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});