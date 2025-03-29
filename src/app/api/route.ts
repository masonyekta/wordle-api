import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { words } from "@/lib/dictionary";

let cachedWord = "";
let cachedDate = "";

/**
 * Generate a word of the day based on the current date.
 * @returns {string} The word of the day based on the current date.
 */
function getWordOfTheDay(): string {
  const today = new Date().toISOString().split("T")[0];

  if (today === cachedDate && cachedWord) {
    return cachedWord;
  }

  const seed = crypto.createHash("md5").update(today).digest("hex");
  const seedNumber = parseInt(seed.substring(0, 8), 16);
  const wordIndex = seedNumber % words.length;

  cachedWord = words[wordIndex];
  cachedDate = today;

  return cachedWord;
}

/**
 * Compare the guessed word with the target word.
 * @param guess
 * @param target
 * @returns
 */
function compareWords(guess: string, target: string): string {
  guess = guess.toUpperCase();
  target = target.toUpperCase();

  if (guess.length !== target.length) {
    return "Invalid guess length";
  }

  const result = new Array(target.length).fill("-");
  const targetLetters = target.split("");
  const guessLetters = guess.split("");

  for (let i = 0; i < target.length; i++) {
    if (guessLetters[i] === targetLetters[i]) {
      result[i] = "+";
      targetLetters[i] = "";
      guessLetters[i] = "";
    }
  }

  for (let i = 0; i < target.length; i++) {
    if (result[i] === "-") {
      const letterIndex = targetLetters.indexOf(guessLetters[i]);
      if (letterIndex !== -1) {
        result[i] = "x";
        targetLetters[letterIndex] = "";
      }
    }
  }

  return result.join("");
}

/**
 * Handles the POST request to check the guessed word against the word of the day.
 * It validates the input, compares the guess with the word of the day,
 * and returns the result.
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the guess
    const guess = body?.guess;
    if (!guess || typeof guess !== "string" || guess.length !== 5) {
      return NextResponse.json(
        {
          error: "Invalid guess. Must be a 5-letter word.",
          receivedGuess: guess,
        },
        { status: 400 }
      );
    }

    const wordOfTheDay = getWordOfTheDay();
    const result = compareWords(guess, wordOfTheDay);

    return NextResponse.json({
      result,
      wordLength: wordOfTheDay.length,
      isCorrect: result === "+++++",
    });
  } catch (error) {
    console.error("POST Request Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
