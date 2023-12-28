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
    const { red, green, blue } = game.plays.reduce((prevMaxPlay, currentPlay) => {    
      const nextMaxPlay = { ...prevMaxPlay };
      if (currentPlay.red > prevMaxPlay.red) {
        nextMaxPlay.red = currentPlay.red;
      }
      if (currentPlay.green > prevMaxPlay.green) {
        nextMaxPlay.green = currentPlay.green;
      }
      if (currentPlay.blue > prevMaxPlay.blue) {
        nextMaxPlay.blue = currentPlay.blue;
      }
      return nextMaxPlay;
    });
    result += red * green * blue;
  });

  console.log(result);
})();