# Editing the About page

All story copy is in `src/content/about.ts`. Edit both `en` and `bn`; the `AboutContent` interface keeps their structures equal. No metric slots or statistics are filled by default.

- headline: six words maximum; the story hero.
- lead: one sentence, approximately 90 characters.
- problems: three qualitative statements, ideally 12 words each.
- steps: exactly four entries, each title up to three words and line up to 12 words.
- trust: three entries, title up to four words and one concise line.
- order, fee, net: calculator labels, ideally three words each. Amounts and fee rate come from API configuration, not copy.
- providerTitle/providerFacts/providerAction/why: Mint provider band and its feed example.
- showcaseTitle/sample: sample-profile section; names, areas and ratings come from mock providers.
- learning/learnAction: the slim learning link.
- partnerTitle/name/role/roles/message/send/sent: partner form. `sent` must accurately state whether a backend ticket was created.
- footer/login/start/released: shared actions and footer wording.

BN text may be longer. Components wrap labels rather than truncating meaning. Do not add contact information, invented user counts, press quotes or partner names. Profile data remains separate from story copy.
