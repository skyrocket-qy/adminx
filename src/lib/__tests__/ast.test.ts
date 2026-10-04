import { describe, expect, it } from 'vitest';
import { parseQueryStringToAST } from '../ast';
import { LogicOp, Operator } from '../protos/pkgpb/v1/pkg_pb';

describe('parseQueryStringToAST', () => {
  it('parses a single filter expression', () => {
    const ast = parseQueryStringToAST('user = alice');

    expect(ast.node.case).toBe('filter');
    if (ast.node.case === 'filter') {
      expect(ast.node.value.field).toBe('user');
      expect(ast.node.value.op).toBe(Operator.EQ);
      expect(ast.node.value.values).toEqual(['alice']);
    }
  });

  it('trims whitespace around fields, operators and values', () => {
    const ast = parseQueryStringToAST('  user   =   alice  ');

    expect(ast.node.case).toBe('filter');
    if (ast.node.case === 'filter') {
      expect(ast.node.value.field).toBe('user');
      expect(ast.node.value.values).toEqual(['alice']);
    }
  });

  it('parses AND chains into a logical node', () => {
    const ast = parseQueryStringToAST('a = 1 & b = 2');

    expect(ast.node.case).toBe('logical');
    if (ast.node.case === 'logical') {
      expect(ast.node.value.op).toBe(LogicOp.AND);
      expect(ast.node.value.nodes).toHaveLength(2);
      expect(ast.node.value.nodes.every((n) => n.node.case === 'filter')).toBe(true);
    }
  });

  it('parses OR chains into a logical node', () => {
    const ast = parseQueryStringToAST('a = 1 | b = 2 | c = 3');

    expect(ast.node.case).toBe('logical');
    if (ast.node.case === 'logical') {
      expect(ast.node.value.op).toBe(LogicOp.OR);
      expect(ast.node.value.nodes).toHaveLength(3);
    }
  });

  it('rejects mixed AND/OR operators', () => {
    expect(() => parseQueryStringToAST('a = 1 & b = 2 | c = 3')).toThrow(
      'Mixed logical operators not supported'
    );
  });

  it('rejects an expression without "="', () => {
    expect(() => parseQueryStringToAST('broken')).toThrow('Invalid filter expression');
  });

  it('rejects an expression with an empty field', () => {
    expect(() => parseQueryStringToAST('= value')).toThrow('Invalid filter expression');
  });

  it('keeps spaces inside values', () => {
    const ast = parseQueryStringToAST('title = hello world');

    expect(ast.node.case).toBe('filter');
    if (ast.node.case === 'filter') {
      expect(ast.node.value.values).toEqual(['hello world']);
    }
  });
});
