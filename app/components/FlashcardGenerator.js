"use client";
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const Container = styled('div')({
  display: 'flex',
  minHeight: '100vh',
  background: 'url(https://static.vecteezy.com/system/resources/previews/015/989/367/original/flash-card-icon-free-vector.jpg) no-repeat center center fixed',
  backgroundSize: 'cover',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  overflow: 'hidden',
});

const Content = styled('div')({
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  padding: '30px',
  maxWidth: '1000px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
});

const Title = styled('h1')({
  color: '#2c3e50',
  fontFamily: 'Roboto, sans-serif',
  marginBottom: '20px',
  letterSpacing: '2px',
  fontSize: '3rem',
  textAlign: 'center',
});

const Input = styled(TextField)({
  marginBottom: '20px',
  width: '100%',
  maxWidth: '500px',
  '& .MuiInputLabel-root': {
    color: '#2c3e50',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#2c3e50',
    },
    '&:hover fieldset': {
      borderColor: '#3498db',
    },
  },
  '& input': {
    color: '#2c3e50',
  },
});

const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '20px',
  marginBottom: '30px',
  width: '100%',
  justifyContent: 'center',
});

const FlashcardGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '15px',
  width: '100%',
  maxWidth: '1000px',
  marginTop: '20px',
});

const FlashcardWrapper = styled('div')({
  perspective: '1000px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
  },
});

const FlashcardInner = styled('div')(({ flipped }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '100%',
  transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  transformStyle: 'preserve-3d',
  transform: flipped ? 'rotateY(180deg)' : 'none',
}));

const FlashcardFace = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backfaceVisibility: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  padding: '10px',
  borderRadius: '8px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.5s ease, background-color 0.3s ease',
});

const FlashcardFront = styled(FlashcardFace)({
  backgroundColor: '#59A3AC', 
  color: '#fff',
});


const FlashcardBack = styled(FlashcardFace)({
  backgroundColor: '#8BCDBC', 
  color: '#fff',
  transform: 'rotateY(180deg)',
  fontWeight: 'bold', 
  fontStyle: 'italic',
  fontSize:"18px"
});

const FlashcardGenerator = () => {
  const [category, setCategory] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [savedSets, setSavedSets] = useState([]);
  const [setName, setSetName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleGenerate = () => {
    const flashcardsByCategory = {
      animal: [
        { question: 'What is the largest land animal?', answer: 'Elephant' },
        { question: 'Which animal is known as the King of the Jungle?', answer: 'Lion' },
        { question: 'What is the fastest land animal?', answer: 'Cheetah' },
        { question: 'What is the fastest land animal?', answer: 'Cheetah' },
        { question: 'What is the fastest land animal?', answer: 'Cheetah' },
      ],
      flower: [
        { question: 'What flower is known as the symbol of love?', answer: 'Rose' },
        { question: 'Which flower blooms only at night?', answer: 'Moonflower' },
        { question: 'What is the national flower of Japan?', answer: 'Cherry Blossom' },
      ],
      name: [
        { question: 'What is the most common first name in the world?', answer: 'Muhammad' },
        { question: 'What name means "gift of God"?', answer: 'Theodore' },
        { question: 'What is the meaning of the name "Sophia"?', answer: 'Wisdom' },
      ],
    };

    const newFlashcards = flashcardsByCategory[category.toLowerCase()] || [];
    setFlashcards(newFlashcards);
    setFlippedIndex(null);
  };

  const handleFlip = (index) => {
    setFlippedIndex(index === flippedIndex ? null : index);
  };

  const handleSave = () => {
    if (setName) {
      const newSet = { name: setName, flashcards };
      setSavedSets([...savedSets, newSet]);
      sessionStorage.setItem('savedSets', JSON.stringify([...savedSets, newSet]));
      setSetName('');
      setFlashcards([]);
      setCategory('');
      setOpenDialog(false);
      window.open('/savedFlashcards', '_blank');
    }
  };

  return (
    <Container>
      <Content>
        <Title>Generate Flashcards</Title>
        <Input
          label="Enter Text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          variant="outlined"
        />
        <ButtonContainer>
          <Button variant="contained" color="primary" onClick={handleGenerate}>
            Generate
          </Button>
          {flashcards.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
            >
              Save Set
            </Button>
          )}
        </ButtonContainer>

        {flashcards.length > 0 && (
          <FlashcardGrid>
            {flashcards.map((flashcard, index) => (
              <FlashcardWrapper key={index} onClick={() => handleFlip(index)}>
                <FlashcardInner flipped={flippedIndex === index}>
                  <FlashcardFront>{flashcard.question}</FlashcardFront>
                  <FlashcardBack>{flashcard.answer}</FlashcardBack>
                </FlashcardInner>
              </FlashcardWrapper>
            ))}
          </FlashcardGrid>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Save Flashcard Set</DialogTitle>
          <DialogContent>
            <TextField
              label="Set Name"
              fullWidth
              variant="standard"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </Content>
    </Container>
  );
};

export default FlashcardGenerator;
