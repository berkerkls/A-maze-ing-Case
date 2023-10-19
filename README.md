# A-maze-ing Case

A-maze-ing Case was quite fun and inspiring. When I solved each maze I got another idea and every idea showed me another way.

## Process
- First of all I setup my services and store. I got two store player store and maze store. Inside of the playerStore, I got the information whether the user is registered or not if they registered I directly route them to the maze selection screen. In maze selection screen, I fetch player information and from response I check isInMaze key, if the client is in Maze I route to the maze component.

*In maze store, I save the information to local stroge to keep them in case of page refresh*;
- I keep all entered mazes inside of array to filter out in the list as it says in rules.
- I got currentMaze to see the client location and after client location I got every move of the client in opposite way in pathToStart. I do this because if I got stuck in maze, I will be able to go back where I came and see the other options and explore different ways.
- I have path to exit when I found exit, I also keep the way from the moment when I found but if the totalScoreInBag is equal to potentialScoreInMaze I will stop saving and suggest to go exit with the path I saved.
- I have the lastScoreCollectionPoint path, by keeping this path I suggest the client to collect the score if scores in bag and scores in hand are equal to potential scores together.
- I only enabled the ways of the possible location present, I set the other ways disabled.
## Project Setup
```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
