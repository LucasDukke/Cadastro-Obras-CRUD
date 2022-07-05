const express = require('express');
const pg = require('pg');
const cors = require('cors');
const PORTA = 80;

const pool = new pg.Pool({
  connectionString: "postgres://ithrczzjfreyeh:1be4ae3983a75f97c4ca60441c8a7fd03158cf9baa16a58004aa26028ffeefdc@ec2-54-173-77-184.compute-1.amazonaws.com:5432/dcg8fgvprf54et",
ssl: {
    rejectUnauthorized : false
  }
});

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));


app.route("/reset").delete((req, res) => {
  let sql = "DROP TABLE IF EXISTS tbl_cli; \n";
  sql += "CREATE TABLE tbl_cli ( \n";
  sql += " cpf_cliente int, \n";
  sql += " rg_cliente int, \n";
  sql += " nome_cliente varchar (50), \n";
  sql += " email_cliente varchar (50), \n";
  sql += " senha_cliente varchar (8), \n";
  sql += " telefone_cliente int, \n";
  sql += " cep_cliente int, \n";
  sql += " endereco_cliente int \n";
  sql += " );";

  sql += "DROP TABLE IF EXISTS tbl_prod; \n";
  sql += "CREATE TABLE tbl_prod ( \n";
  sql += " nome_prod varchar (200), \n";
  sql += " preco_prod int, \n";
  sql += " info_prod varchar (200), \n";
  sql += " estoque_prod int, \n";
  sql += " grupo_prod varchar (300), \n";
  sql += " quantidade_prod int \n";
  sql += " );";

  sql += "DROP TABLE IF EXISTS tbl_forn; \n";
  sql += "CREATE TABLE tbl_forn ( \n";
  sql += " cnpj_forn int, \n";
  sql += " nome_fantasia_forn varchar (50), \n";
  sql += " razao_social_forn varchar (50), \n";
  sql += " ramo_forn varchar (50), \n";
  sql += " email_forn varchar (50), \n";
  sql += " senha_forn varchar (8), \n";
  sql += " rank_forn int, \n";
  sql += " arquiteto_forn varchar (50), \n";
  sql += " telefone_forn int, \n";
  sql += " cep_forn int, \n";
  sql += " endereco_forn int \n";
  sql += " );";

  sql += "DROP TABLE IF EXISTS tbl_carrinho; \n";
  sql += "CREATE TABLE tbl_carrinho ( \n";
  sql += " totalcarrinho int, \n";
  sql += " metodopgcarrinho varchar (50), \n";
  sql += " parcelamentocarrinho varchar (50), \n";
  sql += " statuscarrinho varchar (50) \n";
  sql += " );";

  sql += "DROP TABLE IF EXISTS tbl_proj; \n";
  sql += "CREATE TABLE tbl_proj ( \n";
  sql += " obs_proj varchar (300), \n";
  sql += " conclusao_proj date,\n";
  sql += " status_proj varchar (50), \n";
  sql += " valor_proj float, \n";
  sql += " valor_liq_proj float, \n";
  sql += " rank_proj int, \n";
  sql += " inicio_proj date, \n";
  sql += " tipo_local_proj varchar (50), \n";
  sql += " metro_quadrado_proj int \n";
  sql += " );";

  sql += "DROP TABLE IF EXISTS tbl_faturamento; \n";
  sql += "CREATE TABLE tbl_faturamento ( \n";
  sql += " arquiteto_fat varchar (50), \n";
  sql += " perc_arquidea_fat int, \n";
  sql += " fornecedor_fat varchar (50), \n";
  sql += " perc_fornecedor_fat int, \n";
  sql += " perc_arquiteto_fat int, \n";
  sql += " total_fat int \n";
  sql += " );";
    
  pool.query(sql, (erro, info)=> {
    if(erro) {
      res.status(503).json({status: "erro", dados: erro });
    } else {
      res.status(200).json({status: "sucesso", dados: info });
    }
  });
});

app.route("/inserircliente").post((req, res) => {
  const objcliente = req.body;
  let sql = "INSERT INTO tbl_cli (cpf_cliente, rg_cliente, nome_cliente, email_cliente, senha_cliente, telefone_cliente, cep_cliente, endereco_cliente) \n";
  sql += ` VALUES ('${objcliente.cpf_cliente}','${objcliente.rg_cliente}','${objcliente.nome_cliente}','${objcliente.email_cliente}','${objcliente.senha_cliente}','${objcliente.telefone_cliente}','${objcliente.cep_cliente}','${objcliente.endereco_cliente}');`;
  pool.query(sql, (erro, info)=> {
    if(erro) {
      res.status(503).json({status: "erro", dados: erro });
    } else {
      res.status(200).json({status: "sucesso", dados: info });
    }
  });
});


app.route("/inserirproduto").post((req, res) => {
  const objproduto = req.body;
  let sql = "INSERT INTO tbl_prod (nome_prod, preco_prod, info_prod, estoque_prod, grupo_prod, quantidade_prod) \n";
  sql += ` VALUES ('${objproduto.nome_prod}','${objproduto.preco_prod}','${objproduto.info_prod}','${objproduto.estoque_prod}','${objproduto.grupo_prod}','${objproduto.quantidade_prod}');`;
  pool.query(sql, (erro, info)=> {
    if(erro) {
      res.status(503).json({status: "erro", dados: erro });
    } else {
      res.status(200).json({status: "sucesso", dados: info });
    }
  });
});

