# Decisions

- The new master specification supersedes earlier screen and language directions. English is the default and Bangla is explicitly selectable.
- Build in a new isolated project. Existing prototypes are reference material, not dependencies.
- Keep the current public deployment in place until QA and the domain cutover step pass. The first blank pipeline shell gets a separate Vercel URL.
- Demo money uses integer BDT taka; dates use UTC ISO strings and display in Asia/Dhaka.
- Infrastructure must use the owner's verified GitHub identity. A locally configured author name is not proof of GitHub authentication.
