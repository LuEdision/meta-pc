<template>
  <div id="MibLoanAgree" class="loan-agree">
    <h2>Modelo de contrato de préstamo</h2>
    <p>
      El prestatario solicita a la sociedad RIVENDELL TECHNOLOGY, S.L.U., con
      domicilio en calle Martínez Villergas 49, Bloque V, 1ª Planta, 28027,
      Madrid, Teléfono: [{{ getPay('mobile', loginData) }}], E-Mail:
      hola@website.es (”Prestamista“) el otorgamiento de un préstamo de plazo
      fijo por el Importe Total del Préstamo y sujeto a las condiciones
      indicadas a continuación.
    </p>

    <h2>Prestatario</h2>
    <ul>
      <li>
        <span class="label">Título:</span>
        <span class="value">-</span>
      </li>
      <li>
        <span class="label">Teléfono:</span>
        <span class="value">{{ getPay('mobile', loginData) }}</span>
      </li>
      <li>
        <span class="label">Nombre y Apellido:</span>
        <span class="value">{{ getPay('customerName', loginData) }}</span>
      </li>
      <li>
        <span class="label">Teléfono móvil:</span>
        <span class="value">{{ getPay('mobile', loginData) }}</span>
      </li>
      <li>
        <span class="label">Domicilio:</span>
        <span class="value">{{ getPay('currentAddress', loginData) }}</span>
      </li>
      <li>
        <span class="label">Correo electrónico:</span>
        <span class="value">{{ getPay('email', loginData) }}</span>
      </li>
      <li>
        <span class="label">Fecha de nacimiento:</span>
        <span class="value">{{ getPay('birthday', loginData) }}</span>
      </li>
      <li>
        <span class="label">Nacionalidad</span>
        <span class="value">España</span>
      </li>
    </ul>

    <h2>Características del préstamo</h2>
    <ul>
      <li>
        <span class="label"
          >Importe del préstamo, Costes(Importe Total del Préstamo):</span
        >
        <span class="value">{{ getPay('applyAmount', loanData) }} EUR</span>
      </li>
      <li>
        <span class="label">Plan de pago:</span>
        <span class="value">
          {{ getPay('totalLimitDays', loanData) }} Cuotas
          {{ getPay('totalRepayAmount', paymentData) }}€
        </span>
      </li>
      <li>
        <span class="label">Última cuota prevista:</span>
        <span class="value">{{ getPay('totalRepayAmount', paymentData) }}</span>
      </li>
      <li>
        <span class="label">T.A.E.:</span>
        <span class="value">365 %</span>
      </li>
      <li>
        <span class="label"
          >Comisión de procesamiento / apertura del préstamo Importe a
          desembolsar:</span
        >
        <span class="value">{{ getPay('applyAmount', paymentData) }}</span>
      </li>
      <li>
        <span class="label">Tipo de interés nominal:</span>
        <span class="value">
          {{ getPay('interestRate', paymentData) * 100 }} % per day
        </span>
      </li>
      <li>
        <span class="label"
          >Importe máximo de intereses anticipados debidos antes del pago de la
          primera cuota Cuenta bancaria de pago:</span
        >
        <span class="value">{{ getPay('accountNumber', accountInfo) }}</span>
      </li>
      <li>
        <span class="label">Intereses ordinarios:</span>
        <span class="value">{{ getPay('interestAmount', paymentData) }}</span>
      </li>

      <li>
        <span class="label"
          >Importe total adeudado por el prestatario(El importe total comprende
          el importe máximo aplicable de intereses anticipados):</span
        >
        <span class="value">{{ getPay('totalRepayAmount', paymentData) }}</span>
      </li>
      <li>
        <span class="label">Intereses ordinarios:</span>
        <span class="value">{{ getPay('interestAmount', paymentData) }}</span>
      </li>
      <li>
        <span class="label">Plazo del préstamo:</span>
        <span class="value">{{ getPay('limitDays', paymentData) }}</span>
      </li>
      <li>
        <span class="label">Cuenta bancaria de referencia:</span>
        <span class="value">{{ getPay('customerName', loanData) }}</span>
      </li>
      <li>
        <span class="label">IBAN / BIC:</span>
        <span class="value">{{ getPay('accountNumber', accountInfo) }}</span>
      </li>
      <li>
        <span class="label">Banco:</span>
        <span class="value">{{ bankName }}</span>
        <!-- <span class="value">收款银行名称</span> -->
      </li>
      <li>
        <span class="label">El Importe Total del Préstamo es pagadero en:</span>
        <span class="value">{{ getPay('periods', loanData) }}</span>
      </li>
      <li>
        <span class="label">cuotas en los días:</span>
        <span class="value">{{ lastDuedate }}</span>
      </li>
    </ul>
    <p>
      * El importe total del préstamo puede variar de conformidad con lo
      dispuesto en el apartado10 de las Condiciones Generales.
    </p>
    <p>
      ** Para el cálculo de la T.A.E. (tasa anual equivalente) se tiene en
      cuenta, como elementos de coste, el tipo nominal anual de interés y la
      comisión de procesamiento / apertura, aplicándose el sistema establecido
      en el anexo I de la Ley 16/2011, de 24 de junio, de Contratos de Crédito
      al Consumo. En el cálculo de la T.A.E. no se han tomado en cuenta posibles
      gastos opcionales ni los generados por incumplimiento de obligaciones del
      prestatario.
    </p>

    <h2>Condiciones generales del contrato de préstamo</h2>
    <h3>1. Objeto del contrato</h3>
    <p>
      El prestatario contrae con el Prestamista una deuda por el Importe Total
      del Préstamo concedido, que asciende a la cantidad que consta en las
      “Características del préstamo” (y que incluye el importe solicitado por el
      prestatario y demás conceptos que hayan sido financiados como la comisión
      de procesamiento / apertura del préstamo).
    </p>
    <p>
      La primera disposición de dicho préstamo coincide con el Importe Total del
      Préstamo, agotándolo, y, previa deducción de la comisión de procesamiento
      / apertura del préstamo, se abonará por el Prestamista en la cantidad
      correspondiente al importe a desembolsar en la cuenta del prestatario
      indicada en las “Características del préstamo”.
    </p>

    <h3>2. Obligaciones del prestatario respecto del cambio de sus datos</h3>
    <p>
      El prestatario se encuentra obligado a comunicar inmediatamente al
      Prestamista cualquier modificación de los datos facilitados para la
      conclusión del contrato (domicilio, residencia efectiva, situación
      laboral, empleador, etc.). Si el Prestamista incurriera en costes como
      consecuencia de la falta de comunicación por parte del prestatario de la
      modificación de dichos datos, tales costes serán repercutidos por el
      Prestamista al prestatario.
    </p>
    <p>
      El prestatario se obliga, a requerimiento del Prestamista, a revelar sus
      ingresos y circunstancias financieras. El prestatario se obliga igualmente
      a informar inmediatamente al Prestamista sobre cualquier deterioro de su
      situación económica, especialmente si resultase de la pérdida de empleo.
    </p>

    <h3>3. Solicitud de préstamo</h3>
    <h4>
      a. Con carácter previo a la solicitud del préstamo, el prestatario afirma
      que reúne los siguientes requisitos:
    </h4>
    <ul>
      <li>Ser mayor de edad con plena capacidad de obrar.</li>
      <li>
        Hallarse en plenas facultades mentales, intelectuales y de cognición en
        el momento de la solicitud del préstamo.
      </li>
      <li>
        Ser residente legal en España, teniendo domicilio permanente en dicho
        estado a efectos fiscales.
      </li>
    </ul>

    <p>
      b. Mediante la cumplimentación, firma y envío del presente formulario
      online mediante la página Web o mediante la aplicación móvil, el
      prestatario solicita un préstamo al Prestamista que, en caso de ser
      aceptado por el Prestamista, se regirá por los términos y condiciones del
      contrato de préstamo de consumo previstos en el presente documento.
    </p>
    <p>
      c. El prestatario autoriza expresamente al Prestamista para hacer uso y
      ceder sus datos a terceros para poder realizar los trámites y
      comprobaciones necesarias en relación con su solicitud de préstamo, así
      como consultar sus datos en los ficheros de solvencia de ASNEF.
    </p>
    <p>
      d. El prestatario manifiesta haber recibido asistencia previa a la
      celebración del contrato con explicaciones adecuadas e individualizadas
      sobre las características esenciales del préstamo, que le han permitido
      comparar diversas ofertas existentes en el mercado y adoptar una decisión
      informada sobre la conveniencia de suscribir el contrato, concluyendo que
      el mismo se ajusta a sus intereses, necesidades y situación financiera.
    </p>

    <h3>4. Formalización del contrato</h3>
    <p>
      El presente Contrato se celebra en la modalidad de contratación a
      distancia, entendiéndose por tal aquella que se formaliza sin la presencia
      física simultánea del Prestamista y del prestatario, habiéndose utilizado
      exclusivamente técnicas de comunicación a distancia en el proceso de
      negociación y en la propia celebración del mismo.
    </p>
    <p>
      El prestatario tomará conocimiento de la aceptación de la solicitud de
      préstamo por el Prestamista y consiguiente formalización del contrato de
      préstamo mediante la recepción por su parte de una copia del contrato de
      préstamo, documento de ratificación o justificante de la contratación por
      correo electrónico o SMS, o mediante el desembolso efectivo del importe a
      desembolsar del préstamo (Importe Total del Préstamo menos la comisión de
      procesamiento / apertura del préstamo).
    </p>
    <p>
      La solicitud del préstamo podrá rechazarse siempre que el Prestamista lo
      considere oportuno.
    </p>
    <p>
      Si el Prestamista acepta la solicitud, pero ha ofrecido al prestatario una
      cantidad de Importe Total del Préstamo diferente a la solicitada, el
      prestatario deberá confirmar su aceptación mediante la aceptación de las
      Condiciones Particulares y Generales que se le enviarán por correo
      electrónico.
    </p>

    <h3>5. Duración</h3>
    <p>
      La duración del contrato podrá ser entre siete (7) a sesenta y dos (62)
      días naturales, según lo establecido en las Condiciones Particulares, a
      partir de la recepción por parte del Prestamista de la aceptación del
      préstamo.
    </p>
    <p>
      Cuando la fecha de vencimiento del préstamo coincida con un día inhábil,
      el pago se realizará el día hábil inmediatamente posterior.
    </p>

    <h3>6. Plan de pago</h3>
    <p>
      El reembolso del capital e intereses serán debitados mediante el sistema
      de domiciliación de pagos SEPA de la cuenta bancaria de referencia del
      prestatario indicada en las “Características del préstamo”.
    </p>
    <p>
      Las comunicaciones relacionadas con el presente préstamo y su plan de pago
      (incluyendo los intereses anticipados) incluirán los preavisos de las
      domiciliaciones de pago SEPA. En caso que hubieran de debitarse importes
      distintos a los indicados en el plan de pagos, el prestatario recibirá una
      notificación de preaviso con al menos un día de anticipación a la fecha de
      débito.
    </p>

    <h3>7. Comisión de procesamiento / apertura del préstamo</h3>
    <p>
      El prestatario autoriza al Prestamista para que retenga la comisión de
      procesamiento / apertura del préstamo prevista en las “Características del
      préstamo”. El importe de la retención será deducido del Importe Total del
      Préstamo, de manera que el prestatario reciba el importe a desembolsar
      indicado en las “Características del préstamo”.
    </p>

    <h3>8. Comisión de adeudo rechazado</h3>
    <p>
      Los débitos que, a pesar de existir un mandato al efecto, no pudieran ser
      realizados en las fechas previstas, serán realizados nuevamente por el
      Prestamista previa notificación al prestatario de acuerdo con el apartado
      6. Por cada débito que no hubiera podido ser realizado, el Prestamista
      percibirá del prestatario una comisión de 10€ por adeudo rechazado.
    </p>
    <p>
      Cada recibo será imputado primero a los costes del cobro, luego a los
      intereses ordinarios y al importe de deuda principal, y por último a los
      intereses de demora.
    </p>

    <h3>9. Prácticas de cobro</h3>
    <p>
      Cuando el prestatario no hiciera frente a la devolución del préstamo en el
      plazo estipulado, el Préstamo pasará a ser gestionado por el Departamento
      de Cobros del Prestamista. El Prestamista comunicará la situación de
      impago al prestatario a través de correo electrónico y/o SMS, así como
      realizando llamadas a los teléfonos que el prestatario hubiera puesto a
      disposición del Prestamista en el momento de la contratación del Préstamo
      o en caso de no poder contactar por estos medios, a través de cualquier
      otro que estimara conveniente para gestionar correctamente el cobro.
    </p>
    <p>
      En el caso de que el pago no se realice en el plazo previsto para ello y
      se cumplan los requisitos, con la aceptación de estas Condiciones
      Generales, el prestatario da su consentimiento previo e informado para la
      recepción de cuantas llamadas y comunicaciones automáticas sin
      intervención humana a los números de teléfono facilitados sean necesarias
      y pertinentes hasta que se produzca el pago efectivo de la deuda.
    </p>
    <p>
      Si en el plazo de treinta (30) días desde el vencimiento de la deuda
      adquirida, ésta no ha sido satisfecha por el prestatario, habiéndoselo
      notificado previamente, el Prestamista tendrá derecho a comunicar los
      datos del prestatario a los ficheros de información de solvencia,
      patrimonial y de crédito, cumpliendo en todo caso los requisitos para la
      inclusión de datos.
    </p>
    <p>
      El Prestamista se reserva el derecho a ponerse en contacto con aquellas
      personas del entorno del prestatario para localizarlo y exigirle el pago
      de la deuda, de conformidad con lo establecido en la normativa legal
      correspondiente en materia de protección de datos (Ley Orgánica 3/2018, de
      5 de diciembre, y Reglamento (UE) 2016/679, de 27 de abril de 2016). En
      ningún caso se informará a estas personas de la condición de moroso del
      prestatario, garantizando así el cumplimiento del deber de
      confidencialidad del art. 5 de la Ley Orgánica 3/2018 de protección de
      datos. Además, las personas contactadas por el Prestamista serán
      informadas de la gestión de sus datos personales de acuerdo con la
      Política de Privacidad, de su derecho a oponerse al tratamiento de los
      mismos si así lo desean y de la grabación de la llamada telefónica, en
      caso de que opten por este medio de contacto.
    </p>

    <h3>10. Mora en el pago</h3>
    <p>
      En caso que el prestatario incurriera en mora en el pago de una cuota, el
      Prestamista percibirá intereses de demora equivalentes a adicionar un 1%
      por día sobre la cantidad debida con un límite máximo del 200% del importe
      principal, así como los gastos en que incurra el Prestamista por la
      gestión de la deuda vencida, y sin perjuicio de cualesquiera otras
      consecuencias que puedan derivarse del incumplimiento, incluyendo, entre
      otras, la inclusión de sus datos en ficheros de solvencia y crédito, como
      ASNEF.
    </p>
    <p>
      A los efectos de esta cláusula, el Prestamista concede un plazo de
      carencia de 5 días, no obstante, si el pago no se realiza el 6º día de
      demora, los intereses de demora se calcularán desde el 1º día de demora.
    </p>
    <p>
      A los efectos del artículo 317 del Código de Comercio, los intereses de
      las cuotas no satisfechas se entenderán capitalizados y devengarán
      intereses al mismo tipo que el del préstamo.
    </p>

    <h3>11. Causas de resolución del contrato</h3>
    <p>
      El Prestamista podrá resolver unilateralmente este contrato y exigir el
      pago anticipado del capital dispuesto, intereses devengados, comisiones
      pactadas y gastos cuando concurra alguna de las siguientes circunstancias:
    </p>
    <ul>
      <li>
        cuando se evidenciare un deterioro o amenaza de deterioro en las
        circunstancias económicas del prestatario o en el valor de la garantía
        establecida en su caso para el préstamo, que hiciera peligrar el pago
        del préstamo, incluso en caso de ejecución de la garantía;
      </li>
      <li>en caso de mora en el pago, cuando:</li>
      <ul>
        <li>
          el prestatario estuviera en mora en el pago de 1 cuota por más de 10
          días, y
        </li>
        <li>
          el Prestamista hubiera intimado al prestatario durante dos semanas al
          pago del importe adeudado bajo apercibimiento de exigir el importe
          total de la deuda al vencimiento del plazo de la intimación. El
          Prestamista podrá ofrecer al prestatario la oportunidad de convenir un
          acuerdo para la regularización de la deuda.
        </li>
      </ul>

      <li>
        falsedad de los datos económicos facilitados por el prestatario al
        Prestamista.
      </li>
      <p>
        El prestatario acepta como documento válido para reclamar judicialmente
        los importes adeudados el extracto de cuenta emitido por el Prestamista,
        salvo prueba en contrario.
      </p>
    </ul>

    <h3>12. Reembolso anticipado</h3>
    <p>
      El prestatario podrá cumplir anticipadamente con sus obligaciones bajo el
      presente contrato en cualquier momento y de manera total o parcialmente.
      En caso de reembolso anticipado del prestatario, el Prestamista entregará
      cupones de amortización anticipada. En general, habrá dos tipos de
      cupones: a. tipo de interés reducido y, b. aumento del importe del crédito
      que se aplicará en los próximos préstamos. Las condiciones de uso de los
      cupones serán establecidas por el Prestamista.
    </p>

    <h3>13. Gastos</h3>
    <p>
      Todos los gastos e impuestos que se originen como consecuencia de la
      formalización, modificación en su caso, así como por el incumplimiento de
      las obligaciones derivadas del contrato de préstamo serán de cuenta del
      prestatario (incluidos los de abogado y procurador para su reclamación
      judicial).
    </p>

    <h3>14. Idioma contractual</h3>
    <p>
      El idioma del presente contrato es el español. Si desea las condiciones
      generales en otra lengua oficial en el territorio español contacte con el
      Prestamista.
    </p>

    <h3>15. Documentos incluidos</h3>
    <p>
      En el marco del presente contrato de préstamo el prestatario ha recibido y
      tomado conocimiento de la información normalizada europea sobre el crédito
      al consumo (SECCI, por sus siglas en inglés).
    </p>

    <h3>16.Tratamiento de datos personales</h3>
    <p>
      El prestatario queda informado de que sus datos personales serán incluidos
      y tratados por el Prestamista con la finalidad de gestionar y ejecutar el
      presente contrato, así como para dar cumplimiento a las obligaciones
      legales aplicables. La base jurídica del tratamiento de datos personales
      se funda en la ejecución del contrato.
    </p>
    <p>
      El prestatario consiente a que el Prestamista pueda ceder sus datos
      personales a terceros con el fin de realizar averiguaciones patrimoniales,
      actuaciones de lucha contra el fraude y para los procesos de recuperación
      de deuda si fuera necesario.
    </p>
    <p>
      Para el ejercicio de sus derechos de acceso, rectificación, cancelación,
      oposición, limitación y portabilidad, por favor diríjase por escrito con
      una copia de su documento nacional de identidad, pasaporte u otro
      documento legal que acredite su identidad a: Privacidad@website.es.
      Asimismo, el prestatario también podrá reclamar ante la Autoridad de
      Protección de Datos competente.
    </p>
    <p>
      Los datos del prestatario se conservarán durante la vigencia del contrato
      y, una vez finalizado el mismo, se conservarán, debidamente bloqueados, el
      tiempo necesario para atender a los requerimientos legales aplicables.
    </p>
    <p>
      Los datos tan sólo se transferirán a un Tercer Estado (Estado fuera de la
      UE y del EEE) cuando fuese necesario para el cumplimiento de obligaciones
      contractuales o cuando viniese exigido por la ley. En todo caso, los
      proveedores en terceros estados estarán obligados a proporcionar los
      mismos grados de protección de datos que rigen en la UE y en el EEE a
      través de los instrumentos previstos en el RGPD. Ambas partes quedan
      informadas de que sus datos podrán ser comunicados a Organismos y
      Administraciones Públicas, así como a las siguientes categorías de
      destinatarios: abogados, auditores, notarios o registradores públicos.
    </p>

    <h3>17. Prevención de blanqueo de capitales</h3>
    <p>
      La legislación vigente en materia de prevención del blanqueo de capitales
      y la financiación del terrorismo obliga al Prestamista a la verificación
      de la identidad del prestatario y de sus operaciones y actividades. El
      prestatario se obliga a facilitar al Prestamista y/o a quien el
      Prestamista designe al efecto, de forma veraz y completa, cuanta
      información sea necesaria y le sea requerida a estos efectos y autoriza
      expresamente al Prestamista y/o a quien el Prestamista designe al efecto a
      realizar las actuaciones de verificación que considere oportunas para esta
      finalidad. El Prestamista informa al prestatario que en caso de no obtener
      la información exigida por la legislación vigente en materia de prevención
      del blanqueo de capitales y de la financiación del terrorismo, se verá
      imposibilitado para prestarle servicios, sin que ello pueda comportar
      ningún tipo de responsabilidad para el Prestamista.
    </p>
    <p>
      El Prestamista está obligado a comunicar al Servicio Ejecutivo de
      Prevención de Blanqueo de Capitales (SEPBLAC) cualquier hecho u operación,
      incluso la mera tentativa, respecto de los cuales exista indicio o certeza
      de que está relacionado con el blanqueo de capitales y la financiación del
      terrorismo, debiendo abstenerse de ejecutar cualquier operación si se
      ponen de manifiesto tales circunstancias. El Prestamista no será
      responsable ante el prestatario de los daños y perjuicios que éste pueda
      sufrir como consecuencia del cumplimiento de dichas obligaciones legales.
    </p>

    <h3>18. Notificaciones</h3>
    <p>
      Las partes pactan expresamente que toda comunicación, notificación o
      requerimiento relativos a este contrato o que se derive del mismo y no
      tuviera prevista en él una formalidad especial, se entenderán debidamente
      realizadas cuando se lleven a cabo a través del correo electrónico,
      teléfono o SMS, medios que las partes expresamente admiten como válidos.
      Constituye prueba fehaciente de la comunicación el original del correo
      electrónico o del SMS y el acuse de recibo en el que conste su recepción
      en la dirección y/o número de teléfono señalados en las propias
      comunicaciones.
    </p>
    <p>
      Cualquier modificación de dichos domicilios, faxes y correos electrónicos
      deberá notificarse al Prestamista, no surtiendo, de lo contrario, ningún
      efecto.
    </p>
    <p>
      Las notificaciones entre las partes que deban realizarse por escrito
      también serán válidas si se efectúan por correo electrónico, mensajes de
      texto certificado, burofax, correo certificado con acuse de recibo o fax,
      en los domicilios y direcciones que se indiquen en las condiciones
      particulares, para cada una de las partes.
    </p>

    <h3>19. Reclamaciones</h3>
    <p>
      Usted podrá dirigir cualquier queja o reclamación al Servicio de Atención
      al Cliente del Prestamista, por correo postal a calle Martínez Villergas
      49, Bloque V, 1ª Planta, 28027, Madrid, o al correo electrónico
      hola@website.es.
    </p>
    <p>
      Para cualquier reclamación que pudiera derivarse del presente contrato,
      las partes, con renuncia expresa a su fuero propio, se someten
      expresamente a los juzgados y tribunales del domicilio del prestatario.
    </p>

    <h3>20. Legislación aplicable</h3>
    <p>
      El presente contrato se regirá por la legislación española, resultando de
      aplicación la Ley 16/2011, de 24 de junio, de contratos de crédito al
      consumo, , la Ley 22/2007, de 11 de julio, sobre Comercialización a
      Distancia de Servicios Financieros Destinados a los Consumidores, el Real
      Decreto Legislativo 1/2007, de 16 de noviembre, para la Defensa de los
      Consumidores y Usuarios y la Ley 34/2002, de 11 de julio, de Servicios de
      la Sociedad de la Información y de Comercio Electrónico, así como el resto
      de la legislación que pueda resultarle aplicable.
    </p>

    <p style="margin-top: 10px; margin-bottom: 6px">
      <b style="color: #666">21 .</b>Este acuerdo puede ser ejecutado en
      multiparts, cada uno de los cuales será determinado un acuerdo original y
      ambos de qué configuración de Shell uno y el mismo acuerdo. Por el otro de
      las Partes y la parte receptora puede estar relacionada en el recibo de
      documentos such as ejecutados y entregados electrónicamente o por
      familiares como si el original hubiera sido recibido.
    </p>

    <div class="sign">
      <h3>
        <!-- 个人签章先用名字代替 后续更新使用签名api -->
        <span class="label"> Prestatario: </span>
        <span class="value">
          {{ getPay('customerName', loginData) }}
        </span>
      </h3>
      <h3>Fecha: {{ today }}</h3>

      <!-- 盖章 -->
      <h3 class="stamp">Firma</h3>
    </div>

    <div class="sign split">
      <h3>RIVENDELL TECHNOLOGY, S.L.U.</h3>
      <h3>Fecha: {{ today }}</h3>
      <!-- 盖章 -->
      <h3 class="stamp">Firma</h3>
    </div>

    <h2>Mandato de adeudo directo SEPA</h2>
    <ul>
      <li>
        <!-- 身份证 -->
        <span class="label">Número de identificación del acreedor:</span>
        <span class="value">{{ getPay('customerId', loginData) }}</span>
      </li>
      <li>
        <span class="label">Referencia del mandato:</span>
        <span class="value">- será presentado-</span>
      </li>
      <li>
        <!-- 姓名 地址 -->
        <span class="label">Nombre y domicilio del beneficiario:</span>
        <span class="value"
          >{{ getPay('customerName', loginData) }}<br />{{
            getPay('currentAddress', loginData)
          }}</span
        >
      </li>
    </ul>
    <p>
      Yo/ nosotros apodero/amos a [RIVENDELL] a debitar pagos de mi/nuestra
      cuenta mediante adeudos directos SEPA. Asimismo, instruyo/imos a
      mi/nuestra entidad de crédito al pago de los adeudos directos realizados
      por [RIVENDELL].
    </p>
    <p>
      Nota: Yo/nosotros podré/podremos solicitar la devolución del importe
      debitado dentro de las ocho semanas de la fecha del débito. Regirán las
      condiciones de mi/nuestra entidad de crédito.
    </p>

    <ul>
      <li>Tipo de pago: pago recurrente</li>
      <li>Entidad de crédito: {{ bankName }}</li>
      <li>IBAN: {{ getPay('accountNumber', accountInfo) }}</li>
      <li>
        Nombre y domicilio del/los titular/es de la cuenta bancaria/ obligado al
        pago: {{ getPay('customerName', loanData)
        }}{{ getPay('currentAddress', loginData) }}
      </li>
    </ul>

    <div class="sign split">
      <h2>Fecha: {{ today }}</h2>
      <!-- 地点日期 -->
      <h2>{{ getPay('currentAddress', loginData) }}</h2>
      <!-- 个人签章下一版本迭代 -->
      <h2 class="stamp">Firma del 1er titular</h2>
      <h2 class="stamp">Firma del 2do titular</h2>
    </div>

    <h2>Declaración final / Firma</h2>

    <h3>Declaración del cliente: por medio de la presente declaro:</h3>
    <ul>
      <li>
        Que tengo plena capacidad legal y que no existen ni han existido en mi
        contra medidas de ejecución patrimoniales (protesto de letras de cambio
        aceptadas por el prestatario, traba de embargo sobre los bienes del
        prestatario o situación de insolvencia o concursal) durante los últimos
        5 años, ni existen solicitudes de insolvencia en mi contra,
      </li>
      <li>
        Que he proporcionado información completa y veraz de acuerdo con mi
        mejor conocimiento y conciencia, y
      </li>
      <li>
        Que soy consciente de que la falsedad de la información aportada puede
        resultar en la denegación/resolución del préstamo.
      </li>
    </ul>

    <p>
      Mi firma implica una declaración de conformidad con tales manifestaciones.
    </p>

    <p>
      Confirmación de haber revisado y tomado razón de información relevante:
    </p>
    <p>
      Por medio de la presente, confirmo que he leído y tomado razón de la
      siguiente información:
    </p>
    <ul>
      <li>
        De esta declaración final, incluyendo el acceso e intercambio de
        información con ficheros sobre solvencia patrimonial y crédito,
      </li>
      <li>El tablón de tarifas actual.</li>
    </ul>
    <p>
      El prestatario es el beneficiario económico y actúa por cuenta propia.
    </p>

    <div class="sign split">
      <h2>Fecha: {{ today }}</h2>
      <!-- 地点日期 -->
      <h2>{{ getPay('currentAddress', loginData) }}</h2>
      <!-- 个人签章下一版本迭代 -->
      <h3 class="stamp">
        <p v-if="false">Firma del prestatario</p>
      </h3>
    </div>

    <h2>Instrucciones para el desistimiento</h2>

    <p>
      El prestatario podrá dejar sin efecto el contrato sin necesidad de indicar
      los motivos y sin penalización alguna, si así lo comunicara por escrito en
      un plazo de catorce días naturales (por ejemplo, por carta, fax o correo
      electrónico).
    </p>

    <p>
      El plazo se iniciará en la fecha de suscripción del contrato de préstamo o
      bien, si fuera posterior, en la fecha en que el consumidor recibiera las
      condiciones contractuales y la información recogida en el artículo 16 de
      Ley 16/2011, de 24 de junio, de contratos de crédito al consumo (por
      ejemplo, información sobre el tipo de préstamo, sobre el importe total y
      duración del contrato de préstamo). Se considerará que el prestatario ha
      recibido la información requerida cuando ella estuviera contenida en la
      copia que recibiera de su solicitud de préstamo o del contrato, o en la
      copia de cualquiera de ellos que fuera puesta a disposición del
      prestatario.
    </p>

    <p>
      La información legal que no estuviere contenida en el contrato podrá
      igualmente ser informada por escrito al prestatario con posterioridad, en
      cuyo caso el plazo para el desistimiento será de un mes. El prestatario
      deberá ser informado en tal oportunidad nuevamente sobre su derecho de
      desistimiento. Se considerará que se ha respetado el plazo si la
      notificación se hubiera enviado antes de la expiración del plazo, siempre
      que haya sido efectuada mediante documento en papel o cualquier otro
      soporte duradero (por ejemplo, por carta, fax o correo electrónico). La
      notificación deberá ser enviada al Prestamista: Calle Martínez Villergas
      49, Bloque V, 1ª Planta, 28027, Madrid.
    </p>

    <p>
      El prestatario da su autorización al Prestamista a ejecutar el contrato de
      préstamo desde el momento de su celebración, sin que haya transcurrido el
      plazo de desistimiento previsto en el presente apartado.
    </p>

    <h3>Consecuencias del desistimiento:</h3>
    <p>
      Si el préstamo hubiera sido desembolsado, el prestatario deberá pagar al
      Prestamista el capital y el interés devengado sobre dicho capital entre la
      fecha de disposición del préstamo y la fecha de reembolso del capital,
      dentro de los treinta días naturales de haber enviado la notificación de
      desistimiento al Prestamista. El prestatario deberá pagar, entre la fecha
      de disposición del préstamo y la fecha de reembolso del capital, los
      intereses diarios establecidos. Este importe se reducirá si el préstamo
      solo hubiera sido dispuesto parcialmente.
    </p>
    <h3>FIN DE LAS INSTRUCCIONES PARA EL DESISTIMIENTO</h3>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import dayjs from 'dayjs';
