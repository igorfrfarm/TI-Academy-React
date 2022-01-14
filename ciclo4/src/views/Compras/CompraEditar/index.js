import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";

export const CompraEditar = (props) => {

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });
    const [CompraId] = useState(props.match.params.id);
    const [compra, setCompra] = useState({
        id: '',
        ClienteId: '',
        data: ''
    });

    const valorInput = e => setCompra({
        ...compra,
        [e.target.name]: e.target.value
    });

    const limparInput = () => setCompra({
        ClienteId: '',
        data: ''
    });

    const getCompra = async () => {
        await axios.get(api + "/compras/" + CompraId)
            .then((response) => { 
                setCompra(response.data.comp);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    const editarCompra = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/compras/" + CompraId + "/editar", compra, { headers })
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

    useEffect(() => {
        getCompra();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Editar Compra</h1>
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

                <Form className="p-2" onSubmit={editarCompra}>
                    <FormGroup className="p-2">
                        <Label>Compra ID</Label>
                        <Input type="text" name="id" placeholder="ID da compra" value={compra.id} onChange={valorInput} disabled />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cliente ID</Label>
                        <Input type="text" name="ClienteId" placeholder="ID do Cliente" value={compra.ClienteId} onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data do pedido</Label>
                        <Input type="date" name="data" placeholder="Data do pedido" value={compra.data} onChange={valorInput} />
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