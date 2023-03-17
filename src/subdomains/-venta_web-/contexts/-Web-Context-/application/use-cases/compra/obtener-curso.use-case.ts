import { IUseCase, ValueObjectErrorHandler } from "src/libs";
import { IObtenerCursoMethod } from "../../../domain/interfaces/commands/compra/curso/obtenerCurso.command";
import { ICursoConseguidoResponse } from "../../../domain/interfaces/responses/compra/cursoConseguido.response";
import { CompraAggregate, CursoDomainEntity, ICompraService, ICursoService } from "../../../domain";
import { CursoConseguidoEventPublisher } from "../../../domain/events/publishers/compra/curso/curso-conseguido.event-publisher";


export class ObtenerCursoUseCase<

    //MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
    Command extends IObtenerCursoMethod = IObtenerCursoMethod,
    Response extends ICursoConseguidoResponse = ICursoConseguidoResponse>

    extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
    implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

    //LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT
    private readonly compraAggregate: CompraAggregate;

    //INYECTO EL SERVICIO Y EL EVENTO NECESARIO
    constructor(
        private readonly cursoService: ICursoService,
        private readonly cursoConseguidoEventPublisher: CursoConseguidoEventPublisher) {
        super();
        this.compraAggregate = new CompraAggregate({ cursoService, cursoConseguidoEventPublisher })
    }


    /**
    ESTA FUNCION ASINCRONA DEVUELVE UNA PROMESA Y UTILIZA LA PALABRA CLAVE
    "await" PARA ESPERAR A QUE SE RESUELVA LA PROMESA
    ANTES DE CONTINUAR CON LA EJECUCION DE CODIGO
     * 
     * It executes a command and returns a response.
     * @param {Command} [command] - The command to execute.
     * @returns { success: data ? true : false, data } as unknown as Response
     */
    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data } as unknown as Response
    }


    /**
     * The function receives a command, and returns a promise of a CursoDomainEntity or null
     * @param {Command} command - Command - The command object that was passed to the command handler.
     * @returns The aggregate root
     */
    private async executeCommand(command: Command): Promise<CursoDomainEntity | null> {
        return this.compraAggregate.obtnerCurso(command.idCurso)
    }


}
