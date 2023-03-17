import { ValueObjectBase } from "src/libs/sofka/bases";
import { costoValorOk } from "src/libs/validations/costo-validation";

export class CostoValueObject extends ValueObjectBase<number>{
    

    constructor(value? : number){
        super(value ? value : null)
    }
    
    
    validateData(): void {
       // this.valorPositivo();
       
    }


    private valorPositivo() : void {

        //Valido la existencia de un valor
        if (this.value) {
            const error = { field: 'Costo', message: 'El costo esta vacio!'};

            this.setError(error);
        }


        //Valido que el valor sea positivo
        if (costoValorOk(this.value)) {
            const error = { field: 'Costo', message: 'El costo no puede ser menor a cero!'};

            this.setError(error);
        }

    }
}
