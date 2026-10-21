<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Google Places calls live only in src/lib/places.functions.ts and stay off unless the Google Maps connector is linked and PLACES_ENABLED=true; why: no paid calls without explicit approval.
- Audits route lives under src/routes/_authenticated/ and its server fns use requireSupabaseAuth; usage is written server-side only (api_calls = technical calls, audits = 1 completed audit = 1 plan unit); why: billing units must not depend on API call count.
