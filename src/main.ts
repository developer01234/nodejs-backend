import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function start() {
  const port = 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Docs")
    .setDescription("Simple docs for REST API")
    .setVersion("0.1.0")
    .addTag("Docs")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(port, () =>
    console.log(`Server start been on port ${port}`)
  );
}

start();
