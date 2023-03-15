import { IUpdatePhoneMethod } from "../interfaces/commands/cliente/updatePhone.command";

import { IUpdateNombreMethod } from "../interfaces/commands/membership/plan/updateNombre.command";
import { ClienteDomainEntity, PlanDomainEntity } from "../entities";
import { MembershipDomainEntity } from "../entities/membership/membership.domain-entity";
import { ICreateClienteMethod } from "../interfaces/commands/cliente/createCliente.command";
import { ICreateMembershipMethod } from "../interfaces/commands/membership/createMembership.command";
import { ICreatePlanMethod } from "../interfaces/commands/membership/createPlan.command";
import { IClienteService } from "../services/cliente.service";
import { IMembershipService} from "../services/membership.service";
import { IPlanService } from "../services/plan.service";
import { UpdatePhoneEventPublisher } from "../events/publishers/compra/cliente/update-phone.event-publisher";
import { ClienteCreadoEventPublisher } from "../events/publishers/compra/cliente-creado.event-publisher";
import { MembershipCreadaEventPublisher } from "../events/publishers/membership/membresia-creada.event-publisher";
import { PlanCreadoEventPublisher } from "../events/publishers/membership/plan-creado.event-publisher";
import { UpdateNombrePlanEventPublisher } from "../events/publishers/membership/plan/update-nombre.event-publisher";
import { UpdateCostoPlanEventPublisher } from "../events/publishers/membership/plan/update-costo.event-publisher";
import { AggregateRootException } from "src/libs/sofka/exceptions/aggregate-root.exception";
import { ClienteConseguidoEventPublisher } from "../events/publishers/compra/cliente/cliente-conseguido.event-publisher";
import { PlanConseguidoEventPublisher } from "../events/publishers/membership/plan/plan-conseguido.event-publisher";
import { IUpdateCostoMethod } from "../interfaces/commands/membership/plan/updatecosto.command";


export class MembershipAggregate implements IClienteService, IPlanService, IMembershipService {


    //CREO INSTANCIAS DE CADA SERVICIO RELACIONADO A MI AGREGADO
    private readonly clienteService?: IClienteService;
    private readonly planService?: IPlanService;
    private readonly membershipService?: IMembershipService;


    //CREO INSTANCIAS DE LOS PUBLISHERS RELACIONADOS A MI AGREGADO
    private readonly updatePhoneEventPublisher?: UpdatePhoneEventPublisher;
    private readonly clienteCreadoEventPublisher?: ClienteCreadoEventPublisher;
    private readonly membershipCreadaEventPublisher?: MembershipCreadaEventPublisher;
    private readonly planCreadoEventPublisher?: PlanCreadoEventPublisher;
    private readonly updateNombrePlanEventPublisher?: UpdateNombrePlanEventPublisher;
    private readonly updateCostoPlanEventPublisher?: UpdateCostoPlanEventPublisher;
    private readonly clienteConseguidoEventPublisher?: ClienteConseguidoEventPublisher;
    private readonly planConseguidoEventPublisher?: PlanConseguidoEventPublisher;


    constructor({

        //Constructor recibe objetos
        clienteService,
        planService,
        membershipService,

        updatePhoneEventPublisher,
        clienteCreadoEventPublisher,
        membershipCreadaEventPublisher,
        planCreadoEventPublisher,
        updateNombrePlanEventPublisher,
        updateCostoPlanEventPublisher,
        clienteConseguidoEventPublisher,
        planConseguidoEventPublisher

    }: {
   
        clienteService?: IClienteService;
        planService?: IPlanService;
        membershipService?: IMembershipService;     

        updatePhoneEventPublisher?: UpdatePhoneEventPublisher;
        clienteCreadoEventPublisher?: ClienteCreadoEventPublisher;
        membershipCreadaEventPublisher?: MembershipCreadaEventPublisher;
        planCreadoEventPublisher?: PlanCreadoEventPublisher;
        updateNombrePlanEventPublisher?: UpdateNombrePlanEventPublisher;
        updateCostoPlanEventPublisher?: UpdateCostoPlanEventPublisher;
        clienteConseguidoEventPublisher?: ClienteConseguidoEventPublisher;
        planConseguidoEventPublisher?: PlanConseguidoEventPublisher;
      

    }) {

        this.clienteService = clienteService;
        this.planService = planService;
        this.membershipService = membershipService;

        this.updatePhoneEventPublisher = updatePhoneEventPublisher;
        this.clienteCreadoEventPublisher = clienteCreadoEventPublisher;
        this.membershipCreadaEventPublisher = membershipCreadaEventPublisher;
        this.planCreadoEventPublisher = planCreadoEventPublisher;
        this.updateNombrePlanEventPublisher = updateNombrePlanEventPublisher;
        this.updateCostoPlanEventPublisher = updateCostoPlanEventPublisher;  
        this.clienteConseguidoEventPublisher = clienteConseguidoEventPublisher;
        this.planConseguidoEventPublisher = planConseguidoEventPublisher;

    }


