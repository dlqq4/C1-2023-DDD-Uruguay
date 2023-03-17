
import { IUseCase, ValueObjectErrorHandler, ValueObjectException } from "src/libs";
import { ClienteCreadoEventPublisher, ClienteDomainEntity, CostoValueObject, DateValueObject, IClienteDomainEntityInterface, IClienteService, IMembershipService, IPlanDomainEntityInterface, IPlanService, MembershipAggregate, PlanCreadoEventPublisher, PlanDomainEntity } from "../../../domain";
import { FullnameValueObject } from "../../../domain/value-objects/common-value-objects/fullname";
import { PhoneValueObject } from "../../../domain/value-objects/cliente/phone/phone.value-object";
import { EmailValueObject } from "../../../domain/value-objects/cliente/email/email.value-object";
import { ICreatePlanMethod } from "../../../domain/interfaces/commands/membership";
import { IPlanCreadoResponse } from "../../../domain/interfaces/responses/membership/planCreado.response";

export class CreatePlanUseCase<

    //MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
    Command extends ICreatePlanMethod = ICreatePlanMethod,
    Response extends IPlanCreadoResponse = IPlanCreadoResponse>

    extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
    implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

    //LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT
    private readonly membershipAggregate: MembershipAggregate

    //INYECTO EL SERVICIO Y EL EVENTO NECESARIO
    constructor(
        private readonly planService: IPlanService,
        private readonly planCreadoEventPublisher: PlanCreadoEventPublisher) {
        super();
        this.membershipAggregate = new MembershipAggregate({ planService, planCreadoEventPublisher })
    }

    /*
    Una función asíncrona es una función que devuelve una Promesa y puede
    utilizar la palabra clave await para esperar a que se resuelva la Promesa
    antes de continuar con la ejecución del código.
    */
    async execute(command?: Command): Promise<Response> {
        const data = await this.executeMembershipAggregate(command)
        return { success: data ? true : false, data } as unknown as Response
    }

    //METODO PARA EJECUTAR EL METODO DE MI AGREGADO
    private executeMembershipAggregate(plan: IPlanDomainEntityInterface): Promise<PlanDomainEntity | null> {
        return this.membershipAggregate.createPlan(plan as ICreatePlanMethod)
    }

    //TRANSFORMO LOS STRING DE LA INTERFAZ COMMAND Y CREO LOS OBJETOS DE VALOR PARA PODER VALIDARLOS 
    private createValueObject(command: Command): IPlanDomainEntityInterface {

        const nombrePlan = new FullnameValueObject(command.nombrePlan);
        const dateInicioPlan = new DateValueObject(command.dateInicioPlan);
        const dateFinPlan = new DateValueObject(command.dateFinPlan);
        const costoPlan = new CostoValueObject(command.costoPlan);



        return { costoPlan, dateFinPlan, dateInicioPlan, nombrePlan }
    }

    //VALIDO LOS OBJETOS DE VALOR, SI HAY ERRORES LOS SETEO Y LOS MUESTRO
    private validateValueObject(valueObject: IPlanDomainEntityInterface): void {
        const { costoPlan, dateFinPlan, dateInicioPlan, nombrePlan } = valueObject

        if (nombrePlan instanceof FullnameValueObject && nombrePlan.hasErrors())
            this.setErrors(nombrePlan.getErrors());

        if (dateInicioPlan instanceof DateValueObject && dateInicioPlan.hasErrors())
            this.setErrors(dateInicioPlan.getErrors());

        if (dateFinPlan instanceof DateValueObject && dateFinPlan.hasErrors())
            this.setErrors(dateFinPlan.getErrors());

        if (costoPlan instanceof CostoValueObject && costoPlan.hasErrors())
            this.setErrors(costoPlan.getErrors());

        if (this.hasErrors() === true)
            throw new ValueObjectException('Hay algunos errores en el comando ejecutado por create-plan.use-case',
                this.getErrors(),
            );
    }

    private createEntity(valueObject: IPlanDomainEntityInterface): PlanDomainEntity {
        const { costoPlan, dateFinPlan, dateInicioPlan, nombrePlan } = valueObject

        return new PlanDomainEntity({ nombrePlan: nombrePlan, dateInicioPlan: dateInicioPlan, dateFinPlan: dateFinPlan, costoPlan: costoPlan })
    }


    async executeCommand(command: Command): Promise<PlanDomainEntity | null> {

        const ValueObject = this.createValueObject(command); //CREO LOS OBJETOS DE VALOR
        this.validateValueObject(ValueObject); //VALIDO LOS OBJETOS DE VALOR
        const plan = this.createEntity(ValueObject); //CREO MI ENTIDAD A PARTIR DE LOS OBJETOS DE VALOR

        return this.executeMembershipAggregate(plan);
    }
}