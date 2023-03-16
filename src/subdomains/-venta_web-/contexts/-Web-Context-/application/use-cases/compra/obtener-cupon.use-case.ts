import { IUseCase, ValueObjectErrorHandler } from "src/libs";
import { CompraAggregate, CuponConseguidoEventPublisher, CuponDomainEntity, ICuponService, IObtenerCuponMethod } from "../../../domain";
import { ICuponConseguidoResponse } from "../../../domain/interfaces/responses/compra/cuponConseguido.response";


export class ObtenerCuponUseCase<

    //MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
    Command extends IObtenerCuponMethod = IObtenerCuponMethod,
    Response extends ICuponConseguidoResponse = ICuponConseguidoResponse>

    extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
    implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

    //LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT
    private readonly compraAggregate: CompraAggregate;

    //INYECTO EL SERVICIO Y EL EVENTO NECESARIO
    constructor(
        private readonly cuponService: ICuponService,
        private readonly cuponConseguidoEventPublisher: CuponConseguidoEventPublisher) {
        super();
        this.compraAggregate = new CompraAggregate({ cuponService, cuponConseguidoEventPublisher })
    }

    /*
   ESTA FUNCION ASINCRONA DEVUELVE UNA PROMESA Y UTILIZA LA PALABRA CLAVE
   "await" PARA ESPERAR A QUE SE RESUELVA LA PROMESA
   ANTES DE CONTINUAR CON LA EJECUCION DE CODIGO
   */
    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data } as unknown as Response
    }

    private async executeCommand(command: Command): Promise<CuponDomainEntity | null> {
        return this.compraAggregate.obtenerCupon(command.idCupon)
    }

}
