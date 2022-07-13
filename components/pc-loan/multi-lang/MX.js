import { setApp } from '@/plugins/config/index';
const { appData } = setApp(process.env.BASE_HOST);
const app = appData.app || '';

export default `<p><strong>1. Acerca de estos Términos de Uso</strong></p>
    <p>Lea estos Términos de Uso con mucho cuidado.&nbsp;Estos Términos de uso constituyen un servicio financiero electrónico y un acuerdo de licencia de usuario final, y al registrarse o utilizar cualquier parte del&nbsp;servicio&nbsp;${app}&nbsp;(“Servicio”), usted confirma que ha leído, entendido y aceptado estos Términos de uso y estará obligado por ellos.&nbsp;Si no acepta estar sujeto a estos Términos de uso, no puede acceder ni utilizar ninguna parte del Servicio.&nbsp;Estos Términos de uso constituyen un acuerdo legal vinculante entre Usted, como usuario individual (“Usted” o “Su”) y&nbsp;<strong>${
  appData.company || 'Aztlan Network, S.A. De C.V.'
}&nbsp;</strong>(“Nosotros”, “Nosotros” o “Nuestro”).</p>
    <p>Estos Términos de uso y cualquier modificación o variación de los mismos entrarán en vigencia respectivamente en su fecha de publicación.</p>
    <p><strong>2. Definiciones e interpretación</strong></p>

    <p><strong>2.1 En estos Términos de uso, los siguientes términos tendrán los siguientes significados:</strong></p>

    <p><strong>Afiliado</strong> significa, en relación con una parte, cualquier entidad que controla, está bajo el control o está bajo control común con esa parte, donde el control significa la propiedad directa o indirecta de más del 50 por ciento del capital con derecho a voto o derecho similar de propiedad de esa parte o el poder legal para dirigir o causar la dirección de la administración general y las políticas de esa parte, ya sea a través de la propiedad del capital con derecho a voto, por contrato o de otra manera, y los controles y controlados se interpretarán en consecuencia;</p>

    <p><strong>Cuenta</strong> significa su cuenta individual mientras accede al Sistema y utiliza el Servicio;</p>

    <p><strong>Aplicación / App</strong> significa la aplicación electrónica suministrada por Nosotros y / o las Compañías de nuestro Grupo para que Usted acceda al Servicio;</p>

    <p><strong>La ley aplicable</strong> se refiere a todas las leyes, reglamentos, disposiciones, reglamentos, políticas reguladoras, ordenanzas, protocolos, códigos industriales, códigos de tránsito, permisos regulatorios, licencias regulatorias o requisitos de cualquier tribunal, tribunal o gobierno, estatutario, regulatorio, judicial, autoridad u organismo administrativo o de supervisión, que están vigentes de vez en cuando durante la vigencia de estos Términos de uso;</p>

    <p><strong>Día hábil</strong> significa un día que no sea sábado, domingo o feriado nacional o público en ${
      appData.fullCountry || 'Estados Unidos Mexicanos'
    } (${appData.simCountry || 'México'});</p>

    <p><strong>Credenciale</strong>s significa Sus credenciales personales utilizadas para acceder a la Aplicación / el Servicio y operar Su Cuenta;</p>

    <p><strong>Buró de referencia de crédito</strong> significa un buró de referencia de crédito debidamente autorizado bajo la Ley de Banca de conformidad con el Reglamento de Banca (Buró de Referencia de Crédito), según enmendado, revisado o promulgado de vez en cuando, para, entre otras cosas, cobrar y facilitar el intercambio de crédito del cliente información;</p>

    <p><strong>Información confidencial</strong> significa cualquier información y datos confidenciales o de propiedad de nosotros o nuestros afiliados, divulgados a usted en relación con estos Términos, ya sea divulgados electrónicamente, oralmente o por escrito o mediante otros métodos disponibles para usted.</p>



    <p><strong>Compañías del Grupo</strong> significa una persona y sus Afiliados (y la Compañía del Grupo se interpretará en consecuencia);</p>



    <p><strong>Préstamo</strong> significa el monto principal del préstamo otorgado o que nosotros le haremos a Usted conforme a estos Términos de uso de vez en cuando a través de la Aplicación o (según lo requiera el contexto) el monto principal pendiente por el momento de ese préstamo;</p>



    <p><strong>Términos locales</strong> significa los términos suplementarios o alternativos para países, ciudades, municipios, áreas metropolitanas o regiones específicas que se aplican a usted, tal como están disponibles y que nosotros actualizamos periódicamente;</p>



    <p><strong>El dispositivo móvil</strong> incluye y significa su teléfono móvil, tarjeta SIM y / u otro equipo que, cuando se usan juntos, le permite acceder a la red y usar la aplicación;</p>



    <p><strong>Cuenta de dinero móvil</strong> significa Su depósito de valor de dinero móvil, que es el registro que mantienen los Proveedores de dinero móvil en&nbsp;${
      appData.simCountry || 'México'
    }&nbsp;de la cantidad de dinero electrónico que usted posee en el Sistema del proveedor de dinero móvil;</p>



    <p><strong>Dinero </strong>móvil significa el servicio de transferencia y pago de dinero operado por los Proveedores de dinero móvil en&nbsp;${
      appData.simCountry || 'México'
    }&nbsp;;</p>



    <p><strong>Operador de red móvil</strong> significa un operador de red móvil en&nbsp;${
      appData.simCountry || 'México'
    }&nbsp;registrado en la Autoridad de Comunicaciones de&nbsp;${
  appData.simCountry || 'México'
}&nbsp;;</p>



    <p><strong>Proveedor de dinero móvil</strong> significa un Operador de red móvil que ha sido debidamente autorizado por el&nbsp;Banco de ${
      appData.simCountry || 'México'
    } según la ley aplicable para ofrecer el Servicio de dinero móvil en&nbsp;${
  appData.simCountry || 'México'
}&nbsp;;</p>



    <p><strong>Servicio de dinero móvil</strong> significa el servicio de transferencia y pago de dinero provisto por los Proveedores de dinero móvil a través del Sistema de dinero móvil;</p>



    <p><strong>Sistema de dinero móvil</strong> significa el sistema operado por los Proveedores de dinero móvil en ${
      appData.simCountry || 'México'
    } para la provisión del Servicio de dinero móvil;</p>



    <p><strong>Políticas </strong>se refiere a cualquier política, directriz o dirección aplicable a Usted como usuario, tal como le notificamos de vez en cuando, y que nosotros podamos actualizar periódicamente;</p>



    <p><strong>Información personal </strong>significa datos, ya sean verdaderos o no, sobre un individuo que puede identificarse a partir de esos datos, o de esos datos y otra información a la que tenemos o es probable que tengamos acceso.&nbsp;Esto puede incluir el nombre de un individuo, identificación nacional, fecha de nacimiento, sexo, antecedentes educativos, religión, fotografía, dirección física, dirección de correo electrónico, información de trabajo, estado civil, contacto de emergencia, número de teléfono, detalles de la tarjeta SIM, información financiera y de crédito. información (incluidos los detalles de la cuenta de dinero móvil, los detalles de la cuenta bancaria y el número de verificación bancaria, cuando corresponda), el ID de cuenta y / o la contraseña que se utilizarán para acceder a la aplicación después del registro y otra información que, cuando se toma junto con otra información, permitir que un individuo sea identificado.</p>



    <p><strong>Solicitud</strong> significa una solicitud o instrucción recibida por Nosotros de usted o supuestamente de usted a través del Sistema y sobre la cual estamos autorizados a actuar;</p>



    <p><strong>Servicio</strong> significa cualquier forma de servicio o producto financiero que podamos ofrecerle de conformidad con estos Términos de uso y, de vez en cuando, puede suscribirse y el “Servicio” se interpretará en consecuencia;</p>



    <p><strong>Tarjeta SIM</strong> significa el módulo de identidad del suscriptor que, cuando se usa con el teléfono móvil apropiado, le permite acceder a la red y usar la cuenta de dinero móvil;</p>



    <p><strong>SMS</strong> significa un servicio de mensajes cortos que consiste en un mensaje de texto transmitido desde su dispositivo móvil a otro;</p>



    <p><strong>Términos específicos</strong> significa los términos suplementarios o alternativos que pueden aplicarse a ciertas partes específicas del Sistema y / o el Servicio, según se le notifique de vez en cuando;</p>



    <p><strong>Sistema</strong> significa el&nbsp;sistema&nbsp;${app}&nbsp;provisto por Nosotros para proporcionar a los usuarios el Servicio, incluida la Aplicación y los softwares, Sitios web, plataformas y otros sistemas y servicios de soporte relacionados.</p>



    <p><strong>Territorio</strong> significa el territorio en el que utiliza el Servicio y el Sistema;</p>



    <p><strong>Las tarifas de transacción</strong> incluyen las tarifas y cargos pagaderos por el uso del Servicio según lo publicado por Nosotros en la Aplicación o por cualquier otro medio que determinemos a Nuestro exclusivo criterio.&nbsp;Las tarifas de transacción están sujetas a cambios en cualquier momento a nuestro exclusivo criterio;</p>



    <p><strong>Sitio web</strong> significa cualquier sitio web operado por Nosotros o cualquiera de las Compañías de nuestro Grupo de vez en cuando.</p>



    <p><strong>2.¿Cómo cambio mis datos personales?</strong></p>



    <p>2.1 Para editar sus datos personales, haga clic en “Mi cuenta” y haga clic en “Editar” en “Información personal”.</p>



    <p>2.2 En estos Términos de uso: (a) una referencia a “escritura” no incluye correo electrónico a menos que se especifique lo contrario;&nbsp;y (b) cualquier frase introducida por los términos “que incluye”, “incluye”, “en particular”, “por ejemplo”, o cualquier expresión similar es ilustrativa y no limita el significado de las palabras que preceden a esos términos.&nbsp;Estos Términos de uso están redactados en español.&nbsp;Si estos Términos de uso se traducen a otro idioma, prevalecerá el texto en español.&nbsp;En caso de cualquier inconsistencia, se aplica el siguiente orden de precedencia: primero, (i) los Términos Locales (si los hay);&nbsp;luego (ii) los Términos específicos (si corresponde);&nbsp;y finalmente (iii) las otras partes de estos Términos de uso.</p>



    <p><strong>3. Sus responsabilidades</strong></p>



    <p>Usted confirma y se compromete con Nosotros que: 3.1 Tiene pleno poder y autoridad para celebrar y estar legalmente obligado por estos Términos de uso y cumplir con sus obligaciones en virtud de estos Términos de uso;&nbsp;3.2 Deberá cumplir en todo momento con todas las Leyes aplicables y estos Términos de uso, y nos notificará si incumple alguna de las Leyes aplicables o estos Términos de uso;&nbsp;3.3 Solo usará el Sistema y el Servicio para fines legales y solo para los fines para los que está destinado a ser utilizado;&nbsp;3.4 Deberá asegurarse de que todos los documentos, información personal y credenciales que nos haya proporcionado (o en su nombre) a nosotros o de otro modo a través del sistema sean precisos, actuales, completos y no engañosos;&nbsp;3.5 Solo utilizará un punto de acceso a Internet y una Cuenta que esté autorizado a utilizar;&nbsp;3.6 No deberá participar en ninguna conducta fraudulenta, engañosa o engañosa;&nbsp;y 3.7 No perjudicará ni eludirá el funcionamiento adecuado de la red en la que opera el Sistema.</p>



    <p><strong>4. Aceptación de estos Términos de uso</strong></p>



    <p>4.1 Debe leer detenidamente y comprender todos los términos establecidos en estos Términos de uso y enmendados periódicamente por Nosotros antes de descargar o transmitir la Aplicación o registrar una Cuenta con nosotros que regirá el uso y el funcionamiento de la Aplicación y Cuenta.</p>



    <p>4.2 Después de descargar la aplicación, se considerará que acepta estos Términos de uso al hacer clic en la opción “Aceptar” en nuestro sistema y le pedirá que confirme que ha leído, entendido y aceptado cumplir con estos Términos de uso.</p>



    <p>4.3 Al descargar la Aplicación y registrar una Cuenta, usted acepta cumplir y estar sujeto a estos Términos de uso que rigen el funcionamiento de la Cuenta y afirma que los términos del presente documento son sin perjuicio de cualquier otro derecho que podamos tener con respecto a la cuenta legal o de otro tipo.</p>



    <p>4.4 Estos términos pueden ser modificados por Nosotros de vez en cuando y el uso continuado del Servicio constituye Su aceptación de estar sujeto a los términos de cualquier modificación o variación.&nbsp;Tomaremos todas las medidas razonables para notificarle cualquier cambio.</p>



    <p>4.5 De &#8203;&#8203;vez en cuando, se pueden emitir actualizaciones de la aplicación a través del sitio web.&nbsp;Dependiendo de la actualización, es posible que no pueda usar el Servicio hasta que haya descargado o transmitido la última versión de la Aplicación y haya aceptado los nuevos términos y condiciones de estos Términos de uso.</p>



    <p>4.6 Al usar la Aplicación o cualquiera de los Servicios, Usted acepta que recopilemos y usemos información técnica sobre el Dispositivo móvil y el software, hardware y periféricos relacionados para el Servicio que están basados &#8203;&#8203;en Internet o inalámbricos para mejorar nuestros productos y proporcionar cualquier Servicio a Tú.&nbsp;Si utiliza estos Servicios, nos autoriza a nosotros y a nuestros afiliados y licenciatarios a transmitir, recopilar, retener, mantener, procesar y usar Sus datos para determinar nuestros servicios de calificación crediticia o para mejorar nuestro Servicio y / o Su experiencia al usar el App.</p>



    <p>4.7 Por este conducto autoriza expresamente a Nosotros, para que por conducto de nuestros funcionarios facultados llevemos a cabo Investigaciones, sobre su comportamiento crediticio en las Sociedades de Información Crediticia que estimemos conveniente. Así mismo, declara que conozca la naturaleza y el alcance de la información que se solicitará, del uso que haremos de tal información y de que podremos realizar consultas periódicas de su historial crediticio, consintiendo que esta autorización se encuentre vigente por un período de 3 años contados a partir de la fecha de su expedición y en todo caso durante el tiempo que mantengamos relación jurídica.</p>



    <p>4.8 También nos autoriza expresamente a contactarlo a usted y a su contacto de emergencia que lo haya acordado expresamente, para verificar su información o cuando no podamos comunicarnos con usted a través de otros métodos o cuando no hayamos recibido su pago en relación con el préstamo establecido en Cláusula 11 de este documento.</p>



    <p>4.9 Usted autoriza a&nbsp;${app}&nbsp;y a la institución de pago de terceros a usar esta tarjeta bancaria para la deducción automática si no paga el préstamo en la fecha de pago acordada al enviar esta verificación de tarjeta bancaria.</p>



    <p><strong>5. Su uso del servicio</strong></p>



    <p>5.1 El servicio ofrecido por nosotros solo puede ser utilizado por personas mayores de 18 años. Nos reservamos el derecho de verificar la autenticidad y el estado de su cuenta de dinero móvil con el proveedor de dinero móvil correspondiente.</p>



    <p>5.2 Nuestra aceptación de su solicitud de una cuenta se mostrará en la aplicación.&nbsp;Por la presente, reconoce y acepta que la aceptación por parte de Nosotros de su solicitud de una cuenta no crea ninguna relación contractual entre usted y los proveedores de dinero móvil más allá de los términos y condiciones que se aplican a su cuenta de dinero móvil de vez en cuando.</p>



    <p>5.3 Nos reservamos el derecho de rechazar su solicitud de préstamo o de revocarla en cualquier momento a nuestra exclusiva y absoluta discreción y sin asignar ningún motivo ni notificarlo.</p>



    <p>5.4 Nos reservamos el derecho (a nuestro exclusivo y absoluto criterio) de emitir, rechazar emitir un Préstamo y / o variar los términos de cualquier Préstamo dependiendo de Nuestra evaluación del perfil de crédito de Usted de vez en cuando.&nbsp;Los términos del Préstamo y la tasa de interés pagadera en relación con cada solicitud de Préstamo se mostrarán en la Aplicación.</p>



    <p><strong>6. Su uso del sistema</strong></p>



    <p><strong>Derechos otorgados y reservados:</strong></p>



    <p>6.1 Sujeto a su cumplimiento de estos Términos de uso, nosotros y nuestros licenciantes (si corresponde) le otorgamos una licencia revocable, limitada, no exclusiva, no transferible y libre de regalías durante el plazo de estos Términos de uso y en el Territorio , para acceder y utilizar el Sistema únicamente para su uso personal con el fin de adquirir el Servicio proporcionado por Nosotros.</p>



    <p>6.2 Todos los derechos que no se le otorgan expresamente en virtud de estos Términos de uso están reservados por nosotros y nuestros otorgantes de licencias (si corresponde).&nbsp;Nada en estos Términos de uso transfiere a usted ninguna propiedad del Sistema (en su totalidad o en parte).</p>



    <p><strong>Conductas prohibidas:</strong></p>



    <p>6.3 Mientras usa el Sistema, no deberá:</p>



    <p>6.3.1 licenciar, sublicenciar, vender, revender, transferir, asignar, distribuir o explotar comercialmente o poner a disposición de terceros de cualquier otra forma el Sistema;</p>



    <p>6.3.2 modificar o realizar trabajos derivados basados &#8203;&#8203;en el Sistema, o realizar ingeniería inversa o acceder al software subyacente por cualquier motivo;</p>



    <p>6.3.3 usar el Sistema para construir un producto o servicio competitivo, construir un producto usando ideas, características, funciones o gráficos similares al Sistema, copiar ideas, características, funciones o gráficos del Sistema, o lanzar un programa o script automatizado que puede realizar múltiples solicitudes de servidor por segundo, o que carga o dificulta indebidamente la operación y / o el rendimiento del Sistema, o intenta obtener acceso no autorizado al Sistema o sistemas o redes relacionados;</p>



    <p>6.3.4 usar cualquier aplicación o proceso para recuperar, indexar, “extraer datos”, o de cualquier manera reproducir o eludir la estructura de navegación, presentación o contenido del Sistema;</p>



    <p>6.3.5 publicar, distribuir o reproducir de cualquier manera cualquier material con derechos de autor, marcas comerciales u otra información de propiedad sin obtener el consentimiento previo del propietario de dichos derechos de propiedad, o eliminar cualquier aviso de derechos de autor, marca registrada u otros derechos de propiedad contenidos en el Sistema;</p>



    <p>6.3.6 enviar o almacenar cualquier material con fines ilegales o fraudulentos;</p>



    <p>6.3.7 enviar spam u otros mensajes no solicitados, o causar molestias, molestias, inconvenientes o hacer reservas falsas;</p>



    <p>6.3.8 enviar o almacenar material infractor, obsceno, amenazante, difamatorio o ilegal o tortuoso;</p>



    <p>6.3.9 enviar material que contenga virus de software, gusanos, troyanos u otro código informático, archivos, scripts, agentes o programas dañinos;</p>



    <p>6.3.10 interferir o alterar la integridad o el rendimiento del Sistema o los datos contenidos en el mismo;</p>



    <p>6.3.11 hacerse pasar por cualquier persona o entidad o tergiversar su afiliación con una persona o entidad;</p>



    <p>6.3.12 tergiversar deliberadamente su ubicación;&nbsp;o</p>



    <p>6.3.13 tergiversar cualquier información importante sobre usted, o que pueda relacionar nuestra decisión de participar en cualquier negocio relacionado u otro con usted;</p>



    <p>6.3.14 dañar nuestra reputación o la de cualquiera de las compañías de nuestro grupo de alguna manera;</p>



    <p>6.3.15 recopilar o recolectar cualquier información o datos de cualquier Servicio o nuestros sistemas o intentar descifrar cualquier transmisión hacia o desde los servidores que ejecutan cualquier Servicio.</p>



    <p><strong>7. Su cuenta</strong></p>



    <p>7.1 Para acceder al Sistema como usuario, debe registrarse y mantener una Cuenta como usuario de la Aplicación.</p>



    <p>7.2 Usted es responsable de todas las actividades realizadas en su cuenta.&nbsp;Usted:</p>



    <p>7.2.1 solo debe tener una cuenta;</p>



    <p>7.2.2 debe mantener la información de su cuenta confidencial y segura;</p>



    <p>7.2.3 no debe proporcionar a ninguna otra persona acceso a su cuenta, incluso para transferir la cuenta o la información de su cuenta a otra persona;</p>



    <p>7.2.4 debe notificarnos de inmediato si sospecha que tiene acceso o uso no autorizado a su cuenta;&nbsp;y</p>



    <p>7.3 Nos reservamos el derecho de bloquear o denegar el acceso a su cuenta, y / o bloquear las funciones disponibles en la aplicación, sin perjuicio de nuestros otros derechos y recursos:</p>



    <p>7.3.1 si consideramos, a nuestro exclusivo criterio, que usted ha violado cualquier término de estos Términos de uso;</p>



    <p>7.3.2 durante una investigación;</p>



    <p>7.3.3 si nos debe capital, intereses, tasas de transacción o impuestos a Nosotros o cualquiera de las Compañías de nuestro Grupo;</p>



    <p>7.3.4 si estos Términos de uso se rescinden por cualquier motivo;&nbsp;o</p>



    <p>7.3.5 en cualquier otro momento a nuestra discreción razonable.</p>



    <p><strong>8. Su información personal</strong></p>



    <p>Usted acepta y consiente que usemos y procesemos su información personal tal como se establece en la Política de privacidad aquí, modificada periódicamente por nosotros.</p>



    <p><strong>9. Solicitudes hechas por usted</strong></p>



    <p>9.1 Por la presente, nos autoriza irrevocablemente a actuar sobre todas las Solicitudes que recibimos de usted (o supuestamente de usted) a través del Sistema y a responsabilizarlo con respecto a las mismas.</p>



    <p>9.2 Sujeto a nuestra discreción, nos reservamos el derecho de rechazar cualquier Solicitud en relación con una solicitud de Préstamo de Usted, incluso si previamente le hemos emitido un Préstamo.</p>



    <p>9.3 Tendremos derecho a aceptar y actuar sobre cualquier Solicitud, incluso si esa Solicitud es de otro modo incompleta o ambigua si, a nuestra absoluta discreción, creemos que puede corregir la información incompleta o ambigua en la Solicitud sin ninguna referencia a ti siendo necesario.</p>



    <p>9.4 Se considerará que hemos actuado correctamente y que hemos cumplido todas las obligaciones que se le adeudan a pesar de que la Solicitud puede haberse iniciado, enviado o comunicado de otra manera por error o de manera fraudulenta, y Usted estará obligado por cualquier Solicitud en la que podamos actuar si hemos actuado de buena fe creyendo que usted ha enviado tales instrucciones.</p>



    <p>9.5 Podemos, a nuestra absoluta discreción, negarnos a actuar de acuerdo con o en su totalidad o en parte de su solicitud a la espera de una nueva consulta o confirmación adicional (ya sea por escrito o no) de usted.</p>



    <p>9.6 Usted acepta y nos liberará e indemnizará de todos los reclamos, pérdidas, daños, costos y gastos que surjan como consecuencia de, o de alguna manera relacionados con nosotros, haber actuado de acuerdo con la totalidad o parte de cualquiera de sus solicitudes (o no ejerció) la discreción que le fue conferida.</p>



    <p>9.7 Usted reconoce que, en la medida en que lo permita la Ley Aplicable, no seremos responsables de ningún sorteo, transferencia, envío, divulgación, actividad o incidente no autorizados en Su cuenta por el conocimiento y / o uso o manipulación de Su PIN de la cuenta, contraseña, identificación o cualquier medio, ya sea ocasionado por su negligencia.</p>



    <p>9.8 Estamos autorizados a ejecutar las órdenes con respecto a su Cuenta, según lo requiera cualquier orden judicial o autoridad o agencia competente según la Ley Aplicable.</p>



    <p>9.9 En caso de conflicto entre los términos de cualquier Solicitud recibida por nosotros de usted y estos Términos de uso, prevalecerán estos Términos de uso.</p>



    <p><strong>10. Medios electrónicos de autenticación</strong></p>



    <p>Usted acepta y consiente que para los casos en los que sea necesario tu consentimiento expreso, podrá hacerlo con su aceptación mediante un “aceptar” (accept por su significado en inglés) en la “casilla o recuadro de selección” (checkbox por su significado en inglés), a través de medios electrónicos, incluyendo la Aplicación, o por cualquier otro medio contemplado en legislación aplicable a las operaciones de este Contrato.</p>



    <p><strong>11. Sus responsabilidades</strong></p>



    <p>11.1 Usted deberá, a su propio cargo, proporcionar y mantener en un orden de operación seguro y eficiente su dispositivo móvil necesario para acceder al sistema y al servicio.</p>



    <p>11.2 Usted será responsable de garantizar el rendimiento adecuado de su dispositivo móvil.&nbsp;No seremos responsables de los errores o fallas causados &#8203;&#8203;por un mal funcionamiento de su dispositivo móvil, ni seremos responsables de ningún virus informático o problemas relacionados que puedan estar asociados con el uso del sistema, el servicio y el dispositivo móvil.&nbsp;Usted será responsable de los cargos debidos a cualquier proveedor de servicios que le proporcione conexión a la red y no seremos responsables de las pérdidas o demoras causadas por dicho proveedor de servicios.</p>



    <p>11.3 Su acceso a la aplicación será a través de su dispositivo móvil.&nbsp;Es su responsabilidad verificar y asegurarse de descargar la aplicación correcta para su dispositivo móvil.&nbsp;No somos responsables si no tiene un dispositivo compatible o si no tiene la última versión de la aplicación para su dispositivo móvil.</p>



    <p>11.4 Si su dispositivo móvil se pierde, se lo roban, se rompe y / o ya no está en su poder, y esto expone la información de su cuenta y sus credenciales a otra persona o afecta nuestros derechos y / o recursos legales, debe notificarnos de inmediato y seguir los procedimientos notificados por nosotros.&nbsp;No seremos responsables de la divulgación de la información de su cuenta y sus credenciales a ningún tercero y por la presente acepta indemnizarnos y eximirnos de cualquier pérdida resultante de la divulgación de la información de su cuenta y sus credenciales.</p>



    <p>11.5 Usted es el único responsable de contar con un plan móvil y de Internet apropiado y de cualquier tarifa cobrada por su operador de servicios móviles, como las tarifas de teléfono, SMS y datos de Internet.&nbsp;Usted reconoce que Su uso del Sistema puede consumir grandes cantidades de datos y que Usted será el único responsable de dicho uso y las tarifas asociadas.</p>



    <p>11.6 Deberá seguir todas las instrucciones, procedimientos y términos contenidos en estos Términos de uso y cualquier documento provisto por nosotros sobre el uso del Sistema y el Servicio.</p>



    <p>11.7 Deberá tomar todas las precauciones razonables para detectar cualquier uso no autorizado del Sistema y el Servicio.&nbsp;Con ese fin, se asegurará de que todas las comunicaciones de nosotros sean examinadas y verificadas por usted o en su nombre tan pronto como sea posible después de recibirlas de tal manera que se detecte cualquier uso no autorizado y acceso al Sistema.&nbsp;Deberá informarnos de inmediato en caso de que:</p>



    <p>11.7.1 Tiene motivos para creer que sus Credenciales son o pueden ser conocidas por cualquier persona no autorizada a saber lo mismo y / o que se haya visto comprometida;&nbsp;y / o</p>



    <p>11.7.2 Usted tiene razones para creer que el uso no autorizado del Servicio ha ocurrido o puede haber ocurrido o podría ocurrir, y una transacción puede haber sido ingresada o comprometida de manera fraudulenta.</p>



    <p>11.7.3 Deberá seguir en todo momento los procedimientos de seguridad que le notifiquemos de vez en cuando o cualquier otro procedimiento que pueda ser aplicable al Servicio de vez en cuando.&nbsp;Usted reconoce que cualquier incumplimiento por su parte de seguir los procedimientos de seguridad recomendados puede resultar en una violación de la confidencialidad de su cuenta.&nbsp;En particular, se asegurará de que el Servicio no se utilice o de que no se emitan solicitudes o de que las funciones relevantes no sean realizadas por nadie que no sea una persona autorizada por usted para hacerlo.</p>



    <p><strong>12. Términos financieros</strong></p>



    <p><strong>Tasas de interés y transacción</strong></p>



    <p>12.1 Nosotros mostraremos los intereses pagaderos por Usted en relación con cualquier Préstamo en la Aplicación.&nbsp;Mientras tanto, tendremos derecho a establecer y cobrar tarifas de transacción, en relación con su uso del servicio y de vez en cuando modificar o variar nuestras tarifas de transacción por el servicio.&nbsp;Si decidimos comenzar a cobrar tarifas de transacción o, si corresponde, variar o modificar nuestras tarifas de transacción, las tarifas de transacción pagaderas en cualquier nueva solicitud de servicio se mostrarán en la aplicación.&nbsp;Haremos todos los esfuerzos razonables para notificarle cualquier cambio en relación con las Tarifas de transacción dentro de un período razonable antes de que dichos cambios se implementen, incluida la visualización de avisos de los cambios en la Aplicación.</p>



    <p>12.2 Todos los pagos a realizar por Usted en virtud de estos Términos de uso se realizarán en su totalidad sin ningún reclamo compensatorio o compensatorio y se guardarán en la medida en que lo exija la ley en sentido contrario, de forma gratuita y sin deducciones ni retenciones de ningún tipo .&nbsp;Si en algún momento se le requiere hacer una deducción o retención de cualquier pago a Nosotros, inmediatamente nos pagará los montos adicionales que resulten en que recibamos el monto total que habría recibido si no se hubiera requerido dicha deducción o retención.</p>



    <p>12.3 Si no realiza los pagos que se nos adeudan en la fecha de vencimiento del pago, estaremos autorizados a aplicar cargos por demora sobre el monto prestado a usted a una tasa que se mostrará por adelantado en la aplicación.</p>



    <p><strong>Impuestos</strong></p>



    <p>12.4 Todos los pagos que debe realizar en relación con estos Términos de uso y préstamo se calculan sin tener en cuenta los impuestos que deba pagar.&nbsp;Si se paga algún impuesto en relación con el pago, debe pagarnos un monto adicional igual al pago multiplicado por la tasa impositiva apropiada.&nbsp;Debe hacerlo al mismo tiempo que realiza el pago o cuando realicemos dicha demanda, incluso después del final o la finalización de la relación.</p>



    <p>12.5 Por el presente, usted acepta y acepta que podemos retener cantidades en su cuenta si alguna autoridad fiscal nos exige que lo hagamos, o si la ley o los acuerdos con cualquier autoridad fiscal nos exigen que lo hagamos, o si tenemos que cumplir con políticas internas o con cualquier orden aplicable o sanción de una autoridad fiscal.</p>



    <p><strong>Pagos</strong></p>



    <p>12.6 El principal, los intereses, los honorarios de transacción y los impuestos en relación con estos Términos de uso y el Préstamo pagadero por usted a nosotros deben pagarse mediante los métodos de pago antes / en la fecha de vencimiento ofrecida y mostrada en la Aplicación de vez en cuando.</p>



    <p>12.7 Todos los pagos deben realizarse en la moneda local del Territorio, y a través de las instituciones de pago de terceros como STP (SISTEMA DE TRANSFERENCIAS Y PAGOS STP SA de CV SOFOM ENR), Conekta (GRUPO CONEKTAME S.A DE C.V.), OPENPAY (OPENPAY, S.A. de C.V.), etc.</p>

    <p>12.8 Acepta y está consciente de que todos los reembolsos/pagos deben realizarse a la cuenta designada de acuerdo con el proceso de pago instruido o requerido por la Aplicación ${app}, de lo contrario, la Aplicación ${app} no puede recibir el reembolso del usuario y tiene derecho a solicitar al usuario a pagar el saldo restante. Si el usuario paga a una cuenta no indicada por la Aplicación, el usuario asumirá todas las responsabilidades por sí mismo y no tendrá nada que ver con la Aplicación.</p>



    <p><strong>13. Predeterminado</strong></p>



    <p>13.1 Un evento de incumplimiento ocurre cuando usted:</p>



    <p>13.1.1 no pagará ninguna suma o cuota (incluidos todos los intereses devengados, los honorarios de transacción y el impuesto&nbsp;）pagadero por un Préstamo otorgado en virtud de estos Términos de uso por un período de quince (15) días acumulativos a menos que la falta de pago sea causada únicamente por un error administrativo o problema técnico; o se declaran en quiebra.</p>



    <p>13.2 En cualquier momento después de que ocurra un evento de incumplimiento que continúe, podemos, sin perjuicio de cualquier otro derecho o recurso otorgado por la Ley Aplicable:</p>



    <p>13.2.1 rescindir estos Términos de uso de acuerdo con la Cláusula 13 del presente documento;</p>



    <p>13.2.2 declarar que el Préstamo (incluidos todos los intereses devengados, las Tarifas de transacción, los impuestos y todos los demás montos pendientes según estos Términos de uso) se vence y paga inmediatamente, por lo que se vencen y se pagan inmediatamente;</p>



    <p>13.2.3 proporcionar información sobre el caso de incumplimiento de las Oficinas de Referencia de Crédito.&nbsp;Una copia de cualquier información adversa sobre usted y su información de crédito enviada a una Oficina de Referencia de Crédito se le pondrá a su disposición previa solicitud por escrito;&nbsp;y</p>



    <p>13.2.4 imponerle cargos por pagos atrasados &#8203;&#8203;a la tasa que se muestra en la aplicación en relación con su incumplimiento de pago.</p>



    <p><strong>14. Plazo y rescisión</strong></p>



    <p>14.1 Estos Términos de uso continuarán hasta su finalización de acuerdo con sus términos.</p>



    <p>14.2 Podemos rescindir estos Términos de uso y / o suspender o rescindir Su uso del Sistema, el Servicio y Su Cuenta en su totalidad o en parte:</p>



    <p>14.2.1 en cualquier momento por cualquier motivo mediante notificación a usted;</p>



    <p>14.2.2 inmediatamente, con o sin previo aviso, si usted incumple cualquiera de los términos de estos Términos de uso, sin perjuicio de nuestros otros derechos y recursos;</p>



    <p>14.2.3 si su cuenta o acuerdo con un operador de red móvil o proveedor de dinero móvil se rescinde por cualquier motivo;</p>



    <p>14.2.4 cuando dicha suspensión o terminación sea necesaria como consecuencia de problemas técnicos o por razones de seguridad;&nbsp;para facilitar la actualización o actualización de los contenidos o la funcionalidad del Servicio de vez en cuando;&nbsp;donde su cuenta se vuelve inactiva o inactiva;</p>



    <p>14.2.5 si se nos exige o se nos solicita que cumplamos con una orden o instrucción o una recomendación del gobierno, tribunal, regulador u otra autoridad competente&nbsp;；o</p>



    <p>14.2.6 si decidimos suspender o suspender la prestación del Servicio por razones comerciales o por cualquier otro motivo que podamos determinar a nuestra absoluta discreción;</p>



    <p>14.3 Al término o vencimiento de estos Términos de uso por cualquier motivo, usted deberá:</p>



    <p>14.3.1 puntualmente (y en cualquier caso dentro de los tres días), pague el principal, los intereses, los honorarios de transacción o los impuestos que se nos adeuden (que serán pagaderos inmediatamente y pagaderos al finalizar);&nbsp;y</p>



    <p>14.3.2 eliminar inmediatamente y eliminar completamente la aplicación de su dispositivo móvil.</p>



    <p>14.4 Sin embargo, la rescisión no afectará los derechos y responsabilidades acumulados de ninguna de las partes.</p>



    <p>14.5 Las partes no tendrán más obligaciones o derechos en virtud de estos Términos de uso después de la terminación de los Términos de uso, sin perjuicio de las obligaciones o derechos que se hayan acumulado a cualquiera de las partes en el momento de su terminación, salvo las disposiciones de las Cláusulas 2 3, 8, 11, 13, 14, 15 y 16 de estos Términos de uso y cualquier otra cláusula que expresamente o por su naturaleza tenga la intención de sobrevivir, continuará teniendo efecto después del final de estos Términos de uso.</p>



    <p><strong>15. Indemnizaciones y exclusión de responsabilidad</strong></p>



    <p><strong>Indemnizaciones</strong></p>



    <p>15.1 Deberá defender, indemnizar y eximir de responsabilidad a Nosotros, a nuestros licenciantes y a los Afiliados de cada parte y sus respectivos funcionarios, directores, miembros, empleados y agentes de y contra todos y cada uno de los reclamos, costos, daños, pérdidas, responsabilidades y gastos (incluidos los abogados ‘honorarios y costos) que surjan de o en relación con:</p>



    <p>15.1.1 Su incumplimiento de cualquier término de estos Términos de uso o cualquier Ley aplicable;&nbsp;y</p>



    <p>15.1.2 Su uso del Sistema y / o el Servicio, que incluye:</p>



    <p>15.1.2.1 cualquier reclamo de terceros que surja de su uso del Sistema y / o el Servicio;</p>



    <p>15.1.2.2 cualquier pérdida o daño que pueda derivarse de su uso, mal uso, abuso o posesión de cualquier software de terceros, incluidos, entre otros, cualquier sistema operativo, software de navegador o cualquier otro paquete o programa de software;</p>



    <p>15.1.2.3 cualquier acceso no autorizado a su cuenta o cualquier violación de la seguridad o cualquier destrucción o acceso a sus datos o cualquier destrucción o robo o daño a su dispositivo móvil;&nbsp;y</p>



    <p>15.1.2.4 cualquier pérdida o daño ocasionado por el incumplimiento por su parte de estos Términos de uso y / o al proporcionar información incorrecta o pérdida o daño ocasionado por la falla o falta de disponibilidad de instalaciones o sistemas de terceros o la incapacidad de un tercero parte para procesar una transacción o cualquier pérdida en la que podamos incurrir como consecuencia de cualquier incumplimiento de estos Términos de uso.</p>



    <p><strong>Exclusión de responsabilidad</strong></p>



    <p>15.2 No seremos responsables de ninguna pérdida sufrida por Usted en caso de que el Servicio sea interferido o no esté disponible debido a la falla de su Dispositivo móvil, o cualquier otra circunstancia que no esté bajo nuestro control, incluyendo, entre otros, Fuerza mayor o error, interrupción, demora o falta de disponibilidad del Sistema, falla del equipo de acción terrorista o de cualquier enemigo, pérdida de potencia, condiciones climáticas o atmosféricas adversas y falla de cualquier sistema de telecomunicaciones público o privado.</p>



    <p>15.3 Usted reconoce que la aplicación no ha sido desarrollada para cumplir con sus requisitos individuales y que, por lo tanto, es su responsabilidad asegurarse de que las instalaciones y funciones de la aplicación descritas cumplan con sus requisitos.</p>



    <p>15.4 Solo suministramos la aplicación para uso privado.&nbsp;Usted acepta no utilizar la aplicación para fines comerciales, comerciales o de reventa, y no tenemos ninguna responsabilidad ante usted por cualquier pérdida de ganancias, pérdida de negocios, interrupción de negocios o pérdida de oportunidades comerciales.</p>



    <p>15.5 No seremos responsables de ninguna pérdida o daño sufrido por Usted como resultado de o en relación con:</p>



    <p>15.5.1.1 cualquier defecto o falla en la Aplicación o en cualquier Servicio que resulte de que usted haya alterado o modificado la Aplicación;</p>



    <p>15.5.1.2 cualquier defecto o falla en la Aplicación que resulte de que Usted haya utilizado la Aplicación en violación de estos Términos de uso;</p>



    <p>15.5.1.3 Su incumplimiento de la Cláusula 6 del presente documento;</p>



    <p>15.5.1.4 indisponibilidad de fondos suficientes en su cuenta de dinero móvil;</p>



    <p>15.5.1.5 falla, mal funcionamiento, interrupción o indisponibilidad del sistema, su dispositivo móvil, la red o un sistema de dinero móvil;&nbsp;el dinero en su cuenta está sujeto a un proceso legal u otro gravamen que restringe los pagos o transferencias de los mismos;&nbsp;Su falta de dar instrucciones apropiadas o completas para pagos o transferencias relacionadas con su cuenta;</p>



    <p>15.5.1.6 cualquier uso fraudulento o ilegal del Servicio, el Sistema y / o su Dispositivo móvil;&nbsp;o</p>



    <p>15.5.1.7 Su incumplimiento de estos Términos de uso y cualquier documento o información proporcionada por nosotros sobre el uso del Sistema y el Servicio.</p>



    <p>15.6 Bajo ninguna circunstancia seremos responsables ante Usted por cualquier pérdida de ganancias o ahorros anticipados o por cualquier pérdida o daño indirecto o consecuente de cualquier tipo, sea cual sea su causa, que surja o esté relacionado con el Servicio, incluso cuando exista la posibilidad de tal pérdida o se nos notifica el daño.</p>



    <p>15.7 En la máxima medida permitida por la Ley Aplicable, y a menos que se especifique lo contrario en estos Términos de Uso, en ningún caso nuestra responsabilidad total máxima que surja en relación con la Aplicación, el Sistema, el Servicio y / o estos Términos de Uso, ya sea en el contrato, agravio, incumplimiento del deber legal o de otro modo, exceder los honorarios de transacción pagados por usted a nosotros en relación con el primer evento que da lugar a un reclamo en virtud de estos Términos de uso.</p>



    <p>15.8 A menos que se especifique lo contrario en estos Términos de uso, cualquier reclamo que tenga contra Nosotros en relación con la Aplicación, el Sistema, el Servicio o estos Términos de uso debe notificárnoslo dentro de los seis (6) meses posteriores a los eventos que dieron lugar a dicho reclamo, en caso de que (en la medida máxima permitida por la Ley Aplicable) perderá los derechos y recursos que tenga con respecto a dicho reclamo.</p>



    <p>15.9 No asumimos ninguna responsabilidad hacia usted por:</p>



    <p>15.9.1 mal funcionamiento en las instalaciones de comunicaciones que no pueden considerarse razonablemente bajo nuestro control y que pueden afectar la precisión o la puntualidad de los mensajes que envía o el material al que accede a través de la aplicación;</p>



    <p>15.9.2 cualquier pérdida o demora en la transmisión de mensajes o material a los que Usted acceda que surja del uso de cualquier proveedor de servicios de acceso a Internet o proveedor de servicios de red móvil o causado por cualquier navegador u otro software que no esté bajo nuestro control;</p>



    <p>15.9.3 virus que pueden infectar su dispositivo móvil u otra propiedad a causa de su acceso o uso de la aplicación / servicio o su acceso a cualquier material en la aplicación / servicio;</p>



    <p>15.9.4 cualquier uso no autorizado o intercepción de cualquier mensaje o información antes de que llegue a la Aplicación o Nuestros servidores desde la Aplicación;</p>



    <p>15.9.5 cualquier uso no autorizado o acceso a datos relacionados con usted o sus transacciones que tengamos nosotros (a menos que dicho uso o acceso sea causado por nuestra negligencia, fraude o incumplimiento de las leyes relacionadas con la protección de sus datos), en la medida permitida por la Ley Aplicable;</p>



    <p>15.9.6 cualquier contenido proporcionado por terceros.</p>



    <p><strong>16. Sitios de terceros</strong></p>



    <p>16.1 Podemos establecer en el Servicio o la Aplicación enlaces y punteros a otros sitios web o aplicaciones móviles que son operados y mantenidos por terceros (“Sitios o Aplicaciones de Terceros”).&nbsp;Estos enlaces se proporcionan únicamente como indicadores de información sobre temas que pueden serle útiles.&nbsp;Sin embargo, el establecimiento de cualquier enlace a sitios o aplicaciones de terceros no es una recomendación o aprobación por nuestra parte de ningún producto, servicio, información, bienes, ideas u opiniones que puedan encontrarse en sitios o aplicaciones de terceros.</p>



    <p>16.2 No realizamos ninguna garantía, expresa o implícita, con respecto al contenido de los Sitios o Aplicaciones de terceros, incluida la precisión, integridad, confiabilidad o idoneidad de los mismos para cualquier propósito en particular.&nbsp;No garantizamos que ningún sitio o aplicación de terceros esté libre de cualquier reclamo de derechos de autor, marca registrada u otra infracción.&nbsp;No garantizamos que ningún sitio o aplicación de terceros esté libre de virus u otra contaminación.</p>



    <p>16.3 Usted comprende que los Sitios y aplicaciones de terceros pueden tener una política de privacidad diferente a la nuestra y que los Sitios y aplicaciones de terceros pueden proporcionar menos seguridad que la nuestra.&nbsp;La decisión de acceder a un sitio o aplicación de terceros, o comprar o utilizar cualquiera de los productos o servicios anunciados o proporcionados en un sitio o aplicación de terceros es suya, a su exclusivo criterio.</p>



    <p><strong>17. Consentimiento para recibir comunicaciones de marketing directo</strong></p>



    <p>Al utilizar los Servicios, usted acepta recibir nuestras comunicaciones de marketing directo.&nbsp;Si no desea recibir nuestras comunicaciones de marketing, puede expresar su elección donde se indique en la comunicación correspondiente.</p>



    <p><strong>18. Resolución de disputas</strong></p>



    <p>18.1 Estos Términos de uso (y todas y cada una de las disputas que surjan de o en relación con estos Términos de uso (incluida cualquier presunta violación o impugnación de la validez o aplicabilidad de estos Términos de uso o cualquier disposición del presente)) estarán sujetos a las leyes de ${
      appData.simCountry || 'México'
    } a menos que la ley en su territorio requiera lo contrario, en cuyo caso la ley vigente de estos Términos de uso será la de su territorio.</p>



    <p>18.2 Cualquier disputa, diferencia o pregunta de cualquier tipo y de cualquier forma que surja de o en relación con estos Términos de uso, salvo lo dispuesto específicamente en este documento, se remitirá para la determinación final a un solo árbitro que se designará por acuerdo entre las partes o por incumplimiento de dicho acuerdo dentro de los siete (7) días de la notificación de cualquier disputa por cualquiera de las partes a la otra y luego, a solicitud de cualquiera de las partes, por el Presidente del momento de la Sucursal de ${
      appData.simCountry || 'México'
    } del Instituto Colegiado de Árbitros (“Chartered Institute of Arbitrators ” en inglés).</p>



    <p>18.3 Dicho arbitraje tendrá lugar en Ciudad de ${
      appData.simCountry || 'México'
    } y se llevará a cabo de conformidad con las Reglas de Arbitraje del Instituto.</p>



    <p>18.4 En la medida permitida por la ley, la determinación del árbitro será definitiva y vinculante para las Partes y no estará sujeta a ninguna apelación.</p>



    <p>18.5 Nada en esta Cláusula 15 restringirá la libertad de cualquiera de las Partes para iniciar procedimientos legales de cualquier naturaleza con el propósito de buscar medidas cautelares preliminares o medidas cautelares o provisionales de cualquier tribunal de jurisdicción competente en espera de la decisión final o laudo de cualquier árbitro.</p>



    <p><strong>19. General</strong></p>



    <p>19.1 No seremos responsables por demoras o fallas en el desempeño como resultado de causas que escapen a nuestro control razonable.</p>



    <p>19.2 No deberá divulgar en ningún momento a ninguna persona ninguna información confidencial relacionada con el negocio, asuntos, clientes, clientes o proveedores de nosotros o cualquiera de nuestros afiliados.</p>



    <p>19.3 Usted comprende y acepta que podemos asignar, transferir todos o parte de los derechos del acreedor del Préstamo a nuestro exclusivo criterio de vez en cuando sin notificárselo (“Transferencia”).&nbsp;La transferencia anterior no afectará la obligación de usted bajo estos Términos.&nbsp;Deberá realizar el pago de acuerdo con las instrucciones que mostramos en la aplicación.</p>



    <p>19.4 Podemos modificar estos Términos de uso a nuestro exclusivo criterio de vez en cuando.&nbsp;Haremos todos nuestros esfuerzos razonables para notificarle sobre cualquier cambio importante en los Términos de uso;&nbsp;sin embargo, acepta que es su responsabilidad revisar los Términos de uso regularmente y que su uso continuo del Sistema y el Servicio constituirá su aceptación de cualquiera de las enmiendas.</p>



    <p>19.5 Los derechos de cada parte en virtud de estos Términos de uso pueden ejercerse con la frecuencia que sea necesaria, son acumulativos y no exclusivos de los derechos o recursos previstos por la ley y solo pueden renunciarse por escrito y específicamente.&nbsp;La demora en el ejercicio o no ejercicio de cualquier derecho no es una renuncia a ese derecho.</p>



    <p>19.6 Estos Términos de uso constituyen el acuerdo completo y la comprensión de las partes relacionadas con el tema de estos Términos de uso y reemplaza cualquier acuerdo o entendimiento previo entre las partes en relación con dicho tema.&nbsp;Las partes también excluyen todos los términos implícitos de hecho.&nbsp;Al suscribir estos Términos de uso, las partes no se han basado en ninguna declaración, representación, garantía, comprensión, compromiso, promesa o garantía de ninguna persona que no sea la expresamente establecida en estos Términos de uso.&nbsp;Cada parte renuncia de manera irrevocable e incondicional a todos los reclamos, derechos y recursos que, de no ser por esta Cláusula, podrían haber tenido en relación con cualquiera de los anteriores.&nbsp;Nada en estos Términos de uso excluye la responsabilidad por fraude o cualquier otra responsabilidad que no pueda ser limitada o excluida bajo la Ley Aplicable.</p>



    <p>19.7 No puede asignar, sublicenciar, transferir, subcontratar o disponer de ninguno de sus derechos u obligaciones, bajo estos Términos de uso sin nuestro consentimiento previo por escrito.&nbsp;Podemos en cualquier momento asignar, sublicenciar, transferir, subcontratar o disponer de nuestros derechos u obligaciones bajo estos Términos de uso sin previo aviso o consentimiento (salvo en la medida requerida por la Ley Aplicable).</p>



    <p>19.8 Si cualquier tribunal o autoridad relevante determina que alguna parte de estos Términos de uso es ilegal, inválida o inaplicable según la Ley aplicable, las partes restantes de estos Términos de uso permanecerán en pleno vigor y efecto y la parte relevante será reemplazada por un disposición que es legal, válida y aplicable y que tiene, en la mayor medida posible, un efecto equivalente a la parte sustituida de estos Términos de uso.</p>

    <p>19.9 Una persona que no sea parte en estos Términos de uso no tiene derecho a confiar o hacer cumplir ningún término de estos Términos de uso.</p>

    <p>19.10 Podemos notificarle a usted mediante un aviso general publicado en la Aplicación o el Sistema o a Su dirección de correo electrónico establecida en Su Cuenta.&nbsp;Debe notificarnos por correo electrónico a:&nbsp;${
      appData.email
    }</p>

    <p>19.11 Todas las quejas y sugerencias relacionadas con el Sistema y el Servicio pueden hacerse enviando un correo electrónico a:&nbsp;${
      appData.email
    }</p>`;
