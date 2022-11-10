/// <reference types="Cypress" />

//const { should } = require("chai")??

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it ('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    Cypress._.times(5, function() {
    it ('3.0 preenche os campos obrigatórios e envia o formulário', function(){
        
        cy.clock()

        cy.get('#firstName').type('Ana Lígia')
        cy.get('#lastName').type('Bragagnolo')
        cy.get('#email').type('analigiab@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(3000)

        cy.get('.success').should('not.be.visible')
    })
})
    it ('3.1 preenche os campos obrigatórios e envia o formulário', function(){
        
        cy.clock()

        const longtext = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
        cy.get('#firstName').type('Ana Lígia')
        cy.get('#lastName').type('Bragagnolo')
        cy.get('#email').type('analigiab@gmail.com')
        cy.get('#open-text-area').type(longtext, {delay : 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })
    
    it ('3.2 exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.clock()
        cy.get('#firstName').type('Ana Lígia')
        cy.get('#lastName').type('Bragagnolo')
        cy.get('#email').type('analigiabgmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it ('3.3.exibe campo de telefone vazio quando tento digitar valor não numérico', function(){
        cy.get('#phone')
            .type('abcdef')
            .should('have.value', '')
        
    })

    it ('3.4 exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.clock()
        cy.get('#firstName').type('Ana Lígia')
        cy.get('#lastName').type('Bragagnolo')
        cy.get('#email').type('analigiabgmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    it ('3.5 preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Ana')
            .should('have.value', 'Ana')
            .clear().should('have.value', '')
        cy.get('#lastName')
            .type('Bragagnolo')
            .should('have.value', 'Bragagnolo')
            .clear().should('have.value', '')
        cy.get('#email')
            .type('analigiab@gmail.com')
            .should('have.value', 'analigiab@gmail.com')
            .clear().should('have.value', '')
        cy.get('#phone')
            .type('47996184286')
            .should('have.value', '47996184286')
            .clear().should('have.value', '')
    })
    it ('3.6 exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it ('3.7 envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
       
    it ('4.0 seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })
    it ('4.1 seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it ('4.2 seleciona um produto (Blog) por seu indice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    it ('5.0 marca o tipo de atendimento "Feedback"', function(){
        cy.get('[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it ('5.1 marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it ('6.0 marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it ('7.0 seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })        
    })

    it ('7.1 seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
             })
     })

    it ('7.2 seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it ('8.0 verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
            
    
    })

    it ('8.1 acessa a página da política de privacidade removendo o target e então clicando no link', function (){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    
    })

    it.only ('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it ('preenche a area de texto usando o comando invoke', function(){
        const longText = Cypress._.repeat('0123456789', 20)
        
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)

      })

        it ('faz uma requisição HTTP', function() {
          cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) {
                const { status, statusText, body} = response
                expect(response.status).to.equal(200)
                expect(response.statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
        })

        it.only ('desafio encontre o gato', function() {
            cy.get('#cat')
                .invoke('show')
                .should('be.visible')
            
        })
})
