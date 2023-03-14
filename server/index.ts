import app from './app';

const port: number = 3001;

const server = app.listen(port, () => {
  console.log(`App is listening on port ${port} !`)
});

export default server;