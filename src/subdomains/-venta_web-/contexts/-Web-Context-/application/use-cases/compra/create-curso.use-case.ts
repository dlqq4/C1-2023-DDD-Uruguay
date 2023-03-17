import { ValueObjectErrorHandler } from "src/libs/sofka/bases/value-object-error-handler.base";
import { ICreateCursoMethod } from "../../../domain/interfaces/commands/compra";
import { IcursoCreadoResponse } from "../../../domain/interfaces/responses/compra/cursoCreado.response";
import { IUseCase, ValueObjectException } from "src/libs";
import { CompraAggregate, CursoCreadoEventPublisher, CursoDomainEntity, ICompraService, ICursoDomainEntityInterface, ICursoService } from "../../../domain";
import { FullnameValueObject } from "../../../domain/value-objects/common-value-objects/fullname";
import { CostoValueObject } from "../../../domain/value-objects/common-value-objects/costo/costo.value-object";

export class CreateCursoUseCase <

//MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
Command extends ICreateCursoMethod = ICreateCursoMethod,
Response extends IcursoCreadoResponse = IcursoCreadoResponse>

extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

//LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT
private readonly compraAggregate: CompraAggregate

//INYECTO EL SERVICIO Y EL EVENTO NECESARIO
constructor(
    private readonly cursoService: ICursoService,
    private readonly cursoCreadoEventPublisher: CursoCreadoEventPublisher,    
    ) {
    super();
    this.compraAggregate = new CompraAggregate({ cursoService, cursoCreadoEventPublisher })
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
private executeCompraAggregate(curso: ICursoDomainEntityInterface): Promise<CursoDomainEntity | null> {
    return this.compraAggregate.createCurso(curso as ICreateCursoMethod)
}

//TRANSFORMO LOS STRING DE LA INTERFAZ COMMAND Y CREO LOS OBJETOS DE VALOR PARA PODER VALIDARLOS 
private createValueObject(command: Command): ICursoDomainEntityInterface {

    const nombreCurso = new FullnameValueObject(command.nombreCurso);
    const nombreTeacher = new FullnameValueObject(command.nombreTeacher);
    const costoCurso = new CostoValueObject(command.costoCurso);

    return { nombreCurso, nombreTeacher, costoCurso }
}

//VALIDO LOS OBJETOS DE VALOR, SI HAY ERRORES LOS SETEO Y LOS MUESTRO
private validateValueObject(valueObject: ICursoDomainEntityInterface): void {
    const { nombreCurso, nombreTeacher, costoCurso } = valueObject

    if (nombreCurso instanceof FullnameValueObject && nombreCurso.hasErrors())
        this.setErrors(nombreCurso.getErrors());

    if (nombreTeacher instanceof FullnameValueObject && nombreTeacher.hasErrors())
        this.setErrors(nombreTeacher.getErrors());

    if (costoCurso  instanceof CostoValueObject && costoCurso .hasErrors())
        this.setErrors(costoCurso .getErrors());

    if (this.hasErrors() === true)
        throw new ValueObjectException('Hay algunos errores en el comando ejecutado por create-curso.use-case',
            this.getErrors(),
        );
}

private createEntity(valueObject: ICursoDomainEntityInterface): CursoDomainEntity {
    const { nombreCurso, nombreTeacher, costoCurso } = valueObject

    return new CursoDomainEntity({ nombreCurso: nombreCurso, nombreTeacher: nombreTeacher, costoCurso: costoCurso})
}


async executeCommand(command: Command): Promise<CursoDomainEntity | null> {

    const ValueObject = this.createValueObject(command); //CREO LOS OBJETOS DE VALOR
    this.validateValueObject(ValueObject); //VALIDO LOS OBJETOS DE VALOR
    const curso = this.createEntity(ValueObject); //CREO MI ENTIDAD A PARTIR DE LOS OBJETOS DE VALOR

    return this.executeCompraAggregate(curso);
}

}
