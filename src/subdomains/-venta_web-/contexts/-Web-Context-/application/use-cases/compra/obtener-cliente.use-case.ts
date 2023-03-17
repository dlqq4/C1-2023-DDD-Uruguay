import { IUseCase, ValueObjectErrorHandler } from "src/libs";
import { IObtenerClienteMethod } from "../../../domain/interfaces/commands/cliente/ObtenerCliente.command";
import { IClienteConseguidoResponse } from "../../../domain/interfaces/responses/clienteConseguido.response";
import { ClienteDomainEntity, CompraAggregate, IClienteService, ICompraService } from "../../../domain";
import { ClienteConseguidoEventPublisher } from "../../../domain/events/publishers/compra/cliente/cliente-conseguido.event-publisher";


export class ObtenerClienteUseCase<

    //MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
    Command extends IObtenerClienteMethod = IObtenerClienteMethod,
    Response extends IClienteConseguidoResponse = IClienteConseguidoResponse>

    extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
    implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

    //LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT
    private readonly compraAggregate: CompraAggregate;

    /*INYECTO LAS DEPENDENCIAS, EL SERVICIO Y EL PUBLICADOR DE EVENTO DE CLIENTE OBTENIDO.
    ESTAS DEPENDENCIAS SE UTILIZAN PARA CREAR UN AGREGADO COMPRA, QUE SE UTILIZA PARA REALIZAR
    LA LOGICA DE ESTE CASO DE USO.
    */
    constructor(
        private readonly clienteService: IClienteService,
        private readonly clienteConseguidoEventPublisher: ClienteConseguidoEventPublisher) {
        super();
        this.compraAggregate = new CompraAggregate({ clienteService, clienteConseguidoEventPublisher })
    }

    
    /**
    ESTA FUNCION ASINCRONA DEVUELVE UNA PROMESA Y UTILIZA LA PALABRA CLAVE
    "await" PARA ESPERAR A QUE SE RESUELVA LA PROMESA
    ANTES DE CONTINUAR CON LA EJECUCION DE CODIGO
     * 
     * It executes a command and returns a response.
     * @param {Command} [command] - The command to execute.
     * @returns The response object is being returned.
     */
    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data } as unknown as Response
    }


    /**
     * The function receives a command, and returns a promise of a ClienteDomainEntity or null
     * @param {Command} command - Command - The command that is being executed.
     * @returns A promise of a ClienteDomainEntity or null
     */
    private async executeCommand(command: Command): Promise<ClienteDomainEntity | null> {
        return this.compraAggregate.obtenerCliente(command.idCliente)
    }

}
