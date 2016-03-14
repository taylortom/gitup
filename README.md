# gitup

Just loops through an array of repository names, and clones each one.

### `data.json`
```
{
  "repositories": [
    // strings, list the repo names here
  ],
  "repoBaseURL": // string, the remote URL template for the repos -- use {{REPO}} as the repo name placeholder (e.g. https://github.com/USER/{{REPO}}.git)
  "zip": // boolean, whether to zip the backup folder
  "logging": // string, supports: none, error, std, debug
}

```
