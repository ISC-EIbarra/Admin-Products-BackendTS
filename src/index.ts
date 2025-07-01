import server from './server';
import colors from 'colors';

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(colors.bgBlue.white.bold(`REST API en el puerto: ${port}`));
});
