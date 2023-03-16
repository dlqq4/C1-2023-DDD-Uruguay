import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, KafkaContext, Payload } from "@nestjs/microservices";
import { EventMySqlEntity } from "../../persistence/databases/mysql/entities/event.entity";
import { CompraEntity } from "../../persistence/entities/compra.entity";

@Controller()
export class GlobalControllerEvent{

    /**
     * EventPattern se utiliza para definir un patrón de evento de Kafka
     * al que el controlador responderá.
     * 
     * Payload se utiliza para extraer los datos del mensaje del evento.
     *
     * KafkaContext que se utiliza para acceder a los metadatos del contexto de Kafka.
     * 
     * En el contexto de los eventos Kafka, el término "payload"
     * se refiere a los datos contenidos en el mensaje del evento. 
     * En otras palabras, el payload es la carga útil de información 
     * que se envía en el mensaje de Kafka.
     * 
     * @param {*} data
     * @param {KafkaContext} context
     * @memberof CreatedClientController
     */

    //*****************MEMBERSHIP*************************** */

    @EventPattern('web-context.compra-creada')
    //compraCreada(@Payload() data: EventMySqlEntity, @Ctx() context: KafkaContext){3
    compraCreada(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data.data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')

        //const compra: CompraEntity = JSON.parse(JSON.stringify(data.data))
        

    }


    @EventPattern('web-context.cliente-creado')
    clienteCreado(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('web-context.curso-creado')
    cursoCreado(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    //*******************CURSO********************** */

    @EventPattern('web-context.curso-conseguido')
    cursoConseguido(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('web-context.update-costo')
    updatedCostoCurso(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    //*******************CUPON*********************  'web-context.cupon-creado' */

    @EventPattern('web-context.cupon-creado')
    cuponCreado(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('web-context.cupon-conseguido')
    cuponConseguido(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('web-context.update-porcentaje')
    updatedPorcentajeCupon(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    //*****************CLIENTE******************* */

    @EventPattern('web-context.update-phone')
    updatedClientePhone(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('web-context.cliente-conseguido')
    clienteConseguido(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    //******************MEMBERSHIP*************** */

    @EventPattern('web-context.membresia-creada')
    membresiaCreada(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('web-context.plan-creado')
    planCreado(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    //*********************PLAN***************************** */

    @EventPattern('web-context.curso-conseguido')
    planConseguido(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }



    @EventPattern('web-context.update-costo')
    updatedCostopPlan(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

    @EventPattern('web-context.update-nombre')
    updatedPlanNombre(@Payload() data: any, @Ctx() context: KafkaContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }

}