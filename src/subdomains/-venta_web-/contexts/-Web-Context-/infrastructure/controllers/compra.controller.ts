import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateClienteCommand } from '../utils/commands/createCliente.command';
import { CreateClienteUseCase, CreateCompraUseCase, CreateCursoUseCase, ObtenerClienteUseCase, ObtenerCursoUseCase, UpdateClientPhoneUseCase, UpdateCursoCostoUseCase } from '../../application/use-cases/compra';
import { ICreateCompraCommand } from '../utils/commands/compra/createCompra.command';
import { ICreateCursoCommand } from '../utils/commands/compra/createCurso.command';
import { IUpdatePhoneCommand } from '../utils/commands/updatePhone.command';
import { IUpdateCostoCommand } from '../utils/commands/compra/curso/updateCosto.command';
import { IObtenerCursoCommand } from '../utils/commands/compra/curso/obtenerCurso.command';
import { IObtenerClienteCommand } from '../utils/commands/ObtenerCliente.command';
import { CreateClientePublisher, CreateCompraPublisher, CreateCursoPublisher, ObtenerClientePublisher, ObtenerCuponPublisher, ObtenerCursoPublisher, UpdateCostoPublisher, UpdatePhonePublisher } from '../messaging/publisher';
import { CompraService } from '../persistence/services/compra.service';
import { CursoService } from '../persistence/services/curso.service';
import { ClienteService } from '../persistence/services/cliente.service';
import { IObtenerCuponCommand } from '../utils/commands/compra/cupon';
import { ObtenerCuponUseCase } from '../../application/use-cases/compra/obtener-cupon.use-case';
import { CuponService } from '../persistence/services/cupon.service';
import { CreateCuponPublisher } from '../messaging/publisher/compra/cupon-creado.publisher';
import { CreateCuponUseCase } from '../../application/use-cases/compra/create-cupon.use-case';
import { ICreateCuponCommand } from '../utils/commands/compra/createCupon.command';


@Controller('compra') 
export class CompraController {


    constructor(

        private readonly clienteService: ClienteService,
        private readonly compraService: CompraService,
        private readonly cursoService: CursoService,
        private readonly cuponService: CuponService,


        private readonly compraCreadaPublisher : CreateCompraPublisher,
        
        private readonly clienteCreadoPublisher: CreateClientePublisher,
        private readonly updatePhonePublisher: UpdatePhonePublisher,
        private readonly clienteConseguidoPublisher: ObtenerClientePublisher,

        private readonly cursoCreadoPublisher: CreateCursoPublisher,
        private readonly updateCostoCursoPublisher: UpdateCostoPublisher,
        private readonly cursoConseguidoPublisher: ObtenerCursoPublisher,

        private readonly cuponConseguidoPublisher : ObtenerCuponPublisher,
        private readonly cuponCreadoPublisher: CreateCuponPublisher,
        
        
    ) {}


    //CREATES

    @Post('/crear-compra')
    async crearCompra(@Body() command: ICreateCompraCommand ) {
        const useCase = new CreateCompraUseCase(
            this.compraService,       
            this.clienteService,
            this.cursoService,
            this.cuponService,
            this.compraCreadaPublisher,
            this.clienteConseguidoPublisher,
            this.cursoConseguidoPublisher,
            this.cuponConseguidoPublisher,
        );
        return await useCase.execute(command);
    }
    
    
    @Post('/crear-cliente')
    async crearCliente(@Body() command: CreateClienteCommand) {
        const useCase = new CreateClienteUseCase(
            this.clienteService,
            this.clienteCreadoPublisher,
        );
        return await useCase.execute(command);
    }
 
    @Post('/crear-curso')
    async crearCurso(@Body() command: ICreateCursoCommand ) {
        const useCase = new CreateCursoUseCase(
            this.cursoService,
            this.cursoCreadoPublisher,
        );
        return await useCase.execute(command);
    }

    

    @Post('/crear-cupon')
    async crearCupon(@Body() command: ICreateCuponCommand ) {
        const useCase = new CreateCuponUseCase(
            this.cuponService,
            this.cuponCreadoPublisher,
        );
        return await useCase.execute(command);
    }
    

    //UPDATES

    @Put('/update-phone')
    async updatePhoneCliente(@Body() command: IUpdatePhoneCommand ) {
        const useCase = new UpdateClientPhoneUseCase(
            this.clienteService,
            this.updatePhonePublisher,
            this.clienteConseguidoPublisher,

        );
        return await useCase.execute(command);
    }


    @Put('/update-costo-curso')
    async updateCostoCurso(@Body() command: IUpdateCostoCommand ) {
        const useCase = new UpdateCursoCostoUseCase(
            this.cursoService,
            this.updateCostoCursoPublisher,
            this.cursoConseguidoPublisher,

        );
        return await useCase.execute(command);
    }

    //OBTENER

    @Get('/obtener-curso')
    async obtenerCurso(@Body() command: IObtenerCursoCommand ) {
        const useCase = new ObtenerCursoUseCase(
            this.cursoService,
            this.cursoConseguidoPublisher,
        );
        return await useCase.execute(command);
    }

    
    @Get('/obtener-cliente')
    async obtenerCliente(@Body() command: IObtenerClienteCommand ) {
        const useCase = new  ObtenerClienteUseCase(
            this.clienteService,
            this.clienteConseguidoPublisher,
        );
        return await useCase.execute(command);
    }


    @Get('/obtener-cupon')
    async obtenerCupon(@Body() command: IObtenerCuponCommand ) {
        const useCase = new  ObtenerCuponUseCase(
            this.cuponService,
            this.cuponConseguidoPublisher,
        );
        return await useCase.execute(command);
    }
    
    /*
    UPDATE PORCENTAJE CUPON
    */
}
  


