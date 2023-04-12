import weaviate from 'weaviate-ts-client';
import { readFileSync, writeFileSync } from 'fs';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

const schemaRes = await client.schema.getter().do();

console.log(schemaRes)

const img = readFileSync('./img/4wgdi9.jpg');

const b64 = Buffer.from(img).toString('base64');

await client.data.creator()
  .withClassName('Meme')
  .withProperties({
    image: b64,
    text: 'potato morpheus'
  })
  .do();

const test = Buffer.from( readFileSync('./test.jpg') ).toString('base64');

const resImage = await client.graphql.get()
  .withClassName('Meme')
  .withFields(['image'])
  .withNearImage({ image: test })
  .withLimit(1)
  .do();

// Write result to filesystem
const result = resImage.data.Get.Meme[0].image;
writeFileSync('./result.jpg', result, 'base64');