    async createMembership(membership: ICreateMembershipMethod): Promise<MembershipDomainEntity> {
        if (this.membershipService && this.membershipCreadaEventPublisher) {
            const result = await this.membershipService.createMembership(membership);
            this.membershipCreadaEventPublisher.response = result;
            this.membershipCreadaEventPublisher.publish();
            return this.membershipCreadaEventPublisher.response;
          }
          throw new AggregateRootException(
            'Faltan definir datos',
          );
    }

    async createCliente(cliente: ICreateClienteMethod): Promise<ClienteDomainEntity> {
        if (this.membershipService && this.clienteCreadoEventPublisher) {
            const result = await this.clienteService.createCliente(cliente);
            this.clienteCreadoEventPublisher.response = result;
            this.clienteCreadoEventPublisher.publish();
            return this.clienteCreadoEventPublisher.response;
          }
          throw new AggregateRootException(
            'Faltan definir datos',
          );
    }

    async createPlan(plan: ICreatePlanMethod): Promise<PlanDomainEntity> {
        if (this.membershipService && this.planCreadoEventPublisher) {
            const result = await this.planService.createPlan(plan);
            this.planCreadoEventPublisher.response = result;
            this.planCreadoEventPublisher.publish();
            return this.planCreadoEventPublisher.response;
          }
          throw new AggregateRootException(
            'Faltan definir datos',
          );
    }

    async updatePhone(data: IUpdatePhoneMethod): Promise<ClienteDomainEntity> {
        if (this.clienteService && this.updatePhoneEventPublisher) {
            const result = await this.clienteService.updatePhone(data);
            this.updatePhoneEventPublisher.response = result;
            this.updatePhoneEventPublisher.publish();
            return this.updatePhoneEventPublisher.response;
          }
          throw new AggregateRootException(
            'Faltan definir datos',
          );
    }

    async updateNombre(data: IUpdateNombreMethod): Promise<PlanDomainEntity> {
        if (this.planService && this.updateNombrePlanEventPublisher) {
            const result = await this.planService.updateNombre(data);
            this.updateNombrePlanEventPublisher.response = result;
            this.updateNombrePlanEventPublisher.publish();
            return this.updateNombrePlanEventPublisher.response;
          }
          throw new AggregateRootException(
            'Faltan definir datos',
          );
    }

    async updateCosto(data: IUpdateCostoMethod): Promise<PlanDomainEntity> {
        if (this.planService && this.updateCostoPlanEventPublisher) {
            const result = await this.planService.updateCosto(data);
            this.updateCostoPlanEventPublisher.response = result;
            this.updateCostoPlanEventPublisher.publish();
            return this.updateCostoPlanEventPublisher.response;
          }
          throw new AggregateRootException(
            'Faltan definir datos',
          );
    }

    //METODOS PARA OBTENER LAS ENTIDADES 
    async obtenerCliente(client: string): Promise<ClienteDomainEntity> {
      
      if (this.membershipService && this.clienteConseguidoEventPublisher) {
        const result = await this.clienteService.obtenerCliente(client);
        this.clienteConseguidoEventPublisher.response = result;
        this.clienteConseguidoEventPublisher.publish();
        return this.clienteConseguidoEventPublisher.response;
      }
      throw new AggregateRootException(
        'Faltan definir datos',
      );

    }
    

    async obtenerPlan(plane: string): Promise<PlanDomainEntity> {
      if (this.membershipService && this.planConseguidoEventPublisher) {
        const result = await this.planService.obtenerPlan(plane);
        this.planConseguidoEventPublisher.response = result;
        this.planConseguidoEventPublisher.publish();
        return this.planConseguidoEventPublisher.response;
      }
      throw new AggregateRootException(
        'Faltan definir datos',
      );

    }


    
}
