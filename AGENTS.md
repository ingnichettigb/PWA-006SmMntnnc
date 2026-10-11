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

- All brand/app values (name, SaaS URL, colors, taglines) live only in `src/config/app.ts`; the manifest is served from `src/routes/manifest[.]json.ts` built from it — why: template is cloned per SaaS, one edit must propagate everywhere.