app.route("/inserirfornecedor").post((req, res) => {
  const objforn = req.body;
  let sql = "INSERT INTO tbl_forn (cnpj_forn, nome_fantasia_forn, razao_social_forn, ramo_forn, email_forn, senha_forn, rank_forn, arquiteto_forn, telefone_forn, cep_forn, endereco_forn) \n";
  sql += ` VALUES ('${objforn.cnpj_forn}','${objforn.nome_fantasia_forn}','${objforn.razao_social_forn}','${objforn.ramo_forn}','${objforn.email_forn}','${objforn.senha_forn}','${objforn.rank_forn}','${objforn.arquiteto_forn}','${objforn.telefone_forn}','${objforn.cep_forn}','${objforn.endereco_forn}');`;
  pool.query(sql, (erro, info)=> {
    if(erro) {
      res.status(503).json({status: "erro", dados: erro });
    } else {
      res.status(200).json({status: "sucesso", dados: info });
    }
  });
});

app.route("/inserircarrinho").post((req, res) => {
  const objcarrinho = req.body;
  let sql = `INSERT INTO tbl_carrinho (totalcarrinho, metodopgcarrinho, parcelamentocarrinho, statuscarrinho) VALUES ('${objcarrinho.totalcarrinho}','${objcarrinho.metodopgcarrinho}','${objcarrinho.parcelamentocarrinho}','${objcarrinho.statuscarrinho}');`
  pool.query(sql, (erro, info)=> {
    if(erro) {
      res.status(503).json({status: "erro", dados: erro });
    } else {
      res.status(200).json({status: "sucesso", dados: info });
    }
  });
});

app.route("/inserirprojeto").post((req, res) => {
  const objprojeto = req.body;
  let sql = "INSERT INTO tbl_proj (obs_proj, conclusao_proj, status_proj, valor_proj,valor_liq_proj, rank_proj, inicio_proj, tipo_local_proj, metro_quadrado_proj) \n";
  sql += ` VALUES ('${objprojeto.obs_proj}','${objprojeto.conclusao_proj}','${objprojeto.status_proj}','${objprojeto.valor_proj}','${objprojeto.valor_liq_proj}','${objprojeto.rank_proj}','${objprojeto.inicio_proj}','${objprojeto.tipo_local_proj}','${objprojeto.metro_quadrado_proj}');`;
  pool.query(sql, (erro, info)=> {
    if(erro) {
      res.status(503).json({status: "erro", dados: erro });
    } else {
      res.status(200).json({status: "sucesso", dados: info });
    }
  });
});

app.route("/inserirfaturamento").post((req, res) => {
  const objfaturamento = req.body;
  let sql = "INSERT INTO tbl_faturamento (arquiteto_fat, perc_arquiteto_fat, fornecedor_fat, perc_fornecedor_fat, perc_arquidea_fat, total_fat) \n";
  sql += ` VALUES('${objfaturamento.arquiteto_fat}','${objfaturamento.perc_arquiteto_fat}','${objfaturamento.fornecedor_fat}','${objfaturamento.perc_fornecedor_fat}','${objfaturamento.perc_arquidea_fat}','${objfaturamento.total_fat}');`;
  pool.query(sql, (erro, info)=> {
    if(erro) {
      res.status(503).json({status: "erro", dados: erro });
    } else {
      res.status(200).json({status: "sucesso", dados: info });
    }
  });
});

app.route("/consultacliente").get((req, res)=> {     
  let sql = "SELECT * FROM tbl_cli;";   
  console.log("Executando comando ==> ", sql);   
  pool.query(sql, (erro, info)=> {     
    if(erro) {       
      res.status(503).json({status: "ERRO!", dados: erro });     
    } else {
      res.status(200).json({status: "OK!", dados: info });
    }
    });   
  }); 

app.route("/consultaproduto").get((req, res)=> {     
  let sql = "SELECT * FROM tbl_prod;";   
  console.log("Executando comando ==> ", sql);   
  pool.query(sql, (erro, info)=> {     
    if(erro) {       
      res.status(503).json({status: "ERRO!", dados: erro });     
    } else {
      res.status(200).json({status: "OK!", dados: info });     
    }   
  }); 
});

app.route("/consultafornecedor").get((req, res)=> {     
  let sql = "SELECT * FROM tbl_forn;";   
  console.log("Executando comando ==> ", sql);   
  pool.query(sql, (erro, info)=> {     
    if(erro) {       
      res.status(503).json({status: "ERRO!", dados: erro });     
    } else {
      res.status(200).json({status: "OK!", dados: info });     
    }   
  }); 
});

app.route("/consultacarrinho").get((req, res)=> {     
  let sql = "SELECT * FROM tbl_carrinho;";   
  console.log("Executando comando ==> ", sql);   
  pool.query(sql, (erro, info)=> {     
    if(erro) {       
      res.status(503).json({status: "ERRO!", dados: erro });     
    } else {
      res.status(200).json({status: "OK!", dados: info });     
    }   
  }); 
});

app.route("/consultaprojeto").get((req, res)=> {     
  let sql = "SELECT * FROM tbl_proj;";   
  console.log("Executando comando ==> ", sql);   
  pool.query(sql, (erro, info)=> {     
    if(erro) {       
      res.status(503).json({status: "ERRO!", dados: erro });     
    } else {
      res.status(200).json({status: "OK!", dados: info });     
    }   
  }); 
});

app.route("/consultafaturamento").get((req, res)=> {     
  let sql = "SELECT * FROM tbl_faturamento;";   
  console.log("Executando comando ==> ", sql);   
  pool.query(sql, (erro, info)=> {     
    if(erro) {       
      res.status(503).json({status: "ERRO!", dados: erro });     
    } else {
      res.status(200).json({status: "OK!", dados: info });     
    }   
  }); 
});
    
app.listen(PORTA, () => {
  console.log("Servidor iniciado");
})