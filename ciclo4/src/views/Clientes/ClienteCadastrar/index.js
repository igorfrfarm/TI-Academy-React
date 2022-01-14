import axios from "axios";
import { api } from "../../../config";
import { useState } from 'react';
import { Link } from "react-router-dom"
import { Button, Container, Form, FormGroup, Label, Input, Alert, Spinner } from "reactstrap"

export const ClienteCadastrar = () => {

    const [cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: ''
    });

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const valorInput = e => setCliente({
        ...cliente, 
        [e.target.name]: e.target.value
    });

    const limparInput = () => setCliente({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: ''
    });

    const cadCliente = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.post(api + "/clientes/cadastrar", cliente, {headers})
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
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div className="d-flex align-items-center p-2">
                    <Link
                        to="/clientes"
                        className="btn btn-outline-success btn-sm"
                    >
                        Clientes
                    </Link>
                </div>
            </div>

            <hr className="m-1" />

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}

            <Form className="p-2" onSubmit={cadCliente}>
                <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do cliente" value={cliente.nome} onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Endereço</Label>
                    <Input type="text" name="endereco" placeholder="Endereço" value={cliente.endereco} onChange={valorInput} />
                </FormGroup>                
                <FormGroup className="p-2">
                    <Label>Cidade</Label>
                    <Input type="text" name="cidade" placeholder="Cidade" value={cliente.cidade} onChange={valorInput} />
                </FormGroup>                
                <FormGroup className="p-2">
                    <Label>UF</Label>
                    <Input type="text" name="uf" placeholder="UF" value={cliente.uf} onChange={valorInput} />
                </FormGroup>                
                <FormGroup className="p-2">
                    <Label>Data de Nascimento</Label>
                    <Input type="date" name="nascimento" placeholder="Data de Nascimento" value={cliente.nascimento} onChange={valorInput} />
                </FormGroup>                
                <FormGroup className="p-2">
                    <Label>Cliente desde</Label>
                    <Input type="date" name="clienteDesde" placeholder="Cliente Desde" value={cliente.clienteDesde} onChange={valorInput} />
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