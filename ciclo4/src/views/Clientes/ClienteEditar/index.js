import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";

export const ClienteEditar = (props) => {

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });
    const [ClienteId] = useState(props.match.params.id);
    const [cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: ''
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

    const getCliente = async () => {
        await axios.get(api + "/clientes/" + ClienteId)
            .then((response) => {
                setCliente(response.data.cli);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    const editarCliente = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/clientes/" + ClienteId + "/editar", cliente, { headers })
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
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        getCliente();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Editar Cliente</h1>
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

                <Form className="p-2" onSubmit={editarCliente}>
                    <FormGroup className="p-2">
                        <Label>Cliente ID</Label>
                        <Input type="text" name="ClienteID" placeholder="ID do cliente" value={cliente.id} onChange={valorInput} disabled />
                    </FormGroup>
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
                        <Button type="submit" className="m-2" outline color="warning">Salvar</Button>
                    }    
                    <Button type="button" className="m-2" outline color="secondary" onClick={limparInput}>Limpar</Button>
                </Form>
            </Container>
        </div>
    )
}