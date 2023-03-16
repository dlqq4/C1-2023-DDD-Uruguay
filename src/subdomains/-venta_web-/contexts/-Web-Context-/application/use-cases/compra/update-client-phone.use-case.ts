import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from "src/libs";
import { ClienteConseguidoEventPublisher, ClienteDomainEntity, CompraAggregate, IClienteDomainEntityInterface, IClienteService, IClientephoneActualizadoResponse, ICompraService, IUpdatePhoneMethod, PhoneValueObject, UpdatePhoneEventPublisher } from "../../../domain";
import { ObtenerClienteUseCase } from "./obtener-cliente.use-case";

export class UpdateClientPhoneUseCase<

    //MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
    Command extends IUpdatePhoneMethod = IUpdatePhoneMethod,
    Response extends IClientephoneActualizadoResponse = IClientephoneActualizadoResponse>

    extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
    implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

    //LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT
    private readonly compraAggregate: CompraAggregate
    private readonly obtenerClienteUseCase: ObtenerClienteUseCase

    //INYECTO EL SERVICIO Y EL EVENTO NECESARIO
    constructor(
        private readonly clienteService: IClienteService,
        private readonly clienteConseguidoEventPublisher: ClienteConseguidoEventPublisher,
        private readonly updatePhoneEventPublisher: UpdatePhoneEventPublisher) {
        super();
        this.compraAggregate = new CompraAggregate({ updatePhoneEventPublisher, clienteService, clienteConseguidoEventPublisher})
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
    private async executeCompraAggregate(data: IClienteDomainEntityInterface): Promise<ClienteDomainEntity | null> {
        return await this.compraAggregate.updatePhone(data as IUpdatePhoneMethod)
    }

    //TRANSFORMO LOS STRING DE LA INTERFAZ COMMAND Y CREO LOS OBJETOS DE VALOR PARA PODER VALIDARLOS 
    private createValueObject(command: Command): IClienteDomainEntityInterface {

        const phoneCliente = new PhoneValueObject(command.phoneCliente);

        return { phoneCliente }
    }

    //VALIDO LOS OBJETOS DE VALOR, SI HAY ERRORES LOS SETEO Y LOS MUESTRO
    private validateValueObject(valueObject: IClienteDomainEntityInterface): void {
        const {  phoneCliente  } = valueObject


        if (phoneCliente instanceof PhoneValueObject && phoneCliente.hasErrors())
            this.setErrors(phoneCliente.getErrors());


        if (this.hasErrors() === true)
            throw new ValueObjectException('Hay algunos errores en el comando ejecutado por create-cliente.use-case',
                this.getErrors(),
            );
    }

    private async createEntity(valueObject: IClienteDomainEntityInterface): Promise<ClienteDomainEntity> {
        

        const { phoneCliente, idCliente } = valueObject

        const getCliente = new ObtenerClienteUseCase(this.clienteService, this.clienteConseguidoEventPublisher)
        
        const respuestaCliente = await getCliente.execute({ idCliente: idCliente.valueOf() }) 

        respuestaCliente.data.phoneCliente = phoneCliente.valueOf()  

        return await respuestaCliente.data
     
    }


    async executeCommand(command: Command): Promise<ClienteDomainEntity | null> {

        //const ValueObject = this.createValueObject(command); //CREO LOS OBJETOS DE VALOR
        //this.validateValueObject(ValueObject); //VALIDO LOS OBJETOS DE VALOR
        const cliente = await this.createEntity({ 
            idCliente: command.idCliente.valueOf(),
            phoneCliente: command.phoneCliente.valueOf()
        }); //CREO MI ENTIDAD A PARTIR DE LOS OBJETOS DE VALOR

        return await this.executeCompraAggregate(cliente as IClienteDomainEntityInterface);
    }

    

}
