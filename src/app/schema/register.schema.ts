import { Phone } from 'lucide-react';
import { string } from './../../../node_modules/zod/src/v4/core/regexes';
import * as zod from "zod"
import path from 'path';
 export const registerSchema =zod.object({
    name:zod.string().nonempty("Name is Required").min(3,"min length is 3").max(10,"max length is 10"),
    email:zod.email(),
   password: zod
  .string()
  .nonempty("Password is required")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must be at least 8 characters and include upper/lowercase, number, and special character"
  ),

    rePassword:zod.string().nonempty("Confirm password is Required"),
    phone:zod.string().nonempty("Phone is Required").regex(/^01[0251][0-9]{8}$/)
})
.refine((object)=>object.password===object.rePassword,{
path:["rePassword"],
error:"password & rePassword not matched..!"
})