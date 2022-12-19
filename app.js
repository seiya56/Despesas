class Despesa{
    constructor(ano, mes, tipo, descricao, valor, dia){
    this.ano = ano
    this.mes = mes
    this.tipo= tipo
    this.descricao = descricao
    this.valor = valor
    this.dia = dia
    }
    validarDados(){
        for(let i in this){
            if(this[i]==''|| this[i]== null ||this[i]== undefined){
                return false
            }
        }
        return true
    }
}

class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        if(!id){
            localStorage.setItem('id', 0)
        }
    }
    getproximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId)+1
    }

    gravar(D){
        let id = this.getproximoId()

        localStorage.setItem(id, JSON.stringify(D))

        localStorage.setItem('id',id)

    }

    recarregaRegistros(){

        let  registros = Array()
        let id = localStorage.getItem('id')

        for(let i=1 ; i<=id;i++){
            let carregarDespesa = JSON.parse(localStorage.getItem(i))

            if(carregarDespesa === null){
                continue
            }

            carregarDespesa.id = i
            registros.push(carregarDespesa)


        }
        return registros
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()

        despesasFiltradas = this.recarregaRegistros()
        
        if(!despesa.ano == ''){
            despesasFiltradas = despesasFiltradas.filter(d=>d.ano == despesa.ano)
        

        }   
        if(!despesa.mes == ''){
            despesasFiltradas = despesasFiltradas.filter(d=>d.mes == despesa.mes)
        

        }   
        if(!despesa.tipo == ''){
            despesasFiltradas = despesasFiltradas.filter(d=>d.tipo == despesa.tipo)
        

        }   
        if(!despesa.valor == ''){
            despesasFiltradas = despesasFiltradas.filter(d=>d.valor == despesa.valor)
        

        }   
        if(!despesa.descricao == ''){
            despesasFiltradas = despesasFiltradas.filter(d=>d.descricao == despesa.descricao)
        

        }   
        if(!despesa.dia == ''){
            despesasFiltradas = despesasFiltradas.filter(d=>d.dia == despesa.dia)

        }
        return despesasFiltradas
    }
    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastroDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let tipo = document.getElementById('tipo')
    
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    let dia = document.getElementById('dia')
    
    let despesas = new Despesa(ano.value, mes.value, tipo.value, descricao.value, valor.value, dia.value)

    if(despesas.validarDados()){
        bd.gravar(despesas)

        $('#RegistraModal').modal('show')
        document.getElementById('info').innerHTML= "Sucesso Ao Cadastra"
        document.getElementById('exampleModalLabel').innerHTML= "Sucesso Ao Cadastra"
       

        document.getElementById('titleModal').className=" modal-header text-success"
        document.getElementById('botao').className="btn btn-success"

        ano.value=""
        mes.value=""
        tipo.value=""
        descricao.value=""
        dia.value=""
        valor.value=""

    }else{
        $('#RegistraModal').modal('show')
        document.getElementById('info').innerHTML= "Falha ao Cadastra, Verifique as informações Inseridas"
        document.getElementById('exampleModalLabel').innerHTML= "Erro ao Cadastra"
        
    
        document.getElementById('titleModal').className=" modal-header text-danger"
        document.getElementById('botao').className="btn btn-danger"
        
    }

    

}


function carregaRegistros(despesas = Array(), filtro=false){
    
    if(despesas.length == 0&& filtro==false){
        despesas = bd.recarregaRegistros()
    }

    var listaDespesas = document.getElementById('Listadespesas')
    listaDespesas.innerHTML= ''

    despesas.forEach(function(d){
        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML= `${d.dia}/${d.mes}/${d.ano}`
        switch(d.tipo){
            case '1': d.tipo="Alimentação"
            break
            case '2': d.tipo="Educação"
            break
            case '3': d.tipo="lazer"
            break
            case '4': d.tipo="Saúde"
            break
            case '5': d.tipo="Transporte"
            break
        }
        linha.insertCell(1).innerHTML= d.tipo
        linha.insertCell(2).innerHTML= d.descricao
        linha.insertCell(3).innerHTML= d.valor

        let btn = document.createElement("button")
    
        btn.className = ' btn btn-danger'
        btn.innerHTML = '<i class ="fas fa-times"></i>'
        btn.id = `id_despesa ${d.id}`
    
        btn.onclick = function(){
            let id = this.id.replace('id_despesa ','')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })

}

function pesquisarDespesas(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let tipo = document.getElementById('tipo').value
    
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value
    let dia = document.getElementById('dia').value

    let despesa = new Despesa(ano,mes,tipo,descricao,valor,dia)

    let despesas = bd.pesquisar(despesa)
    
    carregaRegistros(despesas, true)

}