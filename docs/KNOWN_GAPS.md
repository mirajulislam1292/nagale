# Known gaps

This is an infrastructure scaffold, not the completed Nagale frontend.

- Build order step 2 is blocked: GitHub plugin is not connected and the local Git credential helper returned no GitHub credential. Private repository creation and push have not occurred.
- The new Git-connected Vercel project and shell deployment have not been created. Existing nagale.app remains unchanged.
- Product screens, brand exports, locale implementation, typed domain API, mocks, privacy enforcement and component system remain unimplemented.
- Full browser, accessibility, Lighthouse and screenshot QA have not run. No product acceptance or release tag is claimed.
- Node 20 is configured for CI and deployment; local baseline checks used the installed Node 23.10.0 runtime. Node 20 execution still needs validation.
