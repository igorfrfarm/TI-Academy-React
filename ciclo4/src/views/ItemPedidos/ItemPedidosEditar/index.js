import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import { api } from "../../../config";

export const ItemPedidosEditar = (props) => {

    const [status, setStatus] = useState({
        formSave: false,
        type: '',
        message: ''
    });
    const [PedidoId] = useState(props.match.params.PedidoId);
    const [ServicoId] = useState(props.match.params.ServicoId);
    const [item, setItem] = useState({
        PedidoId: '',
        ServicoId: '',
        quantidade: '',
        valor: ''
    });

    const valorInput = e => setItem({
        ...item,
        [e.target.name]: e.target.value
    });

    const limparInput = () => setItem({
        PedidoId: '',
        ServicoId: '',
        quantidade: '',
        valor: ''
    });

    const getItem = async () => {
        await axios.get(api + "/itempedido/" + PedidoId + "/" + ServicoId)
            .then((response) => { 
                setItem(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                });
            });
    };

    const editarItem = async e => {
        e.preventDefault();

        setStatus({
            formSave: true
        });

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/itempedido/" + PedidoId + "/" + ServicoId + "/editar", item, { headers })
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
        getItem();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex justify-content-between">
                    <div className="p-2">
                        <h1>Editar Item</h1>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <Link
                            to="/itenspedidos"
                            className="btn btn-outline-success btn-sm"
                        >
                            Itens
                        </Link>
                    </div>
                </div>

                <hr className="m-1" />

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ''}
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ''}

                <Form className="p-2" onSubmit={editarItem}>
                    <FormGroup className="p-2">
                        <Label>Pedido ID</Label>
                        <Input type="text" name="PedidoId" placeholder="ID do Pedido" value={item.PedidoId} onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Serviço ID</Label>
                        <Input type="text" name="ServicoId" placeholder="ID do Serviço" value={item.ServicoId} onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Quantidade</Label>
                        <Input type="text" name="quantidade" placeholder="Quantidade" value={item.quantidade} onChange={valorInput} />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>Valor</Label>
                        <Input type="text" name="valor" placeholder="Valor" value={item.valor} onChange={valorInput} />
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