import { Phone } from 'lucide-react';
import { string } from './../../../node_modules/zod/src/v4/core/regexes';
import * as zod from "zod"
import path from 'path';
 export const checkoutSchema =zod.object({
    details:zod.string().nonempty("Details is required"),
   phone: zod
  .string()
  .nonempty("Phone is required"),
   city:zod.string().nonempty("City is required"),
})
