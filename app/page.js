
"use client";
import Head from 'next/head';
import FlashcardGenerator from './components/FlashcardGenerator';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Flashcard Generator</title>
        <meta name="description" content="Generate flashcards easily" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FlashcardGenerator />
      </main>
    </div>
  );
}