# Content editor

A password protected editor at `/admin` for changing the text on the site
without a deploy. 627 fields, generated from the content tree, so anything
added to the site later appears in the editor on its own.

## Setting it up

Two environment variables in the Vercel dashboard, under Settings then
Environment Variables. Add them for Production (and Preview, if you want the
editor there too), then redeploy.

### 1. `ADMIN_PASSWORD` (required)

The password for `/admin`. Make it long: it is the only thing standing between
the public internet and your website's text. A passphrase of four or five
random words is far stronger than a short complicated one.

### 2. A place to keep the edits

A password on its own cannot save anything. A Vercel deployment has a read only
filesystem, so the edited text needs somewhere durable to sit.

In the Vercel dashboard: **Storage**, then **Create Database**, then **Blob**,
and connect it to this project. Vercel adds `BLOB_READ_WRITE_TOKEN` for you.
Redeploy and the editor can save.

Until that store exists the site is completely fine: it renders the text that
shipped with the build, and the editor tells you plainly that it cannot save
yet.

### Optional: `ADMIN_SESSION_SECRET`

Signs the session cookie. Without it the key is derived from the password,
which is fine, with one consequence worth knowing: changing the password signs
out every open session. Set this to any long random string if you would rather
the two were independent.

## How it works

- `src/content/*.ts` holds the text that ships with the build. This is still
  the source of truth and still where a developer edits copy.
- The editor saves only the fields you actually changed, as a small JSON file
  of `path: value` pairs, for example
  `{"offerings.0.promise": "We find proven experts."}`.
- `getContent()` merges the two on the server. Anything you have not touched
  falls back to the file, so the site cannot end up blank because a store is
  empty or unreachable.
- Saving calls `updateTag`, so the next request to any page serves the new
  text rather than a cached copy. No redeploy.

### What this means for future code changes

Because overrides win, a field you have edited in `/admin` will keep your
version even if the text in `src/content` is later changed by a developer. If
you want to take the newer text, hit **Revert** on that field, or **Reset all**
to drop every override at once.

## What is editable and what is not

Editable: every string and number in the content tree. Headlines, leads, card
copy, case studies, partner biographies, values, navigation labels, contact
details, the numbers in the band.

Not editable, by design:

- `slug`, `href` and `url`: they generate URLs, and changing one would break
  every link to it.
- `icon` and `logo`: they name a component or a file that has to exist.
- `featured`: a flag rather than copy.
- Section headlines that carry an italic accent, like "Embed our experts, or
  *hand us the solution*." The accent is markup rather than text, so those few
  live in the section components and need a developer.

## Security

- The password is compared through a hash of both sides, so a wrong guess
  cannot be narrowed down by timing.
- Failed attempts are throttled to 8 in 10 minutes. This is per server
  instance and held in memory, so treat it as a speed bump: it does not
  survive a restart and does not coordinate across regions. The length of your
  password is what actually protects this.
- The session cookie is signed, httpOnly, sameSite and secure in production,
  and lasts 8 hours.
- `/admin` is disallowed in `robots.txt` and carries `noindex`, and is absent
  from the sitemap.
- Writes are validated against the content tree: a path that does not name a
  real editable field is dropped, so nothing can be injected into the content
  by crafting a request.

## Local development

```
ADMIN_PASSWORD=something
CONTENT_STORE_FILE=/tmp/htp42-content-overrides.json
```

in `.env.local`. Edits go to that file instead of Blob. The file driver is
ignored when `NODE_ENV` is production, so it cannot be used by accident on a
deployment.
