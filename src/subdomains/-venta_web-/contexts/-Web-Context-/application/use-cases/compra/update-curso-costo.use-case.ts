
import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from "src/libs";
import { CompraAggregate, CursoConseguidoEventPublisher, CursoDomainEntity, ICompraService, ICursoDomainEntityInterface, ICursoService, IUpdateCostoMethod, UpdateCostoCursoEventPublisher } from "../../../domain";
import { ICostoCursoActualizadoResponse } from "../../../domain/interfaces/responses";
import { CostoValueObject } from "../../../domain/value-objects/common-value-objects/costo/costo.value-object";
import { ObtenerCursoUseCase } from "./obtener-curso.use-case";


export class UpdateCursoCostoUseCase<

    //MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
    Command extends IUpdateCostoMethod = IUpdateCostoMethod,
    Response extends ICostoCursoActualizadoResponse = ICostoCursoActualizadoResponse>

    extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
    implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

    //LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT
    private readonly compraAggregate: CompraAggregate
    private readonly obtenerCursoUseCase: ObtenerCursoUseCase

    //INYECTO EL SERVICIO Y EL EVENTO NECESARIO
    constructor(
        private readonly cursoService: ICursoService,
        private readonly updateCostoCursoEventPublisher: UpdateCostoCursoEventPublisher,
        private readonly cursoConseguidoEventPublisher: CursoConseguidoEventPublisher
    ) {
        super();
        this.compraAggregate = new CompraAggregate({ cursoService, updateCostoCursoEventPublisher, cursoConseguidoEventPublisher })
    }

    /*
    Una función asíncrona es una función que devuelve una Promesa y puede
    utilizar la palabra clave await para esperar a que se resuelva la Promesa
    antes de continuar con la ejecución del código.
    */
    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command)
        return { success: data ? true : false, data } as unknown as Response
    }

    //METODO PARA EJECUTAR EL METODO DE MI AGREGADO
    private executeCompraAggregate(data: ICursoDomainEntityInterface): Promise<CursoDomainEntity | null> {
        return this.compraAggregate.updateCosto(data as IUpdateCostoMethod)
    }

    //TRANSFORMO LOS STRING DE LA INTERFAZ COMMAND Y CREO LOS OBJETOS DE VALOR PARA PODER VALIDARLOS 
    private createValueObject(command: Command): ICursoDomainEntityInterface {

        const costoCurso = new CostoValueObject(command.costoCurso);

        return { costoCurso }
    }

    //VALIDO LOS OBJETOS DE VALOR, SI HAY ERRORES LOS SETEO Y LOS MUESTRO
    private validateValueObject(valueObject: ICursoDomainEntityInterface): void {
        const { costoCurso } = valueObject


        if (costoCurso instanceof CostoValueObject && costoCurso.hasErrors())
            this.setErrors(costoCurso.getErrors());


        if (this.hasErrors() === true)
            throw new ValueObjectException('Hay algunos errores en el comando ejecutado por update-curso-costo.use-case',
                this.getErrors(),
            );
    }

    private async createEntity(valueObject: ICursoDomainEntityInterface): Promise<CursoDomainEntity> {
        const { costoCurso, idCurso } = valueObject

        const getCurso = new ObtenerCursoUseCase(this.cursoService, this.cursoConseguidoEventPublisher)

        const respuestaCurso = await getCurso.execute({ idCurso: idCurso.valueOf() }) 

        respuestaCurso.data.costoCurso = costoCurso.valueOf() 

        return await respuestaCurso.data

       // return new CursoDomainEntity({ idCurso: idCurso.valueOf(), costoCurso: costoCurso.valueOf() })
    }


    async executeCommand(command: Command): Promise<CursoDomainEntity | null> {

        //const ValueObject = this.createValueObject(command); //CREO LOS OBJETOS DE VALOR
        //this.validateValueObject(ValueObject); //VALIDO LOS OBJETOS DE VALOR
        const cliente =  await this.createEntity({
            idCurso: command.idCurso.valueOf(),
            costoCurso: command.costoCurso.valueOf()
        }); //CREO MI ENTIDAD A PARTIR DE LOS OBJETOS DE VALOR

        return this.executeCompraAggregate(cliente);
    }



}
