# Common Git Commands Cheat Sheet

## Basic Commands

| Command | Description |
|---------|-------------|
| `git init` | Initialize a new Git repository in the current folder |
| `git clone <url>` | Copy (clone) a remote repository to your computer |
| `git status` | Show the status of your files (what’s changed, staged, or untracked) |
| `git add <file>` | Stage a file (or files) to be included in the next commit. Use `git add .` to stage all changes |
| `git commit -m "message"` | Save your staged changes to the repository with a message |
| `git log` | Show a history of commits |
| `git diff` | Show the differences between files or commits |
| `git branch` | List all branches in your repo |
| `git checkout <branch>` | Switch to another branch |
| `git checkout -b <branch>` | Create and switch to a new branch |
| `git merge <branch>` | Merge another branch into your current branch |
| `git pull` | Fetch and merge changes from the remote repository to your local branch |
| `git push` | Upload your commits to the remote repository |
| `git remote -v` | Show the remote repositories connected to your local repo |
| `git rm <file>` | Remove a file from the repo and stage the removal |
| `git reset <file>` | Unstage a file (remove it from the staging area) |
| `git stash` | Temporarily save your changes so you can work on something else |
| `git stash pop` | Restore the most recently stashed changes |

---

## Typical Workflow Example

```sh
git clone https://github.com/user/repo.git   # Download a repo
cd repo
git status                                   # See what’s changed
git add .                                    # Stage all changes
git commit -m "Describe your changes"        # Commit changes
git push                                     # Upload to remote repo
```

---

## Other Useful Commands

- `git config --global user.name "Your Name"`  
  Set your Git username.
- `git config --global user.email "you@example.com"`  
  Set your Git email.
- `git show`  
  Show details about a specific commit.
- `git fetch`  
  Download changes from the remote repo but don’t merge them.
- `git pull origin main`  
  Pull changes from the `main` branch on the remote called `origin`.

---

## Summary Table

| Command | Description |
|---------|-------------|
| `init` | Start a new repo |
| `clone` | Copy a repo |
| `status` | See changes |
| `add` | Stage changes |
| `commit` | Save changes |
| `push` | Upload changes |
| `pull` | Download changes |
| `branch` | Manage branches |
| `checkout` | Switch branches |
| `merge` | Combine branches |

---

**Tip:** For more advanced commands or help, run `git help <command>` or visit [https://git-scm.com/docs](https://git-scm.com/docs) 

---

This error means that the remote repository (`main` branch on GitHub) has commits that your local branch does not have. Git is preventing you from overwriting those changes.

**The solution:**  
You need to pull the remote changes first, resolve any conflicts if they exist, and then push again.

---

## **Step-by-Step Solution**

### 1. **Pull the Remote Changes**
```sh
<code_block_to_apply_changes_from>
```
- The `--rebase` option tries to apply your local commits on top of the remote changes, which is usually cleaner for new projects.

### 2. **Resolve Any Merge Conflicts (if prompted)**
- If there are conflicts, Git will tell you which files need to be fixed.
- Open those files, look for conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), and edit as needed.
- After fixing, mark them as resolved:
  ```sh
  git add <filename>
  ```

### 3. **Continue the Rebase (if you had conflicts)**
```sh
git rebase --continue
```
Repeat steps 2 and 3 until the rebase is complete.

### 4. **Push Your Changes**
```sh
git push origin main
```

---

## **Summary of Commands**
```sh
git pull origin main --rebase
# (resolve conflicts if any, then:)
git push origin main
```

---

**If you get stuck on a conflict, copy the message here and I’ll help you resolve it!**  
This is a common workflow when collaborating or pushing to a repo that already has commits.

**Reference:**  
[GitHub: Dealing with non-fast-forward errors](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository#dealing-with-non-fast-forward-errors) 

---

To switch to the `main` branch in Git, use the following command in your terminal:

```sh
git checkout main
```
or, with newer versions of Git, you can also use:
```sh
git switch main
```

**If you get an error** like `error: pathspec 'main' did not match any file(s) known to git`, it means the `main` branch does not exist locally. In that case, you can fetch all branches and then switch:

```sh
git fetch origin
git checkout main
```

If your main branch is called `master` (in some older repositories), use `master` instead of `main`:

```sh
git checkout master
```

**Summary:**
- To switch: `git checkout main` or `git switch main`
- If not found: `git fetch origin` then `git checkout main`

Let me know if you get any errors or need help with the next step! 