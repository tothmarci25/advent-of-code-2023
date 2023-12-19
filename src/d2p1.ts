import readline from 'readline';
import fs from 'fs';

(async () => {
  const lines = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/d2.input.txt`)
  });

  let result = 0;
  let games = [];
  for await (const line of lines) {
    const [game, plays] = line.split(': ');
    const gameId = parseInt(game.split(' ')[1]);
    const playsResult = plays.split('; ').map(play => {
      const playResult: any = { red: 0, green: 0, blue: 0 };
      play.split(', ').forEach((colorPair) => {
        const [count, color] = colorPair.split(' ');
        playResult[color] = parseInt(count);
      })
      return playResult;
    });
    games.push({ id: gameId, plays: playsResult });
  }

  games.forEach(game => {
    if (game.plays.every((play) => {
      return play.red <= 12 && play.green <= 13 && play.blue <= 14;
    })) {
      result += game.id;
    }
  });

  console.log(result);
})();