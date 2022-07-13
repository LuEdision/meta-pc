import { setApp } from '@/plugins/config/index';
const { appData, formatCountry } = setApp(process.env.BASE_HOST);
const app = appData.app || '';

export default `
  <h3>1. About these Terms of Use</h3>
  <p>Please read these Terms of Use very carefully. These Terms of Use constitute an electronic financial service and an end-user licence agreement, and by registering for or using any part of the ${app} service (“Service”), You confirm that You have read, understood, accepted and agreed with these Terms of Use and will be bound by them. If You do not agree to be bound by these Terms of Use, You may not access or use any part of the Service. These Terms of Use constitute a binding legal agreement between You, as an individual user (“You” or “Your”) and ${app} TECH LIMITED (“We”, “Us” or “Our”).</p>
  <p>These Terms of Use and any amendments or variations thereto take effect respectively on their date of publication.</p>

  <h3>2. Definitions and Interpretation</h3>
  <p><b>2.1 In these Terms of Use, the following terms shall have the following meanings:</b></p>

  <ul>
    <li><b>Affiliate </b> means, in relation to a party, any entity that controls, is under the control of, or is under common control with, that party, where control means the direct or indirect ownership of more than 50 percents of the voting capital or imilar right of ownership of that party or the legal power to direct or cause the direction of the general management and policies of that party, whether through the ownership of voting capital, by contract or otherwise, and controls and controlled shall be interpreted accordingly;</li>
    
    <li><b>Account </b> means Your individual account while accessing the System and using the Service;</li>

    <li><b>App/Application </b> means the electronic application supplied by Us and/or Our Group Companies for You to access to the Service;</li>

    <li><b>Applicable Law </b> means all applicable laws, by-laws, enactments, regulations, regulatory policies, ordinances, protocols, industry codes, road traffic codes, regulatory permits, regulatory licences or requirements of any court, tribunal or governmental, statutory, regulatory, judicial, administrative or supervisory authority or body, which are in force from time to time during the term of these Terms of Use;</li>

    <li><b>Business Day </b> means a day other than a Saturday, Sunday or national or public holiday in the Federal Republic of ${formatCountry};</li>

    <li><b>Credentials </b> means Your personal credentials used to access the App/the Service and operate Your Account;</li>
    
    <li><b>Credit Reference Bureau </b> means a credit reference bureau duly licensed by the Central Bank of ${formatCountry} to inter alia, collect and facilitate the sharing of customer credit information;</li>

    <li><b>Group Companies</b> means a person and its Affiliates (and Group Company will be construed accordingly);</li>

    <li><b>Loan </b></span> means the principal amount of the loan made or to be made by Us to You under these Terms of Use from time to time through the App or (as the context requires) the principal amount outstanding for the time being of that loan; </li>

    <li><b>Local Terms</b> means the supplementary or alternative terms for specific countries, cities, municipalities, metropolitan areas or regions which apply to You, as made available and as updated by Us from time to time;</li>

    <li><b>Mobile Device </b> includes and means Your mobile phone handset, SIM Card and/or other equipment .including laptop,desktop compute,tabs and other mobile and immobile devices/equipment, which when used together enables You to access the network and use the App;</li>
    <li><b>Mobile Money Account</b> means Your mobile money store of value, being the record maintained by Mobile Money Providers in ${formatCountry} of the amount of E-Money from time to time held by You in the Mobile Money Provider’s System;<lip>

    <li><b>Mobile Money</b> means the money transfer and payments service operated by the Mobile Money Providers in ${formatCountry} ;</li>

    <li><b>Mobile Network Operator</b> means a mobile network operator in ${formatCountry} registered with the ${formatCountry} Communications Commission(NCC);</li>

    <li><b>Mobile Money Provider</b> means a Mobile Network Operator that has been duly authorized by the Central Bank of ${formatCountry} under applicable law to offer Mobile Money Service in ${formatCountry} ;</li>
    <li><b>Mobile Money Service</b> means the money transfer and payments service provided by the Mobile Money Providers through the Mobile Money System;</li>

    <li><b>Mobile Money System</b> means the system operated by the Mobile Money Providers in ${formatCountry} for the provision of the Mobile Money Service;</li>

    <li><b>Policies</b> means any policies, guidelines or directions applicable to You as user, as notified to You by Us from time to time, and as may be updated by Us from time to time;</li>

    <li><b>Personal Information </b> means data, whether true or not, about an individual who can be identified from that data, or from that data and other information to which We have or are likely to have access. This may include an individual’s name, BVN, date of birth, gender, education background, religion, photo, physical address, e-mail address, working information, marital status, emergence contact, phone number, SIM card details, financial and credit information (including Mobile Money Account details, bank account details, and bank verification number, where applicable), Account ID and/or password that will be used to access the App after registration and other information which, when taken together with other information, would enable an individual to be identified.</li>

    <li><b>Request </b> means a request or instruction received by Us from You or purportedly from You through the System and upon which We are authorised to act;<lip>

    <li><b>Service</b> means any form of financial service or product that We may offer You pursuant to these Terms of Use and as You may from time to time subscribe to and “Service” shall be construed accordingly;</li>

    <li><b>SIM Card</b> means the subscriber identity module which when used with the appropriate mobile phone handset enables You to access the network and to use the Mobile Money Account;</li>

    <li><b>SMS </b> means a short message service consisting of a text message transmitted from Your Mobile Device to another;</li>

    <li><b>Specific Terms </b> means the supplementary or alternative terms which may apply to certain specific parts of the System and/or the Service, as may be notified to You from time to time;</li>

    <li><b>System</b> means the ${app} system provided by Us to provide users with the Service, including the App and related softwares, Websites, platforms and other support systems and services.</li>

    <li><b>Territory</b> means the territory in which You use the Service and the System;</li>

    <li><b>Transaction Fees </b> includes any fees and charges payable for the use of the Service as published by Us on in the App or by such other means as We shall in Our sole discretion determine.<b>Transaction Fees</b> are subject to change at any time at Our sole discretion;</li>

    <li><b>Website</b> means any website operated by Us or any of Our Group Companies from time to time.</li>
  </ul>

  <p>2.2 In these Terms of Use: (a) a reference to “writing” does not include email unless otherwise specified; and (b) any phrase introduced by the terms “including”, “include”, “in particular”, “for example”, or any similar expression is illustrative and does not limit the meaning of the words preceding those terms. These Terms of Use are drafted in the English language. If these Terms of Use are translated into another language, the English language text will prevail. In the event of any inconsistency, the following order of precedence applies: first, (i) the Local Terms (if any); then (ii) the Specific Terms (if any); and finally (iii) the other parts of these Terms of Use.</p>

  <h3>3. Your Warranties/ Responsibilities</h3>
  <p>You hereby confirm and commit to Us that:</p>

  <p>3.1 You have full power and authority to enter into and be legally bound by these Terms of Use and to perform Your obligations under these Terms of Use;</p>

  <p>3.2 You shall comply at all times with all Applicable Law and these Terms of Use, and will notify Us if You are in breach of any Applicable Law or these Terms of Use;</p>

  <p>3.3 You shall only use the System and the Service for lawful purposes and only for the purposes for which it is intended to be used;</p>

  <p>3.4 You shall ensure that any documents, Personal Information and Credentials provided by You (or on Your behalf) to Us or otherwise via the System are at all times accurate, current, complete and not misleading;</p>

  <p>3.5 You shall only use an internet access point and Account which You are authorised to use;</p>

  <p>3.6 You shall not engage in any fraudulent, deceptive or misleading conduct; and</p>

  <p>3.7 You shall not impair or circumvent the proper operation of the network which the System operates on.</p>

  <h3>4. Acceptance of these Terms of Use</h3>
  <p>4.1 You must carefully read and understand all the terms set out in these Terms of Use and as amended from time to time by Us before downloading or streaming the App or registering an Account with Us which will govern the use and operation of the App and the Account.</p>

  <p>4.2 After downloading the App, You will be deemed to accept these Terms of Use upon clicking the “Accept” option on Our System asking You to confirm that You have read, understood and agreed to abide by these Terms of Use.</p>

  <p>4.3 By downloading the App and registering an Account, You agree to comply with and be bound by these Terms of Use governing the operation of the Account and You affirm that the terms herein are without prejudice to any other right that We may have with respect to the Account in law or otherwise.</p>
  <p>4.4 These terms may be amended or varied by< Us from time to time and the continued use of the Service constitutes Your agreement to be bound by the terms of any such amendment or variation. We will take all reasonable measures to notify You of any changes.</p>

  <p>4.5 From time to time updates to the App may be issued through the Website. Depending on the update, You may not be able to use the Service until You have downloaded or streamed the latest version of the App and accepted any new terms and conditions of these Terms of Use.</p>
  <p>4.6 By using the App or any of the Service, You consent to us collecting and using technical information about the Mobile Device and related software, hardware and peripherals for Service that are internet-based or wireless to improve our products and to provide any Service to You. If You use these Service, You consent to us and our affiliates’ and licensees’ transmission, collection, retention, maintenance, processing and use of Your data to determine our credit scoring services or to improve our Service and/or Your experience while using the App.</p>

  <p>4.7 By using the App and Service ,You allow Us to share Your credit information,both positive and negative,with Credit Reference Bureau,and also to check Your credit report for credit scoring/appraisal purposes.</p>

  <p>4.8 You also expressly authorize Us to contact You and Your emergency contact who has expressly agreed upon it ,to verify Your information or when We are unable to contact you via other methods or when We have not received your payment in connection with Loan set out in Clause 11 herein.</p>

  <p>4.9 You authorize the ${app} and third-party payment institution to use this bank card for auto-deduction if you fail to repay the loan on the agreed repayment date by submit this bank card verification.</p>

  <h3>5. Your Use of the Service</h3>
  <p>5.1 The Service offered by Us can only be utilized by persons over the age of 18. We reserve the right to verify the authenticity and status of Your Mobile Money Account with the relevant Mobile Money Provider.</p>
  <p>5.2 Our acceptance of Your application for an Account will be displayed on the App. You hereby acknowledge and accept that the acceptance by Us of Your application for an Account does not create any contractual relationship between You and the Mobile Money Providers beyond the terms and conditions that apply to Your Mobile Money Account from time to time.</p>

  <p>5.3 We reserve the right to decline Your application for a Loan or to revoke the same at any stage at Our sole and absolute discretion and without assigning any reason or giving any notice thereto.</p>

  <p>5.4 We reserve the right (in Our sole and absolute discretion) to issue, decline to issue a Loan and/or vary the terms of any Loan depending on Our assessment of the credit profile of You from time to time. The terms of the Loan and the interest rate payable in relation to each Loan application will be displayed on the App.</p>

  <h3>6. Your Use of the System</h3>
  <p><u><b>Rights granted and reserved</b></u></p>
  <p>6.1 Subject to Your compliance with these Terms of Use, We and Our licensors (if any) grant You a revocable, limited, non-exclusive, non-transferable, royalty-free licence during the term of these Terms of Use and in the Territory, to access and use the System solely for Your personal use for the purpose to acquire the Service provided by Us.</p>
  <p>6.2 All rights not expressly granted to You under these Terms of Use are reserved by Us and Our licensors (if any). Nothing in these Terms of Use transfers any ownership in or to the System (in whole or in part) to You.</p>

  <p><u><b>Prohibited conducts:</b></u></p>
  <p>6.3 While using the System, You shall not:</p>

  <ul>
    <li>6.3.1 license , sublicense, sell, resell, transfer, assign, distribute or otherwise commercially exploit or make available to any third party the System in any way;</li>
    <li>6.3.2 modify or make derivative works based on the System, or reverse engineer or access the underlying software for any reason;</li>
    <li>6.3.3 use the System to build a competitive product or service, build a product using similar ideas, features, functions or graphics as the System, copy any ideas, features, functions or graphics of the System, or launch an automated program or script which may make multiple server requests per second, or which unduly burdens or hinders the operation and/or performance of the System, or attempt to gain unauthorised access to the System or related systems or networks;</li>
    <li>6.3.4 use any application or process to retrieve, index,“data mine”, or in any way reproduce or circumvent the navigational structure, presentation or content of the System;</li>
    <li>6.3.5 post, distribute or reproduce in any way any copyrighted material, trademarks, or other proprietary information without obtaining the prior consent of the owner of such proprietary rights, or remove any copyright, trademark or other proprietary rights notices contained in the System;</li>
    <li>6.3.6 send or store any material for unlawful or fraudulent purposes;</li>
    <li>6.3.7 send spam or other unsolicited messages, or otherwise cause nuisance, annoyance, inconvenience or make fake bookings;</li>
    <li>6.3.8 send or store infringing, obscene, threatening, libelous, or otherwise unlawful or tortious material;</li>
    <li>6.3.9 send material containing software viruses, worms, trojan horses or other harmful computer code, files, scripts, agents or programs;</li>
    <li>6.3.10 interfere with or disrupt the integrity or performance of the System or the data contained therein;</li>
    <li>6.3.11 impersonate any person or entity or otherwise misrepresent Your affiliation with a person or entity;</li>
    <li>6.3.12 deliberately misrepresent Your location; or</li>
    <li>6.3.13 misrepresents any material information about Yourself , or as may relate our decision to engage in any related or other business with You;</li>

    <li>6.3.14 damage Our or any of Our Group Companies’ reputation in any way;</li>
    <li>6.3.15 collect or harvest any information or data from any Service or our systems or attempt to decipher any transmissions to or from the servers running any Service .</li>
  </ul>

  <h3>7. Your Account</h3>
  <p>7.1 In order to access the System as a user, You must register for and maintain an Account as a user of the App.</p>
  <p>7.2 You are responsible for all activities conducted on Your Account. You:</p>
  <p>7.2.1 must only have one Account;</p>
  <p>7.2.2 must keep Your Account information confidential and secure;</p>
  <p>7.2.3 must not provide any other person with access to Your Account, including to transfer the Account or information from Your Account to any other person;</p>
  <p>7.2.4 must promptly notify Us if You suspect any unauthorised access to or use of Your Account; and</p>
  <p>7.3 We reserve the right to block or deny access to Your Account, and/or block features available in the App, without prejudice to Our other rights and remedies:</p>
  <p>7.3.1 if We deem, in Our sole discretion, that You have violated any term of these Terms of Use;</p>

  <p>7.3.2 during an investigation;</p>
  <p>7.3.3 if You owe any principal, interest, Transaction Fees or tax to Us or any of Our Group Companies;</p>

  <p>7.3.4 if these Terms of Use are terminated for any reason; or</p>
  <p>7.3.5 at any other time in Our reasonable discretion.</p>

  <h3>8. Your Personal Information</h3>
  <p>You agree and consent to Us using and processing Your Personal Information as set out in the Privacy Policy here, as amended from time to time by Us.</p>

  <h3>9. Requests Made By You</h3>
  <p>9.1 You hereby irrevocably authorise Us to act on all Requests received by Us from You (or purportedly from You) through the System and to hold You liable in respect thereof.</p>
  <p>9.2 Subject to Our discretion, We reserve the right to reject any Request in relation to a Loan application from You even if You have previously been issued with a Loan by Us.</p>
  <p>9.3 We shall be entitled to accept and to act upon any Request, even if that Request is otherwise for any reason incomplete or ambiguous if, in Our absolute discretion, We believes that it can correct the incomplete or ambiguous information in the Request without any reference to You being necessary.</p>

  <p>9.4 We shall be deemed to have acted properly and to have fully performed all the obligations owed to You notwithstanding that the Request may have been initiated, sent or otherwise communicated in error or fraudulently, and You shall be bound by any Request on which We may act if We have in good faith acted in the belief that such instructions have been sent by You.</p>

  <p>9.5 We may, in Our absolute discretion, decline to act on or in accordance with the whole or any part of Your Request pending further enquiry or further confirmation (whether written or otherwise) from You.</p>

  <p>9.6 You agree to and shall release from and indemnify Us against all claims, losses, damages, costs and expenses howsoever arising in consequence of, or in any way related to Us having acted in accordance with the whole or any part of any of Your Requests (or failed to exercise) the discretion conferred upon it.</p>

  <p>9.7 You acknowledge that to the full extent permitted by Applicable Law We shall not be liable for any unauthorised drawing, transfer, remittance, disclosure, any activity or any incident on Your account by the fact of the knowledge and/or use or manipulation of Your Account PIN, password, ID or any means whether or not occasioned by Your negligence.</p>

  <p>9.8 We are authorised to effect such orders in respect of Your Account as may be required by any court order or competent authority or agency under the Applicable Law.</p>
  <p>9.9 In the event of any conflict between any terms of any Request received by Us from You and these Terms of Use, these Terms of Use shall prevail.</p>

  <h3>10. Your Responsibilities</h3>
  <p>10.1 You shall at Your own expense provide and maintain in safe and efficient operating order Your Mobile Device necessary for the purpose of accessing the System and the Service.</p>
  <p>10.2 You shall be responsible for ensuring the proper performance of Your Mobile Device. We shall neither be responsible for any errors or failures caused by any malfunction of Your Mobile Device, and nor shall We be responsible for any computer virus or related problems that may be associated with the use of the System, the Service and the Mobile Device. You shall be responsible for charges due to any service provider providing with connection to the network and We shall not be responsible for losses or delays caused by any such service provider.</p>
  <p>10.3 Your access to the App will be through Your Mobile Device. It is Your responsibility to check and ensure that You download the correct App for Your Mobile Device. We are not liable if You do not have a compatible device or if You do not have the latest version of the App for Your Mobile Device.</p>

  <p>10.4 If Your Mobile Device is lost, stolen, broken and/or no longer in Your possession, and this exposes Your Account information and Your Credentials to someone else or otherwise affects Our legal rights and/or remedies, You must immediately notify Us and follow the procedures notified by Us. We shall not be liable for any disclosure of Your Account information and Your Credentials to any third party and You hereby agree to indemnify and hold Us harmless from any losses resulting from any disclosure of Your Account information and Your Credentials.</p>
  
  <p>10.5 You are solely responsible for having in place an appropriate internet and mobile plan and for any fees charged by Your Mobile Service Operator, such as telephone, SMS and internet data fees. You acknowledge that Your use of the System may consume large amounts of data and that You will be solely responsible for such usage and the associated fees.</p>

  <p>10.6 You shall follow all instructions, procedures and terms contained in these Terms of Use and any document provided by Us concerning the use of the System and the Service.</p>

  <p>10.7 You shall take all reasonable precautions to detect any unauthorised use of the System and the Service. To that end, You shall ensure that all communications from Us are examined and checked by You or on Your behalf as soon as practicable after receipt by You in such a way that any unauthorised use of and access to the System will be detected. You shall immediately inform Us in the event that:</p>

  <p>10.7.1 You have reason to believe that Your Credentials are or may be known to any person not authorised to know the same and/or have been compromised; and/or</p>
  <p>10.7.2 You have reason to believe that unauthorised use of the Service has or may have occurred or could occur and a transaction may have been fraudulently input or compromised.</p>
  <p>10.7.3 You shall at all times follow the security procedures notified to You by Us from time to time or such other procedures as may be applicable to the Service from time to time. You acknowledge that any failure on Your part to follow the recommended security procedures may result in a breach of Your Account’s confidentiality. In particular, You shall ensure that the Service are not used or Requests are not issued or the relevant functions are not performed by anyone other than a person authorised by You to do so.</p>

  <h3>11. Financial Terms</h3>
  <p><u><b>Interest and Transaction Fees</b></u></p>
  <p>11.1 The interest payable by You to Us in relation to any Loan shall be displayed by Us on the App. Meanwhile, We shall be entitled to set and charge Transaction Fees, in connection with Your use of the Service and from time to time amend or vary Our Transaction Fees for the Service. If We decide to start charging Transaction Fees or where already applicable, vary or amend Our Transaction Fees, the Transaction Fees payable on any new application for Service will be displayed on the App. We will use reasonable endeavors to notify You of any changes in relation to Transaction Fees within a reasonable period before such changes are implemented including displaying notices of the changes on the App.</p>

  <p>11.2 All payments to be made by You under these Terms of Use shall be made in full without any set off or counter claim and save in so far as required by the law to the contrary, free and clear of and without any deduction or withholding whatsoever. If You are at any time required to make any deduction or withholding from any payment to Us, You shall immediately pay to Us such additional amounts as will result in We receiving the full amount it would have received had no such deduction or withholding been required.</p>
  <p>11.3 If You fail to make any payments due to Us at the due date for payment, We will be authorised to apply late fees on such amount loaned to You at a rate to be displayed on the App in advance.</p>
  
  <p><u><b>Taxes</b></u></p>
  <p>11.4 All payments to be made by You in connection with these Terms of Use and Loan are calculated without regard to any taxes payable by You. If any taxes are payable in connection with the payment, You must pay Us an additional amount equal to the payment multiplied by the appropriate rate of tax. You must do so at the same time as making the payment or whenever We make such demand, even after the end or termination of the relationship.</p>

  <p>11.5 You hereby consent and agree that We may withhold amounts in Your Account if any tax authority requires Us to do so, or We are otherwise required by law or pursuant to agreements with any tax authority to do so, or if We need to comply with internal policies or with any applicable order or sanction of a tax authority.</p>

  <p><u><b>Payments</b></u></p>
  <p>11.6 The principal, interest, Transaction Fees and tax in connection to these Terms of Use and Loan payable by You to Us must be paid by the payment methods before/on the due date offered and displayed on the App from time to time.</p>
  <p>11.7 All payments must be in the local currency in the Territory.</p>
  
  <h3>12. Default</h3>
  <p>12.1 An event of default occurs when You :</p>
  <p>12.1.1 fail to pay any sum or installment (including all accrued interest, Transaction Fees and tax） payable for a Loan granted under these Terms of Use for a period of fifteen(15) cumulative days unless failure to pay is caused solely by an administrative error or technical problem; or are declared bankrupt.</p>

  <p>12.2 At any time after an event of default has occurred which is continuing, We may, without prejudice to any other right or remedy granted to it under Applicable Law:</p>
  <p>12.2.1 terminate these Terms of Use in accordance with Clause 13 herein;</p>

  <p>12.2.2 declare that the Loan (including all accrued interest, Transaction Fees, tax and all other amounts outstanding under these Terms of Use) is immediately due and payable, whereupon they shall become immediately due and payable;</p>

  <p>12.2.3 supply information concerning the event of default to Credit Reference Bureaus. A copy of any adverse information concerning You and Your credit information sent to a Credit Reference Bureau shall be made available to You upon written request; and</p>
  <p>12.2.4 impose You with late fees at the rate displayed on the App in connection with Your default in payment.</p>

  <h3>13. Term and Termination</h3>
  <p>13.1 These Terms of Use shall continue until terminated in accordance with their terms.</p>
  <p>13.2 We may terminate these Terms of Use, and/or suspend or terminate Your use of the System, the Service and Your Account in whole or in part:</p>
  <p>13.2.1 at any time for any reason by giving notice to You ;</p>
  <p>13.2.2 immediately , with or without notice, if You are in breach of any term of these Terms of Use, without prejudice to Our other rights and remedies;</p>
  <p>13.2.3 if Your account or agreement with a Mobile Network Operator or Mobile Money Provider is terminated for whatever reason;</p>
  <p>13.2.4 where such a suspension or termination is necessary as a consequence of technical problems or for reasons of safety; to facilitate update or upgrade the contents or functionality of the Service from time to time; where Your Account becomes inactive or dormant;</p>
  <p>13.2.5 if We are required or requested to comply with an order or instruction of or a recommendation from the government, court, regulator or other competent authority；or</p>
  <p>13.2.6 if We decide to suspend or cease the provision of the Service for commercial reasons or for any other reason as We may determine in Our absolute discretion;</p>
  <p>13.3 On termination or expiry of these Terms of Use for any reason, You shall:</p>
  <p>13.3.1 promptly (and in any event within three days), pay any principal, interest, Transaction Fees or tax owed to Us (which shall become immediately due and payable on termination); and</p>
  <p>13.3.2 immediately delete and fully remove the App from Your Mobile Device.</p>
  <p>13.4 Termination shall however not affect any accrued rights and liabilities of either party.</p>
  <p>13.5 The parties shall have no further obligations or rights under these Terms of Use after termination of the Terms of Use, without prejudice to any obligations or rights which have accrued to either party at the time they are terminated, save that the provisions of Clauses 2, 3, 8, 11, 13, 14, 17, and 18, of these Terms of Use and any other clause which expressly or by its nature is intended to survive, shall continue to have effect after the end of these Terms of Use.</p>

  <h3>14. Indemnities and Exclusion of Liability</h3>
  <p><u><b>Indemnities</b></u></p>

  <p>14.1 You shall defend, indemnify and hold harmless Us, Our licensors and each such party’s Affiliates and their respective officers, directors, members, employees and agents from and against any and all claims, costs, damages, losses, liabilities and expenses (including attorneys’ fees and costs) arising out of or in connection with:</p>

  <p>14.1.1 Your breach of any term of these Terms of Use or any Applicable Law; and</p>
  <p>14.1.2 Your use of the System and/or the Service, including:</p>
  <p>14.1.2.1 any third party claims arising from Your use of the System and/or the Service;</p>
  <p>14.1.2.2 any loss or damage that may arise from Your use, misuse, abuse or possession of any third party software, including without limitation, any operating system, browser software or any other software packages or programs;</p>
  <p>14.1.2.3 any unauthorised access to Your Account or any breach of security or any destruction or accessing of Your data or any destruction or theft of or damage to any of Your Mobile Device; and</p>
  <p>14.1.2.4 any loss or damage occasioned by the failure by You to adhere to these Terms of Use and/or by supplying of incorrect information or loss or damage occasioned by the failure or unavailability of third party facilities or systems or the inability of a third party to process a transaction or any loss which may be incurred by Us as a consequence of any breach by these Terms of Use.</p>

  <p><u><b>Exclusion of Liability</b></u></p>
  <p>14.2 We shall not be responsible for any loss suffered by You should the Service be interfered with or be unavailable by reason of the failure of any of Your Mobile Device, or any other circumstances whatsoever not within Our control including , without limitation, Force Majeure or error, interruption, delay or non- availability of the System, terrorist or any enemy action equipment failure, loss of power, adverse weather or atmospheric conditions, and failure of any public or private telecommunications system.</p>

  <p>14.3 You acknowledge that the App has not been developed to meet Your individual requirements, and that it is therefore Your responsibility to ensure that the facilities and functions of the App as described meet Your requirements.</p>
  <p>14.4 We only supply the App for private use. You agree not to use the App for any commercial, business or resale purposes, and We have no liability to You for any loss of profit, loss of business, business interruption, or loss of business opportunity.</p>

  <p>14.5 We will not be liable for any losses or damage suffered by You as a result of or in connection with:</p>

  <ul>
    <li>14.5.1 any defect or fault in the App or any Service resulting from You having altered or modified the App;</li>
    <li>14.5.2 any defect or fault in the App resulting from You having used the App in breach of these Terms of Use;</li>
    <li>14.5.3 Your breach of Clause 6 herein;</li>
    <li>14.5.4 unavailability of sufficient funds in Your Mobile Money Account;</li>
    <li>14.5.5 failure, malfunction, interruption or unavailability of the System, Your Mobile Device, the network or a Mobile Money System; the money in Your Account being subject to legal process or other encumbrance restricting payments or transfers thereof; Your failure to give proper or complete instructions for payments or transfers relating to Your Account;</li>
    <li>14.5.6 any fraudulent or illegal use of the Service, the System and/or Your Mobile Device; or</li>
    <li>14.5.7 Your failure to comply with these Terms of Use and any document or information provided by Us concerning the use of the System and the Service.</li>
  </ul>

  <p>14.6 Under no circumstances shall We be liable to You for any loss of profit or anticipated savings or for any indirect or consequential loss or damage of whatever kind, howsoever caused, arising out of or in connection with the Service even where the possibility of such loss or damage is notified to Us.</p>
  <p>14.7 To maximum extent permitted by Applicable Law, and unless otherwise specified in these Terms of Use, in no event shall Our maximum aggregate liability arising under and in connection with the App, the System, the Service and/or these Terms of Use, whether in contract, tort, breach of statutory duty or otherwise, exceed the Transaction Fees paid by You to Us in connection with the first event giving rise to a claim under these Terms of Use.</p>
  <p>14.8 Unless otherwise specified in these Terms of Use, any claims You have against Us under or in connection with the App, the System, the Service or these Terms of Use must be notified to Us within six(6) months after the events giving rise to such claim, failing which (to the maximum extent permitted by Applicable Law) You will forfeit any rights and remedies You have in respect of such claim.</p>
  <p>14.9 We do not accept any responsibility to you for:
  </p>
  <p>14.9.1 malfunctions in communications facilities which cannot reasonably be considered to be under Our control and that may affect the accuracy or timeliness of messages You send or the material You access via the App;</p>
  <p>14.9.2 any losses or delays in transmission of messages or material You access arising out of the use of any Internet access service provider or mobile network service provider or caused by any browser or other software which is not under our control;</p>
  <p>14.9.3 viruses that may infect Your Mobile Device or other property on account of Your access to or use of the App/Service or Your accessing any materials on the App/Service;</p>
  <p>14.9.4 any unauthorised use or interception of any message or information before it reaches the App or Our servers from the App;</p>

  <p>14.9.5 any unauthorised use of or access to data relating to You or Your transactions which is held by Us (unless such use or access is caused by our negligence, fraud or failure to comply with laws relating to the protection of your data), to the extent permitted by Applicable Law;</p>
  <p>14.9.6 any content provided by third parties.</p>
  
  <h3>15. Third Party Sites</h3>
  <p>15.1 We may establish on the Service or the App links and pointers to other websites or mobile applications that are operated and maintained by third parties (“Third Party Sites or Apps”). These links are provided solely as pointers to information on topics that may be useful to you. However, the establishment of any link to Third-Party Sites or Apps is not a recommendation or endorsement by us of any products, services, information, goods, ideas or opinions that may be found on any Third-Party Sites or Apps.</p>

  <p>15.2 We make no warranties, either express or implied, concerning the content of any Third-Party Sites or Apps, including the accuracy, completeness, reliability or suitability thereof for any particular purpose. We do not warrant that any Third-Party Site or App is free from any claims of copyright, trademark or other infringement.We do not warrant that any Third-Party Site or App is free from any viruses or other contamination.</p>

  <p>15.3 You understand that Third Party Sites and Apps may have a privacy policy that is different from that ours and that Third-Party Sites and Apps may provide less security than ours. The choice to access a Third-Party Site or App, or to purchase or otherwise use any of the products or services advertised or provided on a Third Party Site or App is Yours , in your sole discretion.</p>
  
  <h3>16 .Consent to Receive Direct Marketing Communications</h3>
  <p>By using the Services, Y ou agree to receive direct marketing communications from us. If You do not wish to receive marketing communications from us, You may express your choice where indicated on the applicable communication.</p>

  <h3>17. Disputes Resolution</h3>
  <p>17.1 These Terms of Use (and any and all disputes arising out of or in connection with these Terms of Use (including any alleged breach, or challenge to the validity or enforceability, of these Terms of Use or any provision hereof)) will be subject to the laws of ${formatCountry} unless the law in Your Territory requires otherwise, in which case the governing law of these Terms of Use shall be that of Your Territory.</p>
  <p>17.2 Any dispute, difference or question whatsoever and howsoever arising out of or in connection with these Terms of Use, save as specifically provided herein, shall be referred for final determination to a single arbitrator to be appointed by agreement between the parties hereto or in default of any such agreement within seven (7) days of the notification of any dispute by either party to the other then, upon application by either party, by the Chairman of the ${formatCountry} Branch of the Chartered Institute of Arbitrators (“Institute ”).</p>

  <p>17.3 Such arbitration shall take place in ${
    appData.city || 'Lagos'
  }, ${formatCountry} and shall be conducted in accordance with the Rules of ${formatCountry}n Arbitration and Conciliation Act.</p>
  <p>17.4 To the extent permissible by law the determination of the arbitrator shall be final and binding upon the Parties.</p>

  <p>17.5 Nothing in this Clause 15 shall restrict either Party’s freedom to commence legal proceedings of any nature for the purposes of seeking preliminary injunctive relief or interim or conservatory measures from any court of competent  jurisdiction pending the final decision or award of any arbitrator.</p>
  
  <h3>18. General</h3>
  <p>18.1 We shall not be liable for delay or failure in performance resulting from causes beyond Our reasonable control.</p>
  <p>18.2 You shall not at any time disclose to any person any confidential information concerning the business, affairs, customers, clients or suppliers of Us or any of Our Affiliates.</p>

  <p>18.3 You understand and agreed that we may assign, transfer all or part of the creditor’s rights of the Loan at Our sole discretion from time to time without given notice to You(“Transfer”) . The above Transfer will not affect the obligation of You under these Terms. You shall make the payment according to the instructions displayed by Us on the App.</p>
  <p>18.4 We may amend these Terms of Use at Our sole discretion from time to time. We will use Our reasonable endeavours to notify You of any material changes to the Terms of Use; however You agree that it is Your responsibility to review the Terms of Use regularly and Your continued use of the System and the Service will constitute Your acceptance to any of the amendments.</p>

  <p>18.5 The rights of each party under these Terms of Use may be exercised as often as necessary, are cumulative and not exclusive of rights or remedies provided by law and may be waived only in writing and specifically. Delay in the exercise or non-exercise of any right is not a waiver of that right.</p>

  <p>18.6 These Terms of Use constitute the entire agreement and understanding of the parties relating to the subject matter of these Terms of Use and supersedes any previous agreement or understanding between the parties in relation to such subject matter. The parties also hereby also exclude all implied terms in fact. In entering into these Terms of Use, the parties have not relied on any statement, representation, warranty, understanding, undertaking, promise or assurance of any person other than as expressly set out in these Terms of Use or expressly implied by Applicable Law. Each party irrevocably and unconditionally waives all claims, rights and remedies which but for this Clause it might otherwise have had in relation to any of the foregoing. Nothing in these Terms of Use excludes liability for fraud or any other liability that cannot be limited or excluded under Applicable Law.</p>

  <p>18.7 You may not assign, sub-license, transfer, subcontract, or otherwise dispose of any of Your rights or obligations, under these Terms of Use without Our prior written consent. We may at any time assign, sub-license, transfer, subcontract or otherwise dispose of Our rights or obligations under these Terms of Use without notice or consent (save to the extent required by Applicable Law).</p>
  <p>18.8 If any Court or relevant authority determines that any part of these Terms of Use is illegal, invalid or unenforceable under Applicable Law, the remaining parts of these Terms of Use will remain in full force and effect and the relevant part will be replaced with a provision that is legal, valid and enforceable and that has, to the maximum extent possible, an equivalent effect to the substituted part of these Terms of Use.</p>
  <p>18.9 A person who is not a party to these Terms of Use has no right to rely upon or enforce any term of these Terms of Use.</p>
  <p>18.10 We may give notice to You by means of a general notice published on the App or the System or to Your email address set out in Your Account. You must give notice to Us by email to: <a rel="noreferrer noopener" href="mailto:${
    appData.email
  }" target="_blank">${appData.email}</a></p>
  <p>18.11 All complaints and suggestions in connection with the System and the Service can be made by sending email to: <a rel="noreferrer noopener" href="mailto:${
    appData.email
  }" target="_blank">${appData.email}</a></p>
    
  <h3>19. Compensation of Customers Where Required</h3>
  <p>As a responsible customer centric provider, we offer compensation to customers where required on a case-by-case basis. Complaints brought to us are duly investigated and where so applicable a requisite remedial action including restitution and/or compensation is applied promptly:</p>
  
  <table class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition table">
    <thead>
      <tr>
        <th colspan="2">Proposed Compensation Plan</th>
      </tr>
      <tr>
        <th>Services</th>
        <th>Compensation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Delayed Clearance of A Loan</td>
        <td>Clearance of Penalty Interest Charged Due to Transaction Delay</td>
      </tr>
      <tr>
        <td>Irregular Deduction</td>
        <td>Refund of Irregular Deduction + 5% of last purchase</td>
      </tr>
      <tr>
        <td>Double Interest</td>
        <td>Immediate refund of excess Interest + 2% of Double Interest Charged</td>
      </tr>
      <tr>
        <td>Error Messages</td>
        <td>Retraction message and application 5 % of the interest charged</td>
      </tr>
    </tbody>
  </table>

  <h3>20. DISCIPLINARY PROCEDURE FOR LOAN COLLECTION/COMMUNICATION WITH CUSTOMERS</h3>

  <p>All of the staff members are required to exude and exhibit PROFESSIONALISM and MORAL ETHICS at all times when and while communicating with the customers; whether such customer(s) is owing or not.</p>
  <p>Loan Collectors/Recovery Agents /Customer Service Agents are required never to insult, abuse, disrespect, defame, or threaten customers and their contacts in any way or in a bid to recover loans or resolve issues. Any staff who does any of or is doing any of the above is acting on his/her own individual status; and such staff shall face the full consequences of his/her actions. </p>

  
  <h2>CUSTOMERS’ CODE OF PRACTICE</h2>

  <h3><i>Use of XGO Finance Limited’s Service</i></h3></i></h3>
  <p>On the application for Loan facility through our ${app}’s platform, the customer will be provided with a trackable receipt number and brief a service guide detailing instructions on when and how to use XGO’s service and terms and conditions of the subscriber’s agreement. This terms and conditions have been drawn-up in accordance with relevant licence obligations of XGO Finance Limited and global best practices. </p>

  <p>The customer is issued with a receipt, which in addition to other documents (listed in this Customer Code of Practice), constitute proof of acceptance. Customers are advised to keep all requisite documents and packaging in a secure place as they may be required to resolve complaints that may arise in the future.</p>

  <p>XGO is an authorised and licensed financial technology (FinTech) company, with a keen interest to assist Nigerians to meetup their short-term ambition and immediate financial obligations.</p>

  <h3><i>Confidentiality and Data Protection</i></h3>
  <p>Securing our customer’s information is a priority at XGO Finance Limited. We maintain physical, procedural and electronic safeguards to ensure the protection of our customers’ information.</p>

  <p>XGO Finance Limited and its authorised agents will endeavour to ensure that information obtained or received in the provision of our service is kept confidential, not disclosed or made accessible to third parties or used otherwise than for the purpose or furtherance of the XGO’s service unless such information is available to the public or disclosure is required by law or in terms of XGO’s licences.</p>

  <p>We may collect and store our customers’ personal information in order to provide them with better service and to ensure that we are only dealing with authorised persons when attending to questions, concerns and requests.</p>

  <h3><i>Special Measures for Consumers with Disability</i></h3>
  <p>As a customer-centric organisation, XGO will continually strive to ensure that the totality of its Agent and customer base regardless of any physical disabilities are able to access and enjoy premium XGO’s customer support services. XGO will ensure that its platform is accessible to all regardless of their physical status and challenge, such as i.e. hearing and speech impairment to enable he/she access our Customer Care hotlines 24 hrs a day 7 seven days a week. Customers with disabilities may utilise SMS to access our customer care hotlines.   </p>

  <h3><i>Provision of Information to Customers</i></h3>
  <p>In line with best practices, XGO will ensure that all its agents and customers are provided with complete, accurate, and up to date information by employing simple, clear and easy to understand language.</p>

  <p>XGO shall endeavor to respond in a timely manner to all its consumer requests for information on their services and such information shall be provided free of charge and shall include at least the following: </p>

  <p>(a)	Current service arrangements, including rates, terms and conditions for all services offered to the public, on its website.</p>

  <p>(b)	Services that are subject to price or tariff regulation by the Commission shall be described in service tariff pages published in an accessible form, including being made available at designated company offices and on the XGO’s web site; </p>

  <p>(c)	The terms of service shall be stated on the XGO’s website and through all medium with which customers access services; and</p>

  <p>(d)	Whenever XGO changes its interest rates for its services, affected consumers shall be notified of the proposed changes in a manner that, in particular, avails them an opportunity to accept the new applicable terms and conditions or terminate existing plan by offsetting same with the applicable terms and condition. </p>

  <h3><i>Service Contract</i></h3>
  <p>XGO shall supply or make available on request, a copy of the contract or agreement for the provision of its services, and such contracts shall be written in plain and clear language that is easy for any customer to understand.</p>

  <h3><i>Pricing Information</i></h3>
  <p>Before a contract for service is entered into, XGO shall inform the consumer of: </p>
  <p>(a)	the applicable rates or charges;</p>
  <p>(b)	what the charges include; </p>
  <p>(c)	each part or element of an applicable charge, and the method of its calculation; </p>
  <p>(d)	the frequency of the charge or other circumstances that give rise to the charge; </p>
  <p>(e)	whether the charges or elements thereof are subject to change from time to time, </p>the circumstances of such changes and how the consumer will be informed of such changes.</p>

  <h3><i>Advertisement and Representation of Services</i></h3>
  <p>XGO will ensure that all its advertisements and marketing materials are in compliance with the Nigerian Code of Advertising Practice as provided by Advertising Practitioners Council of Nigeria, advertising standards and all other applicable laws or standards which are in effect in the Federal Republic of Nigeria. XGO will also ensure all its advertisements are decent, honest, and truthful and are prepared with high sense of social responsibility which conform with the principles of fair competition.</p>

  <h3><i>Unsolicited Telemarketing</i></h3>
  <p>1.	XGO will not engage in unsolicited telemarketing unless it discloses: </p>
  <p>a.	At the beginning of the communication, the identity of the XGO or other person on whose behalf it is made and the precise purpose of the communication;</p>
  <p>b.	During the communication, the full details of any product or service that is the subject of the communication; and</p>
  <p>c.	That the person receiving the communication shall have an absolute right to cancel the agreement service within seven (7) days of the communication, by calling the customer care telephone number (which the Licensee shall specifically state to the recipient during the communication) unless the product or service has by that time been supplied to and used by the person receiving the communication.</p>

  <p>2.	XGO will also conduct telemarketing in accordance with any “call” or “do-not-call” preferences recorded by the consumer at the time of entering into a contract for services or thereafter, and in accordance with any other rules or guidelines issued from time to time or any other competent authority. </p>
  <p>3.	Without prejudice to subsection (1) of this section a XGO will, ensure that:</p>

  <p>a.	No unsolicited short message service or voice calls transits to Customer without the customers’ acceptance; </p>
  <p>b.	A customer shall at all times, be able to opt-in or opt-out of receiving any unsolicited short message service or voice calls; </p>
  <p>c.	All unsolicited short message service or voice calls are streamlined to ensure that a customer can choose the option of stopping every unsolicited short message service or voice calls, or selecting the category of unsolicited short message service or voice calls that can be communicated to the customer; </p>

  <h3><i>Voice Call</i></h3>
  <p>1.	When making an unsolicited sale, a XGO will ensure that its sales representative shall provide the call recipient with sufficient information as to the name and or other unique identifier of the Licensee in addition to: </p>
  <p>i.	the primary purpose of the unsolicited sale; </p>
  <p>ii.	an adequate description of the product or service; </p>
  <p>iii.	any conditions or restrictions that qualify the unsolicited sale. </p>
  <p>2.	When attempting to set up a voice call, the number of rings must be limited to no more than three and no more than two (2) attempts per day shall be made to the customers</p>

  <h3><i>Availability of Services</i></h3>
  <p>1.	XGO will make clear in advertising materials which promote the availability of a service, any geographical or technical limitations on the availability of the service to consumers which:</p>
  <p>a.	substantially affect the performance of the service; and </p>
  <p>b.	are known to the Licensee.</p>

  <p>2.	XGO will make clear, in any advertising materials which promote a service offer, any limitations in the offer which restrict it— </p>
  <p>a.	to a particular group of people; </p>
  <p>b.	to a particular zone, region or other geographical area within the country; </p>
  <p>c.	to a particular period of time; or </p>
  <p>d.	through the limited availability of equipment, facilities or other materials</p>

  <h3><i>Consumer Billing, Charging, Collection and Credit Practices</i></h3>
  <p>1.	XGO will at all times ensure that</p>
  <p>a.	billing is accurate and timely;</p>
  <p>b.	billing accuracy is verifiable; </p>
  <p>c.	sufficient information shall be on the bill or otherwise readily available to the customer for verification of the bill without any charge; </p>
  <p>d.	upon a bona fide request from a customer, XGO shall inform or provide the consumer with timely, accurate and current information about its billing terms and conditions and options relevant to that consumer; </p>
  <p>e.	it retains records of a customer’s bill and related charges for a minimum period of twelve (12) months; and</p>

  <p>2.	In interpreting the obligations described in this section, references to “billing” or “bill” include a Licensee’s systems for recording and processing.</p>

  <h3><i>Contacting Seaman Venture </i></h3>
  <p>XGO Finance Limited Customers can contact via: </p>
  <p>Tel: ${appData.phone1}</p>
  <p>•	XGO Finance Limited Offices Addresses listed in this Consumer Code of Practice.</p>
  <p>•	XGO Finance Limited website located at ${appData.home} and email to ${
  appData.email
} addresses listed in this Customer Code of Practice</p>
  <p>•	Via Dispatch to:</p>
  <p>The Managing Director</p>
  <p>XGO Finance Limited</p>
  <p>2ND FLOOR WING A, SOUTH ATLANTIC PETROLEUM</p>
  <p>(SAPETRO) TOWERS 1, ADEOLA ODEKU STREET, VICTORIA ISLAND LAGOS.(Lagos, LAGOS)</p>
  <p>Tel: ${appData.phone1}</p>
  <p>Website: <a href="/" rel="noreferrer noopener" target="_blank">${
    appData.home
  }</a></p>

  <h3><i>Complaints Handling</i></h3>
  <p>i.	XGO will provide easily understood information about its complaint processes in various media and formats, whether hard copy or accessible via a web link on the XGO’s website) and contain other information as may, from time to time.</p>
  <p>ii.	The information provided shall be in a manner that is easily understood and must contain all relevant information about XGO Finance Limited complaint processes. </p>
  <p>iii.	XGO will provide a complaint handling policy that entails a line of complaint procedures that are transparent, readily accessible and effective and facilitates appropriate access to Alternative Dispute Resolution (ADR). </p>
  <p>iv.	XGO will ensure that consumers can easily identify how a complaint may be lodged, either at a XGO’s premises or using identified forms of communications. </p>
  <p>v.	Information on the complaints handling processes shall contain information— (a) to consumers about their right to complain; </p>
  <p>(b) on how the XGO can be contacted in order to make a complaint; and </p>
  <p>(c) on the types of supporting information including, documents the complainant needs to furnish when making a complaint. </p>
  <p>(d) All complaints will be recorded by the XGO, and processed in accordance with identified practices and procedures.</p>

  <h3><i>Complaint Process</i></h3>
  <p>1.	XGO will ensure that the means by which they accept complaints and process complaints do not unduly deter consumers from making a complaint. The process for complaints shall include: </p>
  <p>a.	a physical address where the consumer can attend in person to register or lodge a complaint; </p>
  <p>b.	a number that a consumer can call toll-free; or </p>
  <p>c.	an email address; </p>
  <p>d.	web link on the XGO’s website through which the process may equally be accessed by a consumer.</p>

  <h3><i>Compensation of Customers Where Required</i></h3>
  <p>XGO as a responsible customer centric operator offers compensation to customers where required on a case-by-case basis. Complaints brought to XGO’s notice are duly investigated and where so applicable a requisite remedial action including restitution and/or compensation is applied promptly:</p>

  <h2>Proposed Compensation Plan</h2>
  <h3><i>Services	Compensation</i></h3>
  <p>Service Failure:	5%</p>
  <p>Inaccurate disbursement:	2%</p>
  <p>Failure to credit:	5%</p>

  <h3><i>Products Warranties and Maintenance</i></h3>
  <p>i.	Before entering into a contract to provide services, XGO will inform the customer whether there is any contractual warranty relating to products subscribed for;</p>
  <p>ii.	Where a warranty exists but is not provided with the products, XGO will inform the consumer how and where to obtain it. </p>
  <p>iii.	XGO will provide specific information regarding any maintenance services offered.</p>

  <h3><i>Disclaimers</i></h3>
  <p>XGO will ensure that any disclaimer placed in an advertisement is understandable and shall in this regard ensure:</p>
  <p>(a)	That the disclaimer does not negate the principal message or object of the advertisement; </p>
  <p>(b)	That the contents of the disclaimer is clear and written in simple language having regard to the medium or format used; and</p>
  <p>(c)	That the intended audience or recipient of the advertisement is clearly specified.</p>

  <h3><i>Environmental, Health and Safety</i></h3>
  <p>i.	XGO will comply with any relevant environmental, health and safety legislation as well as policies of the Commission for the time being in force. </p>
  <p>ii.	XGO may develop and implement environmental, health and safety codes which include the following:</p>
  <p>(a) Disposal of old electronic and electric equipment; </p>
  <p>(b) Disposal or recycling of old records or paper waste. </p>

  <h3><i>Consumer Obligations</i></h3>
  <p>1.	Customers shall be bound by a XGO’s terms of service on return of a signed service agreement, or on clearly accepting the service terms by any form.</p>

  <p>2.	Customers will also be deemed to accept a XGO’s service terms upon commencement of use of the service after adequate communication by XGO of its service terms. Acceptance of XGO’s Terms. </p>

  <p>3.	Customers will grant the XGO or its authorized representatives, without charge, detailed information of their Loan Guarantors, Spouse and Relatives in case of default in payment of loan or other financing products. </p>

  <p>4.	Customers shall not institute any legal proceeding against XGO for any act engage by the company to recover the unpaid loan facility.</p>
`;
