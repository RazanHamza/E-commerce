import { Phone } from 'lucide-react';
import { string } from './../../../node_modules/zod/src/v4/core/regexes';
import * as zod from "zod"
import path from 'path';
 export const loginSchema =zod.object({
    email:zod.email(),
   password: zod
  .string()
  .nonempty("Password is required")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must be at least 8 characters and include upper/lowercase, number, and special character"
  ),
})
