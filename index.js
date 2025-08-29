const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const FULL_NAME = (process.env.FULL_NAME || 'john_doe').toLowerCase();
const DOB = process.env.DOB_DDMMYYYY || '17091999';
const EMAIL = process.env.EMAIL || 'john@xyz.com';
const ROLL = process.env.ROLL_NUMBER || 'ABCD123';

app.get('/', (req, res) => res.send('BFHL API is running'));

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body || {};

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        user_id: `${FULL_NAME}_${DOB}`,
        email: EMAIL,
        roll_number: ROLL,
        message:
          'Request body must be JSON with a "data" array. Example: { "data": ["a","1","$"] }',
      });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    const lettersForConcat = [];

    data.forEach((rawItem) => {
      const token = rawItem == null ? '' : String(rawItem);

      if (/^-?\d+$/.test(token)) {
        const num = Number(token);
        if (Math.abs(num) % 2 === 1) {
          odd_numbers.push(token);
        } else {
          even_numbers.push(token);
        }
        sum += num;
        return;
      }

      if (/^[A-Za-z]+$/.test(token)) {
        alphabets.push(token.toUpperCase());
        for (const ch of token) {
          if (/[A-Za-z]/.test(ch)) lettersForConcat.push(ch);
        }
        return;
      }

      special_characters.push(token);
    });

    const reversedLetters = lettersForConcat.reverse();
    const concat_string = reversedLetters
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join('');

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    });
  } catch (err) {
    console.error('Unhandled error in /bfhl:', err);
    return res.status(500).json({
      is_success: false,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL,
      message: 'Internal server error',
    });
  }
});

// ❌ REMOVE app.listen
// ✅ Instead export app for Vercel
module.exports = app;
