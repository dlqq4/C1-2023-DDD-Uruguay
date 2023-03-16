import { ValueObjectErrorHandler } from "src/libs/sofka/bases/value-object-error-handler.base";
import { IcursoCreadoResponse } from "../../../domain/interfaces/responses/compra/cursoCreado.response";
import { IUseCase, ValueObjectException } from "src/libs";
import { CompraAggregate, CuponDomainEntity, DateValueObject, ICuponDomainEntityInterface, ICuponService, PorcentajeValueObject } from "../../../domain";
import { ICreateCuponMethod } from "../../../domain/interfaces/commands/compra/createCupon.command";
import { CuponCreadoEventPublisher } from "../../../domain/events/publishers/compra/cupon-creado.event-publisher";

export class CreateCuponUseCase <

//MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
Command extends ICreateCuponMethod = ICreateCuponMethod,
Response extends IcursoCreadoResponse = IcursoCreadoResponse>

extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

//LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT
private readonly compraAggregate: CompraAggregate

//INYECTO EL SERVICIO Y EL EVENTO NECESARIO
constructor(
    private readonly cuponService: ICuponService,
    private readonly cuponCreadoEventPublisher: CuponCreadoEventPublisher,    
    ) {
    super();
    this.compraAggregate = new CompraAggregate({ cuponService, cuponCreadoEventPublisher })
}

/*
Una función asíncrona es una función que devuelve una Promesa y puede
utilizar la palabra clave await para esperar a que se resuelva la Promesa
antes de continuar con la ejecución del código.
*/
async execute(command?: Command): Promise<Response> {
    const data = await this.executeCompraAggregate(command)
    return { success: data ? true : false, data } as unknown as Response
}

//METODO PARA EJECUTAR EL METODO DE MI AGREGADO
private executeCompraAggregate(cupon: ICuponDomainEntityInterface): Promise<CuponDomainEntity | null> {
    return this.compraAggregate.createCupon(cupon as ICreateCuponMethod)
}

//TRANSFORMO LOS STRING DE LA INTERFAZ COMMAND Y CREO LOS OBJETOS DE VALOR PARA PODER VALIDARLOS 
private createValueObject(command: Command): ICuponDomainEntityInterface {

    const dateCreateCupon = new DateValueObject(command.dateCreateCupon);
    const porcentajeCupon = new PorcentajeValueObject(command.porcentajeCupon);


    return { dateCreateCupon, porcentajeCupon}
}

//VALIDO LOS OBJETOS DE VALOR, SI HAY ERRORES LOS SETEO Y LOS MUESTRO
private validateValueObject(valueObject: ICuponDomainEntityInterface): void {
    const { dateCreateCupon, porcentajeCupon } = valueObject

    if (dateCreateCupon instanceof DateValueObject && dateCreateCupon.hasErrors())
        this.setErrors(dateCreateCupon.getErrors());

    if (porcentajeCupon instanceof PorcentajeValueObject && porcentajeCupon.hasErrors())
        this.setErrors(porcentajeCupon.getErrors());

    if (this.hasErrors() === true)
        throw new ValueObjectException('Hay algunos errores en el comando ejecutado por create-cupon.use-case',
            this.getErrors(),
        );
}

private createEntity(valueObject: ICuponDomainEntityInterface): CuponDomainEntity {
    const { dateCreateCupon, porcentajeCupon } = valueObject

    return new CuponDomainEntity({ dateCreateCupon: dateCreateCupon, porcentajeCupon: porcentajeCupon})
}


async executeCommand(command: Command): Promise<CuponDomainEntity | null> {

    const ValueObject = this.createValueObject(command); //CREO LOS OBJETOS DE VALOR
    this.validateValueObject(ValueObject); //VALIDO LOS OBJETOS DE VALOR
    const cupon = this.createEntity(ValueObject); //CREO MI ENTIDAD A PARTIR DE LOS OBJETOS DE VALOR

    return this.executeCompraAggregate(cupon);
}

}
