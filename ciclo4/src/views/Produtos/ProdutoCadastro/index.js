import axios from "axios";
import { api } from "../../../config";
import { useState } from 'react';
import { Link } from "react-router-dom"
import { Button, Container, Form, FormGroup, Label, Input, Alert, Spinner } from "reactstrap"

export const ProdutoCadastrar = () => {

    const [produto, setProduto] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const valorInput = e => setProduto({
        ...produto, 
        [e.target.name]: e.target.value
    });

    const limparInput = () => setProduto({
        nome: '',
        descricao: ''
    });

    const cadProduto = async e => {
        e.preventDefault();
        
        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.post(api + "/produtos/cadastrar", produto, {headers})
        .then((response) => {
            setStatus({
                formSave: false,
                type: 'success',
                message: response.data.message
            });
        })
        .catch(() => {
            setStatus({
                formSave: false,
                type: 'error',
                message: "Erro: Sem conexão com a API."
            });
        });
    };

    return (
        <Container>
            <div className="d-flex justify-content-between">
                <div className="p-2">
                    <h1>Cadastrar Produto</h1>
                </div>
                <div className="d-flex align-items-center p-2">
                    <Link
                        to="/produtos"
                        className="btn btn-outline-success btn-sm"
                    >
                        Produtos
                    </Link>
                </div>
            </div>

            <hr className="m-1" />

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}

            <Form className="p-2" onSubmit={cadProduto}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do produto" value={produto.nome} onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Descrição</Label>
                    <Input type="text" name="descricao" placeholder="Descrição do produto" value={produto.descricao} onChange={valorInput} />
                </FormGroup>  
                {status.formSave ? 
                    <Button type="submit" className="m-2" outline color="success" disabled>Salvando... <Spinner type="border" size="sm" color="success" children="" /></Button> :
                    <Button type="submit" className="m-2" outline color="success">Cadastrar</Button>
                }                 
                <Button type="button" className="m-2" outline color="secondary" onClick={limparInput}>Limpar</Button>
            </Form>
        </Container>
    )
}