import { describe, expect, it } from 'vitest';
import { credentialsSchema, tupleFormSchema } from '../schemas';

const validTuple = {
  subjectNs: 'user',
  subjectId: 'alice',
  relation: 'member',
  objectNs: 'role',
  objectId: 'admin',
};

describe('tupleFormSchema', () => {
  it('accepts a fully populated tuple', () => {
    const result = tupleFormSchema.safeParse(validTuple);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validTuple);
    }
  });

  it.each(['subjectNs', 'subjectId', 'relation', 'objectNs', 'objectId'] as const)(
    'rejects an empty %s',
    (field) => {
      const result = tupleFormSchema.safeParse({ ...validTuple, [field]: '' });

      expect(result.success).toBe(false);
    }
  );

  it('reports the configured validation messages', () => {
    const cases: Array<[keyof typeof validTuple, string]> = [
      ['subjectNs', 'Subject namespace is required'],
      ['subjectId', 'Subject id is required'],
      ['relation', 'Relation is required'],
      ['objectNs', 'Object namespace is required'],
      ['objectId', 'Subject id is required'],
    ];

    for (const [field, message] of cases) {
      const result = tupleFormSchema.safeParse({ ...validTuple, [field]: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(message);
      }
    }
  });

  it('rejects missing fields entirely', () => {
    expect(tupleFormSchema.safeParse({}).success).toBe(false);
  });
});

describe('credentialsSchema', () => {
  it('accepts string credentials', () => {
    expect(credentialsSchema.safeParse({ username: 'admin', password: 'secret' }).success).toBe(
      true
    );
  });

  it('accepts empty strings (validation of presence is handled elsewhere)', () => {
    expect(credentialsSchema.safeParse({ username: '', password: '' }).success).toBe(true);
  });

  it('rejects missing or non-string values', () => {
    expect(credentialsSchema.safeParse({ username: 'admin' }).success).toBe(false);
    expect(credentialsSchema.safeParse({ username: 1, password: 'x' }).success).toBe(false);
  });
});