export default {
  name: 'LoanAgree',
  props: {
    bankName: {
      type: String,
      default: '-',
    },
    accountList: {
      type: Array,
      default: () => [],
    },
    bankVal: {
      type: [Number, String],
      default: '',
    },
  },
  computed: {
    ...mapGetters(['loan', 'setting', 'login']),
    loanData() {
      return this.loan.preLoan;
    },
    accountInfo() {
      if (!this.bankVal) return '-';

      const o = this.accountList.find((_) => _.accountId === this.bankVal);
      return o || '-';
    },
    paymentData() {
      // 当前这一期的数据
      const o = this.loanData;
      const l = (o && o.loanInfoVoList) || [];
      return (l.length && l[0]) || null;
    },
    infoList() {
      return this.loanData.loanInfoVoList || [];
    },
    loginData() {
      return this.login.loginData;
    },
    lastDuedate() {
      return dayjs().add(31, 'day').format('DD-MM-YYYY');
    },
    today() {
      return dayjs().format('DD-MM-YYYY');
    },
  },
  created() {},

  methods: {
    getPay(key, obj) {
      if (!obj) return '-';

      return obj[key] || '-';
    },
  },
};
</script>
<style lang="scss">
.loan-agree {
  h2,
  h3,
  ul,
  li,
  p {
    white-space: normal;
    word-break: break-word;
  }
  ul {
    list-style: disc;
    margin-left: 20px;
  }
  li {
    display: list-item;
  }
}
</style>
