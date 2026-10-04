import { z } from 'zod';

/** Shared tuple form schema used by the rbac/tuple create drawers. */
export const tupleFormSchema = z.object({
  subjectNs: z.string().min(1, 'Subject namespace is required'),
  subjectId: z.string().min(1, 'Subject id is required'),
  relation: z.string().min(1, 'Relation is required'),
  objectNs: z.string().min(1, 'Object namespace is required'),
  objectId: z.string().min(1, 'Subject id is required'),
});

export type TupleFormData = z.infer<typeof tupleFormSchema>;

/** Credentials schema used by the login form. */
export const credentialsSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type Credentials = z.infer<typeof credentialsSchema>;
