# CS-UY 1134 — Code Deck

A study tool for NYU Tandon's CS-UY 1134 (Data Structures & Algorithms) final.
All 32 core "moves" — the code patterns that compose every exam question — in two modes:

- **Browse** — every code, searchable, filterable by category, with its *when-to-use* and its *move* (the one-line idea that makes it click).
- **Flashcards** — see the name + when-to-use, try to write it from memory, then reveal. Mark "got it / shaky"; shaky cards come back at the end. (Active recall, the thing that actually sticks.)

Covers: tree recursion (single + tuple), BST pruning, linked lists, generators, traversals, heaps, stacks, compose-a-class, pointer rewiring.

## Run locally
```bash
cd ~/cs1134-codes
python3 -m http.server 5180
# open http://localhost:5180
```

## Deploy (Vercel)
Static site, zero config:
```bash
npx vercel --prod
```

No build step — plain HTML/CSS/JS.
