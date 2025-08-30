import { Operator, LogicOp, FilterNode, FilterSchema , LogicalSchema,
    FilterNodeSchema,
} from "./protos/pkgpb/v1/pkg_pb";
import { create } from "@bufbuild/protobuf";

// Basic tokenizer
function tokenize(query: string): string[] {
    return query
    .split(/([&|])/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

// Convert a single filter expression like `field = value`
function parseFilter(expr: string): FilterNode {
    const [field, value] = expr.split('=').map(s => s.trim());

    if (!field || value === undefined) {
    throw new Error(`Invalid filter expression: ${expr}`);
    }

    const filter =  create(FilterSchema, {
    field,
    op: Operator.EQ,
    values: [value],
    });


    return create(FilterNodeSchema ,{
    node: {
        case: "filter",
        value: filter,
    },
    });
}

// Main parser for flat expressions like `a = b & c = d`
export function parseQueryStringToAST(query: string): FilterNode {
  const tokens = tokenize(query);

  if (tokens.length === 1) {
    return parseFilter(tokens[0]);
  }

  const logical =  create(LogicalSchema, {
    op: LogicOp.AND, // default, will change based on first token
    nodes: [],
  });

  let currentOp: LogicOp | null = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === "&" || token === "|") {
      const nextOp = token === "&" ? LogicOp.AND : LogicOp.OR;
      if (currentOp === null) {
        currentOp = nextOp;
        logical.op = nextOp;
      } else if (currentOp !== nextOp) {
        throw new Error(`Mixed logical operators not supported: found both AND and OR`);
      }
    } else {
      logical.nodes.push(parseFilter(token));
    }
  }


    return create(FilterNodeSchema ,{
        node: {
            case: "logical",
            value: logical,
        },
    });
}
