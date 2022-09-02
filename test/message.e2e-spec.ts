import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { getApplication } from './utils/get-application'

describe('MessageResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getApplication()
  });

  let channelId
  describe('Mutaion #createChannel for Message', () => {
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
          channelId = body.data.createChannel.id
          expect(body.data.createChannel.name).toEqual('Test');
        });
    });
  })


  describe('Mutaion #createMessage', () => {
    it('should create message', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
          createMessage(createMessageInput: { channelId: ${channelId}, title: "Test", content: "Test" }) {
            id
            title
            content
          }
        }
          `,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.createMessage.title).toEqual('Test');
        });
    });
  })

  describe('Query #messages', () => {
    it('should return messages', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              messages {
                id
                title
                content
              }
            }
          `,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.messages).toHaveLength(1);
        });
    });
  })

  describe('Query #message', () => {
    it('should return message', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              message(id: 1) {
                id
                title
                content
              }
            }
              `,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.message.title).toEqual('Test');
        });
    });
  })

  describe('Mutaion #updateMessage', () => {
    it('should update message', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
      updateMessage(id: 1, updateMessageInput: { title: "Test 1", content: "Test" }) {
        id
        title
        content
      }
    }
      `,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.updateMessage.title).toEqual('Test 1');
        });
    });
  })

  describe('Mutaion #removeMessage', () => {
    it('should delete message', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
      removeMessage(id: 1) {
        id
      }
    }
      `,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.removeMessage.id).toEqual(1);
        });
    });
  })


})
