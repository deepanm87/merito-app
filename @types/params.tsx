import { Form } from "@prisma/client"

export type Params = Promise<{ formId: Form["id"] }>