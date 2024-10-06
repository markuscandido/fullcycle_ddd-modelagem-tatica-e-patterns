# Domain Driven Design

Como modelar um software utilizando DDD e como aplicar os principais patterns que estão envolta do conceito de modelagem.

Síntese do curso **DDD: Modelagem Tática e Patterns**, parte integrante do [FullCycle 3.0](https://curso.fullcycle.com.br/curso-fullcycle/) by [Full Cycle](https://fullcycle.com.br/)

## Domain Driven Design (DDD): Compreendendo os Elementos Táticos e a Ressignificação de Conceitos

**Introdução ao DDD Tático**  
O **Domain Driven Design (DDD)** é uma abordagem utilizada para lidar com a complexidade no desenvolvimento de software, especialmente em grandes projetos. Essa técnica vai além de apenas codificar; envolve um profundo entendimento do domínio de negócio, a criação de uma linguagem universal e a identificação de contextos delimitados (*Bounded Contexts*). Após o desenvolvimento estratégico, é essencial aplicar padrões táticos de design, que garantem a qualidade e a coerência na implementação de soluções. Neste artigo, abordaremos o papel dos elementos táticos no DDD, seus desafios e a importância de ressignificar conceitos tradicionais de programação.

**Ressignificação de Conceitos no DDD**  
A ressignificação de conceitos no DDD é essencial para superar velhos hábitos que podem limitar a compreensão e implementação de boas práticas. Um exemplo comum dado no discurso envolve o aprendizado tradicional de programação orientada a objetos, onde desenvolvedores aprendem a criar entidades com getters e setters sem refletir profundamente sobre o propósito dessas entidades.

Assim como na história dos macacos em uma jaula, que repetem um comportamento sem saber sua origem, muitos desenvolvedores continuam a seguir práticas antigas, como a criação de classes de entidades diretamente ligadas ao banco de dados, sem entender o que essas entidades representam no contexto do DDD. A ressignificação aqui se dá na transição de uma visão puramente técnica e de mapeamento de banco de dados para uma perspectiva mais rica e detalhada, focada no domínio e nas regras de negócio que cada entidade encapsula.

**O que são os Elementos Táticos no DDD?**  
Os elementos táticos são padrões de design que auxiliam na implementação de soluções dentro dos contextos delimitados (*Bounded Contexts*). Antes de chegar a essa fase, o time de desenvolvimento já passou pela fase estratégica, onde foi mapeado o domínio, delimitados os contextos e compreendidos os problemas de negócio. Agora, é o momento de aplicar esses elementos táticos para estruturar e organizar o código de forma que ele reflita as regras de negócio e atenda às demandas do sistema.

Esses elementos incluem:

1. **Entidades:** Objetos com identidade própria, que persistem ao longo do tempo e que encapsulam comportamentos essenciais do negócio.
2. **Value Objects:** Objetos imutáveis que representam aspectos do domínio, sem identidade própria, mas importantes por seus atributos.
3. **Aggregates:** Conjuntos de entidades que formam um "guarda-chuva" lógico para tratar mudanças dentro de um contexto delimitado.
4. **Repositories:** Interfaces que permitem o acesso às entidades, isolando os detalhes de persistência.
5. **Services:** Classes que encapsulam regras de negócios complexas que não pertencem a uma entidade ou agregação específica.

Esses padrões, quando aplicados de forma correta, ajudam a estruturar melhor o código, diminuindo a complexidade acidental e aumentando a clareza e coesão da solução final.

**Conclusão**  
Aplicar o DDD corretamente não é simplesmente adotar padrões de design e sair codificando. Envolve uma compreensão profunda do problema a ser resolvido, uma boa delimitação dos contextos e, finalmente, a aplicação de elementos táticos que ajudem a representar as regras de negócios de forma eficaz. Ao ressignificar conceitos tradicionais de programação e abraçar os padrões de DDD, os desenvolvedores conseguem criar soluções mais robustas e alinhadas com as reais necessidades do domínio.

## Entidades no Design Orientado ao Domínio (DDD)

O conceito de **entidade** é fundamental no desenvolvimento de software, especialmente no contexto do *Domain Driven Design* (DDD). No entanto, há uma necessidade de desmistificar e redefinir o que entendemos como "entidade", afastando-nos das noções tradicionais que muitos desenvolvedores possuem.

**A Entidade no Contexto do DDD**: Uma entidade não deve ser vista apenas como uma classe que armazena atributos e métodos (*getters* e *setters*). Ela vai além disso. Segundo a definição trazida do livro *Implementing Domain Driven Design* de Vaughn Vernon, uma entidade é um elemento único que mantém sua individualidade ao longo do tempo, mesmo que suas características mudem. Essa definição reforça que uma entidade tem uma continuidade ao longo de seu ciclo de vida e pode ser identificada independentemente de seus atributos.

Por exemplo, imagine três carros idênticos em atributos, como cor, modelo e número de rodas. Apesar dessas similaridades, cada carro tem sua própria identidade, distinguida por um fator único, como o número do chassi ou placa. Ou seja, as entidades são elementos que podem ter suas propriedades alteradas ao longo do tempo, mas continuam sendo as mesmas, mantendo sua identidade.

**Entidade: Definição Clássica de Eric Evans**: No livro de Eric Evans, *Domain Driven Design*, uma entidade é definida como algo que pode ser distinguido, mesmo que seus atributos não sejam únicos. Isso significa que a essência de uma entidade não está nos seus dados, mas na sua identidade. Por exemplo, um carro pode mudar de cor ou ter peças trocadas, mas ainda assim é o mesmo carro, reconhecido pela sua identidade única.

**O Papel da Identidade na Definição de Entidades**: A identidade é a principal característica de uma entidade. Ela permite que um objeto seja diferenciado de outros, mesmo que compartilhem atributos similares. Esta diferenciação é o que dá coesão ao domínio, garantindo que o coração do sistema mantenha sua robustez ao longo do tempo. Entender isso é essencial para a construção de softwares mais escaláveis, coesos e de alta qualidade.

**Conclusão**: Entidades são componentes centrais no design de sistemas robustos, onde a identidade é o elemento chave que sustenta a sua individualidade ao longo do tempo, independentemente de seus atributos serem alterados. Este conceito fundamenta uma abordagem mais conceitual e sólida para o desenvolvimento de software, sendo a base para compreender elementos mais complexos do DDD.

### O Perigo da Entidade Anêmica no Design Orientado ao Domínio (DDD)

No desenvolvimento de software, especialmente quando aplicado o *Domain Driven Design* (DDD), o conceito de entidades desempenha um papel crucial. No entanto, é comum que os desenvolvedores criem o que chamamos de **entidades anêmicas**, um padrão que, embora frequente, pode prejudicar a clareza e a coesão do domínio da aplicação.

**O Que É uma Entidade Anêmica?**: Uma entidade anêmica é uma classe que basicamente serve como um recipiente de dados, contendo apenas atributos com seus respectivos métodos *getters* e *setters*, mas sem comportamento ou lógica de negócio embutida. Em muitos casos, ela se assemelha a um **DTO (Data Transfer Object)**, cujo propósito é transferir dados entre camadas de um sistema sem adicionar qualquer lógica adicional. Um exemplo clássico de uma entidade anêmica seria uma classe `Customer` que contém um `id`, `name` e `address`, junto com seus respectivos *getters* e *setters*, mas sem nenhuma regra de negócio.

Essa abordagem anêmica, comumente adotada para facilitar a integração com ORMs (Object Relational Mappers), acaba levando a um design voltado ao banco de dados, em vez de ser orientado ao domínio. Em vez de modelar a lógica de negócio diretamente nas entidades, o foco é colocado na estrutura dos dados para que se encaixe bem nas tabelas do banco, o que limita a expressividade e a robustez do sistema.

**Problemas da Entidade Anêmica**: O principal problema com entidades anêmicas é que elas não refletem o comportamento do domínio que estão representando. Embora carreguem dados, elas não possuem lógica que dê significado a esses dados. Um sistema DDD robusto exige que as entidades possuam **comportamento**, ou seja, que elas manipulem ativamente os dados que carregam, encapsulando regras de negócio.

Se as entidades são projetadas de forma anêmica, o coração do DDD é comprometido, pois o comportamento que deveria estar nas entidades é movido para outras camadas, como serviços ou controladores, resultando em uma separação indesejada entre os dados e as operações que os manipulam. Esse antipadrão leva a um design fragmentado e difícil de manter, especialmente em sistemas complexos.

**Modelagem de Domínios Ricos**: Ao contrário das entidades anêmicas, **domínios ricos** são modelados de forma a refletir as regras de negócio diretamente nas entidades. Isso significa que, além de armazenar dados, as entidades também contêm comportamentos que validam e manipulam esses dados de acordo com as necessidades do sistema.

Por exemplo, em vez de uma classe `Customer` apenas expor seu nome e endereço, ela poderia ter métodos como `ChangeAddress()`, encapsulando a lógica necessária para garantir que a mudança de endereço esteja de acordo com as regras da aplicação. Isso torna a entidade um reflexo direto do domínio, com comportamentos que alteram seu estado de maneira controlada e previsível.

**A Importância das Regras de Negócio**: Regras de negócio são a essência de um sistema orientado ao domínio. Elas definem como as entidades interagem com o mundo ao seu redor e garantem que o sistema funcione de acordo com os requisitos específicos do domínio. Uma entidade rica carrega essas regras internamente, manipulando dados, aplicando validações e garantindo consistência.

No caso da classe `Customer`, as regras de negócio poderiam incluir restrições para alterações de nome ou validações no endereço. Qualquer operação que modifique a entidade deve seguir essas regras, e é por isso que o comportamento deve ser modelado diretamente nela.

**Conclusão**: Criar entidades anêmicas é um erro comum, especialmente quando os desenvolvedores se concentram em estruturas de dados em vez de comportamentos de domínio. Para garantir que o design de software seja sustentável, escalável e reflita as necessidades do domínio, é essencial adotar uma modelagem rica, onde as entidades encapsulam tanto dados quanto comportamentos. Isso garante que as regras de negócio estejam onde pertencem: dentro das entidades que representam o núcleo do sistema.

### Entidades Anêmicas vs. Entidades Ricas: O Papel das Regras de Negócio

Ao desenvolver sistemas complexos, especialmente com uma abordagem de *Domain Driven Design* (DDD), a maneira como modelamos entidades no software tem um impacto significativo na expressividade e nas regras de negócio. Um erro comum é tratar as entidades como simples recipientes de dados, conhecidos como **entidades anêmicas**. Essas entidades possuem atributos e métodos básicos de *getters* e *setters* que, embora permitam modificar e acessar dados, não refletem a lógica ou o comportamento do sistema.

**A Importância do Comportamento nas Entidades**: A modelagem de uma entidade deve começar pelos atributos que representam o modelo do domínio, mas o ponto crucial é considerar o **comportamento**. Uma entidade rica em regras de negócio não deve simplesmente expor atributos; ao invés disso, ela deve encapsular a lógica que governa como e quando esses atributos podem ser modificados. A diferença entre um método simples de `setName` e um método de `changeName`, por exemplo, é significativa. O `setName` apenas muda o valor do nome, enquanto o `changeName` comunica uma intenção de negócio, como corrigir um nome incorretamente cadastrado.

**Expressividade e Intenção**: Entidades ricas são projetadas para refletir o contexto de negócios em que operam. Considere o exemplo de um cliente ativo ou inativo. Um simples `setActive(true)` não diz nada sobre o motivo da ativação. Em contraste, métodos como `activate()` ou `deactivate()` expressam diretamente a intenção do negócio, como reativar um cliente após ele ter voltado a pagar suas faturas. A ideia é que as ações sobre a entidade façam sentido dentro do domínio do sistema, com métodos que refletem as operações reais de negócio, e não apenas mudanças de estado superficiais.

**Consistência em Tempo Real**: Outra regra fundamental ao modelar entidades é garantir que elas estejam **sempre consistentes**. Uma entidade não deve ser criada com atributos em estado inválido, pois isso compromete a integridade do sistema. Por exemplo, um cliente não pode existir sem um nome. Se permitirmos criar uma entidade de cliente sem esse dado, ela estará inconsistente e incapaz de validar as regras de negócio. A consistência deve ser mantida em 100% das interações com a entidade, sendo preferível passar todos os atributos obrigatórios no construtor da entidade para garantir sua completude.

**Auto-Validação das Entidades**: A auto-validação é outro princípio crucial para assegurar a consistência dos dados. Isso significa que uma entidade deve validar seus próprios atributos ao ser instanciada ou modificada. Caso um atributo obrigatório, como o nome de um cliente, não seja fornecido, a entidade deve lançar um erro imediatamente. O objetivo é evitar que a responsabilidade de validação seja delegada a outras partes do sistema, reduzindo assim as chances de inconsistências e falhas em momentos críticos.

**Separação de Contexto: Entidade de Negócio vs. Entidade de Persistência**: Outro ponto importante discutido é a separação entre a **entidade de negócio** e a **entidade de persistência**. As ferramentas de mapeamento objeto-relacional (ORM) frequentemente obrigam o uso de *getters* e *setters* para manipulação de dados no banco de dados. Contudo, a entidade do domínio deve ser desenhada para atender às regras de negócio, enquanto as necessidades de persistência podem ser satisfeitas por uma entidade separada. Isso evita que as restrições do ORM limitem a modelagem do domínio e mantém as responsabilidades bem definidas.

**Conclusão**: A principal lição de modelagem em sistemas baseados em DDD é focar no **comportamento** e na **consistência** das entidades. O uso de métodos que reflitam as intenções do negócio, a auto-validação e a separação entre entidades de negócio e persistência são práticas essenciais para garantir que o sistema expresse corretamente as regras e os fluxos do domínio.

## A Importância dos Value Objects na Modelagem de Domínio

Quando modelamos sistemas, muitas vezes recorremos a tipos primitivos como strings, inteiros ou booleanos para representar dados, como nomes, endereços ou CPFs. Embora seja uma prática comum, essa abordagem pode empobrecer a expressividade do código, dificultando a clareza do domínio representado. Aqui entram os **Value Objects**, ou Objetos de Valor (VOs), uma solução que promove uma modelagem mais rica e expressiva, essencialmente no contexto do **Domain-Driven Design (DDD)**.

**O Que São Value Objects?**: Os Value Objects são estruturas focadas nas propriedades de um elemento, ao invés de seu comportamento. Diferentemente das entidades, os VOs não possuem identificadores únicos, uma vez que representam apenas um conjunto de atributos. Sua principal característica é a **imutabilidade**: quando algo precisa ser alterado, o objeto não é modificado diretamente, mas substituído por um novo.

Um exemplo clássico de Value Object é um endereço. Em uma aplicação tradicional, poderíamos modelar um endereço com strings para rua, cidade, CEP, etc. No entanto, ao fazer isso, perdemos a expressividade, pois um endereço não é apenas um conjunto de strings. É um objeto que carrega uma semântica própria. Assim, mudar apenas o número de uma casa significa trocar o endereço completo, o que torna a imutabilidade essencial para sua representação fiel.

**Regras dos Value Objects**:

1. **Imutabilidade**: Um VO não deve ser alterado diretamente. Quando há uma mudança, ele é substituído por um novo objeto.
2. **Ausência de Identidade**: Diferente das entidades, os Value Objects não possuem um identificador único. Eles são definidos por suas propriedades.
3. **Auto-validação**: O estado de um VO deve ser sempre válido. Por exemplo, um CPF só pode existir se os dígitos verificadores estiverem corretos.

**Vantagens dos Value Objects**: Ao adotar Value Objects, obtemos uma modelagem de domínio mais clara e precisa. No exemplo de um **CPF**, em vez de tratar esse dado como uma simples string, podemos encapsular todas as regras e particularidades em um tipo específico, garantindo consistência e expressividade.

Além disso, os VOs ajudam a manter o **core do sistema estável**. As mudanças no sistema geralmente ocorrem nas camadas externas, como interfaces de usuário e integrações. O núcleo do negócio, representado pelos Value Objects e entidades, tende a mudar menos frequentemente, pois ele modela diretamente as regras e políticas do domínio.

**Implementação de Value Objects**: Na prática, um Value Object pode ser implementado como uma classe simples, sem identificadores e com todos os atributos encapsulados. O código também pode incluir métodos auxiliares, como um `toString` para representar o objeto em diferentes formatos (por exemplo, endereço no formato brasileiro ou americano). A chave aqui é garantir que, uma vez criado, o objeto não seja alterado.

Em resumo, os Value Objects são uma ferramenta poderosa para modelar um domínio de forma expressiva e coesa, evitando o uso excessivo de tipos primitivos e trazendo consistência para o sistema. Ao olhar para o domínio, desenvolvedores devem considerar se o uso de tipos primitivos realmente faz sentido, ou se a criação de VOs traria mais clareza e estabilidade ao sistema.

**Conclusão**: Ao evitar o uso excessivo de tipos primitivos e adotar Value Objects, conseguimos criar sistemas mais robustos, expressivos e fáceis de manter. Essa prática, amplamente recomendada no **DDD**, nos ajuda a modelar o domínio de forma que ele reflita de maneira clara as regras de negócio, promovendo um desenvolvimento mais intuitivo e correto.

## Entendendo Agregados no Design de Software

No design de software orientado a objetos, um conceito fundamental é o de "agregados". Um agregado é um grupo de objetos relacionados que devem ser tratados como uma unidade para operações de mudança de estado. Este conceito é útil para estruturar sistemas complexos, garantindo que certos grupos de entidades e objetos de valor se comportem como uma unidade coesa.

**Conceito de Agregados**: Agregados ajudam a organizar o software em blocos lógicos que são manipulados como uma unidade de negócio. Um exemplo típico é o relacionamento entre um cliente e seus pedidos (ordens de serviço). O cliente pode existir de forma independente de suas ordens, mas cada ordem depende de um cliente. Da mesma forma, itens dentro de uma ordem não têm sentido sem a ordem à qual pertencem, criando uma forte relação entre eles.

**Agregado Root**: Um agregado possui um ponto de entrada, chamado de "root", que serve como a principal entidade do agregado. No caso de uma ordem de serviço, a ordem seria o "root", e os itens dentro dela fazem parte do mesmo agregado, necessitando serem manipulados juntos. O cliente, por outro lado, é parte de outro agregado e se relaciona com a ordem apenas via uma referência, como o ID, reforçando que a ordem e o cliente pertencem a agregados diferentes.

**Exemplo Prático**: Para ilustrar, considere a criação de uma classe `Order`, que contém um array de itens (`OrderItems`). Quando a ordem é criada, os itens são incluídos diretamente, formando um agregado. Já a relação com o cliente se dá por meio de um campo `CustomerId`, indicando que o cliente pertence a outro agregado, e sua referência é feita apenas pelo ID.

Esse tipo de organização ajuda a manter o software modular e a garantir que as transações dentro do sistema sejam atômicas e coesas, onde mudanças ocorrem de maneira consistente dentro de um agregado, respeitando suas dependências internas.

**Conclusão**: Agregados são uma ferramenta poderosa no design de sistemas, especialmente em domínios complexos. Eles permitem gerenciar de forma eficiente as interações entre entidades e objetos de valor, facilitando a evolução do software com coesão e clareza. A correta aplicação desse conceito pode transformar a maneira como sistemas são planejados e implementados, garantindo maior robustez e clareza.
