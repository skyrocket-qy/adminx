// import { MainClient, LoginReq, LoginResp } from '@/proto/main';
// import * as grpc from '@grpc/grpc-js';

export async function signIn(username: string, password: string): Promise<string | null> {
  console.log(username, password);
  return 'fake-token'
  // const client = new MainClient("localhost:50051", grpc.credentials.createInsecure());
  // const req: LoginReq = { UserName: username, Password: password };

  // try {
  //   const resp = await new Promise<LoginResp>((resolve, reject) => {
  //     client.login(req, (error: grpc.ServiceError | null, resp: LoginResp) => {
  //       if (error) {
  //         reject(new Error('Failed to login.'));
  //       } else {
  //         resolve(resp);
  //       }
  //     });
  //   });

  //   return resp;
  // } catch (err) {
  //   return null;
  // }
}
