import { createConnectTransport } from "@connectrpc/connect-web"; // or connect-node for Node.js
import { createClient } from "@connectrpc/connect";
import { RbacService } from "@/lib/protos/authzpb/rbacpb/rbac_pb";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080", // Your gRPC/Connect server base URL
});


export const client = createClient(RbacService, transport);