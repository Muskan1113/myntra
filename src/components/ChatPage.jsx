import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Badge
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Mock Data
const mockItems = [
  { name: 'Item 1', price: 10, imageUrl: "images/1531.jpg" },
  { name: 'Item 2', price: 20, imageUrl: "images/1532.jpg" },
  { name: 'Item 3', price: 30, imageUrl: "images/1534.jpg" },
  { name: 'Item 4', price: 40, imageUrl: "images/1531.jpg" },
  { name: 'Item 5', price: 50, imageUrl: "images/1531.jpg" },
];

const mockSubmissions = [
  {
    user: 'User1',
    details: 'Great collection of items!',
    entries: [
      mockItems[0], // Item 1
      mockItems[1], // Item 2
    ],
  },
  {
    user: 'User2',
    details: 'I love these items!',
    entries: [
      mockItems[2], // Item 3
      mockItems[3], // Item 4
    ],
  },
  {
    user: 'User3',
    details: 'This is a fantastic selection!',
    entries: [
      mockItems[1], // Item 2
      mockItems[4], // Item 5
    ],
  },
  {
    user: 'User4',
    details: 'Awesome items to choose from!',
    entries: [
      mockItems[0], // Item 1
      mockItems[2], // Item 3
      mockItems[4], // Item 5
    ],
  },
];

const ChatPage = ({ items }) => {
  const [contestStarted, setContestStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [entries, setEntries] = useState([]);
  const [entryDetails, setEntryDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [likes, setLikes] = useState(() => {
    // Initialize likes state
    const initialLikes = {};
    mockSubmissions.forEach((submission, index) => {
      initialLikes[`User${index + 1}`] = Array(submission.entries.length).fill(15);
    });
    return initialLikes;
  });

  // Function to start the contest
  const startContest = () => {
    setContestStarted(true);
    setTimeRemaining(5 * 60); // Set timer to 5 minutes (300 seconds)
  };

  // Function to handle entry selection
  const handleEntrySelect = (item) => {
    setEntries((prevEntries) => [...prevEntries, item]);
  };

  // Function to handle entry submission
  const submitEntry = () => {
    if (entries.length === 0) {
      alert('Please add at least one entry.');
      return;
    }

    const newSubmission = {
      user: `User${submissions.length + 1}`, // Simulating a unique user ID
      details: entryDetails,
      entries: [...entries], // Store a copy of the entries array
    };

    setSubmissions((prevSubmissions) => [...prevSubmissions, newSubmission]);
    setLikes((prevLikes) => ({
      ...prevLikes,
      [`User${submissions.length + 1}`]: Array(entries.length).fill(0), // Initialize likes for this submission
    }));
    setSubmitted(true);
    setEntries([]); // Clear selected entries
    setEntryDetails(''); // Clear entry details
  };

  // Function to handle liking an entry
  const handleLike = (userIndex, itemIndex) => {
    const userKey = `User${userIndex + 1}`;
    setLikes((prevLikes) => {
      const newLikes = { ...prevLikes };
      // Ensure that the user and itemIndex exist
      if (newLikes[userKey] && newLikes[userKey][itemIndex] !== undefined) {
        newLikes[userKey][itemIndex] += 1; // Increment like count
      }
      return newLikes;
    });
  };

  useEffect(() => {
    let interval;
    if (contestStarted) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval); // Stop the timer when it reaches 0
            setContestStarted(false); // End the contest
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [contestStarted]);

  // Convert timeRemaining in seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {!contestStarted && !submitted ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Contest
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={startContest}
              sx={{ mb: 2 }}
            >
              Start Contest
            </Button>
          </Box>
        ) : submitted ? (
          <>
            <Typography variant="h5" gutterBottom>
              Submissions
            </Typography>
            <Box
              sx={{
                maxHeight: '400px', // Set a fixed height for the submissions container
                overflowY: 'auto', // Enable vertical scrolling
                mb: 2,
              }}
            >
              <List>
                {submissions.map((submission, userIndex) => (
                  <React.Fragment key={userIndex}>
                    <ListItem>
                      <ListItemText
                        primary={`User: ${submission.user}`}
                        secondary={
                          <Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                              {submission.entries.map((item, itemIndex) => (
                                <Card key={itemIndex} sx={{ maxWidth: 60, maxHeight: 60 }}>
                                  <CardMedia
                                    component="img"
                                    alt={item.name}
                                    height="60"
                                    image={item.imageUrl}
                                    sx={{ objectFit: 'contain' }}
                                  />
                                  <CardContent>
                                    <IconButton
                                      onClick={() => handleLike(userIndex, itemIndex)}
                                      sx={{ position: 'absolute', top: 5, right: 5 }}
                                    >
                                      <Badge badgeContent={likes[`User${userIndex + 1}`]?.[itemIndex] || 0} color="secondary">
                                        <FavoriteIcon color="error" />
                                      </Badge>
                                    </IconButton>
                                  </CardContent>
                                </Card>
                              ))}
                            </Box>
                            <Typography variant="body2">Details: {submission.details}</Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Contest Ongoing
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              Time Remaining: {formatTime(timeRemaining)}
            </Typography>
            <Box sx={{ maxHeight: '300px', overflowY: 'auto', mb: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
                {items.map((item, index) => (
                  <Card key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      alt={item.name}
                      height="140"
                      image={item.imageUrl}
                      sx={{ objectFit: 'contain' }}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body1">${item.price}</Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEntrySelect(item)}
                        sx={{ mt: 1 }}
                      >
                        Add to Entries
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
            <TextField
              label="Additional Details (optional)"
              multiline
              rows={4}
              value={entryDetails}
              onChange={(e) => setEntryDetails(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={submitEntry}
              disabled={timeRemaining <= 0 || entries.length === 0}
              sx={{ mb: 2 }}
            >
              Submit Entry
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ChatPage;
