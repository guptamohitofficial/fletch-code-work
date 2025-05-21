import dotenv from 'dotenv';

dotenv.config();


export const config = {
    bakcendApiBase : process.env.NEXT_PUBLIC_BAKEND_API_BASE
}