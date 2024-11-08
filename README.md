# UW Product Management Clubsite

Welcome to the UW Product Management Clubsite!

## Getting Started

To set up the development environment, follow these steps:

1. Clone the repository to your local desktop:  
   `git clone https://github.com/UWPM/clubsite.git`

2. Navigate to the project directory:  
   `cd clubsite`

3. Install dependencies using npm:  
   `npm install`

4. Start the development client:  
   `npm run dev`

Now you can access the development version of the website at `http://localhost:3000`.

## GitHub Workflow

Naming convention
Branch names should be in the form category(scope or module)/message. Pull requests should be in the form `category(scope or module): message`. Here are the categories:

- `feat / feature`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug (ideally you will additionally reference an issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for usage of a lib or cli usage)
- `chore`: all changes to the repository that do not fit into any of the above categories

e.g. branch name `feat(editor)/tab-switching-speed`, pull request name `feat(editor): improve tab switching speed`

See the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for more details.

If you have any questions or need assistance, feel free to message in the `#engineering-team` channel on Discord.
