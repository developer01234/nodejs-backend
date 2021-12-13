import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
  const port = 5000;
  const app = await NestFactory.create(AppModule);

  await app.listen(port, () =>
    console.log(`Server start been on port ${port}`)
  );
}

start();
