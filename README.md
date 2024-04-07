# activity-heatmap-pixel-art
A fun project for generating a git history which draws pixel-art when displayed in an activity heat-map


# Inspiration for project:
- On Linkedin and other websites I often see posts about how it is important for people applying software engineering jobs, to have lots of green squares on the GitHub activity heatmap. This is meant to show that they write code often.
    - I have been working as a front-end developer in Angular for almost 4 years now. At 2 different companies, and I managed to get both these jobs without having public contributions on GitHub.
- I thought I would poke fun at this idea by generating fake commits to make my heatmap green.
- Famous saying: "When a measure becomes a target, it ceases to be a good measure"
    - this saying, also called Goodhart's law, nicely explains this project, I suppose.

# Disclaimer
- This is just a joke project. Meant to prove a point. The point being that I like to code fun useless things :P


# More:
- Read about how contributions are counted for Github:
    - [Why are my contributions not showing up on my profile](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile)

# HOW TO USE:

create a new folder for the dummy repo, for example:
> mkdir dummy-repo-for-pixel-art # make directory
> cd dummy-repo-for-pixel-art # open folder

add some readme file just so no one gets confused:
> echo "This is a dummy repository" > README.md
> echo "Commits made using my activity-heatmap-pixel-art project" >> README.md

create a repository using:
> git init

maybe set user
>git config --local user.email email@example.com                   
>git config --local user.name "First Last"

Helpful link:
- [how-to-push-an-existing-project-to-github](https://www.digitalocean.com/community/tutorials/how-to-push-an-existing-project-to-github)

After creating new repo in github:
> git remote add origin https://github.com/... the link to the repo
Push
> git push -u -f origin master # or main