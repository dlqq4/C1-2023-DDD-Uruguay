import { IUpdatePhoneMethod } from "../interfaces/commands/cliente/updatePhone.command";
import { ClienteDomainEntity, CuponDomainEntity, CursoDomainEntity } from "../entities";
import { CompraDomainEntity } from "../entities/compra/compra.domain-entity";
import { ICreateClienteMethod } from "../interfaces/commands/cliente/createCliente.command";
import { ICreateCompraMethod } from "../interfaces/commands/compra/createCompra.command";
import { ICreateCursoMethod } from "../interfaces/commands/compra/createCurso.command";
import { IUpdatePorcentajeMethod } from "../interfaces/commands/compra/cupon/updatePorcentaje.command";
import { IUpdateCostoMethod } from "../interfaces/commands/compra/curso/updateCosto.command";
import { IClienteService } from "../services/cliente.service";
import { ICompraService } from "../services/compra.service";
import { ICuponService } from "../services/cupon.service";
import { ICursoService } from "../services/curso.service";
import { UpdatePhoneEventPublisher } from "../events/publishers/compra/cliente/update-phone.event-publisher";
import { UpdatePorcentajeEventPublisher } from "../events/publishers/compra/cupon/update-porcentaje.event-publisher";
import { UpdateCostoCursoEventPublisher } from "../events/publishers/compra/curso/update-costo.event-publisher";
import { ClienteCreadoEventPublisher } from "../events/publishers/compra/cliente-creado.event-publisher";
import { CompraCreadaEventPublisher } from "../events/publishers/compra/compra-creada.event-publisher";
import { CursoCreadoEventPublisher } from "../events/publishers/compra/curso-creado.event-publisher";
import { AggregateRootException } from "src/libs/sofka/exceptions/aggregate-root.exception";
import { ClienteConseguidoEventPublisher } from "../events/publishers/compra/cliente/cliente-conseguido.event-publisher";
import { CursoConseguidoEventPublisher } from "../events/publishers/compra/curso/curso-conseguido.event-publisher";
import { CreateClienteHelper } from "./helpers/create-cliente.helper";
import { CuponCreadoEventPublisher } from "../events/publishers/compra/cupon-creado.event-publisher";
import { ICreateCuponMethod } from "../interfaces/commands/compra/createCupon.command";
import { CuponConseguidoEventPublisher } from "../events/publishers/compra/cupon";



export class CompraAggregate implements IClienteService, ICompraService, ICuponService, ICursoService {

    //DECLARO PROPIEDADES DE CADA SERVICIO RELACIONADO A MI AGREGADO
    private readonly clienteService?: IClienteService;
    private readonly compraService?: ICompraService;
    private readonly cuponService?: ICuponService;
    private readonly cursoService?: ICursoService;


    //DECLARO PROPIEDADES DE LOS PUBLISHERS RELACIONADOS A MI AGREGADO
    private readonly updatePhoneEventPublisher?: UpdatePhoneEventPublisher;
    private readonly updatePorcentajeEventPublisher?: UpdatePorcentajeEventPublisher;
    private readonly updateCostoCursoEventPublisher?: UpdateCostoCursoEventPublisher;
    private readonly clienteCreadoEventPublisher?: ClienteCreadoEventPublisher;
    private readonly compraCreadaEventPublisher?: CompraCreadaEventPublisher;
    private readonly cursoCreadoEventPublisher?: CursoCreadoEventPublisher;
    private readonly clienteConseguidoEventPublisher?: ClienteConseguidoEventPublisher;
    private readonly cursoConseguidoEventPublisher?: CursoConseguidoEventPublisher;

    private readonly cuponCreadoEventPublisher?: CuponCreadoEventPublisher;
    private readonly cuponConseguidoEventPublisher?: CuponConseguidoEventPublisher;


    constructor({

        //Constructor recibe objetos
        clienteService,
        compraService,
        cuponService,
        cursoService,
        

        updatePhoneEventPublisher,
        updatePorcentajeEventPublisher,
        updateCostoCursoEventPublisher,
        clienteCreadoEventPublisher,
        compraCreadaEventPublisher,
        cursoCreadoEventPublisher,
        clienteConseguidoEventPublisher,
        cursoConseguidoEventPublisher,
        cuponCreadoEventPublisher,
        cuponConseguidoEventPublisher

    }: {
   
        clienteService?: IClienteService;
        compraService?: ICompraService;
        cuponService?: ICuponService;
        cursoService?: ICursoService;

       

        updatePhoneEventPublisher?: UpdatePhoneEventPublisher;
        updatePorcentajeEventPublisher?: UpdatePorcentajeEventPublisher;
        updateCostoCursoEventPublisher?: UpdateCostoCursoEventPublisher;
        clienteCreadoEventPublisher?: ClienteCreadoEventPublisher;
        compraCreadaEventPublisher?: CompraCreadaEventPublisher;
        cursoCreadoEventPublisher?: CursoCreadoEventPublisher;
        clienteConseguidoEventPublisher?: ClienteConseguidoEventPublisher;
        cursoConseguidoEventPublisher?: CursoConseguidoEventPublisher;
        cuponCreadoEventPublisher?: CuponCreadoEventPublisher;
        cuponConseguidoEventPublisher?: CuponConseguidoEventPublisher;

    }) {

        this.clienteService = clienteService;
        this.compraService = compraService;
        this.cuponService = cuponService;
        this.cursoService = cursoService;

        this.updatePhoneEventPublisher = updatePhoneEventPublisher;
        this.updatePorcentajeEventPublisher = updatePorcentajeEventPublisher;
        this.updateCostoCursoEventPublisher = updateCostoCursoEventPublisher;
        this.clienteCreadoEventPublisher = clienteCreadoEventPublisher;
        this.compraCreadaEventPublisher = compraCreadaEventPublisher;
        this.cursoCreadoEventPublisher = cursoCreadoEventPublisher;
        this.clienteConseguidoEventPublisher = clienteConseguidoEventPublisher;
        this.cursoConseguidoEventPublisher = cursoConseguidoEventPublisher;
        this.cuponCreadoEventPublisher = cuponCreadoEventPublisher;
        this.cuponConseguidoEventPublisher = cuponConseguidoEventPublisher;
    

    }
 
