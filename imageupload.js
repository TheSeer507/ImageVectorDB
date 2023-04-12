import weaviate from 'weaviate-ts-client';
import { readFileSync, writeFileSync } from 'fs';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

const schemaRes = await client.schema.getter().do();

const img = readFileSync('./img/0_ZjeM3LF_3P5nZ4Av.jpg');

const b64 = Buffer.from(img).toString('base64');

await client.data.creator()
  .withClassName('Meme')
  .withProperties({
    image: b64,
    text: 'Morpheus meme 1'
  })
  .do();