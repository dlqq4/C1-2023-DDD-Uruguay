import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateClienteCommand } from '../utils/commands/createCliente.command';
import {  CreateCursoUseCase, ObtenerClienteUseCase, ObtenerCursoUseCase,  UpdateCursoCostoUseCase } from '../../application/use-cases/compra';
import { IUpdatePhoneCommand } from '../utils/commands/updatePhone.command';
import { UpdatePhoneEventPublisher } from '../../domain/events/publishers/compra/cliente/update-phone.event-publisher';
import { IUpdateCostoCommand } from '../utils/commands/compra/curso/updateCosto.command';
import { UpdateCostoCursoEventPublisher } from '../../domain/events/publishers/compra/curso/update-costo.event-publisher';
import { CursoConseguidoEventPublisher } from '../../domain/events/publishers/compra/curso/curso-conseguido.event-publisher';
import { IObtenerCursoCommand } from '../utils/commands/compra/curso/obtenerCurso.command';
import { IObtenerClienteCommand } from '../utils/commands/ObtenerCliente.command';
import { ClienteConseguidoEventPublisher } from '../../domain/events/publishers/compra/cliente/cliente-conseguido.event-publisher';
import { CreateClienteUseCase } from '../../application/use-cases/membership/create-cliente.use-case';
import { IMembershipService } from '../../domain/services/membership.service';
import { ICreatePlanCommand } from '../utils/commands/membership/createPlan.command';
import { CreatePlanUseCase } from '../../application/use-cases/membership/create-plan.use-case';
import { UpdateClientPhoneUseCase } from '../../application/use-cases/membership/update-client-phone.use-case';
import { ICreateMembershipCommand } from '../utils/commands/membership/createMembership.command';
import { CreateMembershipUseCase } from '../../application/use-cases/membership/create-membership.use-case';
import { CreateMembershipPublisher, CreatePlanPublisher, ObtenerPlanPublisher } from '../messaging/publisher/membership';
import { CreateClientePublisher, ObtenerClientePublisher, UpdatePhonePublisher } from '../messaging/publisher';
import { MembershipService } from '../persistence/services/membership.service';
import { ClienteService } from '../persistence/services/cliente.service';
import { PlanService } from '../persistence/services/plan.service';
import { ObtenerPlanUseCase } from '../../application/use-cases/membership';
import { IObtenerPlanCommand } from '../utils/commands/membership';

@Controller('membership')
export class MembershipController {


    constructor(
        private readonly membershipService: MembershipService,
        private readonly clienteService: ClienteService,
        private readonly planService: PlanService,


        private readonly membershipCreadaPublisher : CreateMembershipPublisher,

        private readonly clienteCreadoPublisher: CreateClientePublisher,
        private readonly updatePhonePublisher: UpdatePhonePublisher ,
        private readonly clienteConseguidoPublisher: ObtenerClientePublisher ,

        private readonly planCreadoPublisher: CreatePlanPublisher,
        private readonly planConseguidoPublisher: ObtenerPlanPublisher

        
    ) {}


    //CREATES
    
    @Post('/crear-cliente')
    async crearCliente(@Body() command: CreateClienteCommand) {
        const useCase = new CreateClienteUseCase(
            this.clienteService,
            this.clienteCreadoPublisher,
        );
        return await useCase.execute(command);
    }
 
    @Post('/crear-plan')
    async crearPlan(@Body() command: ICreatePlanCommand ) {
        const useCase = new CreatePlanUseCase(
            this.planService,
            this.planCreadoPublisher,
        );
        return await useCase.execute(command);
    }

    @Post('/crear-membership')
    async crearMembership(@Body() command: ICreateMembershipCommand ) {
        const useCase = new CreateMembershipUseCase(
            this.membershipService,
            this.membershipCreadaPublisher,
        );
        return await useCase.execute(command);
    }

    //UPDATES

    @Post('/update-phone')
    async updatePhoneCliente(@Body() command: IUpdatePhoneCommand ) {
        const useCase = new UpdateClientPhoneUseCase(
            this.clienteService,
            this.updatePhonePublisher,
        );
        return await useCase.execute(command);
    }

    //OBTENER

    @Get('/obtener-cliente')
    async obtenerCliente(@Body() command: IObtenerClienteCommand ) {
        const useCase = new  ObtenerClienteUseCase(
            this.clienteService,
            this.clienteConseguidoPublisher,
        );
        return await useCase.execute(command);
    }


    @Get('/obtener-plan')
    async obtenerplan(@Body() command: IObtenerPlanCommand ) {
        const useCase = new  ObtenerPlanUseCase(
            this.planService,
            this.planConseguidoPublisher,
        );
        return await useCase.execute(command);
    }
    
    //UpdateNombrePlanPublisher
    //ObtenerPlanPublisher
    //UpdateCostoPlanPublisher
    //UpdateNombrePlanPublisher

}