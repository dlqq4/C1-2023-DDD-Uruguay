import { IUseCase, ValueObjectErrorHandler } from "src/libs";
import { IObtenerPlanMethod } from "../../../domain/interfaces/commands/membership/plan/ObtenerPlan.command";
import { IPlanConseguidoResponse } from "../../../domain/interfaces/responses/membership/planConseguido.response";
import { IMembershipService, IPlanService, MembershipAggregate, PlanDomainEntity } from "../../../domain";
import { PlanConseguidoEventPublisher } from "../../../domain/events/publishers/membership/plan/plan-conseguido.event-publisher";

export class ObtenerPlanUseCase<

    //MI CASO DE USO NECESITA EL COMANDO Y LA RESPONSE.
    Command extends IObtenerPlanMethod = IObtenerPlanMethod,
    Response extends IPlanConseguidoResponse = IPlanConseguidoResponse>

    extends ValueObjectErrorHandler //EXTIENDO PARA EL MANEJO DE ERRORES
    implements IUseCase<Command, Response>{ //IMPLEMENTO LA INTERFAZ PARA EJECUTAR EL CASO DE USO

    //LO PRIMERO QUE NECESITO ES EL AGREGADO ROOT
    private readonly membershipAggregate: MembershipAggregate;

    //INYECTO EL SERVICIO Y EL EVENTO NECESARIO
    constructor(
        private readonly planService: IPlanService,
        private readonly planConseguidoEventPublisher: PlanConseguidoEventPublisher) {
        super();
        this.membershipAggregate = new MembershipAggregate({ planService, planConseguidoEventPublisher })
    }

    /*
   Una función asíncrona es una función que devuelve una Promesa y puede
   utilizar la palabra clave await para esperar a que se resuelva la Promesa
   antes de continuar con la ejecución del código.
   */
    async execute(command?: Command): Promise<Response> {
        const data = await this.executeCommand(command);

        return { success: data ? true : false, data } as unknown as Response
    }


    private async executeCommand(command: Command): Promise<PlanDomainEntity | null> {
        return this.membershipAggregate.obtenerPlan(command.idPlan)
    }

}
