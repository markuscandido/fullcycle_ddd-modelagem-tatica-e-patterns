# Domain Driven Design

Como modelar um software utilizando DDD e como aplicar os principais patterns que estão envolta do conceito de modelagem.

Síntese do curso **DDD: Modelagem Tática e Patterns**, parte integrante do [FullCycle 3.0](https://curso.fullcycle.com.br/curso-fullcycle/) by [Full Cycle](https://fullcycle.com.br/)

## Introdução: Domain Driven Design (DDD): Compreendendo os Elementos Táticos e a Ressignificação de Conceitos

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

## Entidades: Entidades no Design Orientado ao Domínio (DDD)

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

## Value Objects: A Importância dos Value Objects na Modelagem de Domínio

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

## Agregados: Entendendo Agregados no Design de Software

No design de software orientado a objetos, um conceito fundamental é o de "agregados". Um agregado é um grupo de objetos relacionados que devem ser tratados como uma unidade para operações de mudança de estado. Este conceito é útil para estruturar sistemas complexos, garantindo que certos grupos de entidades e objetos de valor se comportem como uma unidade coesa.

**Conceito de Agregados**: Agregados ajudam a organizar o software em blocos lógicos que são manipulados como uma unidade de negócio. Um exemplo típico é o relacionamento entre um cliente e seus pedidos (ordens de serviço). O cliente pode existir de forma independente de suas ordens, mas cada ordem depende de um cliente. Da mesma forma, itens dentro de uma ordem não têm sentido sem a ordem à qual pertencem, criando uma forte relação entre eles.

**Agregado Root**: Um agregado possui um ponto de entrada, chamado de "root", que serve como a principal entidade do agregado. No caso de uma ordem de serviço, a ordem seria o "root", e os itens dentro dela fazem parte do mesmo agregado, necessitando serem manipulados juntos. O cliente, por outro lado, é parte de outro agregado e se relaciona com a ordem apenas via uma referência, como o ID, reforçando que a ordem e o cliente pertencem a agregados diferentes.

**Exemplo Prático**: Para ilustrar, considere a criação de uma classe `Order`, que contém um array de itens (`OrderItems`). Quando a ordem é criada, os itens são incluídos diretamente, formando um agregado. Já a relação com o cliente se dá por meio de um campo `CustomerId`, indicando que o cliente pertence a outro agregado, e sua referência é feita apenas pelo ID.

Esse tipo de organização ajuda a manter o software modular e a garantir que as transações dentro do sistema sejam atômicas e coesas, onde mudanças ocorrem de maneira consistente dentro de um agregado, respeitando suas dependências internas.

**Conclusão**: Agregados são uma ferramenta poderosa no design de sistemas, especialmente em domínios complexos. Eles permitem gerenciar de forma eficiente as interações entre entidades e objetos de valor, facilitando a evolução do software com coesão e clareza. A correta aplicação desse conceito pode transformar a maneira como sistemas são planejados e implementados, garantindo maior robustez e clareza.

## Avançando com testes

Os testes automatizados são uma ferramenta essencial para garantir a qualidade de software, especialmente em projetos complexos. Neste artigo, exploraremos a importância dos testes automatizados e como configurá-los em um ambiente TypeScript utilizando o Jest, uma das ferramentas mais populares para essa tarefa.

**Introdução aos Testes Automatizados**: A medida que os projetos crescem em complexidade, como os envolvendo ordens, itens, clientes e endereços, o risco de perder tempo com erros e retrabalho aumenta. Testes automatizados são essenciais para garantir que, à medida que o desenvolvimento avança, funcionalidades existentes não sejam quebradas. Essa prática não apenas melhora a qualidade do código, mas também aumenta a confiança da equipe no desenvolvimento contínuo.

O objetivo deste guia é configurar um ambiente de testes de forma simples e eficiente, cobrindo todo o código existente para permitir uma transição suave para futuras implementações.

**Preparando o Ambiente**: Para começar, o ambiente de desenvolvimento precisa ser configurado adequadamente. O primeiro passo é instalar as ferramentas necessárias para executar os testes. No caso do TypeScript, o Jest é uma escolha popular por sua simplicidade e eficiência.

**Instalação do Jest e Suporte ao TypeScript**: Para instalar o Jest e garantir que ele funcione bem com TypeScript, é necessário rodar o seguinte comando no terminal:

```bash
npm install jest @types/jest ts-node --save-dev
```

Isso adiciona o Jest como o "runner" de testes, bem como as tipagens necessárias para trabalhar com TypeScript. É importante incluir a flag `--save-dev`, pois essas dependências são específicas do ambiente de desenvolvimento.

**Otimização com SWC**: Uma outra otimização interessante é o uso do SWC, um compilador em Rust que permite transpilar o código mais rapidamente. Desenvolvido pela equipe da Vercel, o SWC aumenta a performance dos testes, especialmente em projetos maiores.

Para adicionar o SWC ao projeto, execute o seguinte comando:

```bash
npm install @swc/jest @swc/cli @swc/core --save-dev
```

Com isso, o ambiente de testes estará configurado para rodar de forma mais eficiente.

**Configuração do Jest**: Após a instalação das dependências, é necessário inicializar o Jest para gerar um arquivo de configuração. Isso pode ser feito com o seguinte comando:

```bash
npx jest --init
```

Durante o processo, o Jest fará algumas perguntas importantes, como:

- **Gerar arquivo de configuração para TypeScript?** Sim
- **Ambiente de execução?** Node.js
- **Cobertura de testes?** Não (para esse exemplo, não é necessário, mas pode ser habilitado em projetos mais avançados)
- **Limpar mocs e instâncias antes de cada teste?** Sim

O arquivo `jest.config.ts` será gerado, contendo todas as configurações para rodar os testes no ambiente TypeScript. Um ajuste importante nesse arquivo é a adição de um *transformer* para que o Jest utilize o SWC, garantindo uma execução mais rápida dos testes:

```json
transform: {
  "^.+\\.(t|j)sx?$": ["@swc/jest"],
}
```

**Escrevendo o Primeiro Teste**: Com o ambiente configurado, é hora de escrever o primeiro teste. Uma boa prática é manter os arquivos de teste próximos aos arquivos de código que eles testam, embora criar uma pasta separada para testes também seja comum.

Crie um arquivo de teste para um cliente (`customer.spec.ts`) e adicione o seguinte código:

```typescript
describe('CustomerUnitTests', () => {
  test('should get 1 as result', () => {
    const result = 1;
    expect(result).toBe(1);
  });
});
```

Este é um teste simples que valida que o valor `1` é igual a `1`. Ele serve apenas como um exemplo inicial para verificar se o ambiente está configurado corretamente.

**Executando os Testes**: Agora que o primeiro teste foi escrito, execute o comando abaixo para rodar os testes:

```bash
npm test
```

O Jest encontrará o arquivo de teste e executará o teste, retornando a mensagem de sucesso se tudo estiver correto. Esse primeiro passo garante que o ambiente está pronto para suportar testes mais complexos no futuro.

**Conclusão**: Testes automatizados são fundamentais para o sucesso de qualquer projeto de software, especialmente em ambientes que exigem escalabilidade e manutenção contínua. A configuração do Jest com TypeScript, aliada ao uso de ferramentas como o SWC, proporciona um ambiente ágil e eficiente para o desenvolvimento de testes.

Com essa base estabelecida, o próximo passo é garantir a cobertura de testes para todas as funcionalidades existentes, proporcionando maior segurança no desenvolvimento de novos recursos.

## Domain Services no Domain Driven Design: Entendendo seu Papel

**Introdução**: No desenvolvimento de software, especialmente ao adotar o *Domain Driven Design* (DDD), é comum se deparar com o conceito de *Domain Services*. Apesar de parecer confuso no início, é crucial entender o papel desses serviços para garantir que a lógica de negócio seja adequadamente distribuída e as entidades não fiquem sobrecarregadas. Este artigo explora o conceito de *Domain Services*, destacando sua importância e como utilizá-los de forma eficiente.

**O que são Domain Services?**: Um *Domain Service* é uma operação sem estado que realiza uma tarefa específica relacionada ao domínio do negócio. Ele é utilizado quando uma operação ou transformação significativa não é responsabilidade natural de uma entidade ou de um objeto de valor. Isso geralmente ocorre quando a operação envolve mais de uma entidade ou não se encaixa diretamente nos métodos de um agregado.

Tanto Vaughn Vernon, em seu livro *Implementing Domain-Driven Design*, quanto Eric Evans, no clássico *Domain-Driven Design: Tackling Complexity in the Heart of Software*, reforçam que os *Domain Services* devem ser usados para encapsular essa lógica de negócio que não se encaixa em entidades individuais. Eles também enfatizam que esses serviços devem ser *stateless*, ou seja, não armazenar estado, apenas executar operações e retornar resultados.

**Quando Utilizar um Domain Service?**: A principal indicação para criar um *Domain Service* ocorre quando uma operação não faz sentido como um método dentro de uma entidade ou agregado. Exemplos incluem:

1. **Operações que envolvem múltiplas entidades**: Se uma ação afeta várias entidades simultaneamente, é um indicativo de que um *Domain Service* pode ser necessário. Por exemplo, um ajuste de preços para todos os produtos de um catálogo.
  
2. **Cálculos complexos que envolvem múltiplas entidades**: Imagine um cenário onde você precisa calcular a média de valores em ordens de serviço ou faturamento total. Esse tipo de operação, que envolve dados de várias entidades, é melhor tratada por um *Domain Service*.

3. **Operações em lote**: Quando você precisa aplicar uma ação a um conjunto de entidades, como uma atualização em massa de preços, é mais apropriado delegar essa lógica para um serviço de domínio.

**Cuidados ao Utilizar Domain Services**: É importante evitar cair na armadilha de usar *Domain Services* de maneira excessiva. Se seu projeto tiver muitos desses serviços, isso pode ser um indício de que suas entidades estão anêmicas, ou seja, com pouca lógica de negócio. Nesse caso, as entidades podem estar servindo apenas como recipientes de dados, com a lógica sendo movida para os serviços, o que é um *bad smell* no design orientado a objetos.

Um bom design deve garantir que as entidades sejam ricas em comportamento e contenham a lógica relacionada diretamente à elas. *Domain Services* devem ser usados com moderação, apenas quando a lógica não pode ser atribuída a uma entidade específica.

**Atributos de um Domain Service Bem Projetado**:

1. **Stateless**: Um *Domain Service* deve ser sem estado, ou seja, não deve manter dados entre as chamadas de métodos. Toda a lógica de negócio envolvendo estado deve residir nas entidades e agregados.

2. **Parte da Ubiquitous Language**: A interface e os métodos do *Domain Service* devem refletir a linguagem ubíqua do domínio, garantindo que o código seja compreensível tanto para desenvolvedores quanto para especialistas do negócio.

3. **Métodos Simples e Claros**: Muitas vezes, os métodos em um *Domain Service* podem ser implementados de forma estática, já que eles não dependem de dados persistentes no serviço em si.

**Conclusão**: Os *Domain Services* são componentes essenciais no DDD, servindo para lidar com operações que não fazem parte da responsabilidade natural de uma entidade ou agregado. No entanto, é fundamental usá-los com cautela para evitar a criação de entidades anêmicas. Ao manter esses serviços sem estado e focados em tarefas específicas do domínio, você garante uma arquitetura mais coesa e fácil de manter.

Este conceito será melhor explorado com exemplos práticos, onde criaremos serviços de domínio para consolidar o entendimento sobre como e quando utilizá-los. Fique atento para o próximo artigo, onde mergulharemos no código e veremos esses princípios em ação!

### Implementando um Product Service com Domain Services em TypeScript

No desenvolvimento de aplicações orientadas a domínios, a arquitetura deve estar alinhada às necessidades do negócio e a forma como ele se comporta. Um exemplo comum é o ajuste de preços de produtos, onde devemos aplicar lógicas de negócio como aumento percentual de forma eficiente. Vamos explorar uma implementação prática dessa solução, utilizando Domain Services em TypeScript.

**Definição do Problema**: Imaginemos que temos uma lista de produtos e precisamos aplicar um aumento de 10% no preço de todos eles. Uma solução imediata seria adicionar um método na entidade Produto, como `IncreasePrice`, que receberia a porcentagem e atualizaria o preço individualmente. Porém, essa abordagem se limita a um único produto por vez.

Mas, e se precisarmos modificar o preço de **todos** os produtos de uma única vez? A solução se torna mais complexa. Aqui, entra em cena o conceito de **Domain Services**, uma camada responsável por realizar operações que envolvem múltiplas entidades ou lógica de negócio que não pertence diretamente a uma única entidade.

**Implementação do Product Service**: A primeira etapa dessa implementação é definir a estrutura de teste para o nosso serviço de produto, garantindo que a lógica de aumento de preços funcione como esperado. O código de teste pode ser visto como segue:

```typescript
describe('ProductService', () => {
  it('should change the prices of all products', () => {
    const product1 = new Product(1, 'Product 1', 10);
    const product2 = new Product(2, 'Product 2', 20);
    
    const products = [product1, product2];

    ProductService.increasePrice(products, 100); // Aumento de 100%

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
```

Este teste simula a criação de dois produtos e aplica um aumento de preço em ambos, verificando se a lógica do serviço foi executada corretamente.

**Criando o Product Service**: Após a definição dos testes, passamos para a implementação do serviço. O serviço deve ser responsável por aplicar a lógica de aumento de preço em uma lista de produtos. A classe `ProductService` seria algo assim:

```typescript
export default class ProductService {
  static increasePrice(products: Product[], percentage: number): void {
    products.forEach(product => {
      product.changePrice(product.price * (percentage / 100) + product.price);
    });
  }
}
```

Aqui, o método `increasePrice` recebe uma lista de produtos e uma porcentagem, aplicando o aumento em cada item da lista.

**Considerações sobre Eficiência**: Ao trabalhar com um número pequeno de produtos, essa abordagem é eficiente. No entanto, imagine um cenário com um milhão de produtos, como em uma grande loja virtual. A abordagem de trazer todos os produtos para a memória, iterar sobre eles e, em seguida, persistir as mudanças individualmente não é escalável. O processo poderia consumir muito tempo e memória, além de gerar múltiplas operações no banco de dados.

Nesses casos, a melhor prática seria utilizar uma operação em lote diretamente no banco de dados, com um comando SQL que realize a alteração em todos os registros de uma só vez, evitando a sobrecarga de processamento em memória.

**Conclusão**: Ao implementar um Domain Service, devemos balancear a pureza conceitual com a eficiência prática. Em cenários onde as regras de negócio envolvem grandes volumes de dados, é crucial evitar extremismos e considerar soluções que integrem de forma eficiente a lógica de negócio com a persistência de dados, como a execução de operações em massa no banco de dados. O bom senso e a experiência devem guiar o uso correto de cada abordagem.

## Explorando o Padrão de Repositório no Desenvolvimento de Software: Conceitos e Implementação Prática

O padrão de repositório é amplamente utilizado no design de software orientado a domínio (DDD) e possui um papel fundamental na separação entre o domínio de negócios e a camada de infraestrutura. Ao abstrair o acesso a dados, o repositório torna possível lidar com a persistência de dados de forma mais controlada, tornando o sistema mais modular e permitindo a troca de tecnologias de armazenamento sem impactar o restante da aplicação.

**O Que é o Padrão de Repositório?**: No contexto de DDD, um repositório pode ser comparado a uma coleção de dados que permite o armazenamento e recuperação de objetos de domínio, os quais representam as regras e a lógica do negócio. Esses objetos são chamados de agregados e podem conter entidades e objetos de valor. A principal característica de um agregado é que ele deve manter a consistência ao longo do seu ciclo de vida; ou seja, o estado dos dados ao serem recuperados deve ser exatamente o mesmo de quando foram persistidos.

**Quando Utilizar um Repositório?**: O repositório é ideal para abstrair o banco de dados e isolar a lógica de acesso aos dados do restante da aplicação. No entanto, em cenários onde a aplicação requer mapeamento direto de tabelas de banco de dados a objetos, o uso de Data Access Objects (DAOs) pode ser mais apropriado. Os repositórios são recomendados para situações onde há uma relação um-para-um entre um agregado e o repositório, representando coleções em memória que são sincronizadas com o banco de dados.

**Interfaces e Desacoplamento**: Um dos princípios do DDD é evitar o acoplamento direto entre o domínio e a implementação de persistência, garantindo que o domínio permaneça isolado e sem dependências diretas de tecnologias específicas de banco de dados. Para isso, as interfaces de repositório são essenciais. Elas definem um contrato para as operações de persistência, como `create`, `update`, `find`, e `findAll`, sem especificar detalhes técnicos de armazenamento.

A prática de criação de interfaces genéricas também ajuda a tornar o repositório mais flexível. Com a utilização de Generics, é possível definir um contrato genérico de repositório que pode ser implementado para diferentes tipos de agregados. Isso permite que o repositório trate cada agregado conforme as especificidades de cada um, sem violar as regras do domínio.

**A Importância da Camada de Infraestrutura**: Para evitar a sobrecarga de responsabilidades, o padrão DDD recomenda dividir o sistema em camadas bem definidas. A camada de infraestrutura lida com todos os aspectos de comunicação externa, incluindo o banco de dados. Nessa estrutura, a infraestrutura é separada do domínio, e o repositório serve como uma ponte que permite ao domínio acessar dados sem conhecer detalhes específicos de como esses dados são armazenados ou recuperados.

**Implementação Prática de um Repositório**: A implementação de um repositório envolve a definição de uma interface no domínio e a criação de uma implementação concreta na camada de infraestrutura. A interface define os métodos necessários, enquanto a camada de infraestrutura lida com a lógica real de persistência, seja em um banco de dados relacional ou em um banco orientado a documentos.

No exemplo, a criação de repositórios específicos para agregados, como o `ProductRepository`, mostra como um repositório específico pode estender um repositório genérico e oferecer métodos adicionais para atender as necessidades específicas do agregado.

**Conclusão**: O padrão de repositório é um componente poderoso no design de software, especialmente em DDD. Ele fornece uma abstração que simplifica o acesso aos dados e aumenta a flexibilidade e a testabilidade do sistema. Ao manter o domínio isolado e o acesso a dados organizado, o padrão de repositório ajuda a construir aplicações robustas e escaláveis, prontas para evoluir de forma incremental e modular.

