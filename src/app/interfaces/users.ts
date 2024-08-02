export class Users{
    user_id!:number|null;
    pwd!:string;
    email!:string;
    enabled!:number;
    user_name!: string;
    surename!:string;
    document!:string;
    birth_date!:string;
}

export class Session{
    pwd!:string;
    email!:string;
}