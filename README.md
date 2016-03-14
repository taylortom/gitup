# gitup

Just loops through an array of repository names, and clones each one.

### `data.json` structure

Requires a `data.json` file in the plugin root. See below for an explanation of the options.
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

### Usage

This is just a simple node script, so to use, just run:
```
node gitup
```
