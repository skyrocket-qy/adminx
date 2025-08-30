import { createConnectTransport } from "@connectrpc/connect-web"; // or connect-node for Node.js
import { createClient } from "@connectrpc/connect";
import { AuthzService } from "@/lib/protos/authzpb/v1/authz_pb";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080", // Your gRPC/Connect server base URL
});


export const client = createClient(AuthzService, transport);