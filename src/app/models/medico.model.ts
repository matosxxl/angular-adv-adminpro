import { Hospital } from './hospital.model';

interface _MedicoUser {
	nombre: string,
	_id   : string,
	img?  : string;
}

export class Medico {

    constructor(
		public nombre: string,
		public _id?: string,
		public usuario?: _MedicoUser,
        public hospital?: Hospital,
		public img?: string,
    ){}

}
