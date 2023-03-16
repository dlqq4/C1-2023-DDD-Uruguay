import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from "src/libs";
import { ClienteConseguidoEventPublisher, CompraAggregate, CompraCreadaEventPublisher, CompraDomainEntity, CuponConseguidoEventPublisher, CursoConseguidoEventPublisher, IClienteService, ICompraCreadaResponse, ICompraDomainEntityInterface, ICompraService, ICreateCompraMethod, ICuponService, ICursoService, UuidValueObject } from "../../../domain";
import { ObtenerClienteUseCase } from "./obtener-cliente.use-case";
import { ObtenerCursoUseCase } from "./obtener-curso.use-case";
import { ObtenerCuponUseCase } from "./obtener-cupon.use-case";



export class CreateCompraUseCase<

    //MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
    Command extends ICreateCompraMethod = ICreateCompraMethod,
    Response extends ICompraCreadaResponse = ICompraCreadaResponse>

    extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
    implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

    //LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT 
    //Y LOS CASOS DE USO QUE EJECUTAN EL METODO QUE ME PERMITE OBTENER LAS ENTIDADES
    private readonly compraAggregate: CompraAggregate
    private readonly obtenerClienteUseCase: ObtenerClienteUseCase
    private readonly obtenerCursoeUseCase: ObtenerCursoUseCase
    private readonly obtenerCuponeUseCase : ObtenerCuponUseCase

    //INYECTO EL SERVICIO Y EL EVENTO NECESARIO
    constructor(
        private readonly compraService: ICompraService,
        private readonly clienteService: IClienteService,
        private readonly cursoService: ICursoService,
        private readonly cuponService: ICuponService,


        private readonly compraCreadaEventPublisher: CompraCreadaEventPublisher,
        private readonly clienteConseguidoEventPublisher: ClienteConseguidoEventPublisher,
        private readonly cursoConseguidoEventPublisher: CursoConseguidoEventPublisher,
        private readonly cuponConseguidoEventPublisher: CuponConseguidoEventPublisher,
        ) {
        super();
        this.compraAggregate = new CompraAggregate({clienteService, cursoService, cuponService, compraService, compraCreadaEventPublisher, clienteConseguidoEventPublisher,cursoConseguidoEventPublisher, cuponConseguidoEventPublisher})
    }

    /*
   ESTA FUNCION ASINCRONA DEVUELVE UNA PROMESA Y UTILIZA LA PALABRA CLAVE
   "await" PARA ESPERAR A QUE SE RESUELVA LA PROMESA
   ANTES DE CONTINUAR CON LA EJECUCION DE CODIGO
   */
    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command)

        return { success: data ? true : false, data } as unknown as Response
    }

    //METODO PARA EJECUTAR EL METODO DE MI AGREGADO
    private async executeCompraAggregate(compra: CompraDomainEntity): Promise<CompraDomainEntity | null> {
        return this.compraAggregate.createCompra(compra)
    }


    private async createEntity(command: Command): Promise<CompraDomainEntity> {

        const getCliente = new ObtenerClienteUseCase(this.clienteService, this.clienteConseguidoEventPublisher)
        const getCurso = new ObtenerCursoUseCase(this.cursoService, this.cursoConseguidoEventPublisher)
        const getCupon = new ObtenerCuponUseCase(this.cuponService, this.cuponConseguidoEventPublisher)

        const respuestaCliente = await getCliente.execute({ idCliente: command.idCliente }) 
        const respuestaCurso = await getCurso.execute({ idCurso: command.idCurso })
        const respuestaCupon = await getCupon.execute({ idCupon: command.idCupon })

        return new CompraDomainEntity({ idCliente: (respuestaCliente).data, idCurso: (respuestaCurso).data, idCupon: (respuestaCupon).data })
    }


    async executeCommand(command: Command): Promise<CompraDomainEntity | null> {
        const compraEntity = await this.createEntity(command);

        return await this.executeCompraAggregate(compraEntity);
        //return this.executeCompraAggregate(await compraEntity);
    }


}
