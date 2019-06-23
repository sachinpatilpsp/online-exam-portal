import { ICollege } from './college';

/**
 * @author Pravin P Patil 
 * @description https://github.com/pravin02
 * 
 * Interface User model
 */
export interface IUser {
    id: Number;
    name: string;
    contactNumber: string;
    password: string;
    email: string;
    college: ICollege;
    stream: string;
    qualification: string;
}
