import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";

export const PedidoEditar = (props) => {

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });
    const [PedidoId] = useState(props.match.params.id);
    const [pedido, setPedido] = useState({
        id: '',
        ClienteId: '',
        data: ''
    });

    const valorInput = e => setPedido({
        ...pedido,
        [e.target.name]: e.target.value
    });

    const limparInput = () => setPedido({
        ClienteId: '',
        data: ''
    });

    const getPedido = async () => {
        await axios.get(api + "/pedidos/" + PedidoId)
            .then((response) => { 
                setPedido(response.data.ped);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    const editarPedido = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/pedidos/" + PedidoId + "/editar", pedido, { headers })
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
        getPedido();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Editar Pedido</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/pedidos"
                            className="btn btn-outline-success btn-sm"
                        >
                            Pedidos
                        </Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}

                <Form className="p-2" onSubmit={editarPedido}>
                    <FormGroup className="p-2">
                        <Label>Pedido ID</Label>
                        <Input type="text" name="id" placeholder="ID do pedido" value={pedido.id} onChange={valorInput} disabled />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Cliente ID</Label>
                        <Input type="text" name="ClienteId" placeholder="ID do Cliente" value={pedido.ClienteId} onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Data do pedido</Label>
                        <Input type="date" name="data" placeholder="Data do pedido" value={pedido.data} onChange={valorInput} />
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