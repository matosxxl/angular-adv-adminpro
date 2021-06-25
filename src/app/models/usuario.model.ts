
export class Usuario {

    constructor(
        public email: string,
        public nombre: string,
        public password?: string,
        public google?: boolean,
        public img?: string,
        public role?: string,
        public uid?: string,
    ) {}
}

