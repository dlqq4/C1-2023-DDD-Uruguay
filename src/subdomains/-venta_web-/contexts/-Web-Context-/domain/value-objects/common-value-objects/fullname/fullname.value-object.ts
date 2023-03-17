import { ValueObjectBase, isFullNameOK, largoMaximo, largoMinimo } from "../../../../../../../../libs";


export class FullnameValueObject extends ValueObjectBase<string> {

    constructor(value? : string){
        super(value ? value : null)
    }


    validateData(): void {
        this.validatFullNameLargo()
    
    }


    private validatFullNameLargo() : void {
        
        //Existe el dato nombre completo?
        if (this.value) {
            const error = {
                field: 'Fullname',
                message: 'El nombre no se proporcionó!'
            };

            this.setError(error);
        }

        //Comprobar que el largo no se exeda
        if(largoMaximo(this.value, 80)){
            const error = {field: 'Fullname', message: 'El nombre proporcionado es demasiado largo!'};

            this.setError(error);
        }

        //Compruebo que el largo no sea menor a 7 caracteres
        if(largoMinimo(this.value, 1)){
            const error = {field: 'Fullname', message: 'El nombre proporcionado es demasiado corto!'};

            this.setError(error);
        }

    }





}
