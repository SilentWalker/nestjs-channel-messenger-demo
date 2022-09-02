import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getApplication } from './utils/get-application'

describe('ChannelResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApplication()
  });


  describe('Mutaion #createChannel', () => {
    it('should create channel', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              createChannel(createChannelInput: { name: "Test" }) {
                id
                name
              }
            }
          `,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.createChannel.name).toEqual('Test');
        });
    });
  })

  describe('Query #channels', () => {
    it('should return channels', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              channels {
                id
                name
              }
            }
          `,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.channels).toHaveLength(1);
        });
    });
  })

  describe('Query #channel', () => {
    it('should return channel', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              channel(id: 1) {
                id
                name
              }
            }
          `,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.channel.name).toEqual('Test');
        });
    });
  })

  describe('Mutaion #updateChannel', () => {
    it('should update channel', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              updateChannel( id: 1, updateChannelInput: { name: "Test 2" }) {
                id
                name
              }
            }
          `,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.updateChannel.name).toEqual('Test 2');
        });
    });
  })

  describe('Mutaion #deleteChannel', () => {
    it('should delete channel', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              removeChannel(id: 1) {
                id
              }
            }
          `,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.removeChannel.id).toEqual(1);
        });
    });
  })

})