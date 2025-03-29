# Wordle API using Next.js

This project is a simple Wordle API built with Next.js. It generates a "word of the day" from a dictionary and allows users to guess the word. The API evaluates the guess and returns feedback on whether the letters are correct and in the correct positions.

## Features

- Generates a daily word from a dictionary.
- Accepts user guesses via a POST request.
- Provides feedback on each guess:
  - `x` for a correct letter in the correct position.
  - `+` for a correct letter in the wrong position.
  - `-` for an incorrect letter.

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/masonyekta/wordle-api
   cd wordle-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. The API will be available at `http://localhost:3000/api`.

## Usage

Make a POST request to the API endpoint with the following JSON body:

```json
{
  "guess": "light"
}
```

### Example Response

```json
{
  "result": "x--x-",
  "wordLength": 5,
  "isCorrect": false
}
```

### Response Key

- `x`: Correct letter in the correct position.
- `+`: Correct letter in the wrong position.
- `-`: Incorrect letter.

## License

This project is licensed under the MIT License.
