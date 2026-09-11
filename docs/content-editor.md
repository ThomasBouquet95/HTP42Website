# Content editor

A password protected editor at `/admin`. It shows the real pages of the site
with their text open for editing, and exports what you changed as a file to
hand back to a developer.

Nothing publishes from `/admin`. That is deliberate: the repository stays the
single source of truth for the site's copy, so your edits and a developer's
edits can never end up as two competing versions of the same sentence.

## Setting it up

One environment variable, in the Vercel dashboard under Settings then
Environment Variables. Add it and redeploy.

### `ADMIN_PASSWORD` (required)

The password for `/admin`. Make it long: it is the only thing between the
public internet and this editor. A passphrase of four or five random words is
far stronger than a short complicated one.

### `ADMIN_SESSION_SECRET` (optional)

Signs the session cookie. Without it the key is derived from the password,
which is fine, with one consequence worth knowing: changing the password signs
out every open session. Set this to any long random string if you would rather
the two were independent.

There is no database and no storage token. Your edits live in your own browser
until you export them.

## Using it

1. Go to `/admin` and sign in.
2. Pick a page from the top bar. The real page loads in the preview, and the
   panel on the right lists the text found on it.
3. Hover the preview: any text you can edit outlines in blue. Click it and the
   panel jumps to that field. Clicking something that is not editable says so
   rather than doing nothing.
4. Or search for the words you want to change.
5. Edit in the panel. The preview updates as you type, so you see the sentence
   in place rather than in a form. Focusing a field also outlines it in the
   preview and scrolls it into view, so the two stay in step.
6. Press **Export** for a file, or **Copy** to put the same content on your
   clipboard. Send either to your developer.

Desktop, Tablet and Phone buttons change the preview width, which is useful
for checking that a longer sentence still sits well on a phone.

Your draft is kept in the browser, so you can close the tab and come back to
it. **Discard** clears it. Nothing is sent anywhere until you export.

## What the export contains

A JSON file, which is the right format here because it names the exact content
path of every change. Two sentences on the site can be similar, and a path
removes any doubt about which one you meant:

```json
{
  "changes": [
    {
      "path": "offerings.0.promise",
      "where": "How we work with you - Expert Deployment - Promise",
      "before": "We find proven experts. You sign one contract.",
      "after": "We find vetted experts. One contract."
    }
  ]
}
```

It is also readable enough to check by eye before you send it: each entry says
where the text sits, what it was, and what you want it to be.

## What is editable and what is not

Editable: the text held in `src/content/*.ts`. Card copy, case studies, partner
biographies, values, disciplines, the three sided proposition, navigation
labels, contact details, client names, the numbers in the band.

Not editable yet:

- **Section headlines and leads.** Most of these live inline in the section
  components rather than in the content files, often because the headline
  carries an italic accent, as in "Embed our experts, or *hand us the
  solution*", where the accent is markup rather than text. Moving them into
  the content files is the obvious next step.
- `slug`, `href` and `url`, which generate URLs, so changing one would break
  every link to it.
- `icon` and `logo`, which name a component or a file that has to exist.

If a field is editable but does not light up in the preview, it is still fully
editable from the panel search. The preview finds text by matching it exactly,
so a sentence broken across an italic accent will not be located in the page.
The export is keyed by content path either way, so what a developer receives is
never ambiguous.

## Security

- The password is compared through a hash of both sides, so a wrong guess
  cannot be narrowed down by timing.
- Failed attempts are throttled to 8 in 10 minutes. This is per server
  instance and held in memory, so treat it as a speed bump: it does not
  survive a restart and does not coordinate across regions. The length of your
  password is what actually protects this.
- The session cookie is signed, httpOnly, sameSite and secure in production,
  and lasts 8 hours.
- `/admin` is disallowed in `robots.txt`, carries `noindex`, and is absent from
  the sitemap.
- The editor cannot write to the site at all, so even a compromised password
  cannot change what the public sees.

## For the developer applying an export

Each change gives a `path` into the tree assembled in
`src/content/registry.ts`, so `offerings.0.promise` is
`offerings[0].promise` in `src/content/offerings.ts`. `before` is there to
confirm you are editing the sentence the author was looking at; if it no longer
matches, the copy has moved on since the export and the change needs a
conversation rather than a find and replace.