    /*
    //IMPLEMENTO LAS INTERFACES QUE MANEJAN LOS METODOS DE MI AGREGADO
    async createCliente(cliente: ICreateClienteMethod): Promise<ClienteDomainEntity> {
        if (this.compraService && this.clienteCreadoEventPublisher) {
            const result = await this.compraService.createCliente(cliente);
            this.clienteCreadoEventPublisher.response = result;
            this.clienteCreadoEventPublisher.publish();
            return this.clienteCreadoEventPublisher.response;
          }
          throw new AggregateRootException(
            'Faltan definir datos',
          );
    }
    */

    
    createCliente(cliente: ICreateClienteMethod): Promise<ClienteDomainEntity> {
       return CreateClienteHelper(cliente as ClienteDomainEntity, this.clienteService, this.clienteCreadoEventPublisher)
    }
    

    async createCompra(compra: ICreateCompraMethod): Promise<CompraDomainEntity> {
        if (this.compraService && this.compraCreadaEventPublisher) {
            const result = await this.compraService.createCompra(compra);
            this.compraCreadaEventPublisher.response = result;
            this.compraCreadaEventPublisher.publish();
            return this.compraCreadaEventPublisher.response;
          }
          throw new AggregateRootException(
            'Faltan definir datos',
          );
    }

    async createCurso(curso: ICreateCursoMethod): Promise<CursoDomainEntity> {
        if (this.cursoService && this.cursoCreadoEventPublisher) {
            const result = await this.cursoService.createCurso(curso);
            this.cursoCreadoEventPublisher.response = result;
            this.cursoCreadoEventPublisher.publish();
            return this.cursoCreadoEventPublisher.response;
          }
          throw new AggregateRootException(
            'Faltan definir datos',
          );
    }


    async createCupon(cupon: ICreateCuponMethod): Promise<CuponDomainEntity> {
      if (this.cuponService && this.cuponCreadoEventPublisher) {
          const result = await this.cuponService.createCupon(cupon);
          this.cuponCreadoEventPublisher.response = result;
          this.cuponCreadoEventPublisher.publish();
          return this.cuponCreadoEventPublisher.response;
        }
        throw new AggregateRootException(
          'Faltan definir datos',
        );
  }


    async updatePorcentaje(data: IUpdatePorcentajeMethod): Promise<CuponDomainEntity> {
        if (this.cuponService && this.updatePorcentajeEventPublisher) {
            const result = await this.cuponService.updatePorcentaje(data);
            this.updatePorcentajeEventPublisher.response = result;
            this.updatePorcentajeEventPublisher.publish();
            return this.updatePorcentajeEventPublisher.response;
          }
          throw new AggregateRootException(
            'Faltan definir datos',
          );
    }

    async updateCosto(data: IUpdateCostoMethod): Promise<CursoDomainEntity> {
        if (this.cursoService && this.updateCostoCursoEventPublisher) {
            const result = await this.cursoService.updateCosto(data);
            this.updateCostoCursoEventPublisher.response = result;
            this.updateCostoCursoEventPublisher.publish();
            return this.updateCostoCursoEventPublisher.response;
          }
          throw new AggregateRootException(
            'Faltan definir datos',
          );
    }

    async updatePhone(data: IUpdatePhoneMethod ): Promise<ClienteDomainEntity > {

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
    

    //METODOS PARA OBTENER LAS ENTIDADES*************************************

    async obtenerCliente(client: string): Promise<ClienteDomainEntity> {
      
      if (this.clienteService && this.clienteConseguidoEventPublisher) {
        const result = await this.clienteService.obtenerCliente(client);
        this.clienteConseguidoEventPublisher.response = result;
        this.clienteConseguidoEventPublisher.publish();
        return this.clienteConseguidoEventPublisher.response;
      }
      throw new AggregateRootException(
        'Faltan definir datos',
      );
    }

    async obtnerCurso(course: string): Promise<CursoDomainEntity> {
      if (this.cursoService && this.cursoConseguidoEventPublisher) {
        const result = await this.cursoService.obtnerCurso(course);
        this.cursoConseguidoEventPublisher.response = result;
        this.cursoConseguidoEventPublisher.publish();
        return this.cursoConseguidoEventPublisher.response;
      }
      throw new AggregateRootException(
        'Faltan definir datos',
      );
    }

    async obtenerCupon(cupon: string): Promise<CuponDomainEntity> {
      
      if (this.cuponService && this.cuponConseguidoEventPublisher) {
        const result = await this.cuponService.obtenerCupon(cupon);
        this.cuponConseguidoEventPublisher.response = result;
        this.cuponConseguidoEventPublisher.publish();
        return this.cuponConseguidoEventPublisher.response;
      }
      throw new AggregateRootException(
        'Faltan definir datos',
      );
    }

}
