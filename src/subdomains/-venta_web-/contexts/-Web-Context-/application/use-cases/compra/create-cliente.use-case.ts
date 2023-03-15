import { ValueObjectErrorHandler } from "src/libs/sofka/bases/value-object-error-handler.base";
import { ICreateClienteMethod } from "../../../domain/interfaces/commands/cliente/createCliente.command";
import { IUseCase } from "src/libs/sofka/interface/use-case.interface";
import { CompraAggregate } from "../../../domain/aggregates";
import { ClienteCreadoEventPublisher } from "../../../domain/events/publishers/compra/cliente-creado.event-publisher";
import { ClienteDomainEntity } from "../../../domain/entities/common-entities/cliente.domain-entity";
import { EmailValueObject } from "../../../domain/value-objects/cliente/email/email.value-object";
import { PhoneValueObject } from "../../../domain/value-objects/cliente/phone/phone.value-object";
import { FullnameValueObject } from "../../../domain/value-objects/common-value-objects/fullname";
import { IClienteDomainEntityInterface } from "../../../domain/entities/interfaces/i-cliente.domain-entity.interface";
import { ValueObjectException } from "src/libs/sofka/exceptions/object-value.exception";
import { IClienteService } from "../../../domain/services/cliente.service";
import { IClienteCreadoResponse } from "../../../domain/interfaces/responses/clienteCreado.response";


export class CreateClienteUseCase<

    //MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
    Command extends ICreateClienteMethod = ICreateClienteMethod,
    Response extends IClienteCreadoResponse = IClienteCreadoResponse>

    extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
    implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

    //LO PRIMERO QUE NECESITO ES DECLARAR LA PROPIEDAD DEL AGREGADO ROOT
    private readonly compraAggregate: CompraAggregate

    //INYECTO EL SERVICIO Y EL EVENTO NECESARIO
    constructor(
        private readonly clienteService : IClienteService,
        private readonly clienteCreadoEventPublisher: ClienteCreadoEventPublisher) {
        super();
        this.compraAggregate = new CompraAggregate({ clienteCreadoEventPublisher, clienteService })
    }


     //TRANSFORMO LOS STRING DE LA INTERFAZ COMMAND Y CREO LOS OBJETOS DE VALOR PARA PODER VALIDARLOS 
     private createValueObject(command: Command): IClienteDomainEntityInterface {

        const nombreCliente = new FullnameValueObject(command.nombreCliente);
        const phoneCliente = new PhoneValueObject(command.phoneCliente);
        const emailCliente = new EmailValueObject(command.emailCliente);

        return { nombreCliente, phoneCliente, emailCliente }
    }

     //VALIDO LOS OBJETOS DE VALOR, SI HAY ERRORES LOS SETEO Y LOS MUESTRO
     private validateValueObject(valueObject: IClienteDomainEntityInterface): void {
        const { nombreCliente, phoneCliente, emailCliente } = valueObject

        if (nombreCliente instanceof FullnameValueObject && nombreCliente.hasErrors())
            this.setErrors(nombreCliente.getErrors());

        if (phoneCliente instanceof PhoneValueObject && phoneCliente.hasErrors())
            this.setErrors(phoneCliente.getErrors());

        if (emailCliente instanceof EmailValueObject && emailCliente.hasErrors())
            this.setErrors(emailCliente.getErrors());

        if (this.hasErrors() === true)
            throw new ValueObjectException('Hay algunos errores en el comando ejecutado por create-cliente.use-case',
                this.getErrors(),
            );
    }

    //CREO LA ENTIDAD CLIENTE A PARTIR DE LOS OBJETOS DE VALOR VALIDADOS
    private createEntity(valueObject: IClienteDomainEntityInterface): ClienteDomainEntity {
        const { nombreCliente, phoneCliente, emailCliente } = valueObject

        return new ClienteDomainEntity({ nombreCliente: nombreCliente, phoneCliente: phoneCliente, emailCliente: emailCliente})
    }


    // LUEGO DE CREADA LA ENTIDAD LE PASO EL CLIENTE A EL METODO "CREATECLIENTE" DE MI AGREGADO
    private executeCompraAggregate(cliente: IClienteDomainEntityInterface): Promise<ClienteDomainEntity | null> {
        return this.compraAggregate.createCliente(cliente as ICreateClienteMethod)
    }


    async executeCommand(command: Command): Promise<ClienteDomainEntity | null> {

        const ValueObject = this.createValueObject(command); //CREO LOS OBJETOS DE VALOR
        this.validateValueObject(ValueObject); //VALIDO LOS OBJETOS DE VALOR
        const cliente = this.createEntity(ValueObject); //CREO MI ENTIDAD A PARTIR DE LOS OBJETOS DE VALOR

        return this.executeCompraAggregate(cliente);
    }

    /*
     ESTA FUNCION ASINCRONA DEVUELVE UNA PROMESA Y UTILIZA LA PALABRA CLAVE
    "await" PARA ESPERAR A QUE SE RESUELVA LA PROMESA
    ANTES DE CONTINUAR CON LA EJECUCION DE CODIGO
    */
    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCompraAggregate(command)
        return { success: data ? true : false, data } as unknown as Response
    }

    




}
