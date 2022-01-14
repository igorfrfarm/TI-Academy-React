import axios from "axios";
import { api } from "../../../config";
import { useState } from 'react';
import { Link } from "react-router-dom"
import { Button, Container, Form, FormGroup, Label, Input, Alert, Spinner } from "reactstrap"

export const CompraCadastrar = () => {

    const [compra, setCompra] = useState({
        data: '',
        ClienteId: ''
    });

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const valorInput = e => setCompra({
        ...compra, 
        [e.target.name]: e.target.value
    });

    const limparInput = () => setCompra({
        data: '',
        ClienteId: ''
    });

    const cadCompra = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.post(api + "/compras/cadastrar", compra, {headers})
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
                    <h1>Cadastrar Compra</h1>
                </div>
                <div className="d-flex align-items-center p-2">
                    <Link
                        to="/compras"
                        className="btn btn-outline-success btn-sm"
                    >
                        Compras
                    </Link>
                </div>
            </div>

            <hr className="m-1" />

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}

            <Form className="p-2" onSubmit={cadCompra}>
                <FormGroup className="p-2">
                    <Label>Data</Label>
                    <Input type="date" name="data" placeholder="Data do Pedido" value={compra.data} onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>Cliente ID</Label>
                    <Input type="text" name="ClienteId" placeholder="Cliente Id" value={compra.ClienteId} onChange={valorInput} />
